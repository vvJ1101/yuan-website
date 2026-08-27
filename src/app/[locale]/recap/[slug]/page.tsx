import { notFound } from 'next/navigation'

import { RecapDetail } from '@/components/showroom/recap-detail'
import { recaps } from '@/data/showroom'
import { isLocale } from '@/lib/showroom-i18n'

const locales = ['cn', 'en'] as const

export function generateStaticParams() {
  return locales.flatMap((locale) => recaps.map((recap) => ({ locale, slug: recap.slug })))
}

export default async function RecapDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) notFound()

  const orderedRecaps = [...recaps].sort((a, b) => a.order - b.order)
  const index = orderedRecaps.findIndex((recap) => recap.slug === slug)
  if (index < 0) notFound()

  return (
    <RecapDetail
      locale={locale}
      recap={orderedRecaps[index]}
      previous={orderedRecaps[(index - 1 + orderedRecaps.length) % orderedRecaps.length]}
      next={orderedRecaps[(index + 1) % orderedRecaps.length]}
    />
  )
}
