# First Version Remaining Report

## Status

Tasks 6–8 are complete as one browsable first-version batch.

- Added bilingual NOW landing routes for the event, Lookbook, Floor Guide, and Appointment.
- Added the restrained, manual-only ON-SITE carousel with previous/next controls, dots, and a polite current-slide announcement.
- Added the long-form RECAP grid with data-defined ordering and 4/2/1 responsive columns.
- Added locale metadata, canonical and language alternates, and a 42-entry bilingual sitemap covering all fixed routes and brand rooms.
- Removed only the unused legacy `src/components/home/**` bundle and `src/data/home.ts`; retained `public/images/home/**` as required.
- Reworked the 404 page into the shared monochrome showroom system.

## Verification

TDD red phase:

- `node --test tests/showroom-ui.test.mjs tests/site-contracts.test.mjs` failed for the missing NOW route, carousel/RECAP files, and expanded sitemap as expected.

Focused green phase:

- `node --test tests/showroom-data.test.mjs tests/showroom-ui.test.mjs tests/site-contracts.test.mjs && npm run lint && npm run typecheck` — PASS (30 tests, 0 failures; lint and typecheck clean).

Final gate:

- `npm run check` — PASS.
- Tests: 31 passed, 0 failed, 0 skipped.
- ESLint: 0 errors, 0 warnings.
- TypeScript: `tsc --noEmit` exited 0.
- Production build: compiled successfully and generated all expected routes, including `/[locale]/now`, `/[locale]/now/lookbook`, `/[locale]/now/floor-map`, `/[locale]/now/appointment`, `/[locale]/on-site`, and `/[locale]/recap`.
- `git diff --check` — PASS.
- Legacy import scan — no `components/home` or `data/home` references remain under `src`.
- Sitemap count — 42 `<url>` entries.

Functional browser smoke before the final build:

- Loaded the six new page types across both locales with no broken images or horizontal overflow at the default viewport.
- Confirmed the ON-SITE next control advances the image and updates the `aria-live` slide count.
- Confirmed locale metadata renders a non-duplicated absolute title after correcting parent-template inheritance.

## Concerns / Deferred Work

- Per-page screenshot calibration is intentionally deferred to Task 9 under the quick-first-version ruling.
- Next.js prints a non-fatal workspace-root warning because the main checkout and linked worktree both contain lockfiles; the production build still exits 0.
- `npm install` reports six high-severity audit findings in the existing dependency tree; no dependency upgrades were made in this scoped batch.
