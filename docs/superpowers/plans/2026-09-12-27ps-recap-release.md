# 27PS Recap Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the approved 27PS recap with an immersive video opening, streamlined editorial flow, full brand collection image, and an archival poster link.

**Architecture:** Keep the special 27PS presentation inside `RecapEditorial`. The poster remains an existing public asset but moves out of the primary reading flow into a small archive link after the editorial media. Production deployment uses the repository release script with staging, rollback, and public health checks.

**Tech Stack:** Next.js App Router, React, TypeScript, global CSS, Node test runner, existing deployment shell scripts.

**Spec:** Approved in the current conversation: video hero → seasonal introduction → brand collection → showroom imagery → poster archive link.

## Global Constraints

- Preserve bilingual routes and existing recap navigation.
- Preserve the supplied brand collection without cropping or distortion.
- Autoplay video must remain muted, looping, inline, and free of visible controls.
- Every production deployment must stage independently, retain rollback, health-check locally and publicly, and automatically restore on failure.
- Do not modify `yuan-academy`.

---

### Task 1: Streamline the 27PS editorial sequence

**Files:**
- Modify: `tests/showroom-ui.test.mjs`
- Modify: `src/components/showroom/recap-editorial.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing `RecapEditorial` props and `recap.poster`.
- Produces: `.recap-editorial__poster-archive` link after the main editorial media.

- [x] **Step 1: Write a failing UI contract test**

Assert that the primary poster block is absent and the archive link appears after the showroom section.

- [x] **Step 2: Verify the test fails**

Run `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test --test-name-pattern='27PS recap' tests/showroom-ui.test.mjs` and confirm the old poster block violates the new contract.

- [x] **Step 3: Implement the approved reading flow**

Remove the large poster column, center the introduction at a readable measure, and add the small archive link after the showroom section.

- [x] **Step 4: Verify the focused tests and types**

Run the focused Node tests, `npm run typecheck`, and `git diff --check`.

### Task 2: Publish safely

**Files:**
- Use: `scripts/deploy-production.sh`

**Interfaces:**
- Consumes: the verified worktree and its generated media assets.
- Produces: a new timestamped production release with rollback protection.

- [x] **Step 1: Run the release gate**

Run `npm run check:fast` because this is a scoped presentation and static-media release.

- [ ] **Step 2: Commit and push the exact release**

Commit only the approved homepage logo refinement, 27PS recap changes, tests, plan, and supplied media.

- [ ] **Step 3: Deploy through the production release script**

Run `npm run deploy:fast`; do not manually overwrite the live directory.

- [ ] **Step 4: Verify production**

Confirm the public English and Chinese recap routes, range delivery for the video, collection image delivery, and final deployed commit.
