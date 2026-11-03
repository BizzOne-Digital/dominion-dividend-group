import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { StoredUpload } from '@/models/StoredUpload'
import { isAllowedFolder, matchesSignature, MAX_UPLOAD_BYTES, MIME_EXTENSIONS } from '@/lib/uploads'

export const runtime = 'nodejs'

/** Admin image upload. Binary is stored in MongoDB (StoredUpload) - never on the filesystem. */
export async function POST(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const file = form.get('file')
  const folder = form.get('folder')

  if (!isAllowedFolder(folder)) return NextResponse.json({ error: 'Invalid upload folder.' }, { status: 400 })
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided.' }, { status: 400 })

  const ext = MIME_EXTENSIONS[file.type]
  if (!ext) return NextResponse.json({ error: 'Unsupported image type.' }, { status: 415 })
  if (file.size === 0) return NextResponse.json({ error: 'File is empty.' }, { status: 400 })
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'Maximum image size is 8MB.' }, { status: 413 })

  const buffer = Buffer.from(await file.arrayBuffer())
  if (buffer.length > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'Maximum image size is 8MB.' }, { status: 413 })
  if (!matchesSignature(buffer, file.type)) {
    return NextResponse.json({ error: 'File content does not match its image type.' }, { status: 415 })
  }

  const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`

  try {
    await connectDB()
    await StoredUpload.create({ folder, filename, mimeType: file.type, size: buffer.length, data: buffer })
  } catch (err) {
    console.error('[upload] failed to store file', err)
    return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 })
  }

  return NextResponse.json(
    { success: true, url: `/api/uploads/${folder}/${filename}`, filename, size: buffer.length, folder },
    { status: 201 },
  )
}
