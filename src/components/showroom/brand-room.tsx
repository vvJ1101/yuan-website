import Link from 'next/link'

import { MediaFrame } from '@/components/showroom/media-frame'
import { localize } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'
import type { Brand, Locale } from '@/types/showroom'

interface BrandRoomProps {
  locale: Locale
  brand: Brand
  previous: Brand
  next: Brand
}

export function BrandRoom({ locale, brand, previous, next }: BrandRoomProps) {
  const introduction = localize(brand.introduction, locale).split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)

  return (
    <main className="brand-room">
      <Link className="brand-room__close" href={localePath(locale, '/brands')}>
        CLOSE
      </Link>

      <section className="brand-room__details" aria-labelledby="brand-room-title">
        <h1 id="brand-room-title" lang="en">{brand.name}</h1>
        <p className="brand-room__city">{localize(brand.city, locale)}</p>
        <p className="brand-room__label">BRAND ROOM</p>
        <span className="brand-room__rule" aria-hidden="true" />
        <div className="brand-room__introduction">
          {introduction.map((paragraph, index) => (
            <p className="brand-room__introduction-paragraph" key={`${brand.slug}-introduction-${index + 1}`}>
              {paragraph}
            </p>
          ))}
        </div>

        <nav className="brand-room__pager" aria-label={locale === 'cn' ? '浏览品牌' : 'Browse brands'}>
          <Link
            href={localePath(locale, `/brands/${previous.slug}`)}
            aria-label={`${locale === 'cn' ? '上一个品牌' : 'Previous brand'}: ${previous.name}`}
          >
            <span aria-hidden="true">←</span>
          </Link>
          <Link
            href={localePath(locale, `/brands/${next.slug}`)}
            aria-label={`${locale === 'cn' ? '下一个品牌' : 'Next brand'}: ${next.name}`}
          >
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </section>

      <section className="brand-room__gallery" aria-label={`${brand.name} ${locale === 'cn' ? '品牌造型' : 'campaign'}`}>
        <MediaFrame
          className="brand-room__main-image"
          src={brand.roomImages[0]}
          alt={`${brand.name} ${locale === 'cn' ? '主造型' : 'main campaign image'}`}
          ratio="16 / 15"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 66vw, 46vw"
          priority
        />
        <div className="brand-room__auxiliary">
          {brand.roomImages.slice(1).map((src, index) => (
            <MediaFrame
              className="brand-room__detail-image"
              src={src}
              alt={`${brand.name} ${locale === 'cn' ? '造型细节' : 'campaign detail'} ${index + 1}`}
              ratio="1 / 1"
              sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 22vw"
              key={`${brand.slug}-detail-${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
