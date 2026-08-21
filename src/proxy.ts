import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const locale = request.nextUrl.pathname.split('/')[1] === 'en' ? 'en' : 'zh-CN'

  requestHeaders.set('x-showroom-locale', locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
