import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { recaps } from '@/data/showroom'
import { isLocale } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export default async function RecapPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  const orderedRecaps = [...recaps].sort((a, b) => a.order - b.order)

  return (
    <main className="recap-page">
      <header>
        <p lang="en">RECAP</p>
        <h1>{locale === 'cn' ? '往季订货会回顾' : 'PAST SEASON REVIEW'}</h1>
      </header>
      <section className="recap-grid" aria-label={locale === 'cn' ? '往季订货会' : 'Past ordering seasons'}>
        {orderedRecaps.map((recap, index) => (
          <article className="recap-card" key={recap.slug}>
            <Link className="recap-card__link" href={localePath(locale, `/recap/${recap.slug}`)}>
              <MediaFrame
                src={recap.poster}
                alt={`${recap.season} ${recap.title.en}`}
                ratio={recap.posterRatio ?? '3.5 / 5'}
                sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 20vw"
                priority={index < 5}
              />
              <h2 lang="en">{recap.season} ORDERING</h2>
              <p lang="en">{recap.title.en}</p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
