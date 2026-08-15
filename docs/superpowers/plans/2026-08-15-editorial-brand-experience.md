# Editorial Brand Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's rigid corporate grids with a controlled editorial image rhythm and add accessible, shareable detail pages for every partner brand.

**Architecture:** Keep the existing Next.js App Router homepage and local data model, but extract partner brands into a typed `src/data/brands.ts` catalog consumed by both the homepage matrix and dynamic `/brands/[slug]` pages. Use server components for static page composition and metadata, with one focused client component for the image lightbox. Real PLAYAPLY and showroom photographs are copied and optimized into public assets; unresolved brands render explicit neutral placeholders rather than unrelated product imagery.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, `next/image`, Node test runner, macOS `sips` for deterministic image resizing.

## Global Constraints

- Delete the complete black `byTheNumbers` block and its unused data; do not replace it with another statistics module.
- Use the approved A direction: warm off-white canvas, asymmetric whitespace, controlled image offsets, and restrained one-shot motion.
- Every partner brand must have a stable `/brands/[slug]` route.
- PLAYAPLY uses the supplied real imagery; all other brands use explicit neutral placeholder presentation until real imagery is supplied.
- Aano Café imagery belongs to showroom/event storytelling and must never be presented as partner-brand product imagery.
- Do not modify source files in `/Users/vv/Downloads/百度网盘下载`.
- Do not add a CMS, Baidu API, ecommerce behavior, or bilingual route rebuild.
- All motion must respect `prefers-reduced-motion`; touch devices must not depend on hover.
- No horizontal overflow at desktop, tablet, or mobile widths.
- `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build` must pass before completion.

---

### Task 1: Brand Catalog and Route Contracts

**Files:**
- Create: `src/data/brands.ts`
- Modify: `src/data/home.ts`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Produces: `Brand` type with `slug`, `name`, `country`, `category`, `style`, `description`, `coverImage`, `galleryImages`, and `placeholder`.
- Produces: `partnerBrands: readonly Brand[]`.
- Produces: `getBrandBySlug(slug: string): Brand | undefined`.
- Produces: `getAdjacentBrands(slug: string): { previous: Brand; next: Brand } | undefined`.
- Consumes later: `BrandsSection`, `src/app/brands/[slug]/page.tsx`, and `BrandPager` import these exact exports.

- [ ] **Step 1: Add failing source-contract tests for the brand catalog**

Append tests that read `src/data/brands.ts` and assert all required exports and fields exist:

```js
test('partner brands expose stable routes and replaceable media fields', async () => {
  const source = await read('src/data/brands.ts')
  for (const token of [
    'export type Brand',
    'slug: string',
    'description: string',
    'coverImage: string | null',
    'galleryImages: readonly string[]',
    'placeholder: boolean',
    'export const partnerBrands',
    'export function getBrandBySlug',
    'export function getAdjacentBrands',
  ]) assert.match(source, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.match(source, /slug: 'playaply'/)
  assert.match(source, /placeholder: false/)
})
```

- [ ] **Step 2: Run the focused test and confirm the missing-file failure**

Run: `node --test --test-name-pattern="partner brands expose" tests/site-contracts.test.mjs`

Expected: FAIL because `src/data/brands.ts` does not exist.

- [ ] **Step 3: Create the typed brand catalog**

Move the current `brands.logos` records from `src/data/home.ts` into `partnerBrands`, add lowercase URL-safe slugs, concise descriptions based only on the existing country/category/style data, and set media as follows:

```ts
export type Brand = {
  slug: string
  name: string
  country: string
  category: string
  style: string
  description: string
  coverImage: string | null
  galleryImages: readonly string[]
  placeholder: boolean
}

export const partnerBrands = [
  {
    slug: 'playaply',
    name: 'PLAYAPLY',
    country: '中国',
    category: '服装',
    style: '自然织物、浪漫艺术',
    description: 'PLAYAPLY 从天然织物与手工质感出发，以克制的色彩和松弛廓形表达日常着装中的浪漫与触觉温度。',
    coverImage: '/images/brands/playaply/playaply-installation.webp',
    galleryImages: [
      '/images/brands/playaply/playaply-material-board.webp',
      '/images/brands/playaply/playaply-rack.webp',
      '/images/brands/playaply/playaply-space-wide.webp',
    ],
    placeholder: false,
  },
  // Add SEAMEW, MAISON THER, PIÉTON ÉPISODE, NHOJ, DATT, YEESI,
  // alwools, TENSPHER, REFOUND TEN, NONETONE, manzanilla,
  // HELENKAMINSKI, Reindeer, and LUCIA TACCI with lowercase URL-safe
  // slugs, null coverImage, empty galleryImages, and placeholder: true.
] as const satisfies readonly Brand[]

export function getBrandBySlug(slug: string) {
  return partnerBrands.find((brand) => brand.slug === slug)
}

export function getAdjacentBrands(slug: string) {
  const index = partnerBrands.findIndex((brand) => brand.slug === slug)
  if (index < 0) return undefined
  return {
    previous: partnerBrands[(index - 1 + partnerBrands.length) % partnerBrands.length],
    next: partnerBrands[(index + 1) % partnerBrands.length],
  }
}
```

Keep `brands.title` and `brands.buyers` in `home.ts`, remove `logoImages` and `logos`, and import no brand data back into that file.

- [ ] **Step 4: Run tests, lint, and typecheck**

Run: `npm run test && npm run lint && npm run typecheck`

Expected: all commands PASS.

- [ ] **Step 5: Commit the catalog boundary**

```bash
git add src/data/brands.ts src/data/home.ts tests/site-contracts.test.mjs
git commit -m "feat: add typed partner brand catalog"
```

### Task 2: Optimize and Install the Supplied Editorial Assets

**Files:**
- Create: `public/images/brands/playaply/playaply-installation.webp`
- Create: `public/images/brands/playaply/playaply-material-board.webp`
- Create: `public/images/brands/playaply/playaply-rack.webp`
- Create: `public/images/brands/playaply/playaply-space-wide.webp`
- Create: `public/images/home/showroom-entry.webp`
- Create: `public/images/home/showroom-racks.webp`
- Create: `public/images/home/aano-cafe-wide.webp`
- Create: `public/images/home/aano-cafe-detail.webp`
- Modify: `src/data/home.ts`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: exact `/images/brands/playaply/*` paths from Task 1.
- Produces: optimized WebP files referenced by the homepage and PLAYAPLY detail page.
- Produces: `showroom.editorialImages` entries with `src`, `alt`, and `kind: 'showroom' | 'cafe'`.

- [ ] **Step 1: Add a failing asset existence and provenance test**

Add an async test using `access` from `node:fs/promises` that verifies all eight output files exist, and assert `home.ts` labels café images with `kind: 'cafe'`.

```js
test('editorial assets are installed with showroom and cafe provenance', async () => {
  const assets = [
    'public/images/brands/playaply/playaply-installation.webp',
    'public/images/brands/playaply/playaply-material-board.webp',
    'public/images/brands/playaply/playaply-rack.webp',
    'public/images/brands/playaply/playaply-space-wide.webp',
    'public/images/home/showroom-entry.webp',
    'public/images/home/showroom-racks.webp',
    'public/images/home/aano-cafe-wide.webp',
    'public/images/home/aano-cafe-detail.webp',
  ]
  await Promise.all(assets.map((asset) => access(new URL(asset, root))))
  const data = await read('src/data/home.ts')
  assert.match(data, /kind: 'cafe'/)
  assert.match(data, /kind: 'showroom'/)
})
```

- [ ] **Step 2: Run the focused test and confirm missing assets**

Run: `node --test --test-name-pattern="editorial assets" tests/site-contracts.test.mjs`

Expected: FAIL with `ENOENT` for the first output WebP.

- [ ] **Step 3: Generate normalized, optimized copies without changing originals**

Create temporary resized JPEGs with `sips`, then convert them to WebP using the available workspace image tooling. Map source to output exactly:

```text
2026-07-08 103040.jpg  -> playaply-installation.webp (max 1800 px)
2026-07-07 104058.jpg  -> playaply-material-board.webp (max 1600 px)
2026-07-07 104020.jpg  -> playaply-rack.webp (max 1600 px)
2026-07-08 102947.jpg  -> playaply-space-wide.webp (max 2000 px)
前台3.jpg               -> showroom-entry.webp (max 2200 px)
2026-07-08 094038.jpg  -> showroom-racks.webp (max 2000 px)
2026-07-10 085723.jpg  -> aano-cafe-wide.webp (max 2000 px)
2026-07-10 105006.jpg  -> aano-cafe-detail.webp (max 1600 px)
```

Do not copy `前台3(1).jpg`, which duplicates `前台3.jpg`. Strip metadata in the conversion output. Keep each WebP under 800 KB where visual quality permits.

- [ ] **Step 4: Add `showroom.editorialImages` with accurate alt text and provenance**

```ts
editorialImages: [
  { src: '/images/home/showroom-entry.webp', alt: 'YUAN SHOWROOM 前台与入口空间', kind: 'showroom' },
  { src: '/images/home/showroom-racks.webp', alt: 'YUAN SHOWROOM 订货会挂装陈列', kind: 'showroom' },
  { src: '/images/home/aano-cafe-wide.webp', alt: '订货会现场 Aano Café 咖啡空间', kind: 'cafe' },
  { src: '/images/home/aano-cafe-detail.webp', alt: 'Aano Café 空间陈列细节', kind: 'cafe' },
],
```

- [ ] **Step 5: Verify assets and repository size**

Run: `npm run test && find public/images/brands public/images/home -name '*.webp' -exec ls -lh {} +`

Expected: tests PASS; every new WebP exists and no new file exceeds 800 KB without a documented visual-quality reason.

- [ ] **Step 6: Commit optimized assets and data references**

```bash
git add public/images/brands/playaply public/images/home/*.webp src/data/home.ts tests/site-contracts.test.mjs
git commit -m "feat: add optimized showroom editorial assets"
```

### Task 3: Remove the Statistics Wall and Build the Editorial Homepage Rhythm

**Files:**
- Create: `src/components/home/brand-card.tsx`
- Modify: `src/components/home/section-about.tsx`
- Modify: `src/components/home/section-services.tsx`
- Modify: `src/components/home/section-brands.tsx`
- Modify: `src/components/home/section-showroom.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: `partnerBrands` and `Brand` from Task 1.
- Consumes: `showroom.editorialImages` from Task 2.
- Produces: `BrandCard({ brand, index }: { brand: Brand; index: number })` linking to `/brands/${brand.slug}`.
- Produces: CSS classes `editorial-reveal`, `brand-orbit-grid`, and `editorial-placeholder` with reduced-motion overrides.

- [ ] **Step 1: Add failing homepage structure tests**

Add source assertions that `section-about.tsx` contains no `byTheNumbers`, `section-brands.tsx` imports `partnerBrands`, `brand-card.tsx` builds `/brands/` links, and the services/showroom sources use explicit asymmetric grid templates rather than uniform `lg:grid-cols-3` / `md:grid-cols-4` card grids.

```js
test('homepage uses editorial brand links and no statistics wall', async () => {
  const about = await read('src/components/home/section-about.tsx')
  const brands = await read('src/components/home/section-brands.tsx')
  const card = await read('src/components/home/brand-card.tsx')
  assert.doesNotMatch(about, /byTheNumbers|bg-\[#111\]/)
  assert.match(brands, /partnerBrands/)
  assert.match(card, /href=\{`\/brands\/\$\{brand\.slug\}`\}/)
  assert.match(card, /aria-label=/)
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="homepage uses editorial" tests/site-contracts.test.mjs`

Expected: FAIL because `brand-card.tsx` does not exist and About still imports the statistics data.

- [ ] **Step 3: Delete the statistics UI and data import**

Remove `byTheNumbers` from the About import and delete the entire full-bleed numbers block. Ensure the section closes after the About container and reduce its bottom padding so the next section starts without a blank-data-wall-sized gap.

- [ ] **Step 4: Implement `BrandCard` with controlled aspect rhythm**

Use a fixed array of variants such as `portrait`, `landscape`, `square`, `tall`, repeated by `index % 4`. Real images render through `next/image`; placeholder brands render a warm neutral canvas with an oversized cropped brand initial/name. Keep the entire card a semantic `Link`, always show name/country/category, and reveal 「查看品牌」 on hover/focus without hiding it from touch users.

- [ ] **Step 5: Replace the brand logo/text grids with the orbit composition**

Render `partnerBrands.map((brand, index) => <BrandCard ... />)` in a 12-column desktop CSS grid whose cards use explicit span/start classes by variant. Preserve the buyer partner list below it with lower contrast and no fake interactivity.

- [ ] **Step 6: Recompose services and showroom with asymmetric templates**

Services: use a 12-column layout in which selected items span 7/5 columns and alternate image ratios; remove shadows, rounded card framing, and uniform lift effects. Showroom: replace the hero-plus-four-equal-thumbnails block with one wide image, one tall PLAYAPLY detail, and two offset showroom/café images; keep café captions explicit. Recompose seasons as alternating large/small entries, not four equal cards.

- [ ] **Step 7: Add the approved visual tokens and restrained motion**

Add CSS custom properties for `#F3F0E9`, `#FAF8F3`, `#171716`, `#725844`, `#9B968D`, and `#D8D3C9`. Add a display serif stack and one-shot reveal/keyframe styles. Within the existing reduced-motion media query, disable transform and animation for the new classes.

- [ ] **Step 8: Run tests, lint, typecheck, and build**

Run: `npm run test && npm run lint && npm run typecheck && npm run build`

Expected: all commands PASS and all static brand links are buildable.

- [ ] **Step 9: Commit the homepage editorial rebuild**

```bash
git add src/components/home src/app/globals.css tests/site-contracts.test.mjs
git commit -m "feat: create editorial homepage image rhythm"
```

### Task 4: Static Brand Detail Routes and Accessible Lightbox

**Files:**
- Create: `src/app/brands/[slug]/page.tsx`
- Create: `src/components/brands/brand-gallery.tsx`
- Create: `src/components/brands/image-lightbox.tsx`
- Create: `src/components/brands/brand-pager.tsx`
- Modify: `src/components/home/site-navigation.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: `partnerBrands`, `getBrandBySlug`, and `getAdjacentBrands` from Task 1.
- Produces: `generateStaticParams(): { slug: string }[]`.
- Produces: `generateMetadata({ params }): Promise<Metadata>` with brand-specific title, description, canonical, and Open Graph image where available.
- Produces: `BrandGallery({ brand }: { brand: Brand })`.
- Produces: `ImageLightbox({ images, brandName }: { images: readonly string[]; brandName: string })`.
- Produces: `BrandPager({ currentSlug }: { currentSlug: string })`.

- [ ] **Step 1: Add failing route, metadata, and accessibility contracts**

```js
test('brand pages are static, shareable, and include accessible gallery controls', async () => {
  const page = await read('src/app/brands/[slug]/page.tsx')
  const lightbox = await read('src/components/brands/image-lightbox.tsx')
  assert.match(page, /generateStaticParams/)
  assert.match(page, /generateMetadata/)
  assert.match(page, /notFound\(\)/)
  assert.match(page, /alternates:/)
  assert.match(lightbox, /role="dialog"/)
  assert.match(lightbox, /aria-modal="true"/)
  assert.match(lightbox, /event\.key === 'Escape'/)
  assert.match(lightbox, /\.focus\(\)/)
})
```

- [ ] **Step 2: Run the focused test and confirm missing route failure**

Run: `node --test --test-name-pattern="brand pages are static" tests/site-contracts.test.mjs`

Expected: FAIL because the brand route and lightbox files do not exist.

- [ ] **Step 3: Implement the static dynamic route and metadata**

Generate params from every `partnerBrands` slug. Await the Next.js 16 `params` promise, call `notFound()` for unknown slugs, and build brand-specific metadata. Render `SiteNavigation`, a back link to `/#brands`, brand header, editorial media group, `BrandGallery`, `BrandPager`, and a link to `/#contact`.

- [ ] **Step 4: Make navigation safe on subpages**

Change homepage fragment links in `SiteNavigation` from `#about` to `/#about` (and corresponding sections), so they work from brand pages. Preserve Escape-close behavior and focus restoration for the mobile menu.

- [ ] **Step 5: Implement the gallery and placeholder state**

For PLAYAPLY, render the cover plus gallery images in an asymmetric CSS grid and make each gallery image a button. For placeholder brands, render a branded neutral composition, the available textual profile, and copy stating that selected imagery will be updated; do not show another brand's product photo.

- [ ] **Step 6: Implement the accessible lightbox client component**

Track the selected index or `null`, save the trigger button in a ref, focus the close button on open, close on Escape, support left/right arrow navigation, lock body scroll while open, and restore focus on close. Provide labelled Previous, Next, and Close buttons. Use `next/image` with `object-contain`; render no dialog while closed.

- [ ] **Step 7: Implement circular previous/next brand navigation**

Use `getAdjacentBrands(currentSlug)` and render two semantic links with both relationship labels and brand names. At catalog boundaries, wrap to the opposite end as defined by Task 1.

- [ ] **Step 8: Improve the global 404 return paths**

Keep the canonical homepage link and add a second `/#brands` link labelled `浏览合作品牌`, ensuring the existing 404 contract remains valid.

- [ ] **Step 9: Run all automated checks**

Run: `npm run test && npm run lint && npm run typecheck && npm run build`

Expected: all commands PASS; the build output lists static pages for every partner brand slug.

- [ ] **Step 10: Commit the brand detail experience**

```bash
git add src/app/brands src/components/brands src/components/home/site-navigation.tsx src/app/not-found.tsx tests/site-contracts.test.mjs
git commit -m "feat: add interactive partner brand pages"
```

### Task 5: Visual, Responsive, and Interaction QA

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/home/section-services.tsx`
- Modify: `src/components/home/section-brands.tsx`
- Modify: `src/components/home/section-showroom.tsx`
- Modify: `src/components/brands/brand-gallery.tsx`
- Modify: `src/components/brands/image-lightbox.tsx`
- Modify: `src/components/brands/brand-pager.tsx`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: completed homepage and brand pages from Tasks 1–4.
- Produces: verified desktop, tablet, mobile, keyboard, and reduced-motion behavior.

- [ ] **Step 1: Start the production-equivalent local app**

Run: `npm run build && npm run start`

Expected: server starts without runtime errors on the reported local port.

- [ ] **Step 2: Capture and inspect desktop pages**

At 1440 × 1000, inspect `/` and `/brands/playaply`. Verify image rhythm is visibly asymmetric, the statistics wall is absent, all brand captions are readable, café imagery is labelled as event experience, and no element overlaps navigation.

- [ ] **Step 3: Capture and inspect tablet and mobile pages**

At 768 × 1024 and 390 × 844, inspect the same pages. Verify no horizontal scroll, image offsets collapse safely, all touch targets are at least 44 px, brand text is not hover-dependent, and the lightbox controls remain reachable.

- [ ] **Step 4: Verify keyboard and reduced-motion behavior**

Tab through the navigation and brand grid; open PLAYAPLY, open a gallery image, use arrow keys, close with Escape, and confirm focus returns to the clicked image. Emulate `prefers-reduced-motion: reduce` and confirm reveal/scale motion is removed while all content remains visible.

- [ ] **Step 5: Fix only evidenced QA issues and add regression assertions**

For each visual or interaction defect found, make the smallest scoped CSS/component change and add a source-contract assertion when the behavior can regress structurally. Do not add new decorative effects during QA.

- [ ] **Step 6: Run the final verification suite**

Run: `npm run check`

Expected: tests, ESLint, TypeScript, and production build all PASS with exit code 0.

- [ ] **Step 7: Commit QA fixes**

```bash
git add src tests/site-contracts.test.mjs
git commit -m "fix: polish responsive editorial brand experience"
```
