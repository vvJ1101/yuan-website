import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { LookbookImageButton, LookbookViewer } from '@/components/showroom/lookbook-viewer'
import { LookbookDock } from '@/components/showroom/lookbook-dock'
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

  return (
    <main className="lookbook-brand">
      <header className="lookbook-brand__header">
        <div><h1>{brand.name}</h1><p>{currentEvent.season} LOOKBOOK</p></div>
        <Link href={localePath(locale, '/now/lookbook')}>CLOSE</Link>
      </header>
      <LookbookViewer images={brand.items.map((item) => item.image)} name={brand.name} locale={locale}>
      <div className="lookbook-brand__panels" aria-label={`${brand.name} LOOKBOOK`}>
        <LookbookDock>
          {firstFive.map((item, index) => {
            const position = index === 2 ? 'hero' : 'side'
            return (
              <article className={`lookbook-brand__panel-card lookbook-brand__panel-card--${position}`} key={`${brand.slug}-${index}`}>
                <LookbookImageButton index={index} label={`${locale === 'cn' ? '查看大图' : 'View image'} — ${brand.name} LOOK ${index + 1}`}>
                <MediaFrame
                  src={item.image}
                  alt={`${brand.name} LOOK ${String(index + 1).padStart(2, '0')}`}
                  ratio="2 / 3"
                  sizes="(max-width: 640px) 45vw, 28vw"
                  priority
                />
                </LookbookImageButton>
              </article>
            )
          })}
        </LookbookDock>
        {remainder.length > 0 && (
          <section className="lookbook-brand__remainder">
            {remainder.map((item, index) => (
              <article className="lookbook-item" key={`${brand.slug}-remainder-${index}`}>
                <LookbookImageButton index={index + 5} label={`${locale === 'cn' ? '查看大图' : 'View image'} — ${brand.name} LOOK ${index + 6}`}>
                <MediaFrame
                  src={item.image}
                  alt={`${brand.name} LOOK ${String(index + 6).padStart(2, '0')}`}
                  ratio="384 / 573"
                  sizes="(max-width: 640px) 50vw, 16vw"
                />
                </LookbookImageButton>
              </article>
            ))}
          </section>
        )}
      </div>
      </LookbookViewer>
    </main>
  )
}
