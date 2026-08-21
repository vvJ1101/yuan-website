# Task 3 Report: Global Locale Shell and Immutable Header

Status: complete

Implemented one shared bilingual showroom header with the approved navigation order, locale-prefixed links, and deep-route-preserving language links. Added the async Next.js 16 locale layout with locale validation and a neutral root shell; `/` now redirects to `/cn`.

Verification: `npm test` (16 passing tests) and `npm run typecheck` (exit 0).

Concern: the root-level 404 returns to the default Chinese locale because a root `not-found.tsx` has no validated locale param; locale-specific routes can supply a contextual 404 in a later page task if needed.
