import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { setSessionCookie } from '@/lib/auth'
import { signSession } from '@/lib/session-token'
import { clearRateLimit, getRateLimit, hitRateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/sanitize'
import { isDbConfigured } from '@/lib/db'

export const runtime = 'nodejs'

const MAX_FAILED_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
// Used when the email does not match, so response timing stays consistent.
let dummyHash: string | null = null
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync('ddg-timing-equaliser', 10))

const bodySchema = z.object({ email: z.string().trim().toLowerCase().email().max(200), password: z.string().min(1).max(200) })

/** Supports a raw bcrypt hash or "base64:<encoded hash>" (avoids `$` expansion issues in .env files). */
function getConfiguredHash(): string | null {
  const raw = process.env.ADMIN_PASSWORD_HASH?.trim()
  if (!raw) return null
  if (raw.startsWith('base64:')) return Buffer.from(raw.slice(7), 'base64').toString('utf8')
  return raw
}

export async function POST(req: Request) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const hash = getConfiguredHash()
  if (!adminEmail || !hash || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin login is not configured on the server.' }, { status: 503 })
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please enter a valid email and password.' }, { status: 400 })

  const rlKey = `login:${getClientIp(req.headers)}`
  const useRateLimit = isDbConfigured()
  if (useRateLimit) {
    const rl = await getRateLimit(rlKey, MAX_FAILED_ATTEMPTS).catch(() => ({ blocked: false, retryAfter: 0 }))
    if (rl.blocked) {
      return NextResponse.json(
        { error: `Too many failed attempts. Try again in ${Math.ceil(rl.retryAfter / 60)} minute(s).` },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
      )
    }
  }

  const emailMatches = parsed.data.email === adminEmail
  const passwordMatches = await bcrypt.compare(parsed.data.password, emailMatches ? hash : getDummyHash()).catch(() => false)

  if (!emailMatches || !passwordMatches) {
    if (useRateLimit) await hitRateLimit(rlKey, WINDOW_MS).catch(() => undefined)
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  if (useRateLimit) await clearRateLimit(rlKey).catch(() => undefined)
  await setSessionCookie(await signSession(adminEmail))
  return NextResponse.json({ success: true })
}
