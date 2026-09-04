'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { isNavigationItemActive, localePath, switchLocalePath } from '@/lib/showroom-routing'
import type { Locale } from '@/types/showroom'

const items = [
  { label: 'Brands', href: 'brands' },
  { label: 'About', href: 'about' },
  { label: 'Now', href: 'now' },
  { label: 'On-site', href: 'on-site' },
  { label: 'Recap', href: 'recap' },
  { label: 'POP-UP EVENTS', href: 'pop-up-events' },
  { label: 'COLLABORATIONS', href: 'collaborations' },
] as const

function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  return (
    <div className="site-language-switch" lang="en" aria-label={locale === 'cn' ? '语言' : 'Language'}>
      {(['cn', 'en'] as const).map((nextLocale) => (
        <Link
          key={nextLocale}
          href={switchLocalePath(pathname, nextLocale)}
          prefetch={false}
          scroll={false}
          aria-current={locale === nextLocale ? 'page' : undefined}
          onClick={() => {
            document.cookie = `showroom-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
          }}
        >
          {nextLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="site-header__brand" lang="en">
        <Link className="site-logo" href={localePath(locale, '/')}>
          <Image
            className="site-logo__image"
            src="/images/showroom/yuan-logo-white.png"
            alt="YUAN SHOWROOM"
            fill
            sizes="170px"
            priority
          />
        </Link>
      </div>
      <div className="site-header__navigation">
        <nav lang="en" aria-label={locale === 'cn' ? '主导航' : 'Primary navigation'}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, `/${item.href}`)}
              aria-current={isNavigationItemActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitch locale={locale} />
      </div>
    </header>
  )
}
