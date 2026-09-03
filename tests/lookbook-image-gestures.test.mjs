import test from 'node:test'
import assert from 'node:assert/strict'
import { clampView, pinchView, swipeDirection } from '../src/lib/lookbook-image-gestures.ts'

test('zoom and panning stay bounded and zooming out recenters the image', () => {
  assert.deepEqual(clampView({ scale: 8, x: 900, y: -900 }, 400, 600), { scale: 3, x: 400, y: -600 })
  assert.deepEqual(clampView({ scale: 0.4, x: 20, y: 30 }, 400, 600), { scale: 1, x: 0, y: 0 })
})

test('pinch keeps the subject beneath the fingers while scaling and translating', () => {
  const view = pinchView({ scale: 1, x: 0, y: 0 }, { x: 50, y: 0 }, { x: 70, y: 20 }, 100, 200, 400, 600)
  assert.deepEqual(view, { scale: 2, x: -30, y: 20 })
  assert.equal(pinchView({ scale: 1, x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, 0, 100, 400, 600).scale, 1)
})

test('only deliberate horizontal gestures at normal scale change looks', () => {
  assert.equal(swipeDirection(-90, 10, 1, false), 1)
  assert.equal(swipeDirection(90, 10, 1, false), -1)
  for (const args of [[20, 0, 1, false], [90, 100, 1, false], [90, 0, 2, false], [90, 0, 1, true]]) {
    assert.equal(swipeDirection(...args), 0)
  }
})
