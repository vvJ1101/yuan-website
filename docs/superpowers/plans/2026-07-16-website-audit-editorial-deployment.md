# Website Audit, Editorial Upgrade, and Production Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the YUAN public website's accuracy, mobile experience, SEO, performance, security, accessibility, and editorial presentation, then deploy the verified build to the existing production server with rollback protection.

**Architecture:** Keep the current static, data-driven Next.js App Router architecture. `src/data/home.ts` remains the single content source, section components remain presentation units, global metadata stays in `layout.tsx`, and security headers stay in `next.config.js`; focused Node contract tests protect these boundaries. Deployment builds locally, transfers only the Next.js runtime artifacts needed by `/var/www/yuan-website`, preserves the previous `.next`, and rolls back when health checks fail.

**Tech Stack:** Next.js 16.2.10, React 19.2.7, TypeScript 5, Tailwind CSS 3, Node.js test runner, ESLint 9, PM2, Nginx, SSH/SCP.

## Global Constraints

- Preserve the existing business facts, business structure, partner list, and homepage sections.
- Keep the approved labels `合作品牌与买手` and `合作买手与买手店`.
- Do not invent brand counts, buyer counts, partner organizations, city coverage, qualifications, or performance claims.
- Use the approved A direction: restrained editorial typography, black/white/warm gray palette, improved spacing and image rhythm, no wholesale rebrand.
- Do not add a CMS, database, contact-data backend, or new third-party dependency.
- Do not include ordering policies, internal templates, `.env*`, SSH keys, JWT/API secrets, server credentials, or `.superpowers/` in Git or deployment packages.
- Keep `yuan-academy`, its PM2 process, port, files, data, and Nginx server block unchanged.
- Production target is `/var/www/yuan-website`, PM2 `yuan-website`, port `3002`, domains `yuanshowroom.cn` and `www.yuanshowroom.cn`.
- Each task must preserve a passing `npm run test` before commit; Task 6 runs the full verification set.

---

### Task 1: Expand the Website Quality Contract

**Files:**
- Modify: `tests/site-contracts.test.mjs`
- Read: `src/app/layout.tsx`
- Read: `src/app/page.tsx`
- Read: `src/components/home/site-navigation.tsx`
- Read: `src/data/home.ts`
- Read: `next.config.js`
- Read: `public/robots.txt`
- Read: `public/sitemap.xml`

**Interfaces:**
- Consumes: repository files through the existing `read(relativePath)` and `filesUnder(relativeDirectory)` test helpers.
- Produces: contract tests for public-data boundaries, semantic landmarks, heading hierarchy, metadata, safe links, responsive images, and reduced-motion support.

- [ ] **Step 1: Add failing tests for the confirmed quality requirements**

Append focused tests with these exact assertions:

```js
test('homepage exposes one semantic main landmark and one h1', async () => {
  const page = await read('src/app/page.tsx')
  const hero = await read('src/components/home/section-hero.tsx')
  assert.equal((page.match(/<main\b/g) ?? []).length, 1)
  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1)
})

test('metadata uses the canonical production origin', async () => {
  const layout = await read('src/app/layout.tsx')
  assert.match(layout, /metadataBase:\s*new URL\('https:\/\/yuanshowroom\.cn'\)/)
  assert.match(layout, /alternates:\s*\{ canonical:\s*'https:\/\/yuanshowroom\.cn\/' \}/)
})

test('public website contains no ordering policy or secret-bearing files', async () => {
  const publicFiles = await filesUnder('public')
  const forbidden = publicFiles.filter((file) => /polic(?:y|ies)|订货政策|\.env|private.?key/i.test(file))
  assert.deepEqual(forbidden, [])
})

test('global styles preserve keyboard focus and reduced-motion fallbacks', async () => {
  const css = await read('src/app/globals.css')
  assert.match(css, /:focus-visible/)
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)
})

test('external blank-target links use noopener noreferrer', async () => {
  const files = (await filesUnder('src')).filter((file) => /\.(ts|tsx)$/.test(file))
  for (const file of files) {
    const source = await read(file)
    for (const match of source.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/g)) {
      assert.match(match[0], /rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/)
    }
  }
})
```

- [ ] **Step 2: Run the suite and record the baseline**

Run: `npm run test`

Expected: existing tests remain green; at least one new contract fails if a required semantic, metadata, or link condition is absent. Record the failing assertion names in the implementation notes rather than weakening them.

- [ ] **Step 3: Add a contract for image dimensions and meaningful alt text**

Add:

```js
test('content images declare alt text and stable dimensions or fill', async () => {
  const files = (await filesUnder('src/components/home')).filter((file) => file.endsWith('.tsx'))
  for (const file of files) {
    const source = await read(file)
    for (const match of source.matchAll(/<Image\b[\s\S]*?\/>/g)) {
      assert.match(match[0], /alt=/, `${file} image is missing alt`)
      assert.match(match[0], /(?:\bwidth=|\bheight=|\bfill\b)/, `${file} image has no stable dimensions`)
    }
  }
})
```

- [ ] **Step 4: Run the focused quality suite**

Run: `node --test tests/site-contracts.test.mjs`

Expected: the new tests identify the actual implementation gaps and print no syntax errors.

- [ ] **Step 5: Commit the quality contract**

```bash
git add tests/site-contracts.test.mjs
git commit -m "test: expand website quality contract"
```

---

### Task 2: Correct SEO, Security, and Semantic Foundations

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/section-hero.tsx`
- Modify: `src/components/home/site-navigation.tsx`
- Modify: `src/app/globals.css`
- Modify: `next.config.js`
- Modify: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Test: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: Task 1 contracts and the canonical origin `https://yuanshowroom.cn`.
- Produces: accurate `Metadata`, Organization JSON-LD, one `main`, one `h1`, semantic navigation, focus handling, reduced-motion fallback, and hardened response headers.

- [ ] **Step 1: Make metadata and Organization JSON-LD match only verified facts**

Keep `metadataBase`, canonical URL, organization name, production URL, email contact, and existing verified address. Remove or soften any numeric or qualification claim that is not supported by the current source material. Generate JSON-LD as a serializable constant and escape `<` before injection:

```tsx
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'YUAN SHOWROOM',
  url: 'https://yuanshowroom.cn/',
  logo: 'https://yuanshowroom.cn/favicon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'heshiya@yuanshowroom.vip',
    contactType: 'Brand Cooperation',
  },
}

const safeJsonLd = JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c')
```

- [ ] **Step 2: Enforce semantic landmarks and heading hierarchy**

Use exactly one `<main>` in `src/app/page.tsx`, one homepage `<h1>` in `section-hero.tsx`, `<nav aria-label="主导航">` for the primary navigation, and a semantic `<footer>` for contact and legal information. Section titles remain `h2`; card titles remain `h3`.

- [ ] **Step 3: Preserve accessible mobile navigation behavior**

The menu button must expose `aria-expanded`, `aria-controls="mobile-navigation"`, and a visible Chinese accessible name. The mobile panel uses `id="mobile-navigation"`; Esc closes it; navigation closes after link activation; the trigger regains focus after keyboard close. Do not trap focus when the panel is not modal.

- [ ] **Step 4: Tighten headers without breaking the static site**

Keep the current CSP sources required by Next.js and add these headers where absent:

```js
{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
{ key: 'X-DNS-Prefetch-Control', value: 'off' },
```

Keep `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`. Do not add `Cross-Origin-Embedder-Policy`, which can break third-party image behavior.

- [ ] **Step 5: Align robots and sitemap with the single public homepage**

`public/sitemap.xml` contains only `https://yuanshowroom.cn/`. `robots.txt` allows `/`, points to that sitemap, and does not advertise Academy or policy paths.

- [ ] **Step 6: Run tests and static checks**

Run:

```bash
npm run test
npm run lint
npm run typecheck
```

Expected: all commands exit 0 and the Task 1 contracts are green.

- [ ] **Step 7: Commit foundations**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/home/section-hero.tsx src/components/home/site-navigation.tsx src/app/globals.css next.config.js public/robots.txt public/sitemap.xml tests/site-contracts.test.mjs
git commit -m "fix: harden website foundations"
```

---

### Task 3: Correct and Consolidate Public Content

**Files:**
- Modify: `src/data/home.ts`
- Modify only when data binding requires it: `src/components/home/section-about.tsx`
- Modify only when data binding requires it: `src/components/home/section-services.tsx`
- Modify only when data binding requires it: `src/components/home/section-brands.tsx`
- Modify only when data binding requires it: `src/components/home/section-showroom.tsx`
- Modify only when data binding requires it: `src/components/home/section-plus.tsx`
- Modify only when data binding requires it: `src/components/home/section-cta.tsx`
- Modify only when data binding requires it: `src/components/home/section-contact.tsx`
- Test: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: the existing exports from `src/data/home.ts` and the approved content boundary.
- Produces: the same export names and value shapes with corrected Chinese copy; components continue consuming those exports without embedding replacement business copy.

- [ ] **Step 1: Add content regression assertions before editing copy**

Add tests that lock the approved semantics and prohibit public policy language:

```js
test('homepage content preserves approved buyer semantics and private-data boundary', async () => {
  const data = await read('src/data/home.ts')
  assert.match(data, /title:\s*'合作品牌与买手'/)
  assert.match(data, /buyers:\s*\[/)
  assert.doesNotMatch(data, /合作渠道|订货政策|policy-template|policies\.json/)
})

test('homepage business copy avoids unsupported absolutes and placeholders', async () => {
  const data = await read('src/data/home.ts')
  assert.doesNotMatch(data, /第一|唯一|绝对|保证|100%|待补充|待完善|示例文案/i)
})
```

- [ ] **Step 2: Run the new tests to establish RED where unsupported wording exists**

Run: `npm run test`

Expected: unsupported absolute wording, if present, causes the second test to fail; buyer semantics and policy boundaries remain green.

- [ ] **Step 3: Edit only inaccurate, ambiguous, repetitive, or unprofessional copy**

Apply these rules to every string in `src/data/home.ts`:

- Keep product names, people names, brands, emails, address, dates, and existing list order unchanged unless a direct contradiction exists in the repository.
- Replace unsupported absolutes with descriptive wording; for example, replace “行业第一” with the verified capability it was intended to describe.
- Use `品牌合作` for brand-facing calls to action and `合作买手与买手店` for the buyer list.
- Keep service copy distinct: agency, market development, operations, marketing, retail/e-commerce, asset management, and investment should not repeat the same opening sentence.
- Keep Chinese punctuation and spacing consistent; retain official English names exactly.

- [ ] **Step 4: Keep business content in the data module**

If a section component contains long business copy, move that exact corrected string into the relevant `home.ts` export and render the field. Do not introduce a new global content abstraction or CMS.

- [ ] **Step 5: Run content and global tests**

Run:

```bash
npm run test
npm run typecheck
```

Expected: all tests pass and TypeScript exits 0.

- [ ] **Step 6: Commit content corrections**

```bash
git add src/data/home.ts src/components/home tests/site-contracts.test.mjs
git commit -m "fix: clarify website content"
```

Before committing, use `git diff --cached --name-only` and unstage any home component that has no content-binding change.

---

### Task 4: Apply the Approved Editorial Visual System

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/section-hero.tsx`
- Modify: `src/components/home/section-about.tsx`
- Modify: `src/components/home/section-bsi.tsx`
- Modify: `src/components/home/section-services.tsx`
- Modify: `src/components/home/section-brands.tsx`
- Modify: `src/components/home/section-showroom.tsx`
- Modify: `src/components/home/section-plus.tsx`
- Modify: `src/components/home/section-cta.tsx`
- Modify: `src/components/home/section-contact.tsx`
- Modify: `src/components/home/site-navigation.tsx`
- Test: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: unchanged content exports from Task 3 and the approved A direction.
- Produces: shared `.section-container`, `.section-heading`, `.label-text`, `.body-text`, focus, spacing, and reduced-motion behavior used consistently by homepage sections.

- [ ] **Step 1: Add a failing visual-system contract**

```js
test('homepage sections use the shared editorial layout primitives', async () => {
  const css = await read('src/app/globals.css')
  assert.match(css, /\.section-container/)
  assert.match(css, /\.section-heading/)
  assert.match(css, /\.label-text/)
  assert.match(css, /\.body-text/)
  const sections = (await filesUnder('src/components/home')).filter((file) => /section-.*\.tsx$/.test(file))
  for (const file of sections) {
    const source = await read(file)
    assert.doesNotMatch(source, /text-\[(?:0\.[0-6]|[4-9])rem\]/, `${file} contains an unreadable text size`)
  }
})
```

- [ ] **Step 2: Run the contract to verify RED**

Run: `npm run test`

Expected: FAIL on any section using text below 0.7rem or above the approved scale without a shared class.

- [ ] **Step 3: Define the editorial tokens in global CSS**

Use CSS custom properties for the restrained palette and shared rhythm:

```css
:root {
  --paper: #f5f4f1;
  --ink: #171717;
  --muted-ink: #626262;
  --hairline: #e4e1db;
  --accent: #9a7b4f;
}

@layer components {
  .section-container { @apply mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-20; }
  .section-heading { @apply text-[clamp(2rem,4vw,4.5rem)] font-light leading-[1.02] tracking-[-0.035em] text-neutral-950; }
  .label-text { @apply text-xs font-medium uppercase tracking-[0.18em] text-neutral-500; }
  .body-text { @apply max-w-[68ch] text-[0.95rem] leading-8 text-neutral-700 sm:text-base; }
}
```

- [ ] **Step 4: Apply consistent hierarchy section by section**

For each section, keep its content and behavior but replace isolated one-off container, heading, label, and body styles with the shared primitives. Alternate image-led and text-led rhythm without changing section order. Preserve the current warm-gray background and use black only for deliberate high-contrast sections.

- [ ] **Step 5: Make the hero follow the approved A composition**

Desktop uses a balanced text/image editorial grid; mobile stacks text before image. The primary headline stays readable without forced character-by-character line breaks. CTA controls use visible focus styles and at least 44px height.

- [ ] **Step 6: Run tests, lint, and type checking**

Run:

```bash
npm run test
npm run lint
npm run typecheck
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit the editorial system**

```bash
git add src/app/globals.css src/app/page.tsx src/components/home tests/site-contracts.test.mjs
git commit -m "feat: refine website editorial design"
```

---

### Task 5: Optimize Responsive Images and Runtime Performance

**Files:**
- Modify as required: `src/components/home/section-hero.tsx`
- Modify as required: `src/components/home/section-about.tsx`
- Modify as required: `src/components/home/section-bsi.tsx`
- Modify as required: `src/components/home/section-services.tsx`
- Modify as required: `src/components/home/section-showroom.tsx`
- Modify as required: `src/components/home/section-plus.tsx`
- Modify as required: `src/components/home/section-cta.tsx`
- Modify: `scripts/audit-assets.mjs`
- Modify: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: local images under `public/images/home/` and Next.js `Image`.
- Produces: explicit `sizes`, stable aspect ratios, one justified above-the-fold priority image, lazy noncritical images, and an asset report with no missing references.

- [ ] **Step 1: Extend the image contract before changing components**

Add assertions that every `Image` has `sizes` when using `fill`, and that no more than one homepage image uses `priority`:

```js
test('responsive images declare sizes and limit eager priority loading', async () => {
  const files = (await filesUnder('src/components/home')).filter((file) => file.endsWith('.tsx'))
  let priorityCount = 0
  for (const file of files) {
    const source = await read(file)
    priorityCount += (source.match(/\bpriority\b/g) ?? []).length
    for (const match of source.matchAll(/<Image\b[\s\S]*?\/>/g)) {
      if (/\bfill\b/.test(match[0])) assert.match(match[0], /\bsizes=/, `${file} fill image has no sizes`)
    }
  }
  assert.ok(priorityCount <= 1, `expected at most one priority image, found ${priorityCount}`)
})
```

- [ ] **Step 2: Run tests to verify RED where image hints are missing**

Run: `npm run test`

Expected: FAIL for each fill image missing `sizes` or for excess priority usage.

- [ ] **Step 3: Add accurate responsive image hints**

Use `priority` only for the actual LCP hero image. Use `sizes="100vw"` for full-bleed images and breakpoint-specific sizes such as `sizes="(min-width: 1024px) 50vw, 100vw"` for two-column images. Keep fixed aspect-ratio wrappers to prevent layout shift.

- [ ] **Step 4: Audit asset references without deleting files**

Run: `node scripts/audit-assets.mjs`

Expected: `missing` is empty. Review `unused` and `duplicates`; do not pass `--remove-unused` during this task. Record large assets over 500 KB and optimize only when visual comparison confirms no unacceptable quality loss.

- [ ] **Step 5: Re-run performance contracts and production build**

Run:

```bash
npm run test
npm run build
```

Expected: tests pass, Next.js compiles successfully, and static routes `/` and `/_not-found` are generated.

- [ ] **Step 6: Commit image and performance changes**

```bash
git add src/components/home scripts/audit-assets.mjs tests/site-contracts.test.mjs
git commit -m "perf: optimize website media delivery"
```

---

### Task 6: Add Reproducible Deployment and Operations Documentation

**Files:**
- Create: `scripts/deploy-production.sh`
- Create: `DEPLOY.md`
- Modify: `.gitignore`
- Modify: `README.md`
- Test: `tests/site-contracts.test.mjs`

**Interfaces:**
- Consumes: a locally verified `.next/BUILD_ID`, SSH key authentication for `root@120.79.162.27`, and the existing remote `/var/www/yuan-website`.
- Produces: a deployment script that backs up `.next`, transfers a tar archive, restarts only `yuan-website`, verifies port 3002 and HTTPS, and rolls back on failure.

- [ ] **Step 1: Add deployment-safety contracts**

```js
test('deployment tooling excludes secrets and never targets academy', async () => {
  const script = await read('scripts/deploy-production.sh')
  assert.match(script, /REMOTE_DIR="\/var\/www\/yuan-website"/)
  assert.match(script, /PM2_NAME="yuan-website"/)
  assert.match(script, /PORT="3002"/)
  assert.doesNotMatch(script, /yuan-academy|3001|\.env|private\/policies/)
  const ignore = await read('.gitignore')
  for (const entry of ['.env*', '.superpowers/', '*.pem', '*.key']) assert.match(ignore, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})
```

- [ ] **Step 2: Run tests to verify RED**

Run: `npm run test`

Expected: FAIL because the deployment script and required ignore entries do not exist yet.

- [ ] **Step 3: Write a fail-fast deployment script**

The script must:

1. Set `SERVER="root@120.79.162.27"`, `REMOTE_DIR="/var/www/yuan-website"`, `PM2_NAME="yuan-website"`, and `PORT="3002"`.
2. Refuse to run unless the current branch is `main`, `git status --porcelain` is empty, and `HEAD` equals `origin/main`.
3. Run `npm run check` before packaging.
4. Package `.next`, `public`, `package.json`, `package-lock.json`, `next.config.js`, and `ecosystem.config.js`; explicitly exclude `.env*`, `.git`, `.superpowers`, tests, docs, and source maps.
5. Copy the archive to a unique `/tmp/yuan-website-<BUILD_ID>.tar.gz`.
6. On the server, record the previous BUILD_ID, move `.next` to `.next.backup-<timestamp>`, extract into a staging directory, and install the new artifacts without touching `/var/www/yuan-academy`.
7. Restart only `yuan-website` through PM2.
8. Verify `http://127.0.0.1:3002/` and `https://yuanshowroom.cn/` both return 200.
9. Restore the previous `.next` and restart the original process if either check fails.

Use `trap` to remove the local archive. Never embed a password, private key, token, or environment value.

- [ ] **Step 4: Document deployment, rollback, and Nginx boundaries**

`DEPLOY.md` must record the target values, preflight checks, package contents, PM2 verification, HTTPS verification, rollback command, and the rule that the Academy Nginx block and process are out of scope. It must reference secret names only, never values.

- [ ] **Step 5: Harden Git ignore rules**

Add:

```gitignore
.env*
!.env.example
.superpowers/
*.pem
*.key
deploy-pkg/
```

- [ ] **Step 6: Update README operations links**

Link to `DEPLOY.md`, the approved design spec, and this implementation plan. State that ordering policies and internal data belong only to Academy private storage.

- [ ] **Step 7: Run deployment-tool tests and shell syntax validation**

Run:

```bash
npm run test
bash -n scripts/deploy-production.sh
git diff --check
```

Expected: tests pass, shell syntax exits 0, and whitespace validation exits 0.

- [ ] **Step 8: Commit operations tooling**

```bash
git add .gitignore README.md DEPLOY.md scripts/deploy-production.sh tests/site-contracts.test.mjs
git commit -m "chore: add safe website deployment"
```

---

### Task 7: Full Verification, Browser QA, Publish, and Production Rollout

**Files:**
- Create: `docs/WEBSITE_VERIFICATION.md`
- Modify only for verified defects: files identified by the failing check or browser reproduction.

**Interfaces:**
- Consumes: Tasks 1–6, production server access, and the deploy script.
- Produces: reproducible verification evidence, a pushed branch, a reviewed merge to `main`, deployed BUILD_ID, and rollback record.

- [ ] **Step 1: Run the complete automated verification set**

Run:

```bash
npm run test
npm run lint
npm run typecheck
npm run build
node scripts/audit-assets.mjs
git diff --check
```

Expected: every command exits 0; tests report zero failures; asset audit reports `missing: []`; Next.js generates `/` and `/_not-found`.

- [ ] **Step 2: Start the production build locally**

Run: `npm run start -- -p 3102`

Expected: Next.js reports ready on port 3102. Keep this process running only for the browser QA session.

- [ ] **Step 3: Perform browser QA at four viewport widths**

Inspect widths 1440, 1024, 390, and 320 pixels. At every width verify:

- Header and mobile navigation open/close correctly.
- Esc closes the mobile menu and focus returns to the trigger.
- No horizontal scroll or clipped headings exist.
- Every homepage section renders in order with correct copy and image focal points.
- CTA and email links resolve correctly.
- 404 provides a visible return-home link.
- Browser console contains no errors and failed network requests.
- Reduced-motion emulation leaves all content visible.

Capture screenshots for local review only; store them under `.superpowers/` so they remain excluded from Git.

- [ ] **Step 4: Record verification evidence**

Create `docs/WEBSITE_VERIFICATION.md` containing the date, commit, exact commands, pass counts, tested viewport widths, browser findings, known limitations, server target, and rollback procedure. Do not include secrets, cookies, private IP credentials, or local visual-companion URLs.

- [ ] **Step 5: Scan the complete branch for sensitive or internal files**

Run:

```bash
git ls-files | rg '(\.env|\.pem$|\.key$|\.superpowers|polic(?:y|ies)|订货政策|private)' && exit 1 || true
git grep -n -E 'BEGIN (OPENSSH|RSA|EC) PRIVATE KEY|JWT_SECRET=|API_KEY=|SSH 密码' -- ':!docs/superpowers/plans/*'
```

Expected: the tracked-file scan returns no forbidden paths. The content scan returns no credential values; documentation may name environment variables without assigning real values.

- [ ] **Step 6: Commit verification documentation**

```bash
git add docs/WEBSITE_VERIFICATION.md
git commit -m "docs: record website verification"
```

- [ ] **Step 7: Push the feature branch and open a draft PR**

Push `agent/website-audit-editorial-deployment` to `origin`. The PR body must summarize content corrections, technical fixes, visual direction, checks, deployment target, risk controls, and explicitly state that Academy is unchanged.

- [ ] **Step 8: Review and merge to main**

Review the complete PR diff, confirm CI success, and merge only the reviewed branch. Update local `main` by fast-forward; do not stage or commit unrelated files.

- [ ] **Step 9: Capture pre-deployment production state**

Run over SSH:

```bash
cd /var/www/yuan-website
printf 'previous_build=' && cat .next/BUILD_ID
pm2 describe yuan-website
curl -sS -o /dev/null -w 'local=%{http_code}\n' http://127.0.0.1:3002/
curl -sS -o /dev/null -w 'https=%{http_code}\n' https://yuanshowroom.cn/
```

Expected: PM2 is online and both status codes are 200 before deployment.

- [ ] **Step 10: Deploy the exact reviewed main commit**

Run: `bash scripts/deploy-production.sh`

Expected: the script prints the new BUILD_ID, PM2 online state, local 200, HTTPS 200, and successful completion without touching Academy.

- [ ] **Step 11: Verify production behavior and headers**

Run:

```bash
curl -fsSI https://yuanshowroom.cn/
curl -fsSI https://www.yuanshowroom.cn/
```

Expected: 200 responses, canonical host behavior as configured, HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, and no `X-Powered-By` header. Repeat the 390px browser smoke test against production.

- [ ] **Step 12: Verify Academy isolation**

Run:

```bash
ssh root@120.79.162.27 'pm2 describe yuan-academy >/dev/null && test "$(curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:3001/login)" = 200'
```

Expected: exit 0; Academy remains online on port 3001.

- [ ] **Step 13: Complete the handoff**

Report repository URLs, merge commit, deployed BUILD_ID, automated results, viewport results, security scan result, production checks, Academy isolation check, and rollback path. If deployment rolled back, report the failed condition and restored BUILD_ID instead of claiming completion.
