import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaFrame } from '@/components/showroom/media-frame'
import { currentEvent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

const lookbooksBySlug = new Map(currentEvent.lookbooks.map((lookbook) => [lookbook.brandSlug, lookbook]))

function displayBrandName(slug: string) {
  return slug.replaceAll('-', ' ').toUpperCase()
}

export default async function LookbookPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
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
          {currentEvent.exhibitionBrandSlugs.map((brandSlug, index) => {
            const card = (
              <>
                <MediaFrame
                  src={`/images/showroom/now/lookbook/${brandSlug}.webp`}
                  alt={`${displayBrandName(brandSlug)} ${locale === 'cn' ? '参展品牌封面' : 'exhibition cover'}`}
                  ratio="4 / 5"
                  sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 16vw"
                  priority={index < 6}
                />
                <span>{displayBrandName(brandSlug)}</span>
              </>
            )

            return lookbooksBySlug.has(brandSlug) ? (
              <Link className="lookbook-index__card" href={`#lookbook-${brandSlug}`} key={brandSlug}>
                {card}
              </Link>
            ) : (
              <div className="lookbook-index__card" key={brandSlug}>{card}</div>
            )
          })}
        </div>
      </section>

      {currentEvent.lookbooks.map((lookbook) => {
        const name = displayBrandName(lookbook.brandSlug)
        const metadata = [
          ['DESIGNER', lookbook.designer],
          ['CATEGORY', localize(lookbook.category, locale)],
          ['ORIGIN', localize(lookbook.origin, locale)],
          ['ESTABLISHED', lookbook.established],
          ['WEBSITE', lookbook.website],
        ] as const

        return (
          <section className="lookbook-detail" id={`lookbook-${lookbook.brandSlug}`} key={lookbook.brandSlug}>
            <div className="lookbook-detail__copy">
              <h2>{name}</h2>
              <p className="lookbook-detail__season">{lookbook.season} LOOKBOOK</p>
              <p className="lookbook-detail__description">{localize(lookbook.description, locale)}</p>
              <dl>
                {metadata.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <MediaFrame
              className="lookbook-detail__main"
              src={lookbook.images[0]}
              alt={`${name} ${locale === 'cn' ? '主造型' : 'main look'}`}
              ratio="2 / 3"
              sizes="(max-width: 900px) 100vw, 28vw"
            />

            <div className="lookbook-detail__auxiliary">
              {lookbook.images.slice(1).map((src, index) => (
                <MediaFrame
                  src={src}
                  alt={`${name} ${locale === 'cn' ? '造型' : 'look'} ${index + 1}`}
                  ratio="2 / 3"
                  sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 15vw"
                  key={`${lookbook.brandSlug}-${index + 1}`}
                />
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
