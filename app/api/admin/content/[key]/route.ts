import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { CONTENT_REGISTRY, isContentKey, mergeWithDefaults } from '@/lib/content/registry'
import { cleanupRemovedUploads } from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ key: string }> }

export async function GET(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { key } = await params
  if (!isContentKey(key)) return NextResponse.json({ error: 'Unknown content type' }, { status: 404 })

  try {
    await connectDB()
    const { model, defaults } = CONTENT_REGISTRY[key]
    const doc = await model.findOne({ key: 'singleton' }).lean<Record<string, unknown>>()
    return NextResponse.json({ data: mergeWithDefaults(defaults, doc), updatedAt: doc?.updatedAt ?? null })
  } catch (err) {
    console.error('[admin/content] load failed', err)
    return NextResponse.json({ error: 'Unable to load content.' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { key } = await params
  if (!isContentKey(key)) return NextResponse.json({ error: 'Unknown content type' }, { status: 404 })

  const { model, schema } = CONTENT_REGISTRY[key]
  const parsed = schema.safeParse((await req.json().catch(() => null))?.data)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json(
      { error: `Validation failed: ${issue?.path.join('.') || 'content'} - ${issue?.message}` },
      { status: 400 },
    )
  }

  try {
    await connectDB()
    const before = await model.findOne({ key: 'singleton' }).lean()
    const update: Record<string, unknown> = { ...(parsed.data as object) }
    if (key === 'seed-round' && update.published && !(before as { published?: boolean } | null)?.published) {
      update.publishedAt = new Date()
    }
    const saved = await model
      .findOneAndUpdate({ key: 'singleton' }, { $set: update }, { upsert: true, new: true, setDefaultsOnInsert: true })
      .lean()

    // Old images are deleted only after the new content saved successfully.
    await cleanupRemovedUploads(before, saved)
    revalidatePath('/', 'layout')
    return NextResponse.json({ success: true, data: parsed.data })
  } catch (err) {
    console.error('[admin/content] save failed', err)
    return NextResponse.json({ error: 'Unable to save content.' }, { status: 500 })
  }
}
