import { Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LegalNotice({ title = 'Legal Notice', children, tone = 'cream', className }: {
  title?: string
  children: React.ReactNode
  tone?: 'cream' | 'dark'
  className?: string
}) {
  return (
    <aside
      role="note"
      aria-label={title}
      className={cn(
        'relative overflow-hidden border-l-4 border-gold p-6 sm:p-8',
        tone === 'cream' ? 'bg-sand/70 text-text' : 'border-y border-r border-y-gold/25 border-r-gold/25 bg-ink/60 text-ivory/90',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <Scale className={cn('mt-1 size-6 shrink-0', tone === 'cream' ? 'text-gold-deep' : 'text-gold-light')} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className={cn('eyebrow mb-2', tone === 'cream' ? 'text-gold-text' : 'text-gold-light')}>{title}</p>
          <div className="text-[0.95rem] leading-relaxed">{children}</div>
        </div>
      </div>
    </aside>
  )
}
