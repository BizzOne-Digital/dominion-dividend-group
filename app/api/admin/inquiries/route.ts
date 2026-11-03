import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Inquiry } from '@/models/Inquiry'
import { INQUIRY_STATUSES, type InquiryStatus } from '@/lib/validation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const params = new URL(req.url).searchParams
  const status = params.get('status')
  const category = params.get('category')

  const filter: Record<string, string> = {}
  if (status && (INQUIRY_STATUSES as readonly string[]).includes(status)) filter.status = status as InquiryStatus
  if (category && category.length <= 80) filter.category = category

  try {
    await connectDB()
    const [items, categories] = await Promise.all([
      Inquiry.find(filter).sort({ createdAt: -1 }).limit(500).lean(),
      Inquiry.distinct('category'),
    ])
    return NextResponse.json({
      data: items.map((i) => ({
        id: String(i._id), name: i.name, email: i.email, category: i.category, message: i.message,
        status: i.status, createdAt: i.createdAt,
      })),
      categories,
    })
  } catch (err) {
    console.error('[admin/inquiries] list failed', err)
    return NextResponse.json({ error: 'Unable to load inquiries.' }, { status: 500 })
  }
}
