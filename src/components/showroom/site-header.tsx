'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { switchLocalePath } from '@/lib/showroom-i18n'
import type { Locale } from '@/types/showroom'

const items = [
  { label: 'BRANDS', href: 'brands' },
  { label: 'ABOUT', href: 'about' },
  { label: 'NOW', href: 'now' },
  { label: 'ON-SITE', href: 'on-site' },
  { label: 'RECAP', href: 'recap' },
] as const

function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  return (
    <div className="site-language-switch" aria-label={locale === 'cn' ? '语言' : 'Language'}>
      {(['cn', 'en'] as const).map((nextLocale) => (
        <Link
          key={nextLocale}
          href={switchLocalePath(pathname, nextLocale)}
          aria-current={locale === nextLocale ? 'page' : undefined}
        >
          {nextLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="site-header">
      <Link className="site-logo" href={`/${locale}`}>
        YUAN<br />SHOWROOM
      </Link>
      <nav aria-label={locale === 'cn' ? '主导航' : 'Primary navigation'}>
        {items.map((item) => (
          <Link key={item.href} href={`/${locale}/${item.href}`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <LanguageSwitch locale={locale} />
    </header>
  )
}
