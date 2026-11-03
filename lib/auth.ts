import 'server-only'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE, SESSION_MAX_AGE, verifySession } from './session-token'

export async function setSessionCookie(token: string) {
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.set(SESSION_COOKIE, '', {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0,
  })
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const store = await cookies()
  return verifySession(store.get(SESSION_COOKIE)?.value)
}

/** Reject cross-site state-changing requests (defence in depth on top of SameSite=strict). */
function isSameOrigin(req: Request): boolean {
  if (req.method === 'GET' || req.method === 'HEAD') return true
  const origin = req.headers.get('origin')
  if (!origin) return true
  try {
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
    return new URL(origin).host === host
  } catch {
    return false
  }
}

/**
 * Server-side guard for every admin API route.
 * Returns an error response to send, or null when the request is authorised.
 */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}
