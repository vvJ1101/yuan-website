import Image from 'next/image'
import Link from 'next/link'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Locale, Recap } from '@/types/showroom'

export function RecapEditorial({ locale, recap, previous, next }: { locale: Locale; recap: Recap; previous: Recap; next: Recap }) {
  const cn = locale === 'cn'
  const stories = cn ? [
    { label: '主题', title: '装饰艺术的回声', text: '几何线条、对称秩序与温润金色，是装饰艺术留下的视觉记忆。Echoes of Deco 以此为起点，让经典美学在当代语境里再次发生。' },
    { label: '风格', title: '秩序、光泽与当代剪影', text: '空间以清晰的轴线串联起衣物、器物与人。金属光泽、深色木质和克制的几何细节，在柔和光线中建立出冷静而温暖的节奏。' },
    { label: '故事', title: '从图像走向真实的相遇', text: '一个季度的想象，由海报上的线条开始，逐渐落入可以触摸的材质、可以穿行的展场，以及订货会中真实的交流。人们在此停留、观看与对话，也让主题继续向外延伸。' },
  ] : [
    { label: 'Theme', title: 'An echo of Art Deco', text: 'Geometric lines, symmetry and the warmth of gold recall the visual language of Art Deco. Echoes of Deco begins with these enduring codes and brings their classical elegance into a contemporary setting.' },
    { label: 'Style', title: 'Order, lustre and modern silhouettes', text: 'Clear spatial axes connect clothing, objects and people. Metallic accents, dark timber and restrained geometry establish a mood that feels precise yet warm, shaped by softened light and deliberate pauses.' },
    { label: 'Story', title: 'From an image to a shared encounter', text: 'The season begins as lines on a poster, then unfolds through tactile materials, a space to move through and the conversations of the ordering period. Visitors pause, look and meet, allowing the theme to continue beyond the room.' },
  ]
  const captions = cn ? ['建筑秩序', '会面之间', '光线与器物', '主题的回声'] : ['Spatial order', 'Between meetings', 'Light & objects', 'Echo of the theme']
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
          <p className="recap-editorial__summary">{cn ? '一场围绕经典美学、当代衣着与真实相遇展开的季度订货会。' : 'A seasonal ordering presentation shaped by classical aesthetics, contemporary clothing and real encounters.'}</p>
          <dl className="recap-editorial__facts">
            <div><dt>{cn ? '订货会' : 'Ordering period'}</dt><dd>{recap.date && localize(recap.date, locale)}</dd></div>
            <div><dt>{cn ? '地点' : 'Location'}</dt><dd>{cn ? '上海市黄浦区会馆街55号\n绿地外滩中心 T3 栋 41F' : '41F, Tower T3, Greenland Bund Center\n55 Huiguan Street, Huangpu District, Shanghai'}</dd></div>
          </dl>
        </div>
      </header>

      <section className="recap-editorial__story" aria-label={cn ? '主题故事' : 'Theme story'}>
        {stories.map((story, index) => <article key={story.label}>
          <div className="recap-editorial__story-index"><span>{String(index + 1).padStart(2, '0')}</span>{story.label}</div>
          <div><h2>{story.title}</h2><p>{story.text}</p></div>
        </article>)}
      </section>

      <section className="recap-editorial__space" aria-labelledby="space-title">
        <div className="recap-editorial__section-heading"><h2 id="space-title">{cn ? '空间现场' : 'Inside the showroom'}</h2><p>{cn ? '光线、物件与相聚的片刻。' : 'Light, objects and moments of encounter.'}</p></div>
        <div className="recap-editorial__space-grid">{captions.map((caption, i) => <figure key={caption}>
          <p>{caption}</p>
          <Image src={`/images/showroom/recap/27ps/space-${i + 1}.webp`} alt={caption} width={1080} height={1622} sizes="(max-width: 640px) 86vw, 42vw" />
          <figcaption>{String(i + 1).padStart(2, '0')}</figcaption>
        </figure>)}</div>
      </section>
    </article>
    <nav className="recap-detail__pager" aria-label={cn ? '浏览往季回顾' : 'Browse recaps'}>
      <Link href={localePath(locale, `/recap/${previous.slug}`)}><span>← {cn ? '上一季' : 'Previous'}</span><strong>{previous.season}</strong></Link>
      <Link href={localePath(locale, `/recap/${next.slug}`)}><span>{cn ? '下一季' : 'Next'} →</span><strong>{next.season}</strong></Link>
    </nav>
  </main>
}
