import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createTunnelLayout,
  getTunnelBudget,
  recycleTunnelDepth,
} from '../src/components/showroom/product-tunnel-model.mjs'

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
