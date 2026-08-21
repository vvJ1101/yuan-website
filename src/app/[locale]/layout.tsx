import { notFound } from 'next/navigation'

import { SiteHeader } from '@/components/showroom/site-header'
import { isLocale } from '@/lib/showroom-i18n'

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <div lang={locale === 'cn' ? 'zh-CN' : 'en'}>
      <SiteHeader locale={locale} />
      {children}
    </div>
  )
}
