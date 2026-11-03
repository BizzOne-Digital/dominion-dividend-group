import type { LucideIcon } from 'lucide-react'

export function EmptyState({ icon: I, title, description }: { icon: LucideIcon; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#d9d2c3] bg-white px-6 py-16 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/40 bg-cream">
        <I className="size-7 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  )
}
