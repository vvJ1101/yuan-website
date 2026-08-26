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

test('cover runs a horizontal gallery that pauses for scroll-controlled movement', async () => {
  const source = await read('src/app/[locale]/page.tsx')
  const experience = await read('src/components/showroom/homepage-experience.tsx')
  const css = await read('src/app/globals.css')
  assert.match(source, /<main[^>]*className="showroom-cover"/)
  assert.match(source, /<HomepageExperience/)
  assert.match(source, /locale=\{locale\}/)
  assert.match(experience, /requestAnimationFrame/)
  assert.match(experience, /elapsed \* \(pointerSlowingRef\.current \? 0\.036 : 0\.14\)/)
  assert.match(experience, /addEventListener\(['"]wheel['"]/)
  assert.match(experience, /preventDefault\(\)/)
  assert.match(experience, /navigator\.geolocation\.getCurrentPosition/)
  assert.doesNotMatch(experience, /nominatim\.openstreetmap\.org\/reverse/)
  assert.doesNotMatch(experience, /fetch\(/)
  assert.match(experience, /inferNearbyCity/)
  assert.match(experience, /已获取位置/)
  assert.match(experience, /LOCATION ACQUIRED/)
  assert.match(experience, /定位不可用/)
  assert.match(experience, /LOCATION UNAVAILABLE/)
  assert.match(experience, /enableHighAccuracy: true/)
  assert.match(experience, /maximumAge: 0/)
  assert.match(experience, /copy\.time.*location\.timezone/)
  assert.match(experience, /copy\.label.*location\.address/)
  assert.match(experience, /实时位置/)
  assert.match(experience, /LIVE LOCATION/)
  assert.match(experience, /scrollResumeTimer/)
  assert.match(experience, /showroom-cover__track/)
  assert.match(experience, /showroom-cover__timepiece/)
  assert.doesNotMatch(experience, /31\.2304° N/)
  assert.doesNotMatch(experience, /121\.4737° E/)
  assert.match(experience, /home\/texture\.png/)
  assert.match(experience, /home\/generated-fabric-v1\.png/)
  assert.match(experience, /home\/space-01\.png/)
  assert.match(experience, /home\/space-04\.png/)
  assert.match(experience, />YUAN<\/span>/)
  assert.match(experience, />SHOWROOM<\/span>/)
  assert.equal((experience.match(/src: '\/images\/showroom\/home\//g) ?? []).length >= 8, true)
  assert.match(experience, /showroom-cover__lettering/)
  assert.match(css, /\.showroom-cover__stage\s*\{[^}]*position: relative/)
  assert.match(css, /\.showroom-cover__track\s*\{[^}]*display: flex/)
  assert.match(css, /\.showroom-cover__lettering \.showroom-cover__word\s*\{[^}]*font-family: "Helvetica Neue"[^}]*font-weight: 400[^}]*letter-spacing: 0\.012em[^}]*scaleX\(0\.94\)/)
  assert.match(css, /\.showroom-cover__experience\s*\{[^}]*height: 100%/)
  assert.match(css, /\.showroom-cover__sequence\s*\{[^}]*width: max-content[^}]*min-width: 0/)
  assert.match(css, /\.showroom-cover__stage\[data-cursor='hidden'\]\s*\{[^}]*cursor: none/)
  assert.match(css, /\.showroom-cover__lettering\s*\{[^}]*mix-blend-mode: difference/)
  assert.doesNotMatch(css.match(/\.showroom-cover__word\s*\{[^}]*\}/)?.[0] ?? '', /text-stroke/)
  assert.doesNotMatch(experience, /paper-sculpture\.png/)
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

test('about fits its introduction and statistics into one desktop viewport', async () => {
  const page = await read('src/app/[locale]/about/page.tsx')
  const data = await read('src/data/showroom.ts')
  const css = await read('src/app/globals.css')

  assert.match(page, /className="showroom-about__media"[\s\S]*?ratio="16 \/ 9"/)
  assert.match(data, /about\/showroom-v2\.webp/)
  assert.match(css, /\.showroom-about\s*\{[\s\S]*?height: calc\(100svh - var\(--ys-header-h\)\)[\s\S]*?overflow: hidden/)
  assert.match(css, /\.showroom-about__statistics\s*\{[\s\S]*?margin-top: clamp\(16px, 2\.4vh, 24px\)/)
})

test('about read more opens the internal company brand book', async () => {
  const about = await read('src/app/[locale]/about/page.tsx')
  const book = await read('src/app/[locale]/about/brand-book/page.tsx')

  assert.match(about, /href=\{localePath\(locale, '\/about\/brand-book'\)\}/)
  assert.match(book, /<BrandBook[\s\S]*?book=\{companyBrandBook\}[\s\S]*?closeHref=\{localePath\(locale, '\/about'\)\}/)
})

test('about introduction and statistics share the image alignment axis', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.showroom-about__intro\s*\{[\s\S]*?grid-template-columns: minmax\(310px, 1fr\) minmax\(0, var\(--ys-nav-column-w\)\)/)
  assert.match(css, /\.showroom-about__statistics\s*\{[\s\S]*?grid-template-columns: minmax\(310px, 1fr\) repeat\(2, minmax\(0, calc\(var\(--ys-nav-column-w\) \/ 2\)\)\)/)
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
  assert.match(css, /\.brand-index\s*\{[\s\S]*?padding: clamp\(30px, 4\.2vh, 46px\)/)
  assert.match(css, /\.brand-index__matrix\s*\{[\s\S]*?padding-top: clamp\(48px, 6vh, 62px\)/)
  assert.match(media, /sizes\?: string/)
  assert.match(media, /sizes=\{sizes\}/)
  assert.match(grid, /brands\.map\(\(brand, index\) =>/)
  assert.match(grid, /sizes="\(max-width: 640px\) 50vw, \(max-width: 900px\) 33vw, 13vw"/)
  assert.match(grid, /<MediaFrame[\s\S]*?src=\{brand\.cover\}[\s\S]*?unoptimized/)
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

test('brand book keeps its identity fixed above the scrolling campaign', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(book, /className=\{`brand-book__title[\s\S]*?\{book\.name\}[\s\S]*?BRAND BOOK/)
  assert.match(css, /\.brand-book__title\s*\{[\s\S]*?position: fixed/)
})

test('brand book identity hides while scrolling and returns after scrolling stops', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(book, /window\.addEventListener\('scroll', handleScroll, \{ passive: true \}\)/)
  assert.match(book, /setTimeout\([\s\S]*?setIsScrolling\(false\)[\s\S]*?, 180\)/)
  assert.match(book, /brand-book__title--hidden/)
  assert.match(css, /\.brand-book__title--hidden\s*\{[\s\S]*?opacity: 0/)
})

test('about typography uses a quieter editorial weight hierarchy', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.showroom-about__copy h1\s*\{[\s\S]*?font-size: clamp\(38px, 3\.3vw, 52px\)[\s\S]*?font-weight: 400/)
  assert.match(css, /\.showroom-about__statistic strong\s*\{[\s\S]*?font-weight: 400/)
})

test('brand book pages share the desktop navigation width', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(css, /--ys-nav-column-w: 54vw/)
  assert.match(css, /\.site-header__navigation\s*\{[\s\S]*?grid-template-columns: 1fr minmax\(420px, var\(--ys-nav-column-w\)\) 1fr/)
  assert.match(book, /page\.width > page\.height \? 'landscape' : 'portrait'/)
  assert.match(css, /\.brand-book__page--portrait\s*\{[\s\S]*?width: min\(var\(--ys-nav-column-w\), 900px\)/)
  assert.match(css, /\.brand-book__page--landscape\s*\{[\s\S]*?width: min\(var\(--ys-nav-column-w\), 1200px\)/)
})

test('NOW landing links all three approved destinations', async () => {
  const source = await read('src/app/[locale]/now/page.tsx')
  for (const path of ['lookbook', 'floor-map', 'appointment']) {
    assert.match(source, new RegExp(`/now/${path}`))
  }
  assert.doesNotMatch(source, /Arrow|<hr|<Image[^>]+className="now-link/i)
})

test('NOW landing is a two-column 16:9 composition contained in one desktop viewport', async () => {
  const source = await read('src/app/[locale]/now/page.tsx')
  const mediaFrame = await read('src/components/showroom/media-frame.tsx')
  const css = await read('src/app/globals.css')

  assert.match(source, /className="now-event__image"[\s\S]*?ratio="16 \/ 9"[\s\S]*?unoptimized/)
  assert.match(mediaFrame, /unoptimized=\{unoptimized\}/)
  assert.match(source, /className="now-event__sidebar"/)
  assert.match(css, /\.now-event\s*\{[\s\S]*?grid-template-columns: minmax\(0, 1\.85fr\) minmax\(240px, 0\.65fr\)[\s\S]*?height: calc\(100svh - var\(--ys-header-h\)\)[\s\S]*?overflow: hidden/)
})

test('NOW exhibition posters link to separate lookbook-only brand routes', async () => {
  const index = await read('src/app/[locale]/now/lookbook/page.tsx')
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')

  assert.match(index, /currentEvent\.exhibitionBrands\.map/)
  assert.match(index, /localePath\(locale, `\/now\/lookbook\/\$\{brand\.slug\}`\)/)
  assert.doesNotMatch(index, /href={`#lookbook-/)
  assert.match(detail, /firstFive\.map/)
  assert.match(detail, /remainder\.map/)
  assert.doesNotMatch(detail, /LOOKBOOK 即将更新/)
  assert.doesNotMatch(detail, /DESIGNER|CATEGORY|ORIGIN|ESTABLISHED|WEBSITE|description/)
})

test('lookbook detail is an image-only editorial gallery', async () => {
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')
  const types = await read('src/types/showroom.ts')
  const now = await read('src/app/[locale]/now/page.tsx')
  const appointment = await read('src/app/[locale]/now/appointment/page.tsx')

  assert.match(detail, /firstFive\.map/)
  assert.match(detail, /remainder\.map/)
  assert.doesNotMatch(detail, /styleNumber|item\.name|款号|品名|STYLE NO\.|ITEM/)
  assert.doesNotMatch(types, /styleNumber|name: LocalizedText/)
  assert.match(types, /interface LookbookItem\s*\{[^}]*image: string/)
  assert.doesNotMatch(now, /currentEvent\.dates/)
  assert.doesNotMatch(appointment, /currentEvent\.dates/)
})

test('appointment presents the themed manual-review flow around a borderless QR code', async () => {
  const page = await read('src/app/[locale]/now/appointment/page.tsx')
  const data = await read('src/data/showroom.ts')
  const css = await read('src/app/globals.css')
  const qrCss = css.slice(css.indexOf('.appointment-page__qr'), css.indexOf('.appointment-page__scan'))

  assert.match(page, /appointmentContent\.steps\.map/)
  assert.match(page, /className="appointment-page__theme"/)
  assert.match(page, /className="appointment-page__review"/)
  assert.match(page, /unoptimized/)
  assert.match(data, /ECHOES OF DECO/)
  assert.match(data, /工作人员审核/)
  assert.match(data, /短信/)
  assert.match(data, /reviewed by our team/)
  assert.match(data, /sent by SMS/)
  assert.doesNotMatch(qrCss, /border|box-shadow|background/)
})

test('appointment keeps its desktop invitation and QR inside a 720px viewport', async () => {
  const css = await read('src/app/globals.css')
  const desktop = css.slice(css.indexOf('.appointment-page {'), css.indexOf('.onsite-page {'))

  assert.match(desktop, /padding: clamp\(20px, 3vh, 32px\)[^;]+clamp\(28px, 4vh, 42px\)/)
  assert.match(desktop, /min-height: calc\(100svh - var\(--ys-header-h\) - clamp\(48px, 7vh, 74px\)\)/)
  assert.match(desktop, /\.appointment-page__qr\s*\{[^}]*width: 100%[^}]*max-width: 340px[^}]*justify-self: center/)
})

test('appointment CLOSE returns to the locale-aware NOW landing', async () => {
  const page = await read('src/app/[locale]/now/appointment/page.tsx')

  assert.match(page, /className="appointment-page__close"/)
  assert.match(page, /href=\{localePath\(locale, '\/now'\)\}/)
  assert.match(page, />\s*CLOSE\s*<\/Link>/)
})

test('lookbook detail contains one viewport-fitted five-image hero followed by a simple grid', async () => {
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')
  const css = await read('src/app/globals.css')
  const panelCss = css.slice(css.indexOf('.lookbook-brand__panels'), css.indexOf('.lookbook-brand__pending'))

  assert.match(detail, /brand\.items\.slice\(0, 5\)/)
  assert.match(detail, /brand\.items\.slice\(5\)/)
  assert.doesNotMatch(detail, /Math\.floor|panels\.map|panel--mirrored/)
  assert.match(detail, /positions = \['left-top', 'hero', 'right-top', 'left-bottom', 'right-bottom'\]/)
  assert.match(detail, /lookbook-brand__panel-card--\$\{position\}/)
  assert.match(detail, /lookbook-brand__remainder/)
  assert.match(css, /\.lookbook-brand__panel\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\) minmax\(0, 2\.08fr\) minmax\(0, 1fr\)/)
  assert.match(css, /\.lookbook-brand__panel\s*\{[^}]*height: calc\(100svh - var\(--ys-header-h\)/)
  assert.match(css, /\.lookbook-brand__panel\s*\{[^}]*align-items: stretch/)
  assert.match(css, /\.lookbook-brand__panel\s*\{[^}]*max-height: 880px/)
  assert.match(css, /\.lookbook-brand__header h1\s*\{[^}]*font-size: clamp\(22px, 1\.8vw, 32px\)[^}]*font-weight: 400/)
  assert.match(css, /\.lookbook-brand__panel-card--hero\s*\{[^}]*grid-column: 2[^}]*grid-row: 1 \/ span 2/)
  assert.doesNotMatch(panelCss, /transform: rotate|lookbook-brand__editorial-card/)
  assert.match(css, /\.lookbook-brand__remainder\s*\{[^}]*repeat\(6, minmax\(0, 1fr\)\)/)
  assert.match(detail, /className="lookbook-item"[\s\S]*?ratio="384 \/ 573"/)
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.lookbook-brand__remainder\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/)
})

test('lookbook initialization provides twelve images for multi-panel preview', async () => {
  const data = await read('src/data/showroom.ts')

  const block = data.match(/const editorialLookbook = \[([\s\S]*?)\]\s+as const/)?.[1] ?? ''
  assert.equal((block.match(/showroomImage\('now\/lookbook\/editorial-/g) ?? []).length, 12)
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
