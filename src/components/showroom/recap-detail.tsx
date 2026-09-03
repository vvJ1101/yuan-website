import Image from 'next/image'
import Link from 'next/link'

import { MediaFrame } from '@/components/showroom/media-frame'
import { RecapEditorial } from '@/components/showroom/recap-editorial'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Locale, Recap, RecapSection } from '@/types/showroom'

interface RecapDetailProps {
  locale: Locale
  recap: Recap
  previous: Recap
  next: Recap
}

export function RecapDetail({ locale, recap, previous, next }: RecapDetailProps) {
  if (recap.slug === '27ps-echoes-of-deco') return <RecapEditorial locale={locale} recap={recap} previous={previous} next={next} />
  const title = localize(recap.title, locale)
  const sections: readonly RecapSection[] = recap.sections ?? recap.gallery.map((image) => ({ image }))

  return (
    <main className="recap-detail">
      <Link className="recap-detail__close" href={localePath(locale, '/recap')}>{locale === 'cn' ? '关闭' : 'Close'}</Link>

      {recap.video && (
        <section className="recap-detail__video-opening" aria-labelledby="recap-video-title">
          <div className="recap-detail__video-media">
            <video autoPlay muted playsInline controls poster={recap.videoPoster ?? recap.poster} preload="metadata">
              <source src={recap.video} />
            </video>
          </div>
          <div className="recap-detail__video-shade" aria-hidden="true" />
          <div className="recap-detail__video-identity">
            <p lang="en">{recap.season}</p>
            <h1 id="recap-video-title" lang={locale === 'cn' ? 'zh-CN' : 'en'}>{title}</h1>
          </div>
          <span className="recap-detail__scroll-cue" aria-hidden="true">SCROLL TO REVIEW ↓</span>
        </section>
      )}

      <article className="recap-detail__article" aria-labelledby="recap-article-title">
        <header className="recap-detail__intro">
          <p className="recap-detail__kicker">{locale === 'cn' ? '展会回顾' : 'Seasonal Review'}</p>
          <h1 id="recap-article-title" lang={locale === 'cn' ? 'zh-CN' : 'en'}>{title}</h1>
          <p className="recap-detail__meta">{recap.season}{recap.city && ` · ${localize(recap.city, locale)}`}</p>
          {sections.length > 0 && <a className="recap-detail__gallery-preview" href="#recap-gallery">
          <div className="recap-detail__thumbnails" aria-hidden="true">
            {sections.slice(0, 3).map(({ image: src }, index) => (
              <Image
                key={`${recap.slug}-thumbnail-${index + 1}`}
                src={src}
                alt=""
                width={42}
                height={56}
                sizes="42px"
              />
            ))}
          </div>
          <span className="recap-detail__view-gallery">{locale === 'cn' ? '查看图片' : 'View gallery'}</span>
          </a>}
        </header>

        {recap.pages.length > 0 && (
          <section className="recap-detail__book" aria-label={locale === 'cn' ? '回顾册' : 'Digital recap'}>
            {recap.pages.map((page, index) => (
              <Image
                key={`${recap.slug}-page-${index + 1}`}
                src={page}
                alt={`${recap.season} ${locale === 'cn' ? '回顾册第' : 'recap page'} ${index + 1}`}
                width={1800}
                height={1200}
                sizes="(max-width: 900px) 100vw, 900px"
              />
            ))}
          </section>
        )}

        <MediaFrame
          className="recap-detail__hero"
          src={recap.poster}
          alt={`${recap.season} ${title}`}
          ratio="640 / 889"
          sizes="(max-width: 700px) 92vw, 66vw"
          priority={!recap.video}
        />

        {recap.description && (
          <div className="recap-detail__opening-copy">
            <p>{localize(recap.description, locale)}</p>
            {recap.date && <p>{localize(recap.date, locale)}</p>}
          </div>
        )}

        {sections.length > 0 && (
          <section id="recap-gallery" className="recap-detail__gallery" aria-label={locale === 'cn' ? '现场照片' : 'On-site gallery'}>
            {sections.map((section, index) => (
              <section className="recap-detail__chapter" key={`${recap.slug}-gallery-${index + 1}`}>
                {section.title && <h2>{localize(section.title, locale)}</h2>}
                <MediaFrame
                  className="recap-detail__gallery-item"
                  src={section.image}
                  alt={`${recap.season} ${locale === 'cn' ? '现场照片' : 'on-site view'} ${index + 1}`}
                  ratio="16 / 10"
                  sizes="(max-width: 700px) 86vw, 58vw"
                />
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{localize(paragraph, locale)}</p>
                ))}
              </section>
            ))}
          </section>
        )}
      </article>

      <nav className="recap-detail__pager" aria-label={locale === 'cn' ? '浏览往季回顾' : 'Browse recaps'}>
        <Link href={localePath(locale, `/recap/${previous.slug}`)}>
          <span>← {locale === 'cn' ? '上一季' : 'Previous'}</span>
          <strong>{previous.season}</strong>
        </Link>
        <Link href={localePath(locale, `/recap/${next.slug}`)}>
          <span>{locale === 'cn' ? '下一季' : 'Next'} →</span>
          <strong>{next.season}</strong>
        </Link>
      </nav>
    </main>
  )
}
