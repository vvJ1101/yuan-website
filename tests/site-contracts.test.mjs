import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

async function filesUnder(relativeDirectory) {
  const directory = new URL(`${relativeDirectory}/`, root)
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const relativePath = path.posix.join(relativeDirectory, entry.name)
    return entry.isDirectory() ? filesUnder(relativePath) : [relativePath]
  }))
  return nested.flat()
}

test('sitemap publishes only the canonical homepage', async () => {
  const sitemap = await read('public/sitemap.xml')
  assert.match(sitemap, /<loc>https:\/\/yuanshowroom\.cn\/<\/loc>/)
  assert.doesNotMatch(sitemap, /\/showroom/)
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 1)
})

test('404 returns to the default Chinese locale homepage', async () => {
  const source = await read('src/app/not-found.tsx')
  assert.match(source, /href="\/cn"/)
  assert.doesNotMatch(source, /href="\/showroom"/)
})

test('metadata contains no verification placeholder', async () => {
  const source = await read('src/app/layout.tsx')
  assert.doesNotMatch(source, /Your360VerificationCode/)
})

test('root document language is derived from the server-routed locale', async () => {
  const rootLayout = await read('src/app/layout.tsx')
  const proxy = await read('src/proxy.ts')
  assert.match(rootLayout, /import \{ headers \} from 'next\/headers'/)
  assert.match(rootLayout, /const locale = \(await headers\(\)\)\.get\('x-showroom-locale'\)/)
  assert.match(rootLayout, /<html lang=\{locale\}/)
  assert.match(proxy, /requestHeaders\.set\('x-showroom-locale', locale\)/)
  assert.match(proxy, /NextResponse\.next\(\{ request: \{ headers: requestHeaders \} \}\)/)
})

test('metadata presents the approved YUAN SHOWROOM positioning', async () => {
  const source = await read('src/app/layout.tsx')
  assert.match(source, /default:\s*'YUAN SHOWROOM国际时尚品牌管理平台'/)
  assert.match(source, /description:\s*'YUAN SHOWROOM是深圳（香港）时胜集团的综合性商业时尚管理平台。集品牌代理、全域营销、文娱传媒与战略投资于一体，融合AI智能与知识管理，赋能商业长期价值。'/)
})

test('metadata declares YUANSHOWROOM as the official no-space brand alias', async () => {
  const source = await read('src/app/layout.tsx')
  assert.match(source, /'YUANSHOWROOM'/)
  assert.match(source, /alternateName:\s*'YUANSHOWROOM'/)
})

test('Next configuration disables disclosure and defines security headers', async () => {
  const source = await read('next.config.js')
  assert.match(source, /poweredByHeader:\s*false/)
  for (const header of ['Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
    assert.match(source, new RegExp(header))
  }
})

test('source has no TypeScript any escape', async () => {
  const plus = await read('src/components/home/section-plus.tsx')
  assert.doesNotMatch(plus, /as any/)
})

test('source tree has no AppleDouble metadata', async () => {
  const files = await filesUnder('src')
  assert.deepEqual(files.filter((file) => path.basename(file).startsWith('._')), [])
})

test('brand section presents listed retailers as buyer partners', async () => {
  const data = await read('src/data/home.ts')
  const section = await read('src/components/home/section-brands.tsx')
  assert.match(data, /title: '合作品牌与买手'/)
  assert.match(data, /buyers: \[/)
  assert.doesNotMatch(data, /channels: \[/)
  assert.match(section, /合作买手与买手店/)
  assert.match(section, /brands\.buyers/)
  assert.doesNotMatch(section, /合作渠道|brands\.channels/)
})
