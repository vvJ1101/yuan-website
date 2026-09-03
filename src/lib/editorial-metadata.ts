import type { Metadata } from 'next'

import { localePath } from './showroom-routing'
import type { Locale } from '@/types/showroom'

export function editorialMetadata(locale: Locale, path: string, title: string, sample: boolean): Metadata {
  const url = `https://yuanshowroom.cn${localePath(locale, path)}`
  return {
    title: { absolute: `${title} | YUAN SHOWROOM` },
    alternates: {
      canonical: url,
      languages: { 'zh-CN': localePath('cn', path), en: localePath('en', path) },
    },
    openGraph: { title, url },
    robots: { index: !sample, follow: true },
  }
}
