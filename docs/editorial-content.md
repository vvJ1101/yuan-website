# POP-UP EVENTS and COLLABORATIONS

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
