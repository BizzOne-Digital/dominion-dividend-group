'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'

export function ConfirmModal({ open, title, message, confirmLabel = 'Delete', busy, onConfirm, onCancel }: {
  open: boolean; title: string; message: React.ReactNode; confirmLabel?: string; busy?: boolean; onConfirm: () => void; onCancel: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="absolute inset-0 bg-ink/60" onClick={onCancel} aria-hidden="true" />
      <div className="relative w-full max-w-md animate-fade-up rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="size-5 text-red-700" aria-hidden="true" />
          </span>
          <div>
            <h2 id="confirm-title" className="font-serif text-2xl font-semibold text-ink">{title}</h2>
            <div className="mt-2 text-sm text-muted">{message}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button ref={cancelRef} type="button" onClick={onCancel} className="rounded-md border border-[#d9d2c3] px-4 py-2 text-sm font-semibold text-ink hover:bg-[#f6f4ef]">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-60">
            {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
