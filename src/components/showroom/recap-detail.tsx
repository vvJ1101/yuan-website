import Image from 'next/image'
import Link from 'next/link'

import { MediaFrame } from '@/components/showroom/media-frame'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Locale, Recap } from '@/types/showroom'

interface RecapDetailProps {
  locale: Locale
  recap: Recap
  previous: Recap
  next: Recap
}

export function RecapDetail({ locale, recap, previous, next }: RecapDetailProps) {
  const title = localize(recap.title, locale)

  return (
    <main className="recap-detail">
      <Link className="recap-detail__close" href={localePath(locale, '/recap')}>CLOSE</Link>

      {recap.video && (
        <section className="recap-detail__video-opening" aria-labelledby="recap-video-title">
          <div className="recap-detail__video-media">
            <video autoPlay muted playsInline controls poster={recap.videoPoster ?? recap.poster} preload="metadata">
              <source src={recap.video} />
            </video>
          </div>
          <div className="recap-detail__video-shade" aria-hidden="true" />
          <div className="recap-detail__video-identity">
            <p>{recap.season}</p>
            <h1 id="recap-video-title">{title}</h1>
          </div>
          <span className="recap-detail__scroll-cue" aria-hidden="true">SCROLL TO REVIEW ↓</span>
        </section>
      )}

      <article className="recap-detail__article" aria-labelledby="recap-article-title">
        <header className="recap-detail__intro">
          <p className="recap-detail__kicker">YUAN SHOWROOM / RECAP</p>
          <h1 id="recap-article-title"><span>{recap.season}</span>{title}</h1>
          <dl>
            {recap.city && <div><dt>{locale === 'cn' ? '城市' : 'CITY'}</dt><dd>{localize(recap.city, locale)}</dd></div>}
            {recap.date && <div><dt>{locale === 'cn' ? '季次' : 'SEASON'}</dt><dd>{localize(recap.date, locale)}</dd></div>}
          </dl>
          {recap.description && <p className="recap-detail__lead">{localize(recap.description, locale)}</p>}
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

        {recap.gallery.length > 0 && (
          <section className="recap-detail__gallery" aria-label={locale === 'cn' ? '现场照片' : 'On-site gallery'}>
            {recap.gallery.map((src, index) => (
              <MediaFrame
                key={`${recap.slug}-gallery-${index + 1}`}
                src={src}
                alt={`${recap.season} ${locale === 'cn' ? '现场照片' : 'on-site view'} ${index + 1}`}
                ratio={index === 0 || index % 5 === 0 ? '16 / 10' : '4 / 5'}
                sizes={index === 0 || index % 5 === 0 ? '(max-width: 900px) 100vw, 900px' : '(max-width: 900px) 50vw, 442px'}
                priority={!recap.video && index === 0}
              />
            ))}
          </section>
        )}
      </article>

      <nav className="recap-detail__pager" aria-label={locale === 'cn' ? '浏览往季回顾' : 'Browse recaps'}>
        <Link href={localePath(locale, `/recap/${previous.slug}`)}>
          <span>← {locale === 'cn' ? '上一季' : 'PREVIOUS'}</span>
          <strong>{previous.season}</strong>
        </Link>
        <Link href={localePath(locale, `/recap/${next.slug}`)}>
          <span>{locale === 'cn' ? '下一季' : 'NEXT'} →</span>
          <strong>{next.season}</strong>
        </Link>
      </nav>
    </main>
  )
}
