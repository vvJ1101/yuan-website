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

test('showroom header stays fixed and identical across every page', async () => {
  const css = await read('src/app/globals.css')
  assert.match(css, /html\s*\{[^}]*scrollbar-gutter: stable/)
  assert.match(css, /\.site-header\s*\{[^}]*position: sticky[^}]*top: 0[^}]*z-index:/)
  assert.doesNotMatch(css, /body:has\(\.brand-room\)[^{]*\.site-header/)
  assert.match(css, /\.brand-room__close\s*\{[^}]*position: absolute/)
})

test('showroom header persists the selected language across navigation', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  assert.match(source, /usePathname\(\)/)
  assert.match(source, /switchLocalePath\(pathname, nextLocale\)/)
  assert.match(source, /document\.cookie/)
  assert.match(source, /showroom-locale/)
  assert.match(source, /prefetch=\{false\}/)
})

test('locale layout validates route params before rendering the shared header', async () => {
  const source = await read('src/app/[locale]/layout.tsx')
  assert.match(source, /await params/)
  assert.match(source, /isLocale\(locale\)/)
  assert.match(source, /notFound\(\)/)
  assert.match(source, /<SiteHeader locale=\{locale\} \/>/)
})

test('proxy serves Chinese at clean root and redirects legacy /cn URLs', async () => {
  const source = await read('src/proxy.ts')
  assert.match(source, /pathname === '\/cn'/)
  assert.match(source, /NextResponse\.redirect\(url, 308\)/)
  assert.match(source, /pathname === '\/' \? '\/cn'/)
})

test('proxy restores the saved English preference on clean public URLs', async () => {
  const source = await read('src/proxy.ts')
  assert.match(source, /request\.cookies\.get\(['"]showroom-locale['"]\)/)
  assert.match(source, /savedLocale === ['"]en['"]/)
  assert.match(source, /NextResponse\.redirect/)
})

test('cover uses editorial image fragments and split transparent lettering', async () => {
  const source = await read('src/app/[locale]/page.tsx')
  const css = await read('src/app/globals.css')
  assert.match(source, /<main[^>]*className="showroom-cover"/)
  assert.match(source, /showroom-cover__collage/)
  assert.match(source, /home\/texture\.png/)
  assert.match(source, /home\/paper-sculpture\.png/)
  assert.match(source, /home\/flower-monochrome\.png/)
  assert.match(source, /'YUAN'\.split\(''\)\.map/)
  assert.match(source, /'SHOWROOM'\.split\(''\)\.map/)
  assert.match(css, /-webkit-text-stroke:/)
  assert.match(css, /mix-blend-mode:/)
  assert.match(css, /@keyframes showroom-collage-entrance/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
  assert.doesNotMatch(source, /yuan-logo\.png/)
})

test('header places the official logo above the navigation row', async () => {
  const header = await read('src/components/showroom/site-header.tsx')
  assert.match(header, /import Image from 'next\/image'/)
  assert.match(header, /src="\/images\/showroom\/yuan-logo\.png"/)
  assert.match(header, /className="site-logo__image"/)
  assert.match(header, /className="site-header__brand"/)
  assert.match(header, /className="site-header__navigation"/)
  assert.doesNotMatch(header, /YUAN<br \/>SHOWROOM/)
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
  assert.match(grid, /localePath\(locale, `\/brands\/\$\{brand\.slug\}`\)/)
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

test('NOW landing links all three approved destinations', async () => {
  const source = await read('src/app/[locale]/now/page.tsx')
  for (const path of ['lookbook', 'floor-map', 'appointment']) {
    assert.match(source, new RegExp(`/now/${path}`))
  }
  assert.doesNotMatch(source, /Arrow|<hr|<Image[^>]+className="now-link/i)
})

test('NOW exhibition posters link to separate lookbook-only brand routes', async () => {
  const index = await read('src/app/[locale]/now/lookbook/page.tsx')
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')

  assert.match(index, /currentEvent\.exhibitionBrands\.map/)
  assert.match(index, /localePath\(locale, `\/now\/lookbook\/\$\{brand\.slug\}`\)/)
  assert.doesNotMatch(index, /href={`#lookbook-/)
  assert.match(detail, /brand\.items\.map/)
  assert.doesNotMatch(detail, /LOOKBOOK 即将更新/)
  assert.doesNotMatch(detail, /DESIGNER|CATEGORY|ORIGIN|ESTABLISHED|WEBSITE|description/)
})

test('lookbook detail is an image-only editorial gallery', async () => {
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')
  const types = await read('src/types/showroom.ts')
  const now = await read('src/app/[locale]/now/page.tsx')
  const appointment = await read('src/app/[locale]/now/appointment/page.tsx')

  assert.match(detail, /brand\.items\.map/)
  assert.doesNotMatch(detail, /styleNumber|item\.name|款号|品名|STYLE NO\.|ITEM/)
  assert.doesNotMatch(types, /styleNumber|name: LocalizedText/)
  assert.match(types, /interface LookbookItem\s*\{[^}]*image: string/)
  assert.doesNotMatch(now, /currentEvent\.dates/)
  assert.doesNotMatch(appointment, /currentEvent\.dates/)
})

test('lookbook item gallery uses six desktop, three tablet and two mobile columns', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.lookbook-brand__gallery\s*\{[^}]*grid-template-columns: repeat\(6, minmax\(0, 1fr\)\)/)
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.lookbook-brand__gallery\s*\{[^}]*repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.lookbook-brand__gallery\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/)
})

test('onsite carousel has accessible previous and next controls', async () => {
  const source = await read('src/components/showroom/onsite-carousel.tsx')
  assert.match(source, /aria-label=.*Previous|上一张/s)
  assert.match(source, /aria-label=.*Next|下一张/s)
  assert.match(source, /setActive/)
  assert.doesNotMatch(source, /setInterval|setTimeout|autoplay/i)
})

test('recap fills the desktop in five columns with portrait posters', async () => {
  const source = await read('src/app/[locale]/recap/page.tsx')
  const css = await read('src/app/globals.css')
  assert.match(source, /recaps[\s\S]*sort/)
  assert.match(source, /recap-grid/)
  assert.match(source, /ratio="3\.5 \/ 5"/)
  assert.match(css, /\.recap-grid\s*\{[^}]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/)
  assert.doesNotMatch(css.match(/\.recap-grid\s*\{[^}]*\}/)?.[0] ?? '', /max-width:/)
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.recap-grid\s*\{[^}]*repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.recap-grid\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/)
})
