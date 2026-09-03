import Image from 'next/image'
import Link from 'next/link'
import { RecapBrandCarousel } from '@/components/showroom/recap-brand-carousel'
import { recap27psBrands, recap27psIntroduction } from '@/data/recap-27ps'
import { recap27psStatics } from '@/data/recap-27ps-statics'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Locale, Recap } from '@/types/showroom'

export function RecapEditorial({ locale, recap, previous, next }: { locale: Locale; recap: Recap; previous: Recap; next: Recap }) {
  const cn = locale === 'cn'
  const groups = ['Ready to wear', 'Footwear', 'Kaicos By Yuan'] as const
  const captions = cn ? ['物件与光线', '相聚的场所', '停留片刻', '主题的回声'] : ['Objects & light', 'A place to meet', 'A moment of pause', 'An echo of the theme']
  return <main className="recap-editorial">
    <Link className="recap-editorial__back" href={localePath(locale, '/recap')}>← {cn ? '全部订货会回顾' : 'All seasonal reviews'}</Link>
    <article>
      <header className="recap-editorial__opening">
        <a className="recap-editorial__poster" href={recap.poster} target="_blank" rel="noreferrer" aria-label={cn ? '查看完整海报（新窗口）' : 'View full poster (new window)'}>
          <Image src={recap.poster} alt="Echoes of Deco — 2027 Pre-Spring" width={1772} height={2362} sizes="(max-width: 640px) 84vw, 38vw" priority />
        </a>
        <div className="recap-editorial__opening-text">
          <h1 lang="en">{recap.title.en}</h1>
          <p className="recap-editorial__season">{cn ? '2027 早春 & 胶囊系列' : '2027 Pre-Spring & Capsule Collection'}</p>
          <div className="recap-editorial__prose">{recap27psIntroduction.map((text, i) => <p key={i}>{localize(text, locale)}</p>)}</div>
          <dl className="recap-editorial__facts">
            <div><dt>{cn ? '订货会' : 'Ordering period'}</dt><dd>{recap.date && localize(recap.date, locale)}</dd></div>
            <div><dt>{cn ? '地点' : 'Location'}</dt><dd>{cn ? '上海市黄浦区会馆街55号\n绿地外滩中心 T3 栋 41F' : '41F, Tower T3, Greenland Bund Center\n55 Huiguan Street, Huangpu District, Shanghai'}</dd></div>
          </dl>
        </div>
      </header>

      <nav className="recap-editorial__roster" aria-label={cn ? '本季品牌目录' : 'This season’s brands'}>
        <div className="recap-editorial__section-heading"><h2>{cn ? '本季品牌' : 'The brands'}</h2><span>{cn ? '* 本季新加入品牌' : '* New this season'}</span></div>
        <div className="recap-editorial__roster-grid">{groups.map(group => <div key={group}>
          <h3 lang="en">{group}</h3>
          <ul>{recap27psBrands.filter(brand => brand.group === group).map(brand => <li key={brand.id}><a href={`#brand-${brand.id}`} lang="en">{brand.name}{brand.isNew && <span aria-hidden="true"> *</span>}</a></li>)}</ul>
        </div>)}</div>
      </nav>

      <section className="recap-editorial__brands" aria-label={cn ? '品牌与现场陈列' : 'Brands in the showroom'}>
        {recap27psBrands.map(brand => <section className="recap-editorial__brand" id={`brand-${brand.id}`} key={brand.id} aria-labelledby={`title-${brand.id}`}>
          <div className="recap-editorial__brand-copy">
            <h2 id={`title-${brand.id}`} lang="en">{brand.name}</h2>
            <p className="recap-editorial__category" lang="en">{brand.group}</p>
            {brand.isNew && <p className="recap-editorial__new">{cn ? '本季新加入' : 'New this season'}</p>}
            <p className="recap-editorial__prose">{localize(brand.note, locale)}</p>
          </div>
          <RecapBrandCarousel images={brand.images} name={brand.name} id={brand.id} locale={locale} />
          <figure className="recap-editorial__brand-static">
            <Image src={recap27psStatics[brand.id].image} alt={`${brand.name} — ${cn ? '精选图像' : 'Selected image'}`} width={1080} height={1622} sizes="(max-width: 640px) 88vw, 42vw" />
            <figcaption><p>{localize(recap27psStatics[brand.id].caption, locale)}</p></figcaption>
          </figure>
        </section>)}
      </section>

      <section className="recap-editorial__space" aria-labelledby="space-title">
        <div className="recap-editorial__section-heading"><h2 id="space-title">{cn ? '衣物之外' : 'Between the collections'}</h2><p>{cn ? '光线、物件与相聚的片刻。' : 'Light, objects and moments of encounter.'}</p></div>
        <div className="recap-editorial__space-grid">{captions.map((caption, i) => <figure key={caption}>
          <Image src={`/images/showroom/recap/27ps/space-${i + 1}.webp`} alt={caption} width={1080} height={1622} sizes="(max-width: 640px) 86vw, 42vw" />
          <figcaption><span>{String(i + 1).padStart(2, '0')}</span>{caption}</figcaption>
        </figure>)}</div>
      </section>

      <section className="recap-editorial__contact" aria-labelledby="contact-title">
        <h2 id="contact-title">{cn ? '与我们联系' : 'Continue the conversation'}</h2>
        <p>{cn ? '关于品牌入驻与买手订货，欢迎联系。' : 'For brand representation and buyer enquiries, get in touch.'}</p>
        <dl>
          <div><dt>{cn ? '品牌入驻' : 'Brand enquiries'}</dt><dd><span>{cn ? '诗雅' : 'Shiya'}</span><a href="mailto:heshiya@yuanshowroom.vip">heshiya@yuanshowroom.vip ↗</a></dd></div>
          <div><dt>{cn ? '买手订货' : 'Buyer enquiries'}</dt><dd><span>Elson</span><a href="mailto:elson@yuanshowroom.vip">elson@yuanshowroom.vip ↗</a></dd></div>
        </dl>
      </section>
    </article>
    <nav className="recap-detail__pager" aria-label={cn ? '浏览往季回顾' : 'Browse recaps'}>
      <Link href={localePath(locale, `/recap/${previous.slug}`)}><span>← {cn ? '上一季' : 'Previous'}</span><strong>{previous.season}</strong></Link>
      <Link href={localePath(locale, `/recap/${next.slug}`)}><span>{cn ? '下一季' : 'Next'} →</span><strong>{next.season}</strong></Link>
    </nav>
  </main>
}
