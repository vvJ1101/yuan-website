import type { Locale, LocalizedText } from '@/types/showroom'

export const locales = ['cn', 'en'] as const

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale]
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split('/')
  if (parts[1] === 'cn' || parts[1] === 'en') parts[1] = nextLocale
  else parts.splice(1, 0, nextLocale)
  return parts.join('/') || `/${nextLocale}`
}
