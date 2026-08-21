import { notFound } from 'next/navigation'

import { BrandRoom } from '@/components/showroom/brand-room'
import { brands } from '@/data/showroom'
import { isLocale, locales } from '@/lib/showroom-i18n'

export function generateStaticParams() {
  return locales.flatMap((locale) => brands.map((brand) => ({ locale, slug: brand.slug })))
}

export default async function BrandRoomPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) notFound()

  const index = brands.findIndex((brand) => brand.slug === slug)
  if (index < 0) notFound()

  const brand = brands[index]
  const previous = brands[(index - 1 + brands.length) % brands.length]
  const next = brands[(index + 1) % brands.length]

  return <BrandRoom locale={locale} brand={brand} previous={previous} next={next} />
}
