'use client'

import { useId } from 'react'
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { ICON_NAMES } from '@/lib/icon-names'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'

export function FormSection({ title, description, children, className }: { title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-lg border border-[#e4dccb] bg-white p-5 shadow-sm sm:p-7', className)}>
      <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

export function TextField({ label, value, onChange, hint, type = 'text', maxLength = 300, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string; type?: string; maxLength?: number; placeholder?: string
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input id={id} type={type} value={value} maxLength={maxLength} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="admin-input" />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function TextArea({ label, value, onChange, rows = 4, hint, maxLength = 4000 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string; maxLength?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <textarea id={id} rows={rows} value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} className="admin-input resize-y leading-relaxed" />
      <p className="mt-1 flex justify-between text-xs text-muted">
        <span>{hint}</span>
        <span>{value.length}/{maxLength}</span>
      </p>
    </div>
  )
}

export function Toggle({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }) {
  const id = useId()
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-[#ece5d6] bg-[#fbfaf6] p-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-ink">{label}</label>
        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn('relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors', checked ? 'bg-pine' : 'bg-[#cfc7b5]')}
      >
        <span className={cn('inline-block size-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

export function IconSelect({ value, onChange, label = 'Icon' }: { value: string; onChange: (v: string) => void; label?: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-cream">
          <Icon name={value} className="size-5 text-gold-deep" />
        </span>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="admin-input">
          {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  )
}

/** Editable list of strings. */
export function StringList({ label, items, onChange, placeholder = 'New item', max = 20 }: {
  label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string; max?: number
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{label}</legend>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <input aria-label={`${label} item ${i + 1}`} value={item} maxLength={200} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} className="admin-input" />
            <RowControls index={i} length={items.length} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="rounded-md border border-dashed border-[#d9d2c3] p-4 text-center text-sm text-muted">No items yet.</p>}
      {items.length < max && (
        <button type="button" onClick={() => onChange([...items, placeholder])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-pine hover:underline">
          <Plus className="size-4" aria-hidden="true" /> Add item
        </button>
      )}
    </fieldset>
  )
}

/** Editable list of objects with a custom row renderer. */
export function ItemList<T>({ label, items, onChange, render, create, max = 12, itemLabel = 'Item' }: {
  label: string; items: T[]; onChange: (v: T[]) => void; render: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode
  create: () => T; max?: number; itemLabel?: string
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-ink">{label}</legend>
      <ol className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="rounded-md border border-[#e4dccb] bg-[#fbfaf6] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-muted uppercase">{itemLabel} {i + 1}</span>
              <RowControls index={i} length={items.length} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
            </div>
            <div className="space-y-4">{render(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))), i)}</div>
          </li>
        ))}
      </ol>
      {items.length === 0 && <p className="rounded-md border border-dashed border-[#d9d2c3] p-4 text-center text-sm text-muted">No {itemLabel.toLowerCase()}s yet.</p>}
      {items.length < max && (
        <button type="button" onClick={() => onChange([...items, create()])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-pine hover:underline">
          <Plus className="size-4" aria-hidden="true" /> Add {itemLabel.toLowerCase()}
        </button>
      )}
    </fieldset>
  )
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr
  const copy = [...arr]
  const [x] = copy.splice(from, 1)
  copy.splice(to, 0, x)
  return copy
}

function RowControls({ index, length, onMove, onRemove }: { index: number; length: number; onMove: (to: number) => void; onRemove: () => void }) {
  const btn = 'inline-flex size-8 items-center justify-center rounded border border-[#d9d2c3] bg-white text-muted hover:text-ink disabled:opacity-30'
  return (
    <div className="flex shrink-0 gap-1">
      <button type="button" className={btn} onClick={() => onMove(index - 1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="size-4" aria-hidden="true" /></button>
      <button type="button" className={btn} onClick={() => onMove(index + 1)} disabled={index === length - 1} aria-label="Move down"><ArrowDown className="size-4" aria-hidden="true" /></button>
      <button type="button" className={cn(btn, 'hover:border-red-300 hover:text-red-700')} onClick={onRemove} aria-label="Remove"><Trash2 className="size-4" aria-hidden="true" /></button>
    </div>
  )
}

export function SaveBar({ onSave, saving, dirty }: { onSave: () => void; saving: boolean; dirty: boolean }) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-[#e4dccb] bg-[#f6f4ef]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <div className="flex items-center justify-end gap-4">
        <span className="text-sm text-muted">{dirty ? 'You have unsaved changes.' : 'All changes saved.'}</span>
        <button type="button" onClick={onSave} disabled={saving || !dirty} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-pine px-6 text-sm font-semibold text-ivory transition hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50">
          {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export function LoadingBlock() {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-muted" role="status">
      <Loader2 className="size-6 animate-spin text-gold-deep" aria-hidden="true" /> Loading...
    </div>
  )
}
