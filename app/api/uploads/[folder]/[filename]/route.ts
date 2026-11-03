import { connectDB } from '@/lib/db'
import { StoredUpload } from '@/models/StoredUpload'
import { isAllowedFolder, isValidFilename } from '@/lib/uploads'

export const runtime = 'nodejs'

/** Public delivery of MongoDB-stored images. Filenames are unique and immutable. */
export async function GET(_req: Request, { params }: { params: Promise<{ folder: string; filename: string }> }) {
  const { folder, filename } = await params

  if (!isAllowedFolder(folder) || !isValidFilename(filename)) {
    return new Response('Not found', { status: 404 })
  }

  try {
    await connectDB()
    const file = await StoredUpload.findOne({ folder, filename }).select('mimeType size data').exec()
    if (!file) return new Response('Not found', { status: 404 })

    const bytes = new Uint8Array(file.data as Buffer)
    return new Response(bytes, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
      },
    })
  } catch (err) {
    console.error('[uploads] delivery failed', err)
    return new Response('Server error', { status: 500 })
  }
}
