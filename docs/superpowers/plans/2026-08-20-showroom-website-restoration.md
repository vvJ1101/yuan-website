# YUAN SHOWROOM Website Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current single-page corporate site with the approved bilingual, multi-page YUAN SHOWROOM visual restoration.

**Architecture:** Keep the existing Next.js App Router project, introduce locale-prefixed routes under `src/app/[locale]`, and render all business content from typed bilingual records in `src/data/showroom.ts`. Shared layout components own the immutable visual system; route pages only select data and compose approved layouts, allowing a later API-backed CMS without rebuilding the UI.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS plus global CSS, `next/image`, Node test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-20-showroom-website-restoration-design.md`

## Global Constraints

- The approved reference images are `/Users/vv/Documents/YUAN开发/新官网素材/*.png`; do not modify these originals.
- Global navigation order is exactly `BRANDS / ABOUT / NOW / ON-SITE / RECAP`.
- Public routes exist under both `/cn` and `/en`; language switching preserves the equivalent current route.
- Brand categories are `RTW`, `FTW`, and `ACC`; LUCIA TACCI and PIÉTON ÉPISODE are FTW, HELEN KAMINSKI and REINDEER are ACC.
- NOW includes Lookbook, Floor Map, and Appointment.
- Desktop visual acceptance sizes are 1366×768, 1440×900, and 1920×1080.
- Hero, ABOUT, BRANDS, NOW, and ON-SITE must not scroll vertically at desktop acceptance sizes; LOOKBOOK, FLOOR MAP, and RECAP may scroll vertically.
- Mobile keeps full navigation without a hamburger menu and must not overflow horizontally.
- Phase one contains no database, authentication, admin UI, CMS, or object storage.
- Do not add decorative cards, gradients, extra controls, or redesign elements absent from the references.

---

## File Map

### Create

- `src/types/showroom.ts` — locale, bilingual field, brand, event, onsite, and recap contracts.
- `src/data/showroom.ts` — the single local content source for both languages.
- `src/lib/showroom-i18n.ts` — locale validation, localized field selection, and equivalent-language URL generation.
- `src/components/showroom/site-header.tsx` — one immutable Header used by every public route.
- `src/components/showroom/media-frame.tsx` — fixed-ratio, replaceable image wrapper.
- `src/components/showroom/brand-grid.tsx` — category lists and linked brand image matrix.
- `src/components/showroom/brand-room.tsx` — brand detail composition and pager.
- `src/components/showroom/onsite-carousel.tsx` — accessible restrained carousel.
- `src/app/[locale]/layout.tsx` — locale validation and shared Header.
- `src/app/[locale]/page.tsx` — cover page.
- `src/app/[locale]/brands/page.tsx` — brand index.
- `src/app/[locale]/brands/[slug]/page.tsx` — Brand Room.
- `src/app/[locale]/about/page.tsx` — About page.
- `src/app/[locale]/now/page.tsx` — current event landing page.
- `src/app/[locale]/now/lookbook/page.tsx` — exhibition brands and lookbooks.
- `src/app/[locale]/now/floor-map/page.tsx` — floor guide.
- `src/app/[locale]/now/appointment/page.tsx` — appointment QR.
- `src/app/[locale]/on-site/page.tsx` — onsite services.
- `src/app/[locale]/recap/page.tsx` — past events.
- `tests/showroom-data.test.mjs` — content, category, route, and translation contracts.
- `tests/showroom-ui.test.mjs` — immutable Header and page composition contracts.
- `tests/showroom-assets.test.mjs` — referenced-file and image-dimension contracts.

### Modify

- `src/app/page.tsx` — redirect `/` to `/cn`.
- `src/app/layout.tsx` — neutral root shell and bilingual metadata baseline.
- `src/app/globals.css` — replace the old editorial theme with the approved white visual system and responsive layouts.
- `src/app/not-found.tsx` — bilingual-safe return path.
- `public/sitemap.xml` — publish all canonical public routes and alternates.
- `tests/site-contracts.test.mjs` — remove obsolete single-page and hamburger-navigation assumptions.

### Retain but stop importing

- `src/components/home/**`
- `src/data/home.ts`

Delete these only after the new site passes the full build and a repository search proves no imports remain; keeping them temporarily makes each task independently reversible.

---

### Task 1: Typed Bilingual Content Foundation

**Files:**
- Create: `src/types/showroom.ts`
- Create: `src/data/showroom.ts`
- Create: `src/lib/showroom-i18n.ts`
- Create: `tests/showroom-data.test.mjs`

**Interfaces:**
- Produces: `type Locale = 'cn' | 'en'`
- Produces: `type LocalizedText = Record<Locale, string>`
- Produces: `brands: Brand[]`, `currentEvent: CurrentEvent`, `onSiteServices: OnSiteService[]`, `recaps: Recap[]`
- Produces: `isLocale(value: string): value is Locale`, `localize(value: LocalizedText, locale: Locale): string`, `switchLocalePath(pathname: string, nextLocale: Locale): string`

- [ ] **Step 1: Write failing data and locale tests**

```js
test('brand categories match the approved matrix', async () => {
  const source = await read('src/data/showroom.ts')
  assert.match(source, /name: 'LUCIA TACCI'[\s\S]*category: 'FTW'/)
  assert.match(source, /name: 'PIÉTON ÉPISODE'[\s\S]*category: 'FTW'/)
  assert.match(source, /name: 'HELEN KAMINSKI'[\s\S]*category: 'ACC'/)
  assert.match(source, /name: 'REINDEER'[\s\S]*category: 'ACC'/)
})

test('every public content record carries cn and en copy', async () => {
  const source = await read('src/data/showroom.ts')
  assert.match(source, /cn:/)
  assert.match(source, /en:/)
  assert.doesNotMatch(source, /TODO|TBD|待翻译/)
})
```

- [ ] **Step 2: Run the new tests and verify failure**

Run: `node --test tests/showroom-data.test.mjs`

Expected: FAIL because `src/data/showroom.ts` does not exist.

- [ ] **Step 3: Define exact shared types**

```ts
export type Locale = 'cn' | 'en'
export type BrandCategory = 'RTW' | 'FTW' | 'ACC'
export type LocalizedText = Record<Locale, string>

export interface Brand {
  slug: string
  name: string
  category: BrandCategory
  city: LocalizedText
  introduction: LocalizedText
  cover: string
  roomImages: readonly [string, string, string]
}

export interface Lookbook {
  brandSlug: string
  season: string
  description: LocalizedText
  designer: string
  category: LocalizedText
  origin: LocalizedText
  established: string
  website: string
  images: readonly string[]
}

export interface CurrentEvent {
  city: LocalizedText
  title: LocalizedText
  season: string
  dates: LocalizedText
  heroImage: string
  exhibitionBrandSlugs: readonly string[]
  lookbooks: readonly Lookbook[]
  floorMapImage: string
  appointmentQrImage: string
}

export interface OnSiteService {
  id: string
  name: string
  description: LocalizedText
  location: LocalizedText
  offering: LocalizedText
  hours: LocalizedText
  images: readonly string[]
}

export interface Recap {
  slug: string
  season: string
  title: LocalizedText
  poster: string
  order: number
}
```

- [ ] **Step 4: Add complete bilingual records and locale helpers**

Populate all approved brands, the SS 2027 event, Aano Caffe onsite content, the eight recap records visible in the reference, and translations based on the reference copy. Implement helpers exactly as follows:

```ts
export const locales = ['cn', 'en'] as const

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale]
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split('/')
  if (parts[1] === 'cn' || parts[1] === 'en') parts[1] = nextLocale
  else parts.splice(1, 0, nextLocale)
  return parts.join('/') || `/${nextLocale}`
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `node --test tests/showroom-data.test.mjs && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/types/showroom.ts src/data/showroom.ts src/lib/showroom-i18n.ts tests/showroom-data.test.mjs
git commit -m "feat: add bilingual showroom content model"
```

---

### Task 2: Extract and Validate Temporary Visual Assets

**Files:**
- Create: `public/images/showroom/hero-reference.png`
- Create: `public/images/showroom/brands/*.webp`
- Create: `public/images/showroom/brand-room/*.webp`
- Create: `public/images/showroom/about/showroom.webp`
- Create: `public/images/showroom/now/event.webp`
- Create: `public/images/showroom/now/lookbook/*.webp`
- Create: `public/images/showroom/now/floor-map.webp`
- Create: `public/images/showroom/now/appointment-qr.webp`
- Create: `public/images/showroom/on-site/*.webp`
- Create: `public/images/showroom/recap/*.webp`
- Create: `tests/showroom-assets.test.mjs`
- Modify: `src/data/showroom.ts`

**Interfaces:**
- Consumes: image paths declared by `src/data/showroom.ts`
- Produces: a real public file for every declared image path

- [ ] **Step 1: Write the failing asset-reference test**

```js
test('every showroom image reference resolves under public', async () => {
  const source = await read('src/data/showroom.ts')
  const paths = [...source.matchAll(/'(?<path>\/images\/showroom\/[^']+)'/g)]
    .map((match) => match.groups.path)
  assert.ok(paths.length >= 30)
  for (const imagePath of paths) {
    await access(new URL(`../public${imagePath}`, import.meta.url))
  }
})
```

- [ ] **Step 2: Run the asset test and verify failure**

Run: `node --test tests/showroom-assets.test.mjs`

Expected: FAIL with `ENOENT` for the first declared showroom image.

- [ ] **Step 3: Crop temporary images from the approved references**

Use macOS Preview or `sips` to crop only image regions, never text or Header chrome. Export photos as WebP where tooling supports it and PNG otherwise. Use these fixed output roles:

```text
BRANDS.png           -> 12 brand covers
BRANDS-简介.png      -> NHOJ main + two auxiliary images
about.png            -> ABOUT showroom photograph
now.png              -> current event hero photograph
now-lookbook.png     -> exhibition covers + LE17SEPTEMBRE gallery
now-导览图.png        -> floor map visual
now-预约.png          -> QR code only
ON-SITE.png           -> Aano Caffe first carousel image
RECAP.png             -> eight recap posters
```

Preserve the photographic crop visible in the reference. Do not bake headings, captions, navigation, or white page margins into image files.

- [ ] **Step 4: Update data paths and add meaningful alt copy**

All paths must start with `/images/showroom/`. Chinese and English alt text belongs in the data record next to its image role, not in the component.

- [ ] **Step 5: Run asset tests**

Run: `node --test tests/showroom-assets.test.mjs`

Expected: PASS with at least 30 resolved image references.

- [ ] **Step 6: Commit**

```bash
git add public/images/showroom src/data/showroom.ts tests/showroom-assets.test.mjs
git commit -m "feat: prepare showroom reference assets"
```

---

### Task 3: Global Locale Shell and Immutable Header

**Files:**
- Create: `src/components/showroom/site-header.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/not-found.tsx`
- Create: `tests/showroom-ui.test.mjs`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: `Locale`, `isLocale`, `switchLocalePath`
- Produces: `SiteHeader({ locale }: { locale: Locale })`

- [ ] **Step 1: Replace obsolete navigation tests with approved contracts**

```js
test('showroom header keeps the approved order and no hamburger', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  const brands = source.indexOf("label: 'BRANDS'")
  const about = source.indexOf("label: 'ABOUT'")
  const now = source.indexOf("label: 'NOW'")
  const onsite = source.indexOf("label: 'ON-SITE'")
  const recap = source.indexOf("label: 'RECAP'")
  assert.ok(brands < about && about < now && now < onsite && onsite < recap)
  assert.doesNotMatch(source, /Menu|hamburger|aria-expanded/)
})

test('root page redirects to Chinese', async () => {
  const source = await read('src/app/page.tsx')
  assert.match(source, /redirect\('\/cn'\)/)
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/showroom-ui.test.mjs tests/site-contracts.test.mjs`

Expected: FAIL because the shared showroom Header does not exist and old hamburger expectations remain.

- [ ] **Step 3: Implement the Header data and locale-safe links**

```tsx
const items = [
  { label: 'BRANDS', href: 'brands' },
  { label: 'ABOUT', href: 'about' },
  { label: 'NOW', href: 'now' },
  { label: 'ON-SITE', href: 'on-site' },
  { label: 'RECAP', href: 'recap' },
] as const

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="site-header">
      <Link className="site-logo" href={`/${locale}`}>YUAN<br />SHOWROOM</Link>
      <nav aria-label={locale === 'cn' ? '主导航' : 'Primary navigation'}>
        {items.map((item) => <Link key={item.href} href={`/${locale}/${item.href}`}>{item.label}</Link>)}
      </nav>
      <LanguageSwitch locale={locale} />
    </header>
  )
}
```

`LanguageSwitch` uses `usePathname()` and `switchLocalePath()` to retain the current deep route.

- [ ] **Step 4: Add locale validation and the neutral root shell**

In `[locale]/layout.tsx`, call `notFound()` unless `isLocale(params.locale)` and render `SiteHeader`. Set `<html lang>` through root metadata-compatible logic and keep the root layout free of page-specific background classes.

- [ ] **Step 5: Run focused tests and typecheck**

Run: `node --test tests/showroom-ui.test.mjs tests/site-contracts.test.mjs && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app src/components/showroom/site-header.tsx tests/showroom-ui.test.mjs tests/site-contracts.test.mjs
git commit -m "feat: add bilingual showroom shell"
```

---

### Task 4: Visual Tokens, Cover, and About Page

**Files:**
- Create: `src/components/showroom/media-frame.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Produces: `MediaFrame({ src, alt, ratio, priority, className })`
- Consumes: `aboutContent` and localized text helpers

- [ ] **Step 1: Add failing page-composition tests**

```js
test('cover contains only the approved hero title inside its main content', async () => {
  const source = await read('src/app/[locale]/page.tsx')
  assert.match(source, /YUAN[\s\S]*SHOWROOM/)
  assert.doesNotMatch(source, /<Image|subtitle|description|button/i)
})

test('about renders the image and three approved statistics', async () => {
  const source = await read('src/app/[locale]/about/page.tsx')
  for (const value of ['50+', '3000+', "'4'"]) assert.match(source, new RegExp(value))
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/showroom-ui.test.mjs`

Expected: FAIL because locale pages do not exist.

- [ ] **Step 3: Implement the global token system**

```css
:root {
  --ys-bg: #fff;
  --ys-ink: #0a0a0a;
  --ys-muted: #777;
  --ys-header-h: clamp(76px, 8.7vh, 96px);
  --ys-gutter: clamp(32px, 4vw, 68px);
  --ys-nav-size: clamp(12px, 0.95vw, 16px);
  --ys-body-size: clamp(13px, 1vw, 18px);
}

html, body { margin: 0; background: var(--ys-bg); color: var(--ys-ink); }
body { font-family: Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif; }
.showroom-viewport { min-height: 100svh; overflow-x: clip; }
```

Remove the old warm-gray body color, gold focus color, editorial section utilities, and mobile 44px rule that forces navigation geometry away from the reference. Retain an accessible black focus outline.

- [ ] **Step 4: Implement cover and About compositions**

Cover uses a single viewport main area below Header and a two-line heading positioned from the lower-left reference anchor. About uses a two-column top row and three-column statistic row; apply CSS container queries or media queries so desktop fits within `calc(100svh - var(--ys-header-h))` and mobile becomes one column.

- [ ] **Step 5: Verify tests, lint, and typecheck**

Run: `node --test tests/showroom-ui.test.mjs && npm run lint && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/'[locale]'/page.tsx src/app/'[locale]'/about/page.tsx src/components/showroom/media-frame.tsx tests/showroom-ui.test.mjs
git commit -m "feat: restore showroom cover and about pages"
```

---

### Task 5: Brands Index and Brand Room

**Files:**
- Create: `src/components/showroom/brand-grid.tsx`
- Create: `src/components/showroom/brand-room.tsx`
- Create: `src/app/[locale]/brands/page.tsx`
- Create: `src/app/[locale]/brands/[slug]/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `brands`, `BrandCategory`, `Locale`, `localize`
- Produces: `BrandGrid({ locale, brands })`
- Produces: `BrandRoom({ locale, brand, previous, next })`

- [ ] **Step 1: Write failing brand UI contracts**

```js
test('brand index exposes RTW FTW ACC and linked rooms', async () => {
  const grid = await read('src/components/showroom/brand-grid.tsx')
  for (const category of ['RTW', 'FTW', 'ACC']) assert.match(grid, new RegExp(category))
  assert.match(grid, /`\/${locale}\/brands\/${brand\.slug}`/)
})

test('brand room has close and previous-next navigation without a lightbox', async () => {
  const room = await read('src/components/showroom/brand-room.tsx')
  assert.match(room, /CLOSE/)
  assert.match(room, /previous/)
  assert.match(room, /next/)
  assert.doesNotMatch(room, /lightbox|zoom|camera/i)
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/showroom-ui.test.mjs`

Expected: FAIL because brand components do not exist.

- [ ] **Step 3: Implement the brand index**

Group records with the fixed category order `['RTW', 'FTW', 'ACC']`. Render category lists in the left rail and all covers in a six-column desktop matrix. Use the record order from `src/data/showroom.ts`; do not sort alphabetically at render time.

- [ ] **Step 4: Implement static Brand Room routes and pager**

```ts
export function generateStaticParams() {
  return locales.flatMap((locale) => brands.map((brand) => ({ locale, slug: brand.slug })))
}

const index = brands.findIndex((brand) => brand.slug === slug)
if (index < 0) notFound()
const previous = brands[(index - 1 + brands.length) % brands.length]
const next = brands[(index + 1) % brands.length]
```

Render one main and two auxiliary images with no modal behavior.

- [ ] **Step 5: Run focused verification**

Run: `node --test tests/showroom-data.test.mjs tests/showroom-ui.test.mjs && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/showroom/brand-grid.tsx src/components/showroom/brand-room.tsx src/app/'[locale]'/brands src/app/globals.css tests/showroom-ui.test.mjs
git commit -m "feat: add brands and brand rooms"
```

---

### Task 6: NOW Landing, Lookbook, Floor Map, and Appointment

**Files:**
- Create: `src/app/[locale]/now/page.tsx`
- Create: `src/app/[locale]/now/lookbook/page.tsx`
- Create: `src/app/[locale]/now/floor-map/page.tsx`
- Create: `src/app/[locale]/now/appointment/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `currentEvent`, `brands`, `Locale`, `localize`
- Produces: three linked NOW destinations with bilingual content

- [ ] **Step 1: Add failing NOW route contracts**

```js
test('NOW landing links all three approved destinations', async () => {
  const source = await read('src/app/[locale]/now/page.tsx')
  for (const path of ['lookbook', 'floor-map', 'appointment']) {
    assert.match(source, new RegExp(`/now/${path}`))
  }
  assert.doesNotMatch(source, /Arrow|<hr|<Image[^>]+className="now-link/i)
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/showroom-ui.test.mjs`

Expected: FAIL because NOW routes do not exist.

- [ ] **Step 3: Implement the NOW landing**

Render city/title, season, dates, one event image, and a text-only link column. The link column contains bilingual primary and secondary labels but no arrows, rules, or thumbnails.

- [ ] **Step 4: Implement Lookbook**

Render the exhibition-brand grid first. Each card links to `#lookbook-${brandSlug}`. Render each available lookbook as a semantic `<section id>` containing bilingual description, exact metadata fields, one main image, and the controlled auxiliary grid from data.

- [ ] **Step 5: Implement Floor Map and Appointment**

Floor Map renders the isolated map asset as the dominant width with bilingual title only. Appointment renders the QR in a centered fixed-size square with the event title and dates from data; omit unrelated instructions or promotional UI.

- [ ] **Step 6: Run focused verification**

Run: `node --test tests/showroom-data.test.mjs tests/showroom-ui.test.mjs && npm run lint && npm run typecheck`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/'[locale]'/now src/app/globals.css tests/showroom-ui.test.mjs
git commit -m "feat: add current showroom event pages"
```

---

### Task 7: ON-SITE Carousel and RECAP

**Files:**
- Create: `src/components/showroom/onsite-carousel.tsx`
- Create: `src/app/[locale]/on-site/page.tsx`
- Create: `src/app/[locale]/recap/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/showroom-ui.test.mjs`

**Interfaces:**
- Consumes: `onSiteServices`, `recaps`, `Locale`, `localize`
- Produces: `OnSiteCarousel({ images, label }: { images: readonly string[]; label: string })`

- [ ] **Step 1: Add failing onsite and recap contracts**

```js
test('onsite carousel has accessible previous and next controls', async () => {
  const source = await read('src/components/showroom/onsite-carousel.tsx')
  assert.match(source, /aria-label=.*Previous|上一张/s)
  assert.match(source, /aria-label=.*Next|下一张/s)
  assert.match(source, /setActive/)
})

test('recap orders entries from data and remains a long page', async () => {
  const source = await read('src/app/[locale]/recap/page.tsx')
  assert.match(source, /recaps[\s\S]*sort/)
  assert.match(source, /recap-grid/)
})
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node --test tests/showroom-ui.test.mjs`

Expected: FAIL because carousel and pages do not exist.

- [ ] **Step 3: Implement the restrained carousel**

Use one integer state, modulo previous/next operations, 16:9 media, arrow buttons, and page dots. Do not autoplay. Announce the current slide with `aria-live="polite"`; disable CSS transitions inside the existing reduced-motion media query.

- [ ] **Step 4: Implement ON-SITE and RECAP layouts**

ON-SITE uses a left information column and right carousel. RECAP sorts a copied array with `[...recaps].sort((a, b) => a.order - b.order)` and renders four columns at the reference desktop width, two on tablet, and one on narrow phones.

- [ ] **Step 5: Run focused verification**

Run: `node --test tests/showroom-ui.test.mjs && npm run lint && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/showroom/onsite-carousel.tsx src/app/'[locale]'/on-site src/app/'[locale]'/recap src/app/globals.css tests/showroom-ui.test.mjs
git commit -m "feat: add onsite services and recap"
```

---

### Task 8: Metadata, Sitemap, and Legacy Removal

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `public/sitemap.xml`
- Modify: `src/app/not-found.tsx`
- Delete: `src/components/home/**`
- Delete: `src/data/home.ts`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: locale route structure and final page tree
- Produces: canonical metadata, hreflang alternates, sitemap entries, and a source tree with no legacy imports

- [ ] **Step 1: Add failing publishing contracts**

```js
test('sitemap publishes cn and en showroom routes', async () => {
  const sitemap = await read('public/sitemap.xml')
  for (const route of ['/cn', '/en', '/cn/brands', '/en/brands', '/cn/now', '/en/now']) {
    assert.match(sitemap, new RegExp(`<loc>https://yuanshowroom.cn${route}</loc>`))
  }
})

test('legacy home source is no longer imported', async () => {
  const files = await filesUnder('src/app')
  for (const file of files.filter((name) => /\.(ts|tsx)$/.test(name))) {
    assert.doesNotMatch(await read(file), /components\/home|data\/home/)
  }
})
```

- [ ] **Step 2: Run site contracts and verify failure**

Run: `node --test tests/site-contracts.test.mjs`

Expected: FAIL because sitemap still contains only `/` and legacy imports remain.

- [ ] **Step 3: Add locale metadata and sitemap URLs**

Generate per-locale titles, descriptions, canonical URLs, and language alternates. List all fixed routes plus all brand slugs in `public/sitemap.xml`; use `hreflang="zh-CN"` and `hreflang="en"` alternates.

- [ ] **Step 4: Prove legacy files are unused, then remove them**

Run: `rg -n "components/home|data/home" src --glob '*.ts' --glob '*.tsx'`

Expected: no output. Then delete only `src/components/home/**` and `src/data/home.ts`; do not delete reused files under `public/images/home` during this task.

- [ ] **Step 5: Run full non-visual checks**

Run: `npm run test && npm run lint && npm run typecheck && npm run build`

Expected: all commands exit 0 and Next lists every `/[locale]/...` route.

- [ ] **Step 6: Commit**

```bash
git add src/app public/sitemap.xml tests/site-contracts.test.mjs
git add -u src/components/home src/data/home.ts
git commit -m "chore: publish bilingual showroom routes"
```

---

### Task 9: Desktop and Mobile Visual QA

**Files:**
- Modify: `src/app/globals.css`
- Modify: page/component files only when a screenshot comparison identifies a page-specific mismatch
- Create: `docs/qa/showroom-visual-qa.md`

**Interfaces:**
- Consumes: complete public route set and approved reference images
- Produces: recorded viewport-by-viewport evidence and final calibrated CSS

- [ ] **Step 1: Start a production-equivalent local server**

Run: `npm run build && npm run start`

Expected: server responds at `http://localhost:3000` without runtime errors.

- [ ] **Step 2: Capture every desktop reference page at all acceptance widths**

Capture `/cn`, `/cn/brands`, one `/cn/brands/[slug]`, `/cn/about`, `/cn/now`, `/cn/now/lookbook`, `/cn/now/floor-map`, `/cn/now/appointment`, `/cn/on-site`, and `/cn/recap` at:

```text
1366 × 768
1440 × 900
1920 × 1080
```

Compare Header anchors, outer gutters, title baselines, image crop, column widths, and bottom clearance against the corresponding PNG reference.

- [ ] **Step 3: Calibrate layout variables, not isolated magic values**

Adjust `--ys-header-h`, `--ys-gutter`, page grid tracks, and `clamp()` typography first. Add page-specific overrides only when the reference proves the relationship is unique. After each change, recapture the affected route at all three desktop sizes.

- [ ] **Step 4: Verify scroll policy**

At each desktop size, evaluate:

```js
({
  horizontal: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  vertical: document.documentElement.scrollHeight > document.documentElement.clientHeight,
})
```

Expected: `horizontal: false` everywhere. `vertical: false` for cover, ABOUT, BRANDS, NOW, and ON-SITE; vertical scrolling is allowed for LOOKBOOK, FLOOR MAP, and RECAP.

- [ ] **Step 5: Verify mobile behavior**

Capture all routes at 390×844 and 430×932. Confirm full Header navigation remains present, tap targets are usable, content order matches desktop, no text overlays images unintentionally, and the document has no horizontal overflow.

- [ ] **Step 6: Verify bilingual parity and interactions**

For every route, switch CN → EN → CN and confirm the path suffix is unchanged. Test all brand links, CLOSE, previous/next brand controls, NOW destinations, Lookbook anchors, carousel arrows/dots, keyboard focus, and reduced-motion mode.

- [ ] **Step 7: Record the QA matrix**

Create `docs/qa/showroom-visual-qa.md` with one row per route and columns for 1366×768, 1440×900, 1920×1080, 390×844, CN/EN parity, overflow, and interaction result. Every cell must contain `PASS` or a resolved issue note; do not leave blank cells.

- [ ] **Step 8: Run final verification**

Run: `npm run check`

Expected: tests, ESLint, TypeScript, and production build all pass.

- [ ] **Step 9: Commit**

```bash
git add src docs/qa/showroom-visual-qa.md
git commit -m "fix: calibrate showroom visual restoration"
```

