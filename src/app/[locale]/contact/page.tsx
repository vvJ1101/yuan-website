import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactPage } from '@/components/showroom/contact-page'
import { isLocale } from '@/lib/showroom-i18n'

const metadataCopy = {
  cn: {
    title: '联系我们 | YUAN SHOWROOM',
    description: '联系 YUAN SHOWROOM，咨询品牌合作、买手订货、样衣、媒体、活动与跨界项目。',
  },
  en: {
    title: 'CONTACT | YUAN SHOWROOM',
    description: 'Contact YUAN SHOWROOM for brand partnerships, buying appointments, samples, press, events and collaborations.',
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const content = metadataCopy[locale]
  const url = locale === 'cn' ? 'https://yuanshowroom.cn/contact' : 'https://yuanshowroom.cn/en/contact'

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': 'https://yuanshowroom.cn/contact',
        en: 'https://yuanshowroom.cn/en/contact',
      },
    },
  }
}

export default async function ContactRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <ContactPage locale={locale} />
}
