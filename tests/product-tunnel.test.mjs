import test from 'node:test'
import assert from 'node:assert/strict'
import * as tunnelModel from '../src/components/showroom/product-tunnel-model.mjs'
import { productTunnelImages } from '../src/components/showroom/product-tunnel-images.ts'
import { existsSync } from 'node:fs'
import {
  createTunnelLayout,
  getTunnelBudget,
  recycleTunnelDepth,
} from '../src/components/showroom/product-tunnel-model.mjs'

test('image pool covers every desktop slot with distinct existing assets', () => {
  assert.ok(productTunnelImages.length >= getTunnelBudget(1440, false).count)
  assert.equal(new Set(productTunnelImages).size, productTunnelImages.length)
  for (const path of productTunnelImages) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path)
})

test('slot selection never repeats assets, even with a small or duplicated pool', () => {
  assert.equal(typeof tunnelModel.selectTunnelImages, 'function')
  for (const count of [28, 40, 52]) {
    const selected = tunnelModel.selectTunnelImages(productTunnelImages, count, () => 0.5)
    assert.equal(selected.length, count)
    assert.equal(new Set(selected).size, count)
  }
  const selected = tunnelModel.selectTunnelImages(['a', 'a', 'b'], 52, () => 0.5)
  assert.equal(selected.length, 2)
  assert.equal(new Set(selected).size, 2)
})

test('depth staging retains distant, middle and near layers while queuing unseen assets', () => {
  assert.equal(typeof tunnelModel.getTunnelFrame, 'function')
  const frames = Array.from({ length: 52 }, (_, i) => tunnelModel.getTunnelFrame(i / 52))
  assert.equal(frames.length, 52)
  assert.ok(frames.some(frame => frame.opacity === 0))
  assert.ok(frames.some(frame => frame.opacity > 0 && frame.z < -35))
  assert.ok(frames.some(frame => frame.opacity === 1 && frame.z >= -35 && frame.z < -15))
  assert.ok(frames.some(frame => frame.opacity === 1 && frame.z >= -15))
  assert.ok(tunnelModel.getTunnelFrame(0.4).opacity > 0)
  assert.equal(tunnelModel.getTunnelFrame(0.7).opacity, 1)
})

test('forward depth motion produces perspective acceleration and loops outside the visible tunnel', () => {
  assert.equal(typeof tunnelModel.getTunnelFrame, 'function')
  const frame = tunnelModel.getTunnelFrame
  assert.ok(Math.abs((frame(0.65).z - frame(0.6).z) - (frame(0.95).z - frame(0.9).z)) < 1e-10)
  const projectedScale = p => 1 / (5 - frame(p).z)
  assert.ok(projectedScale(0.85) - projectedScale(0.8) > projectedScale(0.65) - projectedScale(0.6))
  assert.ok(frame(0.1).opacity > 0 && frame(0.1).opacity < frame(0.3).opacity)
  assert.ok(frame(0.999).z > 1)
  assert.deepEqual(frame(1), frame(0))
})

test('tunnel layout follows the golden-angle spiral with two-unit depth spacing', () => {
  const layout = createTunnelLayout(3, { radius: 10, spacing: 2, tailZ: -78 })

  assert.deepEqual(layout[0], { angle: 0, x: 10, y: 0, z: -78 })
  assert.equal(layout[1].z, -76)
  assert.equal(layout[2].z, -74)
  assert.ok(Math.abs(Math.hypot(layout[1].x, layout[1].y) - 10) < 1e-10)
  assert.ok(Math.abs(layout[1].angle - Math.PI * (3 - Math.sqrt(5))) < 1e-10)
})

test('tunnel depth recycles a plane to the tail after it crosses the camera', () => {
  assert.equal(recycleTunnelDepth(4.9, 10, 0.02, 5, -78), -78)
  assert.equal(recycleTunnelDepth(-10, 10, 0.02, 5, -78), -9.8)
})

test('tunnel budget lowers object count and DPR for narrower viewports', () => {
  assert.deepEqual(getTunnelBudget(1440, false), { count: 52, dpr: 2 })
  assert.deepEqual(getTunnelBudget(1024, false), { count: 40, dpr: 1.5 })
  assert.deepEqual(getTunnelBudget(390, false), { count: 28, dpr: 1.25 })
  assert.deepEqual(getTunnelBudget(1440, true), { count: 1, dpr: 1 })
})
