import { notFound } from 'next/navigation'

import { BrandBook } from '@/components/showroom/brand-book'
import { BrandRoom } from '@/components/showroom/brand-room'
import { brandBooks, getBrandBook } from '@/data/brand-books'
import { brands } from '@/data/showroom'
import { isLocale, locales } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export function generateStaticParams() {
  return [
    ...locales.flatMap((locale) => brands.map((brand) => ({ locale, slug: brand.slug }))),
    ...locales.flatMap((locale) => brandBooks.map((book) => ({ locale, slug: book.slug }))),
  ]
}

export default async function BrandRoomPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) notFound()

  const brandBook = getBrandBook(slug)
  if (brandBook) return <BrandBook locale={locale} book={brandBook} closeHref={localePath(locale, '/brands')} />

  const index = brands.findIndex((brand) => brand.slug === slug)
  if (index < 0) notFound()

  const brand = brands[index]
  const previous = brands[(index - 1 + brands.length) % brands.length]
  const next = brands[(index + 1) % brands.length]

  return <BrandRoom locale={locale} brand={brand} previous={previous} next={next} />
}
