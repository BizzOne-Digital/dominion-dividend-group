'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Archive, Inbox, Mail, MailOpen, Trash2, X } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { EmptyState } from '@/components/admin/EmptyState'
import { LoadingBlock } from '@/components/admin/fields'
import { useToast } from '@/components/admin/Toast'
import { cn } from '@/lib/utils'

type Status = 'new' | 'read' | 'archived'
type Item = { id: string; name: string; email: string; category: string; message: string; status: Status; createdAt: string }

const STATUS_STYLE: Record<Status, string> = {
  new: 'bg-amber-100 text-amber-900',
  read: 'bg-emerald-100 text-emerald-900',
  archived: 'bg-stone-200 text-stone-700',
}

function InquiriesInner() {
  const toast = useToast()
  const params = useSearchParams()
  const [status, setStatus] = useState(params.get('status') ?? '')
  const [category, setCategory] = useState('')
  const [items, setItems] = useState<Item[] | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState('')
  const [open, setOpen] = useState<Item | null>(null)
  const [toDelete, setToDelete] = useState<Item | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setItems(null)
    setError('')
    const qs = new URLSearchParams()
    if (status) qs.set('status', status)
    if (category) qs.set('category', category)
    try {
      const res = await fetch(`/api/admin/inquiries?${qs}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Unable to load inquiries.')
      setItems(json.data)
      setCategories(json.categories ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load inquiries.')
    }
  }, [status, category])

  useEffect(() => {
    load()
  }, [load])

  async function setItemStatus(item: Item, next: Status, silent = false) {
    if (item.status === next) return
    const res = await fetch(`/api/admin/inquiries/${item.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) })
    if (!res.ok) {
      toast.error('Unable to update inquiry.')
      return
    }
    setItems((list) => list?.map((i) => (i.id === item.id ? { ...i, status: next } : i)) ?? null)
    setOpen((o) => (o && o.id === item.id ? { ...o, status: next } : o))
    if (!silent) toast.success(next === 'archived' ? 'Inquiry archived.' : next === 'read' ? 'Marked as read.' : 'Marked as unread.')
  }

  function openItem(item: Item) {
    setOpen(item)
    if (item.status === 'new') setItemStatus(item, 'read', true)
  }

  async function confirmDelete() {
    if (!toDelete) return
    setBusy(true)
    const res = await fetch(`/api/admin/inquiries/${toDelete.id}`, { method: 'DELETE' })
    setBusy(false)
    if (!res.ok) return toast.error('Unable to delete inquiry.')
    setItems((list) => list?.filter((i) => i.id !== toDelete.id) ?? null)
    if (open?.id === toDelete.id) setOpen(null)
    setToDelete(null)
    toast.success('Inquiry deleted.')
  }

  return (
    <>
      <AdminPageHeader title="Inquiries" description="Messages submitted through the contact form." />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:max-w-xl">
        <div>
          <label htmlFor="f-status" className="mb-1 block text-xs font-semibold tracking-wider text-muted uppercase">Status</label>
          <select id="f-status" value={status} onChange={(e) => setStatus(e.target.value)} className="admin-input">
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-cat" className="mb-1 block text-xs font-semibold tracking-wider text-muted uppercase">Category</label>
          <select id="f-cat" value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {error && <p role="alert" className="text-red-800">{error}</p>}
      {!error && !items && <LoadingBlock />}
      {items && items.length === 0 && <EmptyState icon={Inbox} title="No inquiries" description={status || category ? 'No inquiries match these filters.' : 'Contact form submissions will appear here.'} />}

      {items && items.length > 0 && (
        <ul className="divide-y divide-[#f0ebe0] overflow-hidden rounded-lg border border-[#e4dccb] bg-white">
          {items.map((i) => (
            <li key={i.id}>
              <button type="button" onClick={() => openItem(i)} className={cn('flex w-full flex-col gap-1 px-5 py-4 text-left transition hover:bg-[#fbfaf6] sm:flex-row sm:items-center sm:gap-6', i.status === 'new' && 'bg-amber-50/40')}>
                <span className="min-w-0 flex-1">
                  <span className={cn('block truncate text-ink', i.status === 'new' ? 'font-bold' : 'font-semibold')}>{i.name}</span>
                  <span className="block truncate text-sm text-muted">{i.message}</span>
                </span>
                <span className="text-xs text-muted sm:w-48 sm:shrink-0">{i.category}</span>
                <span className={cn('w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', STATUS_STYLE[i.status])}>{i.status}</span>
                <span className="text-xs text-muted sm:w-24 sm:shrink-0 sm:text-right">{new Date(i.createdAt).toLocaleDateString('en-CA')}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="inq-title">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(null)} aria-hidden="true" />
          <div className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#e4dccb] p-6">
              <div className="min-w-0">
                <h2 id="inq-title" className="font-serif text-2xl font-semibold text-ink">{open.name}</h2>
                <a href={`mailto:${open.email}`} className="text-sm break-all text-pine underline">{open.email}</a>
                <p className="mt-1 text-xs text-muted">{open.category} &middot; {new Date(open.createdAt).toLocaleString('en-CA')}</p>
              </div>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="text-muted hover:text-ink"><X className="size-6" aria-hidden="true" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-text">{open.message}</p>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-[#e4dccb] p-4">
              {open.status === 'read' || open.status === 'archived' ? (
                <button type="button" onClick={() => setItemStatus(open, 'new')} className="inline-flex items-center gap-2 rounded-md border border-[#d9d2c3] px-3 py-2 text-sm font-semibold text-ink"><Mail className="size-4" aria-hidden="true" /> Mark unread</button>
              ) : (
                <button type="button" onClick={() => setItemStatus(open, 'read')} className="inline-flex items-center gap-2 rounded-md border border-[#d9d2c3] px-3 py-2 text-sm font-semibold text-ink"><MailOpen className="size-4" aria-hidden="true" /> Mark read</button>
              )}
              {open.status !== 'archived' && (
                <button type="button" onClick={() => setItemStatus(open, 'archived')} className="inline-flex items-center gap-2 rounded-md border border-[#d9d2c3] px-3 py-2 text-sm font-semibold text-ink"><Archive className="size-4" aria-hidden="true" /> Archive</button>
              )}
              <button type="button" onClick={() => setToDelete(open)} className="ml-auto inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-800"><Trash2 className="size-4" aria-hidden="true" /> Delete</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal open={!!toDelete} title="Delete inquiry?" message="This permanently removes the inquiry. This cannot be undone." busy={busy} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />
    </>
  )
}

export default function InquiriesPage() {
  return (
    <Suspense fallback={<LoadingBlock />}>
      <InquiriesInner />
    </Suspense>
  )
}
