import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/types/showroom'

interface BrandBookData {
  name: string
  pages: readonly {
    src: string
    width: number
    height: number
  }[]
}

interface BrandBookProps {
  locale: Locale
  book: BrandBookData
  closeHref: string
}

export function BrandBook({ locale, book, closeHref }: BrandBookProps) {
  return (
    <main className="brand-book">
      <Link className="brand-book__close" href={closeHref}>
        CLOSE
      </Link>

      <h1 className="brand-book__title">
        {book.name} <span aria-hidden="true">—</span> BRAND BOOK
      </h1>
      <div className="brand-book__pages" aria-label={`${book.name} Brand Book`}>
        {book.pages.map((page, index) => (
          <figure
            className={`brand-book__page brand-book__page--${page.width > page.height ? 'landscape' : 'portrait'}`}
            key={page.src}
          >
            <Image
              src={page.src}
              alt={`${book.name} Brand Book ${locale === 'cn' ? '第' : 'page'} ${index + 1}${locale === 'cn' ? ' 页' : ''}`}
              width={page.width}
              height={page.height}
              sizes="(max-width: 640px) calc(100vw - 24px), 54vw"
              priority={index === 0}
            />
          </figure>
        ))}
      </div>
    </main>
  )
}
