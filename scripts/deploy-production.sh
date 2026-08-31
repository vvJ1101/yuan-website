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
# Refuse instead of mutating the live node_modules directory.
LOCAL_LOCK_HASH=$(shasum -a 256 package-lock.json | awk '{print $1}')
REMOTE_LOCK_HASH=$(ssh "$SERVER" "shasum -a 256 '$REMOTE_DIR/package-lock.json' | cut -d' ' -f1")
if [ "$LOCAL_LOCK_HASH" != "$REMOTE_LOCK_HASH" ]; then
  echo "package-lock.json differs from production; automated deployment stopped before upload." >&2
  echo "Use a dependency-aware maintenance deployment for this release." >&2
  exit 1
fi

git push origin HEAD:main

NEXT_STAGE="$REMOTE_DIR/.next.stage-$STAGE_SUFFIX"
PUBLIC_STAGE="$REMOTE_DIR/public.stage-$STAGE_SUFFIX"

echo "Uploading release $RELEASE_ID ($BUILD_ID)..."
rsync -az --delete --exclude='._*' .next/ "$SERVER:$NEXT_STAGE/"
rsync -az --delete --exclude='._*' public/ "$SERVER:$PUBLIC_STAGE/"

ssh "$SERVER" bash -s -- \
  "$REMOTE_DIR" "$NEXT_STAGE" "$PUBLIC_STAGE" "$PM2_NAME" "$PORT" "$PUBLIC_URL" <<'REMOTE'
set -euo pipefail

REMOTE_DIR=$1
NEXT_STAGE=$2
PUBLIC_STAGE=$3
PM2_NAME=$4
PORT=$5
PUBLIC_URL=$6
STAMP=$(date +%Y%m%d_%H%M%S)

cd "$REMOTE_DIR"
test -f "$NEXT_STAGE/BUILD_ID"
test -d "$PUBLIC_STAGE"

PREVIOUS_BUILD=$(cat .next/BUILD_ID 2>/dev/null || true)
NEXT_BACKUP=".next.backup.$STAMP"
PUBLIC_BACKUP=".public.backup.$STAMP"

mv .next "$NEXT_BACKUP"
mv "$NEXT_STAGE" .next
mv public "$PUBLIC_BACKUP"
mv "$PUBLIC_STAGE" public

rollback() {
  pm2 stop "$PM2_NAME" >/dev/null 2>&1 || true
  mv .next ".next.failed.$STAMP"
  mv "$NEXT_BACKUP" .next
  mv public ".public.failed.$STAMP"
  mv "$PUBLIC_BACKUP" public
  pm2 restart "$PM2_NAME" --update-env >/dev/null
  echo "deployment_failed_rolled_back" >&2
}

if ! pm2 restart "$PM2_NAME" --update-env >/dev/null; then
  rollback
  exit 1
fi

sleep 2
if [ "$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/")" != "200" ]; then
  rollback
  exit 1
fi

for path in / /about/brand-book /en/about/brand-book; do
  if [ "$(curl -L -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$path")" != "200" ]; then
    rollback
    exit 1
  fi
done

# Keep the newest rollback points and remove only explicitly named old backups.
find . -maxdepth 1 -type d -name '.next.backup.*' -print | sort -r | tail -n +4 | xargs -r rm -rf --
find . -maxdepth 1 -type d -name '.public.backup.*' -print | sort -r | tail -n +4 | xargs -r rm -rf --

printf 'previous_build=%s\n' "$PREVIOUS_BUILD"
printf 'new_build=%s\n' "$(cat .next/BUILD_ID)"
printf 'backup_stamp=%s\n' "$STAMP"
pm2 describe "$PM2_NAME" | sed -n '/status/p;/uptime/p'
REMOTE

echo "Verifying public routes..."
for path in / /about/brand-book /en/about/brand-book; do
  STATUS=$(curl -L -sS -o /dev/null -w '%{http_code}' "$PUBLIC_URL$path")
  if [ "$STATUS" != "200" ]; then
    echo "Post-deployment verification failed for $PUBLIC_URL$path ($STATUS)." >&2
    exit 1
  fi
done

echo "Production deployment completed: $RELEASE_ID ($BUILD_ID)"
