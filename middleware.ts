import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySession } from './lib/session-token'

/**
 * First line of defence for /admin and /api/admin. Every admin page layout and
 * admin API route ALSO validates the session server-side.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLogin = pathname === '/admin/login'
  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value)

  if (pathname.startsWith('/api/admin') || pathname === '/api/upload') {
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.next()
  }

  if (isLogin) {
    if (session) return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    return NextResponse.next()
  }

  if (!session) {
    const url = new URL('/admin/login', req.url)
    return NextResponse.redirect(url)
  }
  if (pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/upload'],
}
