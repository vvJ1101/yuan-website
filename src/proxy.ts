import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (/\.[^/]+$/.test(pathname)) return NextResponse.next()

  const savedLocale = request.cookies.get('showroom-locale')?.value

  if (pathname === '/cn' || pathname.startsWith('/cn/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (savedLocale === 'en' && pathname !== '/en' && !pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
    return NextResponse.redirect(url, 307)
  }

  const requestHeaders = new Headers(request.headers)
  const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh-CN'

  requestHeaders.set('x-showroom-locale', locale)

  if (locale === 'en') return NextResponse.next({ request: { headers: requestHeaders } })

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/cn' : `/cn${pathname}`
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
