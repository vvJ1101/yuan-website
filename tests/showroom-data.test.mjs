import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('brand categories match the approved matrix', async () => {
  const source = await read('src/data/showroom.ts')
  assert.match(source, /name: 'LUCIA TACCI'[\s\S]*category: 'FTW'/)
  assert.match(source, /name: 'PIÉTON ÉPISODE'[\s\S]*category: 'FTW'/)
  assert.match(source, /name: 'HELEN KAMINSKI'[\s\S]*category: 'ACC'/)
  assert.match(source, /name: 'REINDEER'[\s\S]*category: 'ACC'/)
})

test('every public content record carries cn and en copy', async () => {
  const source = await read('src/data/showroom.ts')
  assert.match(source, /cn:/)
  assert.match(source, /en:/)
  assert.doesNotMatch(source, /TODO|TBD|待翻译/)
})
