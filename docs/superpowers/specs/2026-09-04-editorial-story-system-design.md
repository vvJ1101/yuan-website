# YUAN SHOWROOM Visual Story System Design

Date: 2026-09-04

## Objective

Extend the existing YUAN SHOWROOM website with a reusable visual-story system that improves COLLABORATIONS details and index, POP-UP EVENTS details, brand rooms, and Lookbook details without replacing the site's established typography, monochrome palette, header, navigation, responsive breakpoints, or interaction conventions.

The first release uses existing project media plus explicitly approved temporary reference images from the user's downloaded Behance folders. Future CMS content must replace these assets without requiring layout rewrites.

## Design Direction

The system borrows editorial pacing, image sequencing, and visual contrast from the supplied references. It does not copy their brand identities. YUAN remains white-background, black-text, restrained, and showroom-oriented.

The following reference traits are allowed:

- alternating visual chapters;
- large and small image contrast;
- asymmetric image pairs;
- detail strips and montage sequences;
- quiet image transitions;
- a closing statement before credits;
- a Lookbook index with a central selected look.

The following traits are excluded:

- torn-paper edges;
- spray-paint graphics;
- aggressive red-and-black styling;
- flashing or large parallax motion;
- e-commerce pricing and shopping controls;
- promotional copy such as `NEW DROP`;
- repeating the same experimental layout on every page.

## Architecture Decision

Use a shared, data-driven visual-story renderer and small surface-specific interactive components. Do not build independent block systems for each section, and do not build a CMS editor in this phase.

Server components render ordered content blocks. Client components are restricted to interactions that require state: collaboration preview sequencing, Lookbook selection, touch swiping, and optional video controls.

## Shared Content Model

Extend the editorial data model with an ordered `StoryBlock` union:

- `hero`: full-width lead image;
- `text`: heading and localized paragraphs;
- `imageText`: image with a narrow text column;
- `offsetPair`: two differently sized or proportioned images;
- `detailStrip`: two to five unevenly sized detail images;
- `montage`: a responsive editorial group of images;
- `video`: optional muted inline video with poster, caption, and accessible controls;
- `statement`: one localized closing sentence;
- `credits`: localized credits and optional contact action.

Every block has a stable `id`. Every image keeps `src`, localized `alt`, and original `ratio`. Temporary reference media additionally records:

- `temporary: true`;
- `sourceLabel`;
- `sourcePath` or a local asset registry key;
- `replacementStatus: 'pending'`.

Components must not contain project copy or repeat content already stored in data.

## Temporary Reference Asset Policy

The user authorizes temporary public deployment of images from these downloaded reference sets:

- `Sophie H. / Spatial Design / Behance`;
- `Casa CLO / OON / Behance`;
- `Y2K / Behance`;
- `YUANSHOWROOM / 27PS ordering event recap` when usable source media is present.

Reference images are placeholders, not evidence of a real partnership. Pages using them retain the existing sample-content disclosure. Existing credit marks or watermarks are not removed. Files are copied into a dedicated public placeholder directory with normalized names and an asset manifest so they can be audited and replaced together.

## Surface Design

### COLLABORATIONS Detail

The page becomes an ordered visual story while retaining the existing title, metadata, introduction, back link, credits, and WeChat contact behavior.

Recommended sequence:

1. project identity and lead visual;
2. concept introduction;
3. image with narrow copy;
4. offset image pair;
5. horizontal detail strip;
6. optional process video or behind-the-scenes media;
7. outcomes chapter;
8. closing statement;
9. credits and contact.

Blocks preserve original image proportions. Portrait images have bounded editorial widths rather than filling the viewport. The layout alternates intentionally and must not render as a repeated two-column template.

### COLLABORATIONS Index

Keep the approved left-side project list and right-side visual stage.

- Selecting a project changes the active right-side media set.
- Each project supports two or three preview images.
- The active set advances slowly while idle.
- Manual selection resets the idle timer.
- Transitions use a restrained mask reveal, opacity change, and slight scale shift.
- Project number, category, and year remain visible beside the title.
- A separate explicit link opens the detail page.
- Touch interaction is primary; hover may preview on desktop but is never required.
- Reduced-motion mode shows a static selected image.

### POP-UP EVENTS Detail

Retain the existing readable article width and the HELEN KAMINSKI story as the baseline.

Add optional story blocks for:

- one venue or spatial overview;
- a two-to-three-image product or material montage;
- one person, craft, or process image;
- concise location, date, and theme metadata when verified;
- an optional muted inline video;
- a closing statement before credits.

The page must continue to read as an article, not a Behance case-study export.

### Brand Room Detail Strip

Add an optional `Material / Detail` section between the introduction and the existing campaign gallery.

- Desktop uses an uneven horizontal strip.
- Landscape tablets retain the strip and support direct tapping or light horizontal swiping.
- Portrait tablets reduce the number of simultaneous images.
- Mobile renders the same content vertically.
- Brands with fewer than three appropriate images omit the section.
- Phase one can derive the strip from existing `roomImages`; the future CMS may supply labeled material, accessory, process, Lookbook, and space images.

### Lookbook Second Screen

Keep the existing five-image first-screen dock and full-screen viewer. Replace the current remainder grid with an interactive Look index.

- All looks form a quiet background matrix.
- One selected look is enlarged in the center.
- The selected look stays in color; surrounding looks are visually subdued without forcing every image to monochrome.
- The screen displays brand, season, and `LOOK NN / TOTAL`.
- Tapping a background look selects it.
- Swiping the selected stage moves between looks.
- Tapping the selected look or `VIEW LOOK` opens the existing full-screen viewer at that index.
- Existing zoom, navigation, and linked-product behavior remain unchanged.
- Mobile replaces the matrix with a selected image and horizontal thumbnail strip.

### Closing Statement

COLLABORATIONS and POP-UP EVENTS gain an optional localized `statement`. It appears only when populated and always sits immediately before credits. No universal statement is hard-coded into components.

## Responsive and Accessibility Rules

- Reuse existing project breakpoints and spacing tokens.
- No horizontal page scrolling.
- Preserve image ratios; crop only when an explicitly configured preview treatment requires it.
- Touch targets remain at least 44px.
- Every interactive preview supports keyboard selection and visible focus.
- Videos have accessible play/pause controls, do not play audio automatically, and respect reduced motion and reduced data preferences.
- Timed image sequences pause while the page is hidden and after user interaction.
- Mobile layouts favor reading and direct selection over overlap.

## Content and CMS Migration

Phase one stores blocks in centralized TypeScript data modules. The renderer consumes data only and has no knowledge of the eventual CMS.

A future CMS adapter must:

1. validate block type and required fields;
2. normalize localized fields;
3. preserve block order and stable IDs;
4. resolve media URLs, dimensions, and alt text;
5. reject malformed or unsupported blocks;
6. pass the normalized blocks to the same renderer used by local data.

The CMS does not determine arbitrary CSS. Editors select a supported block type and provide content; the website owns the responsive layout.

## Implementation Phases

1. Add the shared block types, validation helpers, placeholder asset registry, and shared renderer.
2. Upgrade the sample COLLABORATIONS detail page using a complete block sequence.
3. Upgrade the COLLABORATIONS index with multi-image preview sequencing.
4. Adapt shared montage, video, and statement blocks to POP-UP EVENTS details.
5. Replace the Lookbook remainder grid with the interactive second-screen index.
6. Add the optional brand Material / Detail strip.
7. Verify desktop, iPad landscape, iPad portrait, and mobile behavior.
8. Run full release verification and deploy the group as one coordinated production release.

Each phase is reviewed locally before the next phase. Production is not redeployed after every small visual iteration.

## Expected File Areas

Likely modifications:

- `src/types/editorial.ts`;
- `src/types/showroom.ts` only for optional brand/Lookbook media metadata;
- `src/data/editorial.ts`;
- `src/data/event-stories.ts` or a compatible adapter;
- `src/data/showroom.ts`;
- `src/components/showroom/collaboration-blocks.tsx`;
- `src/components/showroom/collaboration-index.tsx`;
- `src/components/showroom/brand-room.tsx`;
- `src/app/[locale]/now/lookbook/[slug]/page.tsx`;
- new focused shared story-block and interactive-index components;
- `src/app/globals.css`;
- relevant tests and the placeholder asset manifest.

Unrelated pages, navigation, typography tokens, deployment scripts, and the `yuan-academy` application remain out of scope.

## Verification

Development uses targeted component, data, accessibility, and responsive checks. The final coordinated release runs the project's full verification because it changes shared data structures, interactions, and multiple public routes.

Required final evidence:

- data validation and unique block IDs;
- keyboard and touch selection behavior;
- reduced-motion behavior;
- images resolve and retain valid ratios;
- no horizontal overflow at supported breakpoints;
- existing Lookbook viewer and product links still work;
- existing event and collaboration routes remain accessible;
- full `npm run check` passes;
- staged deployment, rollback preservation, and public health checks pass.

## Success Criteria

- The five approved surfaces feel related but do not share an obviously repeated template.
- Existing YUAN typography, palette, navigation, and header remain unchanged.
- iPad interactions work without hover.
- Placeholder reference images can be replaced centrally.
- Future CMS content can render through the same block system.
- Existing pages and product-viewer behavior do not regress.

