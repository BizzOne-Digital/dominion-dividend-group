import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import { StoredUpload } from '@/models/StoredUpload'
import { deleteStoredUploadByUrl, getReferencedUploadUrls, isAllowedFolder } from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** List uploads (metadata only - binary data is never included). */
export async function GET(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const folder = new URL(req.url).searchParams.get('folder')
  try {
    await connectDB()
    const filter = folder && isAllowedFolder(folder) ? { folder } : {}
    const [files, referenced] = await Promise.all([
      StoredUpload.find(filter).select('-data').sort({ createdAt: -1 }).limit(500).lean(),
      getReferencedUploadUrls(),
    ])
    return NextResponse.json({
      data: files.map((f) => {
        const url = `/api/uploads/${f.folder}/${f.filename}`
        return {
          id: String(f._id), folder: f.folder, filename: f.filename, mimeType: f.mimeType, size: f.size,
          createdAt: f.createdAt, url, inUse: referenced.has(url),
        }
      }),
    })
  } catch (err) {
    console.error('[admin/images] list failed', err)
    return NextResponse.json({ error: 'Unable to load images.' }, { status: 500 })
  }
}

/**
 * DELETE ?id=<id>         - image manager delete (explicit, confirmed by admin)
 * DELETE ?url=<url>       - discard an unsaved upload; refused if the image is referenced by content
 */
export async function DELETE(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const params = new URL(req.url).searchParams
  const id = params.get('id')
  const url = params.get('url')

  try {
    await connectDB()
    if (id) {
      if (!isValidObjectId(id)) return NextResponse.json({ error: 'Invalid image id.' }, { status: 400 })
      const res = await StoredUpload.deleteOne({ _id: id })
      if (res.deletedCount === 0) return NextResponse.json({ error: 'Image not found.' }, { status: 404 })
      return NextResponse.json({ success: true })
    }
    if (url) {
      const referenced = await getReferencedUploadUrls()
      if (referenced.has(url)) return NextResponse.json({ success: true, skipped: 'in-use' })
      await deleteStoredUploadByUrl(url)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Missing id or url.' }, { status: 400 })
  } catch (err) {
    console.error('[admin/images] delete failed', err)
    return NextResponse.json({ error: 'Unable to delete image.' }, { status: 500 })
  }
}
