import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'

test('RÓHE brand book omits the portrait cover and back cover', async () => {
  const { getBrandBook } = await import('../src/data/brand-books.ts')
  const book = getBrandBook('rohe')

  assert.ok(book)
  assert.equal(book.name, 'RÓHE')
  assert.equal(book.pages.length, 32)
  assert.equal(new Set(book.pages.map((page) => page.src)).size, 32)
  assert.deepEqual(
    book.pages.map(({ width, height }) => [width, height]),
    Array.from({ length: 32 }, () => [2665, 1786]),
  )
  assert.match(book.pages[0].src, /page-02\.webp$/)
  assert.match(book.pages.at(-1).src, /page-33\.webp$/)

  for (const page of book.pages) {
    assert.match(page.src, /^\/images\/showroom\/brand-books\/rohe\/page-\d{2}\.webp$/)
    const file = new URL(`../public${page.src}`, import.meta.url)
    await access(file)
    const signature = (await readFile(file)).subarray(0, 12)
    assert.equal(signature.subarray(0, 4).toString(), 'RIFF')
    assert.equal(signature.subarray(8, 12).toString(), 'WEBP')
  }
})

test('unknown brand books remain unavailable', async () => {
  const { getBrandBook } = await import('../src/data/brand-books.ts')
  assert.equal(getBrandBook('not-a-brand'), undefined)
})
