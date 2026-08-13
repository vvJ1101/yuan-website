# YUAN SHOWROOM Static Editorial UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished bilingual multi-page static YUAN SHOWROOM website with an editorial home, public brand matrix, season archive, 27PS recap, buyer/brand partnership routes, and restrained image-led motion.

**Architecture:** Keep Next.js App Router and model public content as typed local data so the static UI can later consume a CMS without redesign. Use locale-prefixed routes and shared server-rendered layouts, with small client components only for navigation, filtering, lightbox, floor-map hotspots, forms, and motion. Download authorized Baidu Netdisk assets as read-only local source copies; commit only selected, optimized public derivatives.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Framer Motion, Next Image, Node test runner, ESLint.

## Global Constraints

- Global navigation is Home, Brands, Showrooms, Brand Partnership, Buyer Partnership, About, and 中/EN.
- Floor map and āano caffe appear only inside the 27PS on-site recap, never in global navigation.
- The initial archive item is `27PS · Echoes of Deco · Shanghai`, dated 2026-07-06 through 2026-07-12.
- Public pages show all 13 brand names and only selected images; no complete lookbook, ordering documents, login, or download center.
- Visual quality must match an international fashion showroom: no generic corporate template, cheap gradients, excessive rounded cards, or purposeless decoration.
- Reference IDEAL SHOWROOM's information structure and image-motion rhythm without copying protected artwork, copy, logos, or unique assets.
- Respect `prefers-reduced-motion`; every route and interaction remains usable without animation and by keyboard.
- Baidu Netdisk access is read-only: download copies only; never upload, edit, move, rename, delete, share, or change permissions.
- Never commit internal contacts, operational tables, sample quantities, material counts, status fields, credentials, or unselected source media.
- Do not deploy until tests, lint, typecheck, build, responsive visual review, and user approval pass.

---

### Task 1: Route and Content Contract

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/data/site-content.ts`
- Create: `src/data/seasons.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/content-model.test.mjs`

**Interfaces:**
- Produces: `Locale = 'zh' | 'en'`, `locales`, `isLocale()`, `localizedPath()`, `siteContent`, `brands`, `seasons`, and `Season`.
- Consumes: no new application interfaces.

- [ ] **Step 1: Write failing content-contract tests**

Add assertions that locales are exactly `zh,en`, every global navigation item has both translations and a locale-prefixed path, the 27PS record has Shanghai/date fields and 13 public brands, and no serialized public record contains internal field names such as `负责人`, `工作证`, `Sample总数量`, or phone-number-like values.

- [ ] **Step 2: Verify the content test fails**

Run: `node --test tests/content-model.test.mjs`
Expected: FAIL because the data and locale modules do not exist.

- [ ] **Step 3: Implement typed locale and static content models**

Create exact public types for localized text, navigation, brands, seasons, recap galleries, map hotspots, and cafe content. Add the 13 confirmed brand names and 27PS metadata, using neutral public descriptions where approved copy is not yet supplied. Implement `/` as a browser-language entry route and locale pages as fixed crawlable routes.

- [ ] **Step 4: Verify the contract**

Run: `node --test tests/content-model.test.mjs && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/lib/i18n.ts src/data/site-content.ts src/data/seasons.ts src/app/page.tsx 'src/app/[locale]/layout.tsx' 'src/app/[locale]/page.tsx' tests/content-model.test.mjs && git commit -m "feat: add bilingual editorial content model"`

### Task 2: Editorial Foundation and Global Navigation

**Files:**
- Create: `src/components/editorial/global-navigation.tsx`
- Create: `src/components/editorial/page-transition.tsx`
- Create: `src/components/editorial/language-switcher.tsx`
- Create: `src/components/editorial/editorial-footer.tsx`
- Create: `src/components/editorial/reveal.tsx`
- Create: `src/components/editorial/index.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`
- Test: `tests/editorial-shell.test.mjs`

**Interfaces:**
- Consumes: `Locale`, `localizedPath()`, and `siteContent.navigation` from Task 1.
- Produces: reusable navigation, language switcher, reveal, transition, and footer components.

- [ ] **Step 1: Write failing shell tests**

Assert that global navigation contains only the seven confirmed items, the language switcher preserves the route suffix, the mobile menu is a labeled dialog with close semantics, and CSS includes reduced-motion overrides.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/editorial-shell.test.mjs`
Expected: FAIL because editorial shell files do not exist.

- [ ] **Step 3: Implement the visual system and shell**

Define warm ivory, ink, clay, hairline, and muted text tokens; serif/display and sans typography; generous spacing; square image frames; visible focus styles; selection color; and motion durations. Build a transparent-to-solid desktop header, full-screen mobile menu, route-aware language switcher, restrained reveal transitions, and editorial footer. Use Framer Motion only in client boundaries.

- [ ] **Step 4: Verify shell behavior**

Run: `node --test tests/editorial-shell.test.mjs && npm run lint && npm run typecheck`
Expected: PASS with zero warnings.

- [ ] **Step 5: Commit**

Run: `git add src/components/editorial src/app/globals.css 'src/app/[locale]/layout.tsx' tests/editorial-shell.test.mjs && git commit -m "feat: build editorial navigation and visual system"`

### Task 3: Multi-Page Public Routes

**Files:**
- Create: `src/components/editorial/editorial-hero.tsx`
- Create: `src/components/editorial/image-link.tsx`
- Create: `src/components/editorial/brand-grid.tsx`
- Create: `src/app/[locale]/brands/page.tsx`
- Create: `src/app/[locale]/partnership/brands/page.tsx`
- Create: `src/app/[locale]/partnership/buyers/page.tsx`
- Create: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Test: `tests/public-routes.test.mjs`

**Interfaces:**
- Consumes: editorial shell from Task 2 and typed static content from Task 1.
- Produces: home, brand matrix, brand partnership, buyer partnership, and about routes.

- [ ] **Step 1: Write failing route tests**

Assert every locale has all confirmed paths, each route exports locale-specific metadata, homepage links to independent pages rather than section anchors, and the brand matrix renders all 13 names.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/public-routes.test.mjs`
Expected: FAIL because route modules do not exist.

- [ ] **Step 3: Build the static pages**

Create an asymmetric editorial homepage with image-led link panels and controlled reveal/parallax; a brand matrix with category filtering and keyboard-operable expandable detail; distinct partnership narratives and CTA forms; and an about page with repositioned company story. Avoid long one-page duplication.

- [ ] **Step 4: Verify pages**

Run: `node --test tests/public-routes.test.mjs && npm run lint && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components/editorial 'src/app/[locale]' tests/public-routes.test.mjs && git commit -m "feat: add editorial public website routes"`

### Task 4: Season Archive and 27PS Recap

**Files:**
- Create: `src/components/seasons/season-card.tsx`
- Create: `src/components/seasons/season-navigation.tsx`
- Create: `src/components/seasons/lookbook-gallery.tsx`
- Create: `src/components/seasons/image-lightbox.tsx`
- Create: `src/components/seasons/recap-gallery.tsx`
- Create: `src/components/seasons/floor-map.tsx`
- Create: `src/components/seasons/cafe-story.tsx`
- Create: `src/components/seasons/index.ts`
- Create: `src/app/[locale]/showrooms/page.tsx`
- Create: `src/app/[locale]/showrooms/27ps-echoes-of-deco/page.tsx`
- Test: `tests/season-pages.test.mjs`

**Interfaces:**
- Consumes: `Season`, `seasons`, and the editorial shell.
- Produces: chronological archive, single-season story, gallery lightbox, and map hotspot interactions.

- [ ] **Step 1: Write failing season tests**

Assert archive sorting is descending; 27PS exposes overview, brands, selected lookbook, and on-site recap; map and cafe labels occur only in the season route; lightbox and map controls are real buttons with accessible labels; and archive-to-detail/back links exist.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/season-pages.test.mjs`
Expected: FAIL because season components and routes do not exist.

- [ ] **Step 3: Implement archive and recap UI**

Build image-dominant archive cards and a long-form 27PS editorial story. Place floor-map and cafe chapters under the on-site recap. Implement a focus-managed lightbox, staggered gallery reveal, map hotspot selection, desktop detail panel, mobile bottom sheet, and reduced-motion fallback.

- [ ] **Step 4: Verify season behavior**

Run: `node --test tests/season-pages.test.mjs && npm run lint && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components/seasons 'src/app/[locale]/showrooms' tests/season-pages.test.mjs && git commit -m "feat: add showroom archive and 27PS recap"`

### Task 5: Static Partnership Forms

**Files:**
- Create: `src/components/forms/partnership-form.tsx`
- Create: `src/components/forms/form-fields.ts`
- Modify: `src/app/[locale]/partnership/brands/page.tsx`
- Modify: `src/app/[locale]/partnership/buyers/page.tsx`
- Test: `tests/partnership-forms.test.mjs`

**Interfaces:**
- Consumes: locale-specific partnership copy.
- Produces: `PartnershipForm` supporting `type: 'brand' | 'buyer'` with local demo submission state.

- [ ] **Step 1: Write failing form tests**

Assert brand and buyer variants have different field sets, both require privacy consent, fields have labels and error associations, no network endpoint is embedded, and submit copy explicitly indicates the preview behavior.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/partnership-forms.test.mjs`
Expected: FAIL because form components do not exist.

- [ ] **Step 3: Implement forms**

Build square, editorial form controls with native validation plus clear inline errors. On valid submit, prevent network activity and show a localized preview-success panel. Keep the component boundary ready for a later server action and enterprise-email routing.

- [ ] **Step 4: Verify forms**

Run: `node --test tests/partnership-forms.test.mjs && npm run lint && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/components/forms 'src/app/[locale]/partnership' tests/partnership-forms.test.mjs && git commit -m "feat: add static partnership form experiences"`

### Task 6: Read-Only Material Intake and Web Optimization

**Files:**
- Create locally but do not commit: `.private-assets/27ps-source/`
- Create: `public/images/seasons/27ps/`
- Create: `docs/ASSET_PROVENANCE.md`
- Modify: `.gitignore`
- Modify: `src/data/seasons.ts`
- Test: `tests/public-assets.test.mjs`

**Interfaces:**
- Consumes: authorized `27PS（小季）7月订货会素材` source files downloaded from Baidu Netdisk.
- Produces: optimized public AVIF/WebP/JPEG assets referenced by `seasons.ts`, plus a non-sensitive provenance manifest.

- [ ] **Step 1: Protect private source downloads**

Add `.private-assets/`, `*.livp`, and local download manifests to `.gitignore`. Add a test that fails if private-source paths, prohibited internal spreadsheet field names, or unoptimized source formats are tracked.

- [ ] **Step 2: Download source copies without remote mutation**

Use the signed-in Baidu Netdisk UI only to select and download the authorized `27PS（小季）7月订货会素材` visual folders into `.private-assets/27ps-source/`. Do not invoke upload, move, rename, delete, share, permission, or sync actions. Record only high-level source ownership and selection notes in `docs/ASSET_PROVENANCE.md`; do not record private links or personnel data.

- [ ] **Step 3: Select and optimize public derivatives**

Choose a coherent cover, brand details, selected looks, on-site recap, floor map, and cafe images. Convert only selected images to appropriate responsive formats, remove unnecessary metadata, use descriptive ASCII filenames, and retain sufficient display resolution.

- [ ] **Step 4: Wire assets and verify privacy**

Update `seasons.ts` with optimized paths. Run: `node --test tests/public-assets.test.mjs && git status --short && git diff --check`
Expected: PASS; `.private-assets` remains absent from Git status and only selected public derivatives appear.

- [ ] **Step 5: Commit**

Run: `git add .gitignore public/images/seasons/27ps src/data/seasons.ts docs/ASSET_PROVENANCE.md tests/public-assets.test.mjs && git commit -m "feat: add optimized 27PS public imagery"`

### Task 7: SEO, Responsive QA, and Production Verification

**Files:**
- Create: `src/app/[locale]/showrooms/27ps-echoes-of-deco/opengraph-image.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: route metadata files as required
- Modify: `README.md`
- Test: `tests/seo.test.mjs`

**Interfaces:**
- Consumes: all routes and public assets.
- Produces: crawlable bilingual metadata, sitemap, social card, and verified production build.

- [ ] **Step 1: Write failing SEO tests**

Assert zh/en canonical and hreflang pairs, sitemap inclusion of public routes, noindex exclusion for no public pages, descriptive image alt text, and metadata for the 27PS recap.

- [ ] **Step 2: Implement SEO metadata and documentation**

Add locale alternates, canonical URLs, structured Organization/Event/CollectionPage data where accurate, sitemap entries, robots rules, and a 27PS social image. Document local development, content structure, static form limitation, asset privacy boundary, and later CMS/email integration points.

- [ ] **Step 3: Run automated verification**

Run: `npm run check`
Expected: all tests, lint, typecheck, and production build pass.

- [ ] **Step 4: Run responsive and interaction review**

Inspect `/zh`, `/en`, brand matrix, archive, 27PS recap, both partnership pages, and mobile navigation at approximately 1440px, 1024px, 768px, 390px, and 360px. Verify no overflow, crop failures, unreadable text, broken language preservation, keyboard traps, or motion when reduced-motion is enabled. Fix each observed issue and rerun `npm run check`.

- [ ] **Step 5: Commit**

Run: `git add src/app README.md tests/seo.test.mjs && git commit -m "feat: finalize bilingual editorial website UI"`

### Task 8: User Review Gate

**Files:**
- Modify only files required by user review findings.

**Interfaces:**
- Consumes: verified static website from Tasks 1–7.
- Produces: user-approved static UI ready for a separate deployment decision.

- [ ] **Step 1: Present local desktop and mobile previews**

Show the homepage, archive, 27PS recap, map interaction, and partnership forms with actual selected images.

- [ ] **Step 2: Apply approved visual revisions**

Limit changes to concrete user feedback, preserving route hierarchy, privacy boundaries, responsiveness, and accessibility.

- [ ] **Step 3: Re-run verification**

Run: `npm run check`
Expected: PASS after revisions.

- [ ] **Step 4: Commit approved refinements**

Run: `git add <reviewed-files> && git commit -m "style: refine editorial website presentation"`

- [ ] **Step 5: Stop before deployment**

Report the verified branch and request explicit confirmation before pushing, merging, or deploying the redesigned website.
