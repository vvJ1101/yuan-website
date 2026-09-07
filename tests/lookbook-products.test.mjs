import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveLookProducts } from '../src/lib/lookbook-products.ts'
import { buildLookbookStageSlots, buildLookbookStageWings, getLookbookCutoutPath, normalizeLookIndex } from '../src/lib/lookbook-index.ts'
import * as lookbookIndex from '../src/lib/lookbook-index.ts'

test('lookbook index wraps selection safely', () => {
  assert.equal(normalizeLookIndex(0, 5), 0)
  assert.equal(normalizeLookIndex(5, 5), 0)
  assert.equal(normalizeLookIndex(-1, 5), 4)
  assert.equal(normalizeLookIndex(3, 0), 0)
})

test('lookbook stage keeps one stable selectable slot per look', () => {
  const slots = buildLookbookStageSlots(5, 8)

  assert.deepEqual(slots, [0, 1, 2, 3, 4])
  assert.equal(new Set(slots).size, slots.length)
  assert.deepEqual(buildLookbookStageSlots(11, 8), [0, 1, 2, 3, 4, 5, 6, 7])
  assert.deepEqual(buildLookbookStageSlots(0, 8), [])
})

test('mobile lookbook lead keeps the selected look in focus and the remaining looks in a stable strip', () => {
  assert.equal(typeof lookbookIndex.buildLookbookLeadStrip, 'function')
  if (typeof lookbookIndex.buildLookbookLeadStrip !== 'function') return

  assert.deepEqual(lookbookIndex.buildLookbookLeadStrip(5, 0), [1, 2, 3, 4])
  assert.deepEqual(lookbookIndex.buildLookbookLeadStrip(5, 2), [0, 1, 3, 4])
  assert.deepEqual(lookbookIndex.buildLookbookLeadStrip(3, 1), [0, 2])
})

test('eleven selectable looks stay in two wings outside the central runway', () => {
  const wings = buildLookbookStageWings(11)

  assert.deepEqual(wings.left, [0, 1, 2, 3, 4, 5])
  assert.deepEqual(wings.right, [6, 7, 8, 9, 10])
  assert.deepEqual([...wings.left, ...wings.right], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('lookbook stage resolves a transparent PNG cutout for the central portrait', () => {
  assert.equal(
    getLookbookCutoutPath('/images/showroom/now/lookbook/womenswear-upload-10.webp'),
    '/images/showroom/now/lookbook/cutouts/womenswear-upload-10.png',
  )
})

test('lookbook index opens on the approved second white look when it is available', () => {
  assert.equal(typeof lookbookIndex.getLookbookIndexInitialSelection, 'function')
  if (typeof lookbookIndex.getLookbookIndexInitialSelection !== 'function') return

  assert.equal(lookbookIndex.getLookbookIndexInitialSelection(11), 1)
  assert.equal(lookbookIndex.getLookbookIndexInitialSelection(1), 0)
  assert.equal(lookbookIndex.getLookbookIndexInitialSelection(0), 0)
})

test('lookbook index distinguishes a supplied detail crop from full-body looks', () => {
  assert.equal(typeof lookbookIndex.getLookbookStageMediaKind, 'function')
  if (typeof lookbookIndex.getLookbookStageMediaKind !== 'function') return

  assert.equal(lookbookIndex.getLookbookStageMediaKind('/images/showroom/now/lookbook/womenswear-upload-12.webp'), 'detail')
  assert.equal(lookbookIndex.getLookbookStageMediaKind('/images/showroom/now/lookbook/womenswear-upload-9.webp'), 'full')
})

test('campaign reel keeps navigation direction correct across the loop boundary', () => {
  assert.equal(typeof lookbookIndex.getCampaignReelDirection, 'function')
  if (typeof lookbookIndex.getCampaignReelDirection !== 'function') return

  assert.equal(lookbookIndex.getCampaignReelDirection(0, 1, 6), 'forward')
  assert.equal(lookbookIndex.getCampaignReelDirection(5, 0, 6), 'forward')
  assert.equal(lookbookIndex.getCampaignReelDirection(0, 5, 6), 'backward')
  assert.equal(lookbookIndex.getCampaignReelDirection(4, 2, 6), 'backward')
})

test('campaign reel maps left and right hero taps to adjacent images', () => {
  assert.equal(typeof lookbookIndex.getCampaignReelTapTarget, 'function')
  if (typeof lookbookIndex.getCampaignReelTapTarget !== 'function') return

  assert.equal(lookbookIndex.getCampaignReelTapTarget(120, 100, 400, 0, 6), 5)
  assert.equal(lookbookIndex.getCampaignReelTapTarget(420, 100, 400, 0, 6), 1)
  assert.equal(lookbookIndex.getCampaignReelTapTarget(420, 100, 400, 5, 6), 0)
})

test('lookbook chapters keep bilingual season and count context visible', () => {
  assert.equal(typeof lookbookIndex.getLookbookChapterLabel, 'function')
  if (typeof lookbookIndex.getLookbookChapterLabel !== 'function') return
  assert.equal(lookbookIndex.getLookbookChapterLabel('campaign', 'en', 'SS 2027', 11), 'CAMPAIGN · SS 2027')
  assert.equal(lookbookIndex.getLookbookChapterLabel('campaign', 'cn', 'SS 2027', 11), '视觉大片 · SS 2027')
  assert.equal(lookbookIndex.getLookbookChapterLabel('index', 'en', 'SS 2027', 11), 'LOOK INDEX · 11 LOOKS')
  assert.equal(lookbookIndex.getLookbookChapterLabel('index', 'cn', 'SS 2027', 11), '造型索引 · 11 LOOKS')
})

const dress = { id: 'dress', image: '/dress.webp', category: 'dress', name: { cn: '连衣裙', en: 'Dress' } }
const shoes = { id: 'shoes', image: '/shoes.webp', category: 'shoes', name: { cn: '鞋履', en: 'Shoes' } }
const catalog = [dress, shoes]

test('unlinked looks and missing product records produce no product sidebar', () => {
  assert.deepEqual(resolveLookProducts({ image: '/look.webp' }, catalog), [])
  assert.deepEqual(resolveLookProducts({ image: '/look.webp', productIds: ['missing'] }, catalog), [])
  assert.deepEqual(resolveLookProducts({ image: '/look.webp', productIds: ['dress'] }), [])
})

test('links preserve editorial order, exclude missing images and deduplicate products', () => {
  const look = { image: '/look.webp', productIds: ['shoes', 'missing', 'dress', 'shoes', 'empty'] }
  assert.deepEqual(resolveLookProducts(look, [...catalog, { ...dress, id: 'empty', image: '' }]), [shoes, dress])
  assert.deepEqual(look.productIds, ['shoes', 'missing', 'dress', 'shoes', 'empty'])
})

test('the same catalog item can be shared without leaking unrelated products between looks', () => {
  const first = resolveLookProducts({ image: '/one.webp', productIds: ['dress', 'shoes'] }, catalog)
  const second = resolveLookProducts({ image: '/two.webp', productIds: ['shoes'] }, catalog)
  assert.deepEqual(first, [dress, shoes])
  assert.deepEqual(second, [shoes])
  assert.equal(first[1], second[0])
})
