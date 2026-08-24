import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiteHeader } from '@/components/showroom/site-header'
import { isLocale } from '@/lib/showroom-i18n'

const localeMetadata = {
  cn: {
    title: 'YUAN SHOWROOM国际时尚品牌管理平台',
    description: 'YUAN SHOWROOM连接国际设计师品牌与中国市场，提供品牌代理、订货会与长期运营支持。',
    language: 'zh-CN',
  },
  en: {
    title: 'YUAN SHOWROOM | International Fashion Brand Platform',
    description: 'YUAN SHOWROOM connects international designer brands with the Chinese market through representation, ordering events, and long-term operations.',
    language: 'en',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) return {}

  const content = localeMetadata[locale]
  const canonical = locale === 'cn' ? 'https://yuanshowroom.cn' : 'https://yuanshowroom.cn/en'

  return {
    title: { absolute: content.title },
    description: content.description,
    alternates: {
      canonical,
      languages: {
        'zh-CN': 'https://yuanshowroom.cn',
        en: 'https://yuanshowroom.cn/en',
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      locale: locale === 'cn' ? 'zh_CN' : 'en_US',
    },
    other: { 'content-language': content.language },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return <><SiteHeader locale={locale} />{children}</>
}
