# POP-UP EVENTS and COLLABORATIONS

## Changed files

- `src/app/[locale]/pop-up-events/page.tsx` — activity listing.
- `src/app/[locale]/pop-up-events/[slug]/page.tsx` — activity details.
- `src/app/[locale]/collaborations/page.tsx` — collaboration listing.
- `src/app/[locale]/collaborations/[slug]/page.tsx` — collaboration details.
- `src/components/showroom/editorial-projects.tsx` — shared listing and detail layout.
- `src/components/showroom/collaboration-contact.tsx` — WeChat QR dialog.
- `src/components/showroom/site-header.tsx` — two navigation entries.
- `src/app/globals.css` — editorial layouts and wrapping navigation.
- `src/data/editorial.ts` — replaceable bilingual sample records and contact config.
- `src/types/editorial.ts` — typed events, collaborations and images.
- `src/lib/editorial.ts` — filtering and featured selection.
- `src/lib/editorial-metadata.ts` — canonical links and sample indexing policy.
- `tests/editorial.test.mjs` — filtering, routing and data integrity checks.
- `docs/editorial-content.md` — content handoff and file inventory.

Work lives on `codex/editorial-sections`, isolated from the brand-book deployment.
Verification: `npm run check` passed (75 tests, lint, typecheck and production
build); browser checks covered desktop, 1024px tablet, 390px and 320px mobile,
category selection and detail links. Both locales returned 200 for valid routes;
unknown project slugs returned 404. Real QR scanning and dialog operation await
the actual contact image. These changes have not been deployed.

## Existing system

Next.js App Router with TypeScript content in `src/data`, types in `src/types`,
shared presentation in `src/components/showroom`. No new CMS or dependency.
Chinese public routes are unprefixed; English routes retain `/en`.

## Editing content

Replace the explicitly labelled records in `src/data/editorial.ts`. Keep each slug
unique within its section. Titles and prose use the existing `{ cn, en }` shape.
Images contain `src`, bilingual `alt`, and an existing editorial aspect `ratio`;
they render through MediaFrame / Next Image. Galleries preserve the authored order.

Events include title, slug, city, venue, ISO startDate/endDate, status, coverImage,
gallery, description, participatingBrands and credits. Status is editorially
managed: CURRENT / UPCOMING / ARCHIVE. It is not inferred from the visitor's clock.

Collaborations include title, slug, partner, category, year, subtitle, coverImage,
gallery, concept, process, outcomes and credits. Category is FASHION / ART / DESIGN /
CULTURE. `process` supplies the requested behind-the-scenes text.

Both types support `featured` and `isSample`. The first featured record is used
as the lead; otherwise the first filtered record is used. Filters use URL query
parameters so refresh, direct links and browser Back work without client state.
ALL shows the complete collection, with event archives separated below the lead.

Set `collaborationContact` to `{ qrImage: '/images/…' }` after receiving the actual
public collaboration WeChat code. The native dialog supports Escape, focus
containment and restoration, a visible close action, and backdrop dismissal.
Do not substitute the ordering-event reservation code.

## Before publishing

- Supply real event dates, venues, prose, participating brands and image credits.
- Supply approved collaboration partners, concepts, process, outcomes and images.
- Replace sample records and set `isSample: false` only for approved real content.
- Sample detail pages and all-sample indexes are noindex; labels remain visible.
- Supply and scan-test the collaboration QR code.

An eventual CMS can return the same typed records without changing presentation.
