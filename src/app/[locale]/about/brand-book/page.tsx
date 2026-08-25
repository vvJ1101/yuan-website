import { notFound } from 'next/navigation'

import { BrandBook } from '@/components/showroom/brand-book'
import { companyBrandBook } from '@/data/company-brand-book'
import { isLocale } from '@/lib/showroom-i18n'
import { localePath } from '@/lib/showroom-routing'

export default async function CompanyBrandBookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return <BrandBook locale={locale} book={companyBrandBook} closeHref={localePath(locale, '/about')} />
}
