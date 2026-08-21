import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('every showroom image reference resolves under public', async () => {
  const source = await read('src/data/showroom.ts')
  const paths = [...source.matchAll(/'(?<path>\/images\/showroom\/[^']+)'/g)]
    .map((match) => match.groups.path)
  assert.ok(paths.length >= 30)
  for (const imagePath of paths) {
    await access(new URL(`../public${imagePath}`, import.meta.url))
  }
})
