import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('showroom header keeps the approved order and no hamburger', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  const brands = source.indexOf("label: 'BRANDS'")
  const about = source.indexOf("label: 'ABOUT'")
  const now = source.indexOf("label: 'NOW'")
  const onsite = source.indexOf("label: 'ON-SITE'")
  const recap = source.indexOf("label: 'RECAP'")

  assert.ok(brands < about && about < now && now < onsite && onsite < recap)
  assert.doesNotMatch(source, /Menu|hamburger|aria-expanded/)
})

test('showroom header preserves the active deep route when switching languages', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  assert.match(source, /usePathname\(\)/)
  assert.match(source, /switchLocalePath\(pathname, nextLocale\)/)
})

test('locale layout validates route params before rendering the shared header', async () => {
  const source = await read('src/app/[locale]/layout.tsx')
  assert.match(source, /await params/)
  assert.match(source, /isLocale\(locale\)/)
  assert.match(source, /notFound\(\)/)
  assert.match(source, /<SiteHeader locale=\{locale\} \/>/)
})

test('root page redirects to Chinese', async () => {
  const source = await read('src/app/page.tsx')
  assert.match(source, /redirect\('\/cn'\)/)
})

test('cover contains only the approved hero title inside its main content', async () => {
  const source = await read('src/app/[locale]/page.tsx')
  assert.match(source, /<main[^>]*className="showroom-cover"/)
  assert.match(source, /YUAN[\s\S]*SHOWROOM/)
  assert.doesNotMatch(source, /<Image|subtitle|description|button/i)
})

test('about renders the localized image and exactly three approved statistics', async () => {
  const page = await read('src/app/[locale]/about/page.tsx')
  const data = await read('src/data/showroom.ts')

  assert.match(page, /aboutContent/)
  assert.match(page, /localize/)
  assert.match(page, /<MediaFrame/)
  assert.match(data, /about\/showroom\.webp/)
  for (const value of ['50+', '3000+', "'4'"]) {
    assert.match(data, new RegExp(value.replace('+', '\\+')))
  }
  assert.match(page, /aboutContent\.statistics\.map/)
})

test('about preserves the approved Chinese positioning copy', async () => {
  const data = await read('src/data/showroom.ts')

  assert.match(data, /YUAN Showroom base 深圳和香港，\\n是一家立足中国市场、融合国际视野的时尚专业运营平台，/)
  assert.match(data, /集品牌代理、市场开拓、运营管理、全域营销与战略投资\\n于一体的综合性品牌管理机构支持平台。/)
  assert.match(data, /YUAN以品牌批发业务拓展为核心，\\n为全球设计师品牌提供中国市场全链路解决方案，/)
  assert.match(data, /通过系统化运营支持品牌长期成长与可持续发展。/)
})

test('brand index exposes RTW FTW ACC and linked rooms', async () => {
  const grid = await read('src/components/showroom/brand-grid.tsx')
  for (const category of ['RTW', 'FTW', 'ACC']) assert.match(grid, new RegExp(category))
  assert.match(grid, /`\/\$\{locale\}\/brands\/\$\{brand\.slug\}`/)
})

test('brand room has close and previous-next navigation without a lightbox', async () => {
  const room = await read('src/components/showroom/brand-room.tsx')
  assert.match(room, /CLOSE/)
  assert.match(room, /previous/)
  assert.match(room, /next/)
  assert.doesNotMatch(room, /lightbox|zoom|camera/i)
})

test('brand index keeps six desktop columns and responsive image hints', async () => {
  const grid = await read('src/components/showroom/brand-grid.tsx')
  const media = await read('src/components/showroom/media-frame.tsx')
  const css = await read('src/app/globals.css')

  assert.match(css, /\.brand-index__matrix\s*\{[\s\S]*?grid-template-columns: repeat\(6, minmax\(0, 1fr\)\)/)
  assert.match(media, /sizes\?: string/)
  assert.match(media, /sizes=\{sizes\}/)
  assert.match(grid, /brands\.map\(\(brand, index\) =>/)
  assert.match(grid, /sizes="\(max-width: 640px\) 50vw, \(max-width: 900px\) 33vw, 13vw"/)
  assert.match(grid, /priority=\{index < 6\}/)
})

test('brand room renders paragraph breaks and avoids duplicate auxiliary keys', async () => {
  const room = await read('src/components/showroom/brand-room.tsx')
  const auxiliary = room.slice(room.indexOf('brand.roomImages.slice(1)'), room.indexOf('</div>', room.indexOf('brand.roomImages.slice(1)')))

  assert.match(room, /localize\(brand\.introduction, locale\)\.split/)
  assert.match(room, /brand-room__introduction-paragraph/)
  assert.match(auxiliary, /key=\{`\$\{brand\.slug\}-detail-\$\{index \+ 1\}`\}/)
  assert.doesNotMatch(auxiliary, /priority/)
})

test('brand routes cover both locales, reject unknown slugs, and wrap circularly', async () => {
  const page = await read('src/app/[locale]/brands/[slug]/page.tsx')

  assert.match(page, /locales\.flatMap\(\(locale\) => brands\.map\(\(brand\) => \(\{ locale, slug: brand\.slug \}\)\)\)/)
  assert.match(page, /if \(index < 0\) notFound\(\)/)
  assert.match(page, /brands\[\(index - 1 \+ brands\.length\) % brands\.length\]/)
  assert.match(page, /brands\[\(index \+ 1\) % brands\.length\]/)
})

test('brand room uses one eager hero with responsive image hints', async () => {
  const room = await read('src/components/showroom/brand-room.tsx')

  assert.match(room, /className="brand-room__main-image"[\s\S]*?sizes="\(max-width: 640px\) 100vw, \(max-width: 900px\) 66vw, 46vw"[\s\S]*?priority/)
  assert.match(room, /className="brand-room__detail-image"[\s\S]*?sizes="\(max-width: 640px\) 50vw, \(max-width: 900px\) 33vw, 22vw"/)
})
