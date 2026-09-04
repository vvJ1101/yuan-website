import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const read = (relativePath) => readFile(new URL(relativePath, root), 'utf8')

test('showroom header keeps the approved order and no hamburger', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  const brands = source.indexOf("label: 'Brands'")
  const about = source.indexOf("label: 'About'")
  const now = source.indexOf("label: 'Now'")
  const onsite = source.indexOf("label: 'On-site'")
  const recap = source.indexOf("label: 'Recap'")

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

test('showroom header persists the selected language and scroll position across navigation', async () => {
  const source = await read('src/components/showroom/site-header.tsx')
  assert.match(source, /usePathname\(\)/)
  assert.match(source, /switchLocalePath\(pathname, nextLocale\)/)
  assert.match(source, /document\.cookie/)
  assert.match(source, /showroom-locale/)
  assert.match(source, /prefetch=\{false\}/)
  assert.match(source, /scroll=\{false\}/)
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

test('header places the official logo above the navigation row', async () => {
  const header = await read('src/components/showroom/site-header.tsx')
  assert.match(header, /import Image from 'next\/image'/)
  assert.match(header, /src="\/images\/showroom\/yuan-logo-white\.png"/)
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
  for (const value of ['6000+ SQM', '3000+', "'4'"]) {
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

test('about statistics use three evenly distributed columns', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.showroom-about__statistics\s*\{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)[\s\S]*?column-gap: clamp\(28px, 4vw, 72px\)/)
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

test('brand index preserves full poster proportions across desktop widths', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /@media \(min-width: 901px\)[\s\S]*?\.brand-index__card \.media-frame\s*\{[^}]*aspect-ratio: 3 \/ 4 !important/)
})

test('brand index uses a natural four-column poster grid on landscape tablets', async () => {
  const css = await read('src/app/globals.css')

  const tabletRules = css.slice(css.indexOf('@media (min-width: 901px) and (max-width: 1366px)'), css.indexOf('@media (min-width: 901px) and (max-height: 920px)'))

  assert.match(tabletRules, /\.brand-index__matrix\s*\{[^}]*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)[^}]*align-content: start[^}]*padding-top: 0/)
  assert.match(tabletRules, /\.brand-index__card \.media-frame\s*\{[^}]*height: auto[^}]*aspect-ratio: 3 \/ 4 !important/)
  assert.doesNotMatch(tabletRules, /overflow: hidden|grid-template-rows: repeat\(2|height: 100%|aspect-ratio: auto/)
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

test('recap cards open localized season detail pages', async () => {
  const page = await read('src/app/[locale]/recap/page.tsx')

  assert.match(page, /import Link from 'next\/link'/)
  assert.match(page, /localePath\(locale, `\/recap\/\$\{recap\.slug\}`\)/)
  assert.match(page, /className="recap-card__link"/)
})

test('recap detail only opens with a video hero when that season has a video', async () => {
  const page = await read('src/app/[locale]/recap/[slug]/page.tsx')
  const detail = await read('src/components/showroom/recap-detail.tsx')
  const css = await read('src/app/globals.css')

  assert.match(page, /generateStaticParams/)
  assert.match(page, /if \(index < 0\) notFound\(\)/)
  assert.match(page, /<RecapDetail/)
  assert.match(detail, /<video/)
  assert.match(detail, /autoPlay/)
  assert.match(detail, /muted/)
  assert.match(detail, /playsInline/)
  assert.doesNotMatch(detail, /loop/)
  assert.match(detail, /\{recap\.video && \([\s\S]*?className="recap-detail__video-opening"/)
  assert.doesNotMatch(detail, /recap\.video \? \([\s\S]*?: \([\s\S]*?<Image/)
  assert.match(detail, /locale === 'cn' \? '关闭' : 'Close'/)
  assert.match(detail, /className="recap-detail__article"/)
  assert.match(detail, /recap\.pages\.map/)
  assert.match(detail, /previous/)
  assert.match(detail, /next/)
  assert.match(css, /\.recap-detail__video-opening\s*\{[^}]*min-height: calc\(100svh - var\(--ys-header-h\)\)/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/)
})

test('brand room uses one eager hero with responsive image hints', async () => {
  const room = await read('src/components/showroom/brand-room.tsx')

  assert.match(room, /className="brand-room__main-image"[\s\S]*?sizes="\(max-width: 640px\) 100vw, \(max-width: 900px\) 66vw, 46vw"[\s\S]*?priority/)
  assert.match(room, /className="brand-room__detail-image"[\s\S]*?sizes="\(max-width: 640px\) 50vw, \(max-width: 900px\) 33vw, 22vw"/)
})

test('brand book keeps its identity above the scrolling campaign', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(book, /className="brand-book__title"[\s\S]*?\{book\.name\}[\s\S]*?BRAND BOOK/)
  assert.match(css, /\.brand-book__identity\s*\{[^}]*position: fixed[^}]*z-index: 90/)
})

test('brand book identity stays visible in a fixed right-side rail', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(book, /className="brand-book__identity"/)
  assert.match(book, /className="brand-book__identity-rule"/)
  assert.match(book, /YUAN SHOWROOM \/ BRAND ARCHIVE/)
  assert.doesNotMatch(book, /useEffect|useRef|useState|addEventListener|brand-book__title--hidden/)
  assert.match(css, /\.brand-book__identity\s*\{[^}]*position: fixed[^}]*right: var\(--ys-gutter\)/)
  assert.doesNotMatch(css, /\.brand-book__title--hidden/)
})

test('about typography uses the approved editorial serif hierarchy', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.showroom-about__copy\s*\{[\s\S]*?padding: clamp\(28px, 5vh, 56px\)/)
  assert.match(css, /\.showroom-about__copy h1\s*\{[\s\S]*?font-family: var\(--ys-font-serif\)[\s\S]*?font-size: clamp\(54px, 5vw, 92px\)[\s\S]*?font-weight: 400[\s\S]*?letter-spacing: 0[\s\S]*?line-height: 1\.1/)
  assert.match(css, /\.showroom-about__body\s*\{[^}]*font-size: clamp\(12px, 0\.85vw, 15px\)[^}]*line-height: 1\.52/)
  assert.match(css, /\.showroom-about__statistic strong\s*\{[\s\S]*?font-weight: 400/)
})

test('white-background page titles use clean serif glyphs without an optical stroke', async () => {
  const css = await read('src/app/globals.css')

  assert.match(css, /\.showroom-about__copy h1,[\s\S]*?\.brand-index__rail h1,[\s\S]*?\.now-event__summary h1,[\s\S]*?\.onsite-service h1,[\s\S]*?\.recap-page > header h1\s*\{[^}]*font-family: var\(--ys-font-serif\)[^}]*font-weight: 400[^}]*-webkit-text-stroke: 0/)
})

test('brand book pages widen and shift left beside the fixed identity rail', async () => {
  const book = await read('src/components/showroom/brand-book.tsx')
  const css = await read('src/app/globals.css')

  assert.match(book, /page\.width > page\.height \? 'landscape' : 'portrait'/)
  assert.match(book, /sizes="\(max-width: 640px\) calc\(100vw - 24px\), \(max-width: 900px\) 72vw, 68vw"/)
  assert.match(css, /\.brand-book__pages\s*\{[^}]*transform: translateX\(-3vw\)/)
  assert.match(css, /\.brand-book__page--portrait\s*\{[\s\S]*?width: min\(66vw, 1050px\)/)
  assert.match(css, /\.brand-book__page--landscape\s*\{[\s\S]*?width: min\(68vw, 1400px\)/)
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

test('lookbook gallery keeps product details out of the editorial grid', async () => {
  const detail = await read('src/app/[locale]/now/lookbook/[slug]/page.tsx')
  const types = await read('src/types/showroom.ts')
  const now = await read('src/app/[locale]/now/page.tsx')
  const appointment = await read('src/app/[locale]/now/appointment/page.tsx')

  assert.match(detail, /firstFive\.map/)
  assert.match(detail, /remainder\.map/)
  assert.doesNotMatch(detail, /styleNumber|item\.name|款号|品名|STYLE NO\.|ITEM/)
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
  assert.match(data, /appointment-qr-27ps-v2\.png/)
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
  assert.match(detail, /lookbook-brand__panel-card--\$\{position\}/)
  assert.match(detail, /lookbook-brand__remainder/)
  assert.match(css, /\.lookbook-brand__header h1\s*\{[^}]*font-size: clamp\(22px, 1\.8vw, 32px\)[^}]*font-weight: 400/)
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

test('onsite carousel supports keyboard navigation and current-slide indicators', async () => {
  const source = await read('src/components/showroom/onsite-carousel.tsx')
  assert.match(source, /ArrowRight/)
  assert.match(source, /ArrowLeft/)
  assert.match(source, /aria-current/)
  assert.match(source, /setActive/)
})

test('editorial galleries bypass transient optimization for local WebP images', async () => {
  const projects = await read('src/components/showroom/editorial-projects.tsx')
  const recap = await read('src/components/showroom/recap-brand-carousel.tsx')

  assert.match(projects, /<MediaFrame \{\.\.\.image\}[^>]*unoptimized/)
  assert.match(recap, /<Image src=\{src\}[^>]*unoptimized/)
})

test('recap fills the desktop in five columns with portrait posters', async () => {
  const source = await read('src/app/[locale]/recap/page.tsx')
  const css = await read('src/app/globals.css')
  assert.match(source, /recaps[\s\S]*sort/)
  assert.match(source, /recap-grid/)
  assert.ok(source.includes('ratio="640 / 889"'))
  assert.match(css, /\.recap-grid\s*\{[^}]*grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/)
  assert.doesNotMatch(css.match(/\.recap-grid\s*\{[^}]*\}/)?.[0] ?? '', /max-width:/)
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*?\.recap-grid\s*\{[^}]*repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.recap-grid\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/)
})

test('showroom self-hosts the approved free bilingual font system', async () => {
  const layout = await read('src/app/layout.tsx')
  const css = await read('src/app/globals.css')

  assert.match(layout, /@fontsource-variable\/work-sans\/wght\.css/)
  assert.match(layout, /@fontsource\/castoro\/400\.css/)
  assert.match(layout, /@fontsource\/song-myung\/400\.css/)
  assert.match(layout, /@fontsource-variable\/noto-sans-sc/)
  assert.match(layout, /@fontsource-variable\/noto-serif-sc/)
  assert.match(css, /--ys-font-sans: "Work Sans Variable", "Noto Sans SC Variable"/)
  assert.match(css, /--ys-font-serif: "Castoro", "Noto Serif SC Variable"/)
  assert.match(css, /--ys-font-display: "Song Myung", "Noto Serif SC Variable"/)
  assert.match(css, /body\s*\{[^}]*font-family: var\(--ys-font-sans\)/)
  assert.match(css, /--ys-type-navigation: 12px/)
  assert.match(css, /\.site-header nav\s*\{[^}]*font-family: var\(--ys-font-sans\)[^}]*font-size: var\(--ys-type-navigation\)[^}]*font-weight: 500[^}]*letter-spacing: 0[^}]*line-height: 1\.2/)
  assert.match(css, /\.showroom-about__copy h1[\s\S]*?font-family: var\(--ys-font-serif\)/)
  assert.match(css, /\.showroom-about__body\s*\{[^}]*font-family: var\(--ys-font-serif\)[^}]*font-size: clamp\(12px, 0\.85vw, 15px\)[^}]*font-weight: 400[^}]*line-height: 1\.52/)
  assert.match(css, /@media \(min-width: 901px\) and \(max-height: 820px\)[\s\S]*?\.showroom-about__body\s*\{[^}]*font-size: 12px[^}]*line-height: 1\.5/)
  assert.match(css, /\.now-event__summary h1,[\s\S]*?\.brand-index__rail h1,[\s\S]*?\.recap-page > header h1\s*\{[^}]*font-family: var\(--ys-font-serif\)/)
  assert.match(css, /\.site-header nav,[\s\S]*?\.site-language-switch,[\s\S]*?\.showroom-about__more\s*\{[^}]*font-family: var\(--ys-font-sans\)/)
  assert.doesNotMatch(layout + css, /fonts\.googleapis\.com|fonts\.gstatic\.com/)
})
