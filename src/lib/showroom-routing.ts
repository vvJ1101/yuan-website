import type { Locale } from '@/types/showroom'

function cleanPath(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  const withoutLocale = path.replace(/^\/(?:cn|en)(?=\/|$)/, '')
  return withoutLocale || '/'
}

export function localePath(locale: Locale, pathname: string): string {
  const path = cleanPath(pathname)
  if (locale === 'cn') return path
  return path === '/' ? '/en' : `/en${path}`
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  return localePath(nextLocale, pathname)
}

export function isNavigationItemActive(pathname: string, href: string): boolean {
  const path = cleanPath(pathname)
  const sectionPath = `/${href}`
  return path === sectionPath || path.startsWith(`${sectionPath}/`)
}
