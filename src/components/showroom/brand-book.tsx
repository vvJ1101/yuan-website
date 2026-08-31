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

      <aside className="brand-book__identity" aria-label={`${book.name} Brand Book`}>
        <h1 className="brand-book__title">
          <span>{book.name}</span>
          <span>BRAND BOOK</span>
        </h1>
        <span className="brand-book__identity-rule" aria-hidden="true" />
        <p>YUAN SHOWROOM / BRAND ARCHIVE</p>
      </aside>

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
              sizes="(max-width: 640px) calc(100vw - 24px), (max-width: 900px) 72vw, 68vw"
              priority={index === 0}
            />
          </figure>
        ))}
      </div>
    </main>
  )
}
