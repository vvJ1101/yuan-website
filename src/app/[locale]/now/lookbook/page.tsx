import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

function displayBrandName(slug: string) {
  return slug.replaceAll('-', ' ').toUpperCase()
}

export default async function LookbookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main className="lookbook-page">
      <section className="lookbook-index" aria-labelledby="lookbook-index-title">
        <header>
          <h1 id="lookbook-index-title">EXHIBITION BRANDS</h1>
          <p>{currentEvent.season}</p>
        </header>
        <div className="lookbook-index__grid">
          {currentEvent.exhibitionBrandSlugs.map((brandSlug, index) => (
            <Link className="lookbook-index__card" href={localePath(locale, `/now/lookbook/${brandSlug}`)} key={brandSlug}>
              <MediaFrame
                src={`/images/showroom/now/lookbook/${brandSlug}.webp`}
                alt={`${displayBrandName(brandSlug)} ${locale === 'cn' ? '参展品牌海报' : 'exhibition poster'}`}
                ratio="4 / 5"
                sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 16vw"
                priority={index < 6}
              />
              <span>{displayBrandName(brandSlug)}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
