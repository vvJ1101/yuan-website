import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveLookProducts } from '../src/lib/lookbook-products.ts'

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
