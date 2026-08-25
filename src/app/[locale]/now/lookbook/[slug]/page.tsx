import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, locales } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export function generateStaticParams() {
  return locales.flatMap((locale) => currentEvent.exhibitionBrands.map((brand) => ({ locale, slug: brand.slug })))
}

export default async function ExhibitionLookbookPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const brand = currentEvent.exhibitionBrands.find((entry) => entry.slug === slug)
  if (!brand) notFound()
  const firstFive = brand.items.slice(0, 5)
  const remainder = brand.items.slice(5)
  const positions = ['left-top', 'hero', 'right-top', 'left-bottom', 'right-bottom'] as const

  return (
    <main className="lookbook-brand">
      <header className="lookbook-brand__header">
        <div><h1>{brand.name}</h1><p>{currentEvent.season} LOOKBOOK</p></div>
        <Link href={localePath(locale, '/now/lookbook')}>CLOSE</Link>
      </header>
      <div className="lookbook-brand__panels" aria-label={`${brand.name} LOOKBOOK`}>
        <section className="lookbook-brand__panel">
          {firstFive.map((item, index) => {
            const position = positions[index]
            return (
              <article className={`lookbook-brand__panel-card lookbook-brand__panel-card--${position}`} key={`${brand.slug}-${index}`}>
                <MediaFrame
                  src={item.image}
                  alt={`${brand.name} LOOK ${String(index + 1).padStart(2, '0')}`}
                  ratio={position === 'hero' ? '3 / 4' : '1 / 1'}
                  sizes={position === 'hero' ? '(max-width: 640px) 50vw, 50vw' : '(max-width: 640px) 50vw, 24vw'}
                  priority
                />
              </article>
            )
          })}
        </section>
        {remainder.length > 0 && (
          <section className="lookbook-brand__remainder">
            {remainder.map((item, index) => (
              <article className="lookbook-item" key={`${brand.slug}-remainder-${index}`}>
                <MediaFrame
                  src={item.image}
                  alt={`${brand.name} LOOK ${String(index + 6).padStart(2, '0')}`}
                  ratio="384 / 573"
                  sizes="(max-width: 640px) 50vw, 16vw"
                />
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
