import { Schema, model, models, type Model } from 'mongoose'

interface RateLimitDoc { key: string; count: number; expiresAt: Date }

const RateLimitSchema = new Schema<RateLimitDoc>({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
})
// MongoDB removes expired windows automatically
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const RateLimit: Model<RateLimitDoc> =
  (models.RateLimit as Model<RateLimitDoc>) || model<RateLimitDoc>('RateLimit', RateLimitSchema)
