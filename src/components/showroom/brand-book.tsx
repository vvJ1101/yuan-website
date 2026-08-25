import Image from 'next/image'
import Link from 'next/link'

import { localePath } from '@/lib/showroom-routing'
import type { BrandBook as BrandBookData } from '@/data/brand-books'
import type { Locale } from '@/types/showroom'

interface BrandBookProps {
  locale: Locale
  book: BrandBookData
}

export function BrandBook({ locale, book }: BrandBookProps) {
  return (
    <main className="brand-book">
      <Link className="brand-book__close" href={localePath(locale, '/brands')}>
        CLOSE
      </Link>

      <h1 className="brand-book__title">
        {book.name} <span aria-hidden="true">—</span> BRAND BOOK
      </h1>
      <div className="brand-book__pages" aria-label={`${book.name} Brand Book`}>
        {book.pages.map((page, index) => (
          <figure
            className="brand-book__page brand-book__page--landscape"
            key={page.src}
          >
            <Image
              src={page.src}
              alt={`${book.name} Brand Book ${locale === 'cn' ? '第' : 'page'} ${index + 1}${locale === 'cn' ? ' 页' : ''}`}
              width={page.width}
              height={page.height}
              sizes="(max-width: 640px) 100vw, (orientation: landscape) 96vh, 48vh"
              priority={index === 0}
            />
          </figure>
        ))}
      </div>
    </main>
  )
}
