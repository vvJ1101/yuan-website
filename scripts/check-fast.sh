#!/usr/bin/env bash
set -euo pipefail

LOG_DIR=$(mktemp -d)
trap 'rm -rf "$LOG_DIR"' EXIT

echo "Running tests and lint in parallel..."
npm run test >"$LOG_DIR/test.log" 2>&1 &
TEST_PID=$!
npm run lint >"$LOG_DIR/lint.log" 2>&1 &
LINT_PID=$!

STATUS=0
wait "$TEST_PID" || STATUS=1
wait "$LINT_PID" || STATUS=1

cat "$LOG_DIR/test.log"
cat "$LOG_DIR/lint.log"

if [ "$STATUS" -ne 0 ]; then
  echo "Fast checks failed; production build was not created." >&2
  exit "$STATUS"
fi

# Next's production build includes a TypeScript validation pass.
npm run build
