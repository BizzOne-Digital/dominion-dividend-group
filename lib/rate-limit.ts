import 'server-only'
import { connectDB } from './db'
import { RateLimit } from '@/models/RateLimit'

/** MongoDB-backed fixed-window limiter (works across serverless instances). */
export async function getRateLimit(key: string, limit: number): Promise<{ blocked: boolean; retryAfter: number }> {
  await connectDB()
  const doc = await RateLimit.findOne({ key }).lean()
  const now = Date.now()
  if (!doc || doc.expiresAt.getTime() <= now) return { blocked: false, retryAfter: 0 }
  return { blocked: doc.count >= limit, retryAfter: Math.ceil((doc.expiresAt.getTime() - now) / 1000) }
}

export async function hitRateLimit(key: string, windowMs: number): Promise<void> {
  await connectDB()
  const now = new Date()
  const existing = await RateLimit.findOne({ key })
  if (!existing || existing.expiresAt <= now) {
    await RateLimit.findOneAndUpdate(
      { key },
      { $set: { count: 1, expiresAt: new Date(now.getTime() + windowMs) } },
      { upsert: true },
    )
    return
  }
  await RateLimit.updateOne({ key }, { $inc: { count: 1 } })
}

export async function clearRateLimit(key: string): Promise<void> {
  await connectDB()
  await RateLimit.deleteOne({ key })
}
