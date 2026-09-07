import assert from 'node:assert/strict'
import test from 'node:test'

import { shouldBypassImageOptimization } from '../src/lib/image-delivery.ts'

test('large local editorial images bypass runtime optimization', () => {
  assert.equal(shouldBypassImageOptimization('/images/showroom/now/lookbook/cutouts/look-01.png'), true)
  assert.equal(shouldBypassImageOptimization('/images/editorial/spatial-studies/project-01.webp'), true)
  assert.equal(shouldBypassImageOptimization('/images/showroom/campaign.jpg?version=2'), true)
})

test('non-editorial assets keep normal image delivery', () => {
  assert.equal(shouldBypassImageOptimization('/icons/arrow.svg'), false)
  assert.equal(shouldBypassImageOptimization('https://cdn.example.com/campaign.webp'), false)
})
