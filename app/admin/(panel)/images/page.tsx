'use client'

import { useCallback, useEffect, useState } from 'react'
import { ImageOff, Images, Trash2 } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { EmptyState } from '@/components/admin/EmptyState'
import { LoadingBlock } from '@/components/admin/fields'
import { useToast } from '@/components/admin/Toast'
import { cn, formatBytes } from '@/lib/utils'

type Upload = { id: string; folder: string; filename: string; mimeType: string; size: number; createdAt: string; url: string; inUse: boolean }

const FILTERS = [
  { value: '', label: 'All' },
  { value: 'pages', label: 'Pages' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'products', label: 'Products' },
  { value: 'misc', label: 'Misc' },
]

export default function ImagesManager() {
  const toast = useToast()
  const [folder, setFolder] = useState('')
  const [items, setItems] = useState<Upload[] | null>(null)
  const [error, setError] = useState('')
  const [target, setTarget] = useState<Upload | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setItems(null)
    setError('')
    try {
      const res = await fetch(`/api/admin/images${folder ? `?folder=${folder}` : ''}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unable to load images.')
      setItems(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load images.')
    }
  }, [folder])

  useEffect(() => {
    load()
  }, [load])

  async function confirmDelete() {
    if (!target) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/images?id=${target.id}`, { method: 'DELETE' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Unable to delete image.')
      setItems((list) => list?.filter((i) => i.id !== target.id) ?? null)
      toast.success('Image removed successfully.')
      setTarget(null)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Unable to delete image.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <AdminPageHeader title="Images" description="All images stored in MongoDB. Upload new images from any page editor." />

      <div role="tablist" aria-label="Filter by folder" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={folder === f.value}
            type="button"
            onClick={() => setFolder(f.value)}
            className={cn('rounded-full border px-4 py-1.5 text-sm font-semibold transition', folder === f.value ? 'border-pine bg-pine text-ivory' : 'border-[#d9d2c3] bg-white text-ink hover:border-pine')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="text-red-800">{error}</p>}
      {!error && !items && <LoadingBlock />}
      {items && items.length === 0 && <EmptyState icon={Images} title="No uploaded images" description="Images uploaded through the page editors will appear here." />}

      {items && items.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((img) => (
            <li key={img.id} className="overflow-hidden rounded-lg border border-[#e4dccb] bg-white shadow-sm">
              <Thumb src={img.url} alt={img.filename} />
              <div className="space-y-1 p-4 text-xs">
                <p className="truncate font-mono text-[0.7rem] text-ink" title={img.filename}>{img.filename}</p>
                <p className="text-muted"><span className="font-semibold capitalize text-ink">{img.folder}</span> &middot; {img.mimeType.replace('image/', '').toUpperCase()} &middot; {formatBytes(img.size)}</p>
                <p className="text-muted">{new Date(img.createdAt).toLocaleString('en-CA')}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className={cn('rounded-full px-2 py-0.5 font-semibold', img.inUse ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100 text-stone-600')}>{img.inUse ? 'In use' : 'Unused'}</span>
                  <button type="button" onClick={() => setTarget(img)} className="inline-flex items-center gap-1.5 rounded-md border border-[#d9d2c3] px-2.5 py-1.5 font-semibold text-red-800 hover:border-red-300" aria-label={`Delete ${img.filename}`}>
                    <Trash2 className="size-3.5" aria-hidden="true" /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        open={!!target}
        title="Delete image?"
        message={
          target?.inUse ? (
            <><strong className="text-red-800">This image is currently used on the website.</strong> Deleting it will show a placeholder wherever it appears. This cannot be undone.</>
          ) : (
            'This permanently removes the image from the database. This cannot be undone.'
          )
        }
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
      />
    </>
  )
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false)
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-[#f6f4ef]">
      {broken ? (
        <ImageOff className="size-8 text-muted" aria-hidden="true" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" onError={() => setBroken(true)} />
      )}
    </div>
  )
}
