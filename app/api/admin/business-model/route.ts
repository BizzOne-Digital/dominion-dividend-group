import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { loadBusinessSections } from '@/lib/content'
import { BusinessModelSection } from '@/models/BusinessModelSection'
import { businessSectionsSchema } from '@/lib/validation'
import { cleanupRemovedUploads } from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  return NextResponse.json({ data: await loadBusinessSections() })
}

/** Replaces the ordered list of business-model sections (order = array index). */
export async function PUT(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  const parsed = businessSectionsSchema.safeParse((await req.json().catch(() => null))?.data)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json({ error: `Validation failed: ${issue?.path.join('.')} - ${issue?.message}` }, { status: 400 })
  }

  try {
    await connectDB()
    const before = await BusinessModelSection.find({}, { imageUrl: 1 }).lean()
    const docs = parsed.data.map((s, i) => ({ ...s, order: i }))
    const session = await BusinessModelSection.startSession()
    try {
      await session.withTransaction(async () => {
        await BusinessModelSection.deleteMany({}, { session })
        if (docs.length) await BusinessModelSection.insertMany(docs, { session })
      })
    } catch {
      // Standalone servers without transactions: fall back to sequential writes.
      await BusinessModelSection.deleteMany({})
      if (docs.length) await BusinessModelSection.insertMany(docs)
    } finally {
      await session.endSession()
    }
    await cleanupRemovedUploads(before, docs)
    revalidatePath('/', 'layout')
    return NextResponse.json({ success: true, data: docs })
  } catch (err) {
    console.error('[admin/business-model] save failed', err)
    return NextResponse.json({ error: 'Unable to save content.' }, { status: 500 })
  }
}
