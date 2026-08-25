import test from 'node:test'
import assert from 'node:assert/strict'

import { isNavigationItemActive, localePath, switchLocalePath } from '../src/lib/showroom-routing.ts'

test('Chinese public URLs have no locale prefix while English URLs keep /en', () => {
  assert.equal(localePath('cn', '/'), '/')
  assert.equal(localePath('cn', '/now/lookbook/le17septembre'), '/now/lookbook/le17septembre')
  assert.equal(localePath('en', '/'), '/en')
  assert.equal(localePath('en', '/now/lookbook/le17septembre'), '/en/now/lookbook/le17septembre')
})

test('language switching preserves the current deep page', () => {
  assert.equal(switchLocalePath('/now/lookbook/le17septembre', 'en'), '/en/now/lookbook/le17septembre')
  assert.equal(switchLocalePath('/en/now/lookbook/le17septembre', 'cn'), '/now/lookbook/le17septembre')
  assert.equal(switchLocalePath('/cn/brands/nhoj', 'cn'), '/brands/nhoj')
})

test('navigation selection follows the current section in both locales', () => {
  assert.equal(isNavigationItemActive('/brands', 'brands'), true)
  assert.equal(isNavigationItemActive('/brands/nhoj', 'brands'), true)
  assert.equal(isNavigationItemActive('/en/now/lookbook', 'now'), true)
  assert.equal(isNavigationItemActive('/en/recap', 'recap'), true)
  assert.equal(isNavigationItemActive('/about', 'brands'), false)
  assert.equal(isNavigationItemActive('/', 'brands'), false)
})
