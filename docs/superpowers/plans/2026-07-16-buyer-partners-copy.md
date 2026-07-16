# Buyer Partners Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the homepage brand section so its partner list is described as buyers and buyer stores, not cooperation channels.

**Architecture:** Keep the existing data-driven section and visual markup. Rename the data property from `channels` to `buyers`, update the two visible labels, and protect the wording with the existing Node contract test suite.

**Tech Stack:** Next.js, React, TypeScript, Node built-in test runner.

## Global Constraints

- Main title must be `合作品牌与买手`.
- Partner-list label must be `合作买手与买手店`.
- Data field must be `buyers`, not `channels`.
- Existing names, ordering, layout, styles, and unrelated channel-service copy must remain unchanged.

---

### Task 1: Correct Buyer Partner Semantics

**Files:**
- Modify: `tests/site-contracts.test.mjs`
- Modify: `src/data/home.ts:127-155`
- Modify: `src/components/home/section-brands.tsx:54-66`

**Interfaces:**
- `brands.buyers: string[]` replaces `brands.channels: string[]`.
- `BrandsSection` consumes `brands.buyers` and renders the approved labels.

- [ ] **Step 1: Add the failing contract test**

Append:

```js
test('brand section presents listed retailers as buyer partners', async () => {
  const data = await read('src/data/home.ts')
  const section = await read('src/components/home/section-brands.tsx')
  assert.match(data, /title: '合作品牌与买手'/)
  assert.match(data, /buyers: \[/)
  assert.doesNotMatch(data, /channels: \[/)
  assert.match(section, /合作买手与买手店/)
  assert.match(section, /brands\.buyers/)
  assert.doesNotMatch(section, /合作渠道|brands\.channels/)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: the new test fails because the current source contains `合作品牌与渠道`, `channels`, `合作渠道`, and `brands.channels`.

- [ ] **Step 3: Apply the minimal implementation**

In `src/data/home.ts` change only:

```ts
title: '合作品牌与买手',
buyers: [
```

In `src/components/home/section-brands.tsx` change only:

```tsx
<p className="text-[0.68rem] tracking-[0.2em] text-neutral-400 uppercase mb-6">合作买手与买手店</p>
{brands.buyers.map((buyer, i) => (
  <span key={buyer}>
    {buyer}
    {i < brands.buyers.length - 1 && <span>·</span>}
  </span>
))}
```

Retain the existing class names on both spans exactly.

- [ ] **Step 4: Run verification and verify GREEN**

Run:

```bash
npm test
rg -n "合作渠道|brands\.channels|channels:" src/data/home.ts src/components/home/section-brands.tsx
```

Expected: all tests pass and `rg` returns no matches.

- [ ] **Step 5: Run available project checks**

Run `npm run typecheck`. Attempt `npm run build` only after confirming `node_modules/next/package.json` exists; otherwise report the existing incomplete dependency installation without changing package versions or lockfiles.

- [ ] **Step 6: Record non-Git handoff**

This project has no `.git` directory. Report the exact modified files instead of committing.
