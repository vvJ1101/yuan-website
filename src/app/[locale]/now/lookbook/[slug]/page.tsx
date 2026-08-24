import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, locales } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

function displayBrandName(slug: string) {
  return slug.replaceAll('-', ' ').toUpperCase()
}

export function generateStaticParams() {
  return locales.flatMap((locale) => currentEvent.exhibitionBrandSlugs.map((slug) => ({ locale, slug })))
}

export default async function ExhibitionLookbookPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale) || !currentEvent.exhibitionBrandSlugs.includes(slug)) notFound()

  const lookbook = currentEvent.lookbooks.find((entry) => entry.brandSlug === slug)
  const name = displayBrandName(slug)

  return (
    <main className="lookbook-brand">
      <header className="lookbook-brand__header">
        <div><h1>{name}</h1><p>{currentEvent.season} LOOKBOOK</p></div>
        <Link href={localePath(locale, '/now/lookbook')}>CLOSE</Link>
      </header>
      <section className="lookbook-brand__gallery" aria-label={`${name} LOOKBOOK`}>
        {lookbook ? lookbook.images.map((src, index) => (
          <MediaFrame
            src={src}
            alt={`${name} ${locale === 'cn' ? '款式' : 'look'} ${index + 1}`}
            ratio="2 / 3"
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 31vw"
            priority={index < 3}
            key={`${slug}-look-${index + 1}`}
          />
        )) : (
          <MediaFrame
            src={`/images/showroom/now/lookbook/${slug}.webp`}
            alt={`${name} ${locale === 'cn' ? '参展品牌海报' : 'exhibition poster'}`}
            ratio="4 / 5"
            sizes="(max-width: 640px) 100vw, 38vw"
            priority
          />
        )}
      </section>
      {!lookbook && <p className="lookbook-brand__pending">{locale === 'cn' ? 'LOOKBOOK 即将更新' : 'LOOKBOOK COMING SOON'}</p>}
    </main>
  )
}
