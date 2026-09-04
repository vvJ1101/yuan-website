import { notFound } from 'next/navigation'

import { NowEventDirectory } from '@/components/showroom/now-event-directory'
import { currentEvent } from '@/data/showroom'
import { isLocale, localize } from '@/lib/showroom-i18n'

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return <NowEventDirectory locale={locale} eventTitle={localize(currentEvent.title, locale)} season={currentEvent.season} />
}
