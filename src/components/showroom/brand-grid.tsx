import Link from 'next/link'

import { MediaFrame } from '@/components/showroom/media-frame'
import { localePath } from '@/lib/showroom-routing'
import type { Brand, BrandCategory, Locale } from '@/types/showroom'

interface BrandGridProps {
  locale: Locale
  brands: readonly Brand[]
}

const categoryOrder: readonly BrandCategory[] = ['RTW', 'FTW', 'ACC']

export function BrandGrid({ locale, brands }: BrandGridProps) {
  return (
    <main className="brand-index">
      <aside className="brand-index__rail" aria-label={locale === 'cn' ? '品牌分类' : 'Brand categories'}>
        <h1>BRANDS</h1>
        <span className="brand-index__rule" aria-hidden="true" />

        <div className="brand-index__taxonomy">
          {categoryOrder.map((category) => (
            <section className="brand-index__category" key={category}>
              <h2>{category}</h2>
              <ul>
                {brands
                  .filter((brand) => brand.category === category)
                  .map((brand) => (
                    <li key={brand.slug}>
                      <Link href={localePath(locale, `/brands/${brand.slug}`)}>{brand.name}</Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <section className="brand-index__matrix" aria-label={locale === 'cn' ? '合作品牌' : 'Partner brands'}>
        {brands.map((brand, index) => (
          <Link
            className="brand-index__card"
            href={localePath(locale, `/brands/${brand.slug}`)}
            key={brand.slug}
          >
            <MediaFrame
              src={brand.cover}
              alt={`${brand.name} ${locale === 'cn' ? '品牌造型' : 'campaign'}`}
              ratio="4 / 5"
              sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 13vw"
              priority={index < 6}
            />
            <span>{brand.name}</span>
          </Link>
        ))}
      </section>
    </main>
  )
}
