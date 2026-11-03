'use client'

import { useId, useRef, useState } from 'react'
import { ImageOff, Loader2, RefreshCw, Trash2, Upload } from 'lucide-react'
import { normalizeImageUrl } from '@/lib/utils'
import { useToast } from './Toast'

const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
const MAX_BYTES = 8 * 1024 * 1024

type Folder = 'products' | 'gallery' | 'pages' | 'misc'

/**
 * Reusable admin image field. Uploads to /api/upload (stored in MongoDB) and
 * returns only the public URL via onChange. Replaced/removed images are deleted
 * server-side after the content document saves successfully.
 */
export function AdminImageField({ label, value, onChange, folder = 'pages', hint }: {
  label: string
  value: string
  onChange: (url: string) => void
  folder?: Folder
  hint?: string
}) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [broken, setBroken] = useState(false)
  // Uploads made in this editing session that have not been saved yet.
  const unsaved = useRef<Set<string>>(new Set())

  const discardUnsaved = (url: string) => {
    if (!unsaved.current.has(url)) return
    unsaved.current.delete(url)
    // Server refuses to delete if the URL is referenced by saved content.
    fetch(`/api/admin/images?url=${encodeURIComponent(url)}`, { method: 'DELETE' }).catch(() => undefined)
  }

  async function handleFile(file: File) {
    setError('')
    if (!ACCEPT.includes(file.type)) {
      setError('Unsupported image type.')
      toast.error('Unsupported image type.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('Maximum image size is 8MB.')
      toast.error('Maximum image size is 8MB.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    setUploading(true)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.success) throw new Error(result.error || 'Failed to upload image.')
      const replacing = Boolean(value)
      if (value) discardUnsaved(value)
      unsaved.current.add(result.url)
      setBroken(false)
      onChange(result.url)
      toast.success(replacing ? 'Image replaced successfully. Save changes to apply.' : 'Image uploaded successfully. Save changes to apply.')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to upload image.'
      setError(msg)
      toast.error(msg)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function remove() {
    if (value) discardUnsaved(value)
    onChange('')
    setError('')
    toast.success('Image removed successfully. Save changes to apply.')
  }

  const preview = value ? normalizeImageUrl(value) : ''
  const isLegacy = value && preview !== value

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <div className="flex flex-col gap-4 rounded-md border border-[#e4dccb] bg-[#fbfaf6] p-4 sm:flex-row sm:items-center">
        <div className="relative flex aspect-[16/10] w-full shrink-0 items-center justify-center overflow-hidden rounded border border-[#d9d2c3] bg-white sm:w-48">
          {preview && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploaded/remote image
            <img src={preview} alt={`${label} preview`} className="size-full object-cover" onError={() => setBroken(true)} />
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted">
              <ImageOff className="size-7" aria-hidden="true" />
              <span className="text-xs">{broken ? 'Image unavailable' : 'No image'}</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loader2 className="size-6 animate-spin text-gold-deep" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={ACCEPT.join(',')}
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-md bg-pine px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest disabled:opacity-60">
              {uploading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : value ? <RefreshCw className="size-4" aria-hidden="true" /> : <Upload className="size-4" aria-hidden="true" />}
              {uploading ? 'Uploading...' : value ? 'Replace' : 'Upload'}
            </button>
            {value && (
              <button type="button" disabled={uploading} onClick={remove} className="inline-flex items-center gap-2 rounded-md border border-[#d9d2c3] bg-white px-4 py-2 text-sm font-semibold text-red-800 hover:border-red-300 disabled:opacity-60">
                <Trash2 className="size-4" aria-hidden="true" /> Remove
              </button>
            )}
          </div>
          <p className="truncate text-xs text-muted" title={value}>{value || 'PNG, JPEG, WEBP or GIF. Maximum 8MB.'}</p>
          {isLegacy && <p className="text-xs text-amber-800">Legacy disk URL detected. It will not work on Vercel; please upload a replacement.</p>}
          {hint && <p className="text-xs text-muted">{hint}</p>}
          {error && <p role="alert" className="text-xs font-medium text-red-800">{error}</p>}
        </div>
      </div>
    </div>
  )
}
