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
  const archivePending = locale === 'cn' ? '完整回顾即将上线' : 'FULL RECAP COMING SOON'

  return (
    <main className="recap-detail">
      <Link className="recap-detail__close" href={localePath(locale, '/recap')}>CLOSE</Link>

      <section className="recap-detail__hero" aria-labelledby="recap-detail-title">
        <div className="recap-detail__hero-media">
          {recap.video ? (
            <video autoPlay muted playsInline controls poster={recap.videoPoster ?? recap.poster} preload="metadata">
              <source src={recap.video} />
            </video>
          ) : (
            <Image
              src={recap.videoPoster ?? recap.poster}
              alt={`${recap.season} ${title}`}
              fill
              priority
              sizes="100vw"
            />
          )}
        </div>
        <div className="recap-detail__hero-shade" aria-hidden="true" />
        <div className="recap-detail__identity">
          <p>{recap.season}</p>
          <h1 id="recap-detail-title">{title}</h1>
          {!recap.video && <span>{archivePending}</span>}
        </div>
        <span className="recap-detail__scroll-cue" aria-hidden="true">SCROLL TO RECAP ↓</span>
      </section>

      <section className="recap-detail__intro" aria-label={locale === 'cn' ? '回顾简介' : 'Recap introduction'}>
        <p className="recap-detail__kicker">YUAN SHOWROOM / RECAP</p>
        <div>
          <h2>{recap.season}<br />{title}</h2>
          {recap.description && <p>{localize(recap.description, locale)}</p>}
        </div>
        <dl>
          {recap.city && <div><dt>{locale === 'cn' ? '城市' : 'CITY'}</dt><dd>{localize(recap.city, locale)}</dd></div>}
          {recap.date && <div><dt>{locale === 'cn' ? '季次' : 'SEASON'}</dt><dd>{localize(recap.date, locale)}</dd></div>}
        </dl>
      </section>

      {recap.pages.length > 0 && (
        <section className="recap-detail__book" aria-label={locale === 'cn' ? '回顾册' : 'Digital recap'}>
          {recap.pages.map((page, index) => (
            <Image
              key={`${recap.slug}-page-${index + 1}`}
              src={page}
              alt={`${recap.season} ${locale === 'cn' ? '回顾册第' : 'recap page'} ${index + 1}`}
              width={1800}
              height={1200}
              sizes="(max-width: 900px) 100vw, 88vw"
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
              ratio={index === 0 ? '16 / 10' : '4 / 5'}
              sizes={index === 0 ? '(max-width: 900px) 100vw, 62vw' : '(max-width: 900px) 50vw, 31vw'}
              priority={false}
            />
          ))}
        </section>
      )}

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
