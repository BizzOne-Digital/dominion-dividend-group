import { NextResponse } from 'next/server'
import { connectDB, isDbConfigured } from '@/lib/db'
import { Inquiry } from '@/models/Inquiry'
import { inquirySchema } from '@/lib/validation'
import { getContactContent } from '@/lib/content'
import { getClientIp, sanitizeText } from '@/lib/sanitize'
import { getRateLimit, hitRateLimit } from '@/lib/rate-limit'
import { sendInquiryNotification } from '@/lib/mail'

export const runtime = 'nodejs'

const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000

export async function POST(req: Request) {
  const parsed = inquirySchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return NextResponse.json({ error: 'Please correct the highlighted fields.', fieldErrors }, { status: 400 })
  }

  // Honeypot filled: pretend success, store nothing.
  if (parsed.data.website) return NextResponse.json({ success: true })

  if (!isDbConfigured()) {
    return NextResponse.json({ error: 'Inquiries are temporarily unavailable. Please email us directly.' }, { status: 503 })
  }

  const contact = await getContactContent()
  const category = sanitizeText(parsed.data.category)
  if (!contact.inquiryCategories.includes(category)) {
    return NextResponse.json({ error: 'Please select a valid inquiry category.', fieldErrors: { category: ['Invalid category'] } }, { status: 400 })
  }

  const rlKey = `contact:${getClientIp(req.headers)}`
  try {
    const rl = await getRateLimit(rlKey, LIMIT)
    if (rl.blocked) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }
    await hitRateLimit(rlKey, WINDOW_MS)

    const inquiry = {
      name: sanitizeText(parsed.data.name),
      email: sanitizeText(parsed.data.email).toLowerCase(),
      category,
      message: sanitizeText(parsed.data.message),
    }
    await connectDB()
    await Inquiry.create({ ...inquiry, status: 'new' })

    try {
      await sendInquiryNotification(inquiry)
    } catch (err) {
      console.error('[contact] email notification failed (inquiry was saved)', err)
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[contact] failed to save inquiry', err)
    return NextResponse.json({ error: 'Unable to submit your inquiry. Please try again.' }, { status: 500 })
  }
}
