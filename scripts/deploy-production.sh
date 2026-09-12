#!/usr/bin/env bash
set -euo pipefail

MODE=${1:-}
SERVER=${YUAN_DEPLOY_SERVER:-root@120.79.162.27}
REMOTE_DIR=${YUAN_DEPLOY_DIR:-/var/www/yuan-website}
PM2_NAME=${YUAN_PM2_NAME:-yuan-website}
PORT=${YUAN_PORT:-3002}
PUBLIC_URL=${YUAN_PUBLIC_URL:-https://yuanshowroom.cn}

if [ "$MODE" != "fast" ] && [ "$MODE" != "full" ]; then
  echo "Usage: $0 fast|full" >&2
  exit 2
fi

for command in git npm rsync ssh curl; do
  command -v "$command" >/dev/null || {
    echo "Missing required command: $command" >&2
    exit 1
  }
done

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Refusing to deploy an uncommitted working tree." >&2
  exit 1
fi

if [ "$MODE" = "fast" ]; then
  npm run check:fast
else
  npm run check
fi

RELEASE_ID=$(git rev-parse --short HEAD)
BUILD_ID=$(cat .next/BUILD_ID)
STAGE_SUFFIX="$RELEASE_ID-$BUILD_ID"

# A changed lockfile needs a separately staged dependency installation.
# Refuse instead of mutating or hard-linking an incompatible dependency tree.
LOCAL_LOCK_HASH=$(shasum -a 256 package-lock.json | awk '{print $1}')
REMOTE_LOCK_HASH=$(ssh "$SERVER" "shasum -a 256 '$REMOTE_DIR/current/package-lock.json' | cut -d' ' -f1")
if [ "$LOCAL_LOCK_HASH" != "$REMOTE_LOCK_HASH" ]; then
  echo "package-lock.json differs from production; automated deployment stopped before upload." >&2
  echo "Use a dependency-aware maintenance deployment for this release." >&2
  exit 1
fi

git push origin HEAD:main

NEXT_UPLOAD="$REMOTE_DIR/.next.upload-$STAGE_SUFFIX"
PUBLIC_UPLOAD="$REMOTE_DIR/public.upload-$STAGE_SUFFIX"

echo "Uploading release $RELEASE_ID ($BUILD_ID)..."
rsync -az --delete --exclude='._*' .next/ "$SERVER:$NEXT_UPLOAD/"
rsync -az --delete --exclude='._*' public/ "$SERVER:$PUBLIC_UPLOAD/"

ssh "$SERVER" bash -s -- \
  "$REMOTE_DIR" "$NEXT_UPLOAD" "$PUBLIC_UPLOAD" "$PM2_NAME" "$PORT" "$PUBLIC_URL" "$RELEASE_ID" <<'REMOTE'
set -euo pipefail

REMOTE_DIR=$1
NEXT_UPLOAD=$2
PUBLIC_UPLOAD=$3
PM2_NAME=$4
PORT=$5
PUBLIC_URL=$6
RELEASE_ID=$7
STAMP=$(date +%Y%m%dT%H%M%SZ)
RELEASES_DIR="$REMOTE_DIR/releases"
CURRENT_LINK="$REMOTE_DIR/current"
PREVIOUS_RELEASE=$(readlink -f "$CURRENT_LINK")
NEXT_RELEASE="$RELEASES_DIR/$STAMP-$RELEASE_ID"

test -d "$PREVIOUS_RELEASE"
test -f "$NEXT_UPLOAD/BUILD_ID"
test -d "$PUBLIC_UPLOAD"

mkdir -p "$RELEASES_DIR"
cp -al "$PREVIOUS_RELEASE" "$NEXT_RELEASE"
rm -rf "$NEXT_RELEASE/.next" "$NEXT_RELEASE/public"
mv "$NEXT_UPLOAD" "$NEXT_RELEASE/.next"
mv "$PUBLIC_UPLOAD" "$NEXT_RELEASE/public"

# Nginx workers must be able to traverse the release path to serve static files.
chmod 755 "$RELEASES_DIR" "$NEXT_RELEASE"

rollback() {
  ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK.rollback"
  mv -Tf "$CURRENT_LINK.rollback" "$CURRENT_LINK"
  pm2 restart "$PM2_NAME" --update-env >/dev/null 2>&1 || true
  echo "deployment_failed_rolled_back" >&2
}

ln -sfn "$NEXT_RELEASE" "$CURRENT_LINK.next"
mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"

if ! pm2 restart "$PM2_NAME" --update-env >/dev/null; then
  rollback
  exit 1
fi

sleep 2
if [ "$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/en")" != "200" ]; then
  rollback
  exit 1
fi

verify_public_assets() {
  local html css_path js_path
  html=$(curl -fsSL "$PUBLIC_URL/en") || return 1
  css_path=$(printf '%s' "$html" | sed -n 's/.*href="\([^"]*\.css[^"]*\)".*/\1/p' | tail -n 1)
  js_path=$(printf '%s' "$html" | sed -n 's/.*src="\([^"]*\.js[^"]*\)".*/\1/p' | tail -n 1)
  [ -n "$css_path" ] && [ -n "$js_path" ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$css_path")" = "200" ] || return 1
  [ "$(curl -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$js_path")" = "200" ] || return 1
}

if ! verify_public_assets; then
  rollback
  exit 1
fi

for path in / /about/brand-book /en/about/brand-book /en/pop-up-events /en/pop-up-events/sample-next-season; do
  if [ "$(curl -L -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$path")" != "200" ]; then
    rollback
    exit 1
  fi
done

# Preserve the active release and one rollback release; remove older named releases only.
find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -print | sort -r | tail -n +3 | xargs -r rm -rf --

printf 'previous_release=%s\n' "$PREVIOUS_RELEASE"
printf 'new_release=%s\n' "$NEXT_RELEASE"
printf 'new_build=%s\n' "$(cat "$CURRENT_LINK/.next/BUILD_ID")"
pm2 describe "$PM2_NAME" | sed -n '/status/p;/uptime/p'
REMOTE

echo "Verifying public routes and assets..."
for path in / /en /about/brand-book /en/about/brand-book /en/pop-up-events /en/pop-up-events/sample-next-season; do
  STATUS=$(curl -L -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$path")
  if [ "$STATUS" != "200" ]; then
    echo "Post-deployment verification failed for $PUBLIC_URL$path ($STATUS)." >&2
    exit 1
  fi
done

echo "Production deployment completed: $RELEASE_ID ($BUILD_ID)"
