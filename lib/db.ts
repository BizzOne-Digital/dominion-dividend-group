import mongoose from 'mongoose'

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }

const globalForMongoose = globalThis as unknown as { _ddgMongoose?: MongooseCache }
const cached: MongooseCache =
  globalForMongoose._ddgMongoose ?? (globalForMongoose._ddgMongoose = { conn: null, promise: null })

export function isDbConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI)
}

/** Cached connection: reused across hot reloads and warm serverless invocations. */
export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }
  return cached.conn
}
