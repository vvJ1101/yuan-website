import type { Locale, LocalizedText } from '@/types/showroom'

export const locales = ['cn', 'en'] as const

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale]
}

const editorialCategoryLabels: Record<string, LocalizedText> = {
  ALL: { cn: '全部', en: 'ALL' },
  CURRENT: { cn: '正在进行', en: 'CURRENT' },
  UPCOMING: { cn: '即将开始', en: 'UPCOMING' },
  ARCHIVE: { cn: '往期活动', en: 'ARCHIVE' },
  FASHION: { cn: '时尚', en: 'FASHION' },
  ART: { cn: '艺术', en: 'ART' },
  DESIGN: { cn: '设计', en: 'DESIGN' },
  CULTURE: { cn: '文化', en: 'CULTURE' },
}

export function localizeEditorialCategory(value: string, locale: Locale): string {
  return editorialCategoryLabels[value]?.[locale] ?? value
}
