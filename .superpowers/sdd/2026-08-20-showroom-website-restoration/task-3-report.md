# Task 3 Report: Global Locale Shell and Immutable Header

Status: complete

Implemented one shared bilingual showroom header with the approved navigation order, locale-prefixed links, and deep-route-preserving language links. Added the async Next.js 16 locale layout with locale validation and a neutral root shell; `/` now redirects to `/cn`.

Verification: `npm test` (16 passing tests) and `npm run typecheck` (exit 0).

Concern: the root-level 404 returns to the default Chinese locale because a root `not-found.tsx` has no validated locale param; locale-specific routes can supply a contextual 404 in a later page task if needed.

## Fix Round 1

Added the minimal locale cover page so `/cn` and `/en` resolve, and added `src/proxy.ts` to forward the request locale to the root layout. The root layout now reads that request header server-side and emits the correct document-level `lang` attribute; the nested locale layout retains route validation and the shared Header.

Verification commands and outputs:

- `node --test tests/showroom-ui.test.mjs tests/site-contracts.test.mjs` — 15 passing, 0 failing.
- `npm run typecheck` — exited 0.
- `curl --silent --show-error --fail http://localhost:3000/cn | rg -o '<html[^>]*lang="[^"]+"' -m 1` — `<html lang="zh-CN"`.
- `curl --silent --show-error --fail http://localhost:3000/en | rg -o '<html[^>]*lang="[^"]+"' -m 1` — `<html lang="en"`.
- `curl --silent --show-error --output /dev/null --write-out '%{http_code} %{redirect_url}\\n' http://localhost:3000/` — `307 http://localhost:3000/cn`.
