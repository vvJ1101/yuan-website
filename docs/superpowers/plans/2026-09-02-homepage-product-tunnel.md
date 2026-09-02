# Homepage Product Tunnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing homepage collage with a one-viewport Three.js fashion image tunnel and the same English statement on both locale routes while preserving the current header.

**Architecture:** Keep the route and header intact. A focused `ProductTunnel` client component owns rendering and interaction, pure helpers own layout and device budgets, and a centralized image manifest supplies existing showroom assets. The component uses a Three.js main-thread renderer with explicit cleanup and a reduced-motion/static fallback; Worker rendering remains a later optimization only if measured performance requires it.

**Tech Stack:** Next.js 16, React 19, TypeScript, Three.js, CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-09-02-homepage-product-tunnel-design.md`

## Global Constraints

- Preserve the existing black header and navigation behavior.
- The only homepage statement is `Connecting creativity, markets and the world.` on both locale routes.
- The cover occupies exactly the viewport below the header and has no vertical content continuation in this phase.
- Reuse existing authorized showroom images and existing typography/color tokens.
- Do not add GSAP, ScrollTrigger, CMS, routes, or unrelated refactors.
- Respect `prefers-reduced-motion`, prevent horizontal overflow, and clean up all WebGL resources and listeners.

---

### Task 1: Tunnel layout model and asset manifest

**Files:**
- Create: `src/components/showroom/product-tunnel-model.mjs`
- Create: `src/components/showroom/product-tunnel-images.ts`
- Test: `tests/product-tunnel.test.mjs`

**Interfaces:**
- Produces: `GOLDEN_ANGLE`, `createTunnelLayout(count, options)`, `recycleTunnelDepth(z, speed, delta, nearZ, tailZ)`, `getTunnelBudget(width, reducedMotion)`.
- Produces: `productTunnelImages: readonly string[]` containing existing public asset URLs.

- [ ] Write tests asserting golden-angle placement, two-unit depth spacing, deterministic depth recycling, and responsive/reduced-motion budgets.
- [ ] Run `node --test tests/product-tunnel.test.mjs` and confirm it fails because the model does not exist.
- [ ] Implement the minimal pure model and curated 50-image manifest.
- [ ] Re-run the targeted test and confirm it passes.

### Task 2: Three.js tunnel renderer

**Files:**
- Create: `src/components/showroom/product-tunnel.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: model helpers and `productTunnelImages`.
- Produces: `ProductTunnel`, an aria-hidden visual canvas with wheel/touch acceleration, responsive object budgets, exponential startup deceleration, white fog, texture aspect-ratio scaling, resize handling, context-loss handling, and cleanup.

- [ ] Install only `three` and its TypeScript declarations if required by the installed release.
- [ ] Implement the renderer with `PlaneGeometry`, transparent `MeshBasicMaterial`, `depthWrite: false`, `Fog(0xffffff, 0, 78)`, camera z 5/fov 45, DPR caps, lazy texture loading, and recycling through the pure model.
- [ ] Add a static image fallback for reduced motion or WebGL failure and release geometries, materials, textures, renderer, animation frame, and listeners on teardown.
- [ ] Run the targeted test and TypeScript validation for the new component.

### Task 3: Homepage composition and responsive styling

**Files:**
- Modify: `src/components/showroom/homepage-experience.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `ProductTunnel`.
- Produces: a semantic one-viewport homepage with stable centered H1 copy and unchanged site header.

- [ ] Replace the horizontal gallery, giant wordmark, clock/location, and scroll cue with `ProductTunnel` and the exact English H1.
- [ ] Replace obsolete homepage-specific CSS with a white full-viewport stage, central quiet zone, responsive headline sizing, canvas/fallback layers, and reduced-motion rules using existing tokens and breakpoints.
- [ ] Confirm wheel/touch events boost the animation without scrolling the document and that both `/cn` and `/en` render identical sentence copy.
- [ ] Run the targeted test, lint the affected files, and run typecheck.

### Task 4: Visual and quality verification

**Files:**
- Modify only files required to correct verified defects.

**Interfaces:**
- Consumes: completed homepage implementation.
- Produces: verified desktop, iPad, and mobile layouts with no overflow or obscured headline.

- [ ] Start the local app and capture desktop, iPad landscape, and mobile screenshots.
- [ ] Verify the header is unchanged, the English statement stays legible, the tunnel fills the viewport, imagery preserves aspect ratio, and there is no page scroll or horizontal overflow.
- [ ] Run the Impeccable detector once against the changed UI files and fix actionable issues.
- [ ] Run `npm run test`, affected lint/typecheck, and `git diff --check`; do not run a production build until deployment is requested.
