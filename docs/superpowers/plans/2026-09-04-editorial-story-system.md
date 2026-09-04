# YUAN SHOWROOM Visual Story System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable, CMS-ready visual-story system across COLLABORATIONS, POP-UP EVENTS, brand rooms, and Lookbook details using existing and approved temporary reference media.

**Architecture:** Server-rendered ordered story blocks own editorial composition, while small client islands own timed previews and touch selection. Existing page shells, fonts, navigation, full-screen Lookbook viewer, and localized routing remain intact; data modules feed a future CMS-compatible normalized structure.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, `next/image`, native media APIs, Node test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-09-04-editorial-story-system-design.md`

## Global Constraints

- Keep the existing YUAN white background, black text, font tokens, header, navigation, and responsive breakpoints.
- Do not add dependencies.
- Use existing project media plus the user-approved temporary Behance reference media; preserve existing watermarks and mark every reference asset as temporary.
- Temporary media may be publicly deployed only on clearly labeled sample pages.
- Touch interaction must not depend on hover; every control is keyboard accessible with visible focus.
- Respect `prefers-reduced-motion`; video never autoplays audio.
- Preserve original image proportions unless a preview block explicitly configures a crop.
- Keep `yuan-academy`, deployment scripts, and unrelated routes out of scope.
- Use targeted checks per task and `npm run check` before the final coordinated release.

---

### Task 1: Shared story types, asset registry, and validation

**Files:**
- Modify: `src/types/editorial.ts`
- Create: `src/data/editorial-reference-assets.ts`
- Create: `src/lib/editorial-blocks.ts`
- Modify: `tests/editorial.test.mjs`
- Add media: `public/images/editorial/placeholders/*`

**Interfaces:**
- Produces: `StoryBlock`, `StoryImage`, `StoryVideo`, `validateStoryBlocks(blocks): readonly StoryBlock[]`, and `editorialReferenceAssets`.
- Consumes: existing `LocalizedText` and `EditorialImage`.

- [ ] **Step 1: Write failing tests for the shared block contract**

Add tests that require unique block IDs, localized alt text, valid image ratios, supported block types, and explicit temporary metadata:

```js
import { validateStoryBlocks } from '../src/lib/editorial-blocks.ts'
import { editorialReferenceAssets } from '../src/data/editorial-reference-assets.ts'

test('story blocks validate stable IDs, media and temporary provenance', () => {
  const image = editorialReferenceAssets[0]
  assert.equal(image.temporary, true)
  assert.ok(image.sourceLabel)
  assert.equal(image.replacementStatus, 'pending')
  assert.deepEqual(validateStoryBlocks([
    { id: 'lead', type: 'hero', image },
    { id: 'close', type: 'statement', text: { cn: '示例收束语', en: 'Sample closing statement' } },
  ]).map(block => block.id), ['lead', 'close'])
  assert.throws(() => validateStoryBlocks([
    { id: 'duplicate', type: 'statement', text: { cn: '一', en: 'One' } },
    { id: 'duplicate', type: 'statement', text: { cn: '二', en: 'Two' } },
  ]), /duplicate/i)
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="story blocks" tests/editorial.test.mjs`

Expected: FAIL because the new modules and types do not exist.

- [ ] **Step 3: Add the discriminated block union and validator**

Define exact block types:

```ts
export interface StoryImage extends EditorialImage {
  temporary?: boolean
  sourceLabel?: string
  sourcePath?: string
  replacementStatus?: 'pending' | 'replaced'
}

export interface StoryVideo {
  src: string
  poster: StoryImage
  caption?: LocalizedText
}

export type StoryBlock = { id: string } & (
  | { type: 'hero'; image: StoryImage }
  | { type: 'text'; heading?: LocalizedText; paragraphs: readonly LocalizedText[] }
  | { type: 'imageText'; image: StoryImage; heading?: LocalizedText; paragraphs: readonly LocalizedText[] }
  | { type: 'offsetPair'; images: readonly [StoryImage, StoryImage]; caption?: LocalizedText }
  | { type: 'detailStrip'; images: readonly StoryImage[]; caption?: LocalizedText }
  | { type: 'montage'; images: readonly StoryImage[]; caption?: LocalizedText }
  | { type: 'video'; video: StoryVideo }
  | { type: 'statement'; text: LocalizedText }
  | { type: 'credits'; items: readonly LocalizedText[] }
)
```

`validateStoryBlocks` rejects duplicate or empty IDs, unsupported media counts, missing localized alt text, and non-positive ratios. It returns the input as a readonly array after validation.

- [ ] **Step 4: Curate and register temporary media**

Copy only visually suitable JPG files from the approved local reference folders into `public/images/editorial/placeholders/`, normalize filenames, and register each file with original ratio, localized descriptive alt text, source label, local source path, `temporary: true`, and `replacementStatus: 'pending'`. Do not remove watermarks or alter authorship marks.

- [ ] **Step 5: Run focused tests and image-resolution checks**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="story blocks|editorial records" tests/editorial.test.mjs`

Expected: PASS and every registered media path resolves under `public`.

- [ ] **Step 6: Commit**

```bash
git add src/types/editorial.ts src/data/editorial-reference-assets.ts src/lib/editorial-blocks.ts tests/editorial.test.mjs public/images/editorial/placeholders
git commit -m "Add visual story content model"
```

### Task 2: Shared story renderer and COLLABORATIONS detail

**Files:**
- Create: `src/components/showroom/story-blocks.tsx`
- Modify: `src/components/showroom/collaboration-blocks.tsx`
- Modify: `src/components/showroom/editorial-projects.tsx`
- Modify: `src/data/editorial.ts`
- Modify: `src/app/globals.css`
- Modify: `tests/editorial.test.mjs`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `StoryBlock`, `validateStoryBlocks`, existing `MediaFrame`, locale helpers, and collaboration contact.
- Produces: `StoryBlocks({ blocks, locale, surface })` where `surface` is `'collaboration' | 'event'`.

- [ ] **Step 1: Write failing renderer and sample-sequence tests**

Require the sample collaboration to contain the planned chapter order and the renderer to expose semantic section classes:

```js
test('sample collaboration provides a complete ordered visual story', () => {
  const types = collaborations[0].story.map(block => block.type)
  assert.deepEqual(types, ['hero', 'text', 'imageText', 'offsetPair', 'detailStrip', 'statement', 'credits'])
})

test('shared story renderer supports each editorial composition', async () => {
  const source = await read('src/components/showroom/story-blocks.tsx')
  for (const type of ['hero', 'imageText', 'offsetPair', 'detailStrip', 'montage', 'video', 'statement', 'credits']) {
    assert.match(source, new RegExp(`story-block--${type}`))
  }
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="visual story|story renderer" tests/editorial.test.mjs tests/showroom-ui.test.mjs`

Expected: FAIL because `story` and the renderer are absent.

- [ ] **Step 3: Implement the server renderer**

Create a semantic renderer using `<section>`, `<figure>`, `<figcaption>`, and `<video controls muted playsInline preload="metadata">`. Reuse `MediaFrame`. Keep all content localized and keep portrait image widths bounded through surface classes.

- [ ] **Step 4: Adapt existing collaboration data**

Add `story?: readonly StoryBlock[]` to `Collaboration`. Build a full sample story using existing project images and approved temporary reference assets. Preserve the existing sample disclaimer and do not claim a real partnership.

- [ ] **Step 5: Integrate the story into the detail page**

Replace the current collaboration block renderer call with:

```tsx
{project.story?.length
  ? <StoryBlocks blocks={project.story} locale={locale} surface="collaboration" />
  : project.blocks?.length
    ? <CollaborationBlocks blocks={project.blocks} locale={locale} />
    : null}
```

Keep the current back link, title, metadata, WeChat contact, and closing navigation.

- [ ] **Step 6: Implement responsive composition CSS**

Add sharp-edged, monochrome layouts for full-width hero, narrow-copy image rows, asymmetric pairs, detail strips, statements, and credits. Use existing type and spacing variables. At existing tablet/mobile breakpoints, remove overlaps and stack content in reading order.

- [ ] **Step 7: Run focused validation**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="collaboration|visual story|story renderer" tests/editorial.test.mjs tests/showroom-ui.test.mjs && npx eslint src/components/showroom/story-blocks.tsx src/components/showroom/collaboration-blocks.tsx src/components/showroom/editorial-projects.tsx`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/showroom/story-blocks.tsx src/components/showroom/collaboration-blocks.tsx src/components/showroom/editorial-projects.tsx src/data/editorial.ts src/app/globals.css tests/editorial.test.mjs tests/showroom-ui.test.mjs
git commit -m "Build collaboration visual story"
```

### Task 3: Timed COLLABORATIONS visual index

**Files:**
- Modify: `src/types/editorial.ts`
- Modify: `src/data/editorial.ts`
- Modify: `src/components/showroom/collaboration-index.tsx`
- Create: `src/lib/collaboration-preview.ts`
- Modify: `src/app/globals.css`
- Modify: `tests/editorial.test.mjs`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `Collaboration.previewImages?: readonly StoryImage[]`.
- Produces: `nextPreviewIndex(current, length): number` and an iPad-safe preview stage.

- [ ] **Step 1: Write failing sequencing tests**

```js
import { nextPreviewIndex } from '../src/lib/collaboration-preview.ts'

test('collaboration previews wrap without invalid indexes', () => {
  assert.equal(nextPreviewIndex(0, 3), 1)
  assert.equal(nextPreviewIndex(2, 3), 0)
  assert.equal(nextPreviewIndex(0, 1), 0)
  assert.equal(nextPreviewIndex(0, 0), 0)
})
```

Also require sample collaborations to have two or three valid preview images.

- [ ] **Step 2: Run tests and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="collaboration preview" tests/editorial.test.mjs`

Expected: FAIL because the helper and data field are absent.

- [ ] **Step 3: Add preview data and pure sequencing helper**

Extend `Collaboration` with `previewImages?: readonly StoryImage[]`. Use the cover as fallback. Add two or three coordinated preview images to each sample project.

- [ ] **Step 4: Upgrade the client preview**

Track `selectedSlug` and `previewIndex`. Start an idle interval only when motion is allowed and the active project has multiple images. Reset the image index and timer on project selection. Pause on `document.hidden`. Keep the explicit detail link separate from selection.

- [ ] **Step 5: Add transition and reduced-motion CSS**

Layer active images with opacity and a small scale shift. Use a restrained mask only when supported. Under `prefers-reduced-motion: reduce`, disable animation and show the first active preview.

- [ ] **Step 6: Run focused tests, lint, and typecheck**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="collaboration preview|collaboration sample" tests/editorial.test.mjs tests/showroom-ui.test.mjs && npx eslint src/components/showroom/collaboration-index.tsx src/lib/collaboration-preview.ts && npm run typecheck`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/types/editorial.ts src/data/editorial.ts src/components/showroom/collaboration-index.tsx src/lib/collaboration-preview.ts src/app/globals.css tests/editorial.test.mjs tests/showroom-ui.test.mjs
git commit -m "Add collaboration preview sequencing"
```

### Task 4: POP-UP EVENTS montage, video, and statement blocks

**Files:**
- Modify: `src/data/event-stories.ts`
- Modify: `src/components/showroom/editorial-projects.tsx`
- Modify: `src/components/showroom/story-blocks.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/editorial.test.mjs`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: shared `StoryBlock` and `StoryBlocks` renderer.
- Produces: `EventStory.blocks?: readonly StoryBlock[]` rendered inside the existing readable article.

- [ ] **Step 1: Write failing event-story tests**

Require HELEN KAMINSKI to include montage and statement blocks, verified media, unique IDs, and no fabricated dates:

```js
test('HELEN KAMINSKI story adds montage and closing without inventing schedule data', () => {
  const story = eventStories['sample-showroom-edit']
  assert.ok(story.blocks.some(block => block.type === 'montage'))
  assert.ok(story.blocks.some(block => block.type === 'statement'))
  const event = popUpEvents.find(item => item.slug === 'sample-showroom-edit')
  assert.equal(event.startDate, null)
  assert.equal(event.endDate, null)
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="HELEN KAMINSKI story" tests/editorial.test.mjs`

Expected: FAIL because `EventStory.blocks` is absent.

- [ ] **Step 3: Add optional event blocks using existing HELEN media**

Build a montage from the existing venue, product, and craft images. Add a localized closing statement. Add a video block only if an actual local video exists; otherwise omit the block rather than adding a broken placeholder.

- [ ] **Step 4: Render event blocks within the article flow**

Place `<StoryBlocks surface="event">` after the current chapters and before credits. Keep the article width and existing chapter content unchanged.

- [ ] **Step 5: Add article-specific montage styles**

Keep prose at existing reading width; allow montage and video blocks to widen within the article container. Stack cleanly on mobile and preserve original proportions.

- [ ] **Step 6: Run focused tests and lint**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="HELEN KAMINSKI|event" tests/editorial.test.mjs tests/showroom-ui.test.mjs && npx eslint src/components/showroom/story-blocks.tsx src/components/showroom/editorial-projects.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/data/event-stories.ts src/components/showroom/editorial-projects.tsx src/components/showroom/story-blocks.tsx src/app/globals.css tests/editorial.test.mjs tests/showroom-ui.test.mjs
git commit -m "Add event montage story blocks"
```

### Task 5: Interactive Lookbook second screen

**Files:**
- Create: `src/components/showroom/lookbook-index-stage.tsx`
- Create: `src/lib/lookbook-index.ts`
- Modify: `src/app/[locale]/now/lookbook/[slug]/page.tsx`
- Modify: `src/components/showroom/lookbook-viewer.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/lookbook-products.test.mjs`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: existing `LookbookItem[]`, brand name, season, locale, and `LookbookImageButton` viewer context.
- Produces: `LookbookIndexStage({ looks, name, season, locale })` and `normalizeLookIndex(index, length): number`.

- [ ] **Step 1: Write failing index-normalization and source tests**

```js
import { normalizeLookIndex } from '../src/lib/lookbook-index.ts'

test('lookbook index wraps selection safely', () => {
  assert.equal(normalizeLookIndex(0, 5), 0)
  assert.equal(normalizeLookIndex(5, 5), 0)
  assert.equal(normalizeLookIndex(-1, 5), 4)
  assert.equal(normalizeLookIndex(3, 0), 0)
})
```

Require the brand page to render `LookbookIndexStage` instead of `lookbook-brand__remainder`.

- [ ] **Step 2: Run tests and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="lookbook index" tests/lookbook-products.test.mjs tests/showroom-ui.test.mjs`

Expected: FAIL because the helper and component do not exist.

- [ ] **Step 3: Implement the index stage**

Build a client component with selected index state, click selection, keyboard arrow selection, and touch swipe. Render a background matrix, central selected look, brand/season identity, and `LOOK NN / TOTAL`. The central action must use the existing viewer context to open the selected index.

- [ ] **Step 4: Replace the remainder grid**

Keep the current first-five dock. Render the new index stage as the second screen using all `brand.items`, not only the remainder, so the index is complete.

- [ ] **Step 5: Add responsive and reduced-motion styles**

Desktop uses a background matrix and central complete figure. Landscape iPad uses four or five columns. Portrait iPad reduces simultaneous thumbnails. Mobile uses the selected look with a horizontal thumbnail strip. Disable scale transitions for reduced motion.

- [ ] **Step 6: Verify viewer compatibility**

Run the existing gesture and product-link tests plus the new index tests:

`node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/lookbook-gestures.test.mjs tests/lookbook-products.test.mjs tests/showroom-ui.test.mjs`

Then run: `npx eslint src/components/showroom/lookbook-index-stage.tsx src/app/[locale]/now/lookbook/[slug]/page.tsx && npm run typecheck`

Expected: PASS; viewer zoom, navigation, and linked products remain unchanged.

- [ ] **Step 7: Commit**

```bash
git add src/components/showroom/lookbook-index-stage.tsx src/lib/lookbook-index.ts 'src/app/[locale]/now/lookbook/[slug]/page.tsx' src/components/showroom/lookbook-viewer.tsx src/app/globals.css tests/lookbook-products.test.mjs tests/showroom-ui.test.mjs
git commit -m "Build interactive lookbook index"
```

### Task 6: Brand Material / Detail strip

**Files:**
- Modify: `src/types/showroom.ts`
- Modify: `src/data/showroom.ts`
- Create: `src/components/showroom/brand-detail-strip.tsx`
- Modify: `src/components/showroom/brand-room.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `Brand.detailImages?: readonly BrandDetailImage[]` with `src`, localized `alt`, `ratio`, and optional label.
- Produces: `BrandDetailStrip({ images, locale, brandName })`.

- [ ] **Step 1: Write failing data and rendering tests**

```js
test('brand detail strip is optional and requires three images', async () => {
  const source = await read('src/components/showroom/brand-detail-strip.tsx')
  assert.match(source, /if \(images\.length < 3\) return null/)
  assert.match(source, /aria-label/)
  const room = await read('src/components/showroom/brand-room.tsx')
  assert.match(room, /<BrandDetailStrip/)
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="brand detail strip" tests/showroom-ui.test.mjs`

Expected: FAIL because the component is absent.

- [ ] **Step 3: Add optional detail data**

Define `BrandDetailImage` and `Brand.detailImages`. Populate selected complete brands from existing `roomImages` and approved temporary reference media; leave incomplete brands undefined.

- [ ] **Step 4: Implement the strip component**

Render a semantic labeled section with uneven image widths. Use native horizontal overflow only at tablet widths and vertical reading order on mobile. Do not add a lightbox or duplicate the existing brand gallery.

- [ ] **Step 5: Integrate between introduction and gallery**

Render the strip after brand details and before `brand-room__gallery`. Preserve CLOSE and previous/next brand navigation.

- [ ] **Step 6: Run focused tests, lint, and typecheck**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern="brand room|brand detail strip" tests/showroom-ui.test.mjs && npx eslint src/components/showroom/brand-detail-strip.tsx src/components/showroom/brand-room.tsx && npm run typecheck`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/types/showroom.ts src/data/showroom.ts src/components/showroom/brand-detail-strip.tsx src/components/showroom/brand-room.tsx src/app/globals.css tests/showroom-ui.test.mjs
git commit -m "Add brand material detail strip"
```

### Task 7: Cross-surface visual QA and coordinated release

**Files:**
- Modify only files with defects discovered during QA.
- Update: `docs/superpowers/specs/2026-09-04-editorial-story-system-design.md` only if implementation revealed a necessary documented constraint.

**Interfaces:**
- Consumes: all completed surfaces.
- Produces: one verified, rollback-safe production release.

- [ ] **Step 1: Run the full project verification**

Run: `npm run check`

Expected: all tests, ESLint, TypeScript, and the production build pass.

- [ ] **Step 2: Perform desktop visual QA**

Check both locales for:

- `/en/collaborations` and `/collaborations`;
- `/en/collaborations/sample-fashion` and Chinese equivalent;
- `/en/pop-up-events/sample-showroom-edit` and Chinese equivalent;
- one complete brand room;
- `/en/now/lookbook/ranyepersonal` and Chinese equivalent.

Verify image ratios, content order, keyboard focus, selection, detail links, and no horizontal overflow.

- [ ] **Step 3: Perform iPad landscape and portrait QA**

Use the established project breakpoints and test representative 1366x1024 and 1024x1366 viewports. Verify tap-only selection, swiping, stable header, and readable text.

- [ ] **Step 4: Perform mobile QA**

Test a representative 390x844 viewport. Verify stacked story blocks, mobile Lookbook thumbnail strip, video controls, and no clipped text or media.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`. Confirm collaboration preview remains static, story content remains available, and Lookbook selection works without scale animation.

- [ ] **Step 6: Fix only reproduced defects and rerun relevant checks**

For each defect, document the affected route and viewport, apply the smallest fix, and rerun only the related tests plus `git diff --check`. Rerun `npm run check` once after the final source change.

- [ ] **Step 7: Commit QA fixes**

```bash
git add <only-files-changed-by-qa>
git commit -m "Polish visual story surfaces"
```

- [ ] **Step 8: Deploy with the safe full path**

Run: `npm run deploy:full`

Expected: independent staged upload, previous-release backup, PM2 online, local health check 200, and public health checks 200. On any failure the script restores the previous release automatically.

- [ ] **Step 9: Verify public routes**

Run focused `curl -L` checks for all five upgraded public surfaces in both locales and report the deployed commit, build ID, rollback stamp, and any remaining placeholder assets.

