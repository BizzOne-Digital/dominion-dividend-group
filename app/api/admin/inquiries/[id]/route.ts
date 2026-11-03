import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { Inquiry } from '@/models/Inquiry'
import { INQUIRY_STATUSES } from '@/lib/validation'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }
const patchSchema = z.object({ status: z.enum(INQUIRY_STATUSES) })

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { id } = await params
  if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })
  const parsed = patchSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  try {
    await connectDB()
    const res = await Inquiry.updateOne({ _id: id }, { $set: { status: parsed.data.status } })
    if (res.matchedCount === 0) return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/inquiries] update failed', err)
    return NextResponse.json({ error: 'Unable to update inquiry.' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const { id } = await params
  if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })
  try {
    await connectDB()
    const res = await Inquiry.deleteOne({ _id: id })
    if (res.deletedCount === 0) return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/inquiries] delete failed', err)
    return NextResponse.json({ error: 'Unable to delete inquiry.' }, { status: 500 })
  }
}
