# Task 5 Report: Brands Index and Brand Room

## Status

Complete. The bilingual Brands index and all circularly paged Brand Room routes are implemented in the isolated `codex/showroom-restoration` worktree.

## Implemented

- Added `BrandGrid({ locale, brands })` with the binding category order RTW, FTW, ACC.
- Preserved `src/data/showroom.ts` record order in a controlled six-column by two-row desktop image matrix.
- Rendered all taxonomy memberships in the left rail and linked every rail/card entry to its localized Brand Room.
- Added static params for both locales and every brand slug.
- Added `BrandRoom({ locale, brand, previous, next })` with CLOSE, circular previous/next navigation, one primary image, and two auxiliary images.
- Kept Brand Rooms free of modal, camera, magnification, and extra interaction UI.
- Added responsive index and room layouts, keyboard focus treatment, localized labels, and descriptive image alternatives.

## TDD Evidence

1. Added the required Brands index and Brand Room contracts to `tests/showroom-ui.test.mjs`.
2. Ran `node --test tests/showroom-ui.test.mjs` and observed both tests fail because the new component files did not exist.
3. Implemented the components and routes.
4. Re-ran the focused tests and typecheck successfully.

## Visual QA

Compared both pages at the reference viewport (1672 × 941) against `BRANDS.png` and `BRANDS-简介.png`.

- Index: 12 cards, six computed columns of approximately 199px, fixed two-row layout, all three taxonomy sections, and no viewport overflow.
- Room: approximately 728px primary image plus two stacked 347px auxiliary images, reference-aligned white space, hidden global nav/language controls, visible CLOSE, and circular pager targets.
- The visual system remains the established white/black Helvetica showroom language; the asymmetric taxonomy/details rail is the distinguishing structural element.
- Responsive breakpoints were inspected in CSS; the in-app browser's temporary mobile viewport control timed out, so mobile was not screenshot-compared.

## Verification

`npm run check` passed:

- 22/22 tests
- ESLint with zero warnings
- TypeScript with no errors
- Next.js production build and 27 generated pages

## Concerns

- Next.js emits the pre-existing multi-lockfile workspace-root warning during builds; it does not affect compilation or route generation.
- Several Brand Rooms intentionally use the approved provisional repeated source imagery where originals were unavailable.

## Fix Round 1

- Recalibrated the desktop Brand Room allocation from `25vw + 2vw` to `22vw + 2.7vw`, increased its desktop top inset, and adjusted the gallery split/hero ratio toward the approved 1672 × 941 geometry while preserving the right gutter and mobile overrides.
- Updated the NHOJ introduction to four bilingual semantic paragraphs and made Brand Room introductions split safely on blank lines; single-paragraph records continue to render once.
- Added a `sizes` override to `MediaFrame`, responsive width hints for cards and room images, first-row-only card priority, and a single eager Brand Room hero.
- Changed auxiliary image keys to stable brand/role indices so provisional repeated sources cannot collide.
- Strengthened contracts for exact category order/membership, three-image rooms, six desktop columns, static params, unknown slugs, circular paging, paragraph rendering, image sizing, and priority behavior.

Fix-round verification: 17/17 focused UI/data tests passed, ESLint passed with zero warnings, and TypeScript passed with no errors. Per the quick first-version handoff request, no additional browser calibration was run after these edits.
