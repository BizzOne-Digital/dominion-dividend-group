import 'server-only'
import { connectDB } from './db'
import { StoredUpload } from '@/models/StoredUpload'
import { BusinessModelSection } from '@/models/BusinessModelSection'
import { CONTENT_REGISTRY } from './content/registry'

export const ALLOWED_FOLDERS = ['products', 'gallery', 'pages', 'misc'] as const
export type UploadFolder = (typeof ALLOWED_FOLDERS)[number]

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export function isAllowedFolder(folder: unknown): folder is UploadFolder {
  return typeof folder === 'string' && (ALLOWED_FOLDERS as readonly string[]).includes(folder)
}

/** Filenames are always server-generated (`${timestamp}-${hex}.${ext}`); anything else is rejected. */
export function isValidFilename(filename: unknown): filename is string {
  if (typeof filename !== 'string') return false
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) return false
  return /^\d{10,16}-[a-f0-9]{8,32}\.(jpg|png|webp|gif)$/.test(filename)
}

/** Verify the file signature matches the declared MIME type (never trust the browser alone). */
export function matchesSignature(buf: Buffer, mime: string): boolean {
  if (buf.length < 12) return false
  switch (mime) {
    case 'image/jpeg':
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff
    case 'image/png':
      return buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    case 'image/gif':
      return buf.subarray(0, 4).toString('ascii') === 'GIF8'
    case 'image/webp':
      return buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP'
    default:
      return false
  }
}

export function parseUploadUrl(url: unknown): { folder: UploadFolder; filename: string } | null {
  if (typeof url !== 'string' || !url.startsWith('/api/uploads/')) return null
  const parts = url.slice('/api/uploads/'.length).split('?')[0].split('/')
  if (parts.length !== 2) return null
  const [folder, filename] = parts
  if (!isAllowedFolder(folder) || !isValidFilename(filename)) return null
  return { folder, filename }
}

/** Delete a MongoDB-stored upload by its public URL. Non-upload URLs are ignored. */
export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  if (!url.startsWith('/api/uploads/')) return false
  const parsed = parseUploadUrl(url)
  if (!parsed) return false
  await connectDB()
  const res = await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename })
  return res.deletedCount === 1
}

/** Recursively collect every /api/uploads/ URL referenced inside a value. */
export function collectUploadUrls(value: unknown, acc: Set<string> = new Set()): Set<string> {
  if (typeof value === 'string') {
    if (value.startsWith('/api/uploads/')) acc.add(value)
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectUploadUrls(v, acc))
  } else if (value && typeof value === 'object' && !(value instanceof Date)) {
    Object.values(value).forEach((v) => collectUploadUrls(v, acc))
  }
  return acc
}

/** Every upload URL currently referenced by any content document. */
export async function getReferencedUploadUrls(): Promise<Set<string>> {
  await connectDB()
  const acc = new Set<string>()
  const docs = await Promise.all(
    Object.values(CONTENT_REGISTRY).map(({ model }) => model.findOne({ key: 'singleton' }).lean()),
  )
  docs.forEach((d) => collectUploadUrls(d, acc))
  const sections = await BusinessModelSection.find({}, { imageUrl: 1 }).lean()
  sections.forEach((s) => collectUploadUrls(s.imageUrl, acc))
  return acc
}

/**
 * Run AFTER new content has saved successfully: removes uploads that were referenced
 * before, are no longer referenced anywhere (replaced or removed images).
 */
export async function cleanupRemovedUploads(before: unknown, after: unknown): Promise<number> {
  const newUrls = collectUploadUrls(after)
  const removed = [...collectUploadUrls(before)].filter((u) => !newUrls.has(u))
  if (removed.length === 0) return 0
  const stillReferenced = await getReferencedUploadUrls()
  let deleted = 0
  for (const url of removed) {
    if (stillReferenced.has(url)) continue
    try {
      if (await deleteStoredUploadByUrl(url)) deleted++
    } catch (err) {
      console.error('[uploads] cleanup failed for', url, err)
    }
  }
  return deleted
}
