/** Edge-safe session token helpers (used by middleware and Node routes). */
import { SignJWT, jwtVerify } from 'jose'

export const SESSION_COOKIE = 'ddg_admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

const ISSUER = 'ddg-admin'
const AUDIENCE = 'ddg-admin-panel'

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 characters long')
  }
  return new TextEncoder().encode(secret)
}

export async function signSession(email: string): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(email)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret())
}

export async function verifySession(token: string | undefined): Promise<{ email: string } | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret(), { issuer: ISSUER, audience: AUDIENCE, algorithms: ['HS256'] })
    if (payload.role !== 'admin' || typeof payload.sub !== 'string') return null
    return { email: payload.sub }
  } catch {
    return null
  }
}
