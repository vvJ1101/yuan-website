import { notFound } from 'next/navigation'

import { BrandGrid } from '@/components/showroom/brand-grid'
import { brands } from '@/data/showroom'
import { isLocale } from '@/lib/showroom-i18n'

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return <BrandGrid locale={locale} brands={brands} />
}
