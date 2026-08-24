import type { Locale, LocalizedText } from '@/types/showroom'

export const locales = ['cn', 'en'] as const

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale]
}
