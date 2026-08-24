import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, locales, localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export function generateStaticParams() {
  return locales.flatMap((locale) => currentEvent.exhibitionBrands.map((brand) => ({ locale, slug: brand.slug })))
}

export default async function ExhibitionLookbookPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const brand = currentEvent.exhibitionBrands.find((entry) => entry.slug === slug)
  if (!brand) notFound()

  return (
    <main className="lookbook-brand">
      <header className="lookbook-brand__header">
        <div><h1>{brand.name}</h1><p>{currentEvent.season} LOOKBOOK</p></div>
        <Link href={localePath(locale, '/now/lookbook')}>CLOSE</Link>
      </header>
      <section className="lookbook-brand__gallery" aria-label={`${brand.name} LOOKBOOK`}>
        {brand.items.map((item, index) => (
          <article className="lookbook-item" key={item.styleNumber}>
            <MediaFrame
              src={item.image}
              alt={`${brand.name} ${item.styleNumber} ${localize(item.name, locale)}`}
              ratio="2 / 3"
              sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 16vw"
              priority={index < 3}
            />
            <dl className="lookbook-item__information">
              <div>
                <dt>{locale === 'cn' ? '款号' : 'STYLE NO.'}</dt>
                <dd>{item.styleNumber}</dd>
              </div>
              <div>
                <dt>{locale === 'cn' ? '品名' : 'ITEM'}</dt>
                <dd>{localize(item.name, locale)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </main>
  )
}
