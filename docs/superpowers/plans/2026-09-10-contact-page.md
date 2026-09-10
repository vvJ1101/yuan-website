# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved bilingual CONTACT page and navigation entry with an interactive contact directory and a reserved backend submission contract.

**Architecture:** Keep localized contact content in a focused module, render the route through the existing `[locale]` app structure, and submit `FormData` from one client component to a reserved same-origin endpoint. The endpoint validates the request but returns a clear not-configured response until persistent storage is implemented.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-09-10-contact-page-design.md`

## Global Constraints

- Keep `CONTACT`, brand names, project names, and event themes in English in both locales.
- Use only `#fff` for the page content background; no warm or off-white surface.
- Preserve the existing header, logo, fonts, and navigation behavior.
- Fixed acceptance targets are desktop and landscape iPad.
- Do not add persistent storage, outbound email, or a new dependency in this release.

---

### Task 1: Contact content and reserved submission contract

**Files:**
- Create: `src/data/contact.ts`
- Create: `src/app/api/inquiries/route.ts`
- Test: `tests/contact.test.mjs`

**Interfaces:**
- Produces: `contactMethods`, `contactLocations`, and a validated `/api/inquiries` POST contract.

- [ ] **Step 1: Write the failing test**

Add tests that assert the three approved email mappings, required field validation, and the explicit not-configured response for a valid submission.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/contact.test.mjs`

Expected: FAIL because `src/data/contact.ts` and `src/app/api/inquiries/route.ts` do not exist.

- [ ] **Step 3: Write minimal implementation**

Create immutable localized contact records and a route that validates `FormData`, returns `400 INVALID_INQUIRY` for incomplete input, and returns `501 INQUIRY_STORAGE_NOT_CONFIGURED` for valid input without saving it.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/contact.test.mjs`

Expected: PASS.

### Task 2: Route, navigation, and interactive page

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/showroom/contact-page.tsx`
- Modify: `src/components/showroom/site-header.tsx`

**Interfaces:**
- Consumes: `contactMethods`, `contactLocations`, and the `/api/inquiries` contract from Task 1.
- Produces: locale-aware `/contact` and `/en/contact` pages.

- [ ] **Step 1: Extend navigation coverage**

Add assertions to `tests/showroom-routing.test.mjs` confirming `/contact` and `/en/contact` select the CONTACT navigation item.

- [ ] **Step 2: Run the routing test to verify the new case fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/showroom-routing.test.mjs`

Expected: FAIL until the CONTACT entry and route are wired.

- [ ] **Step 3: Implement the route and client component**

Create metadata and locale validation in the route. Render the approved directory, form, locations, and QR placeholder. On selection, synchronize the contact method and inquiry-type select. On submit, send `FormData` to `/api/inquiries` and surface pending, unavailable, and error states without email fallback.

- [ ] **Step 4: Add CONTACT to the existing header**

Append `{ label: 'CONTACT', href: 'contact' }` to the current English-only navigation list.

### Task 3: Editorial styling and responsive verification

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: class names rendered by `ContactPage`.
- Produces: the approved white, border-light desktop and landscape-iPad composition plus a stacked mobile fallback.

- [ ] **Step 1: Add scoped contact-page styling**

Implement the 38/62 split, restrained serif display heading, quiet selectable rows, baseline-only form fields, solid rectangular submit action, and a three-part location strip without vertical dividers.

- [ ] **Step 2: Add responsive rules**

Keep the split through landscape iPad, reduce nonessential choice metadata as width narrows, and stack the page below mobile width without horizontal overflow.

- [ ] **Step 3: Run targeted verification**

Run: `npm test && npm run lint && npm run typecheck`

Expected: all commands pass. A production build is not required because this is a local, low-risk preview and no routing configuration or dependency changed.

- [ ] **Step 4: Review locally**

Open `/en/contact` at desktop and landscape iPad dimensions and confirm selection, required-field validation, mailto construction, white backgrounds, and the absence of overlap or clipping.
