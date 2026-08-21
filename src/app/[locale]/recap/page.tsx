import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { recaps } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

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
        <p>RECAP</p>
        <h1>{locale === 'cn' ? '往季订货会回顾' : 'PAST SEASON REVIEW'}</h1>
      </header>
      <section className="recap-grid" aria-label={locale === 'cn' ? '往季订货会' : 'Past ordering seasons'}>
        {orderedRecaps.map((recap, index) => (
          <article className="recap-card" key={recap.slug}>
            <MediaFrame
              src={recap.poster}
              alt={`${recap.season} ${localize(recap.title, locale)}`}
              ratio="3 / 5"
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw"
              priority={index < 4}
            />
            <h2>{recap.season} {locale === 'cn' ? '订货会' : 'ORDERING'}</h2>
            <p>{localize(recap.title, locale)}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
