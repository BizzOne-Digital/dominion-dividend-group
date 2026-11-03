import { cn } from '@/lib/utils'

/** Small gold uppercase label with a hairline, e.g. "OUR BUSINESS MODEL ——". */
export function Eyebrow({ children, tone = 'light', className, as: Tag = 'p' }: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
  as?: 'p' | 'span' | 'h2'
}) {
  return (
    <Tag className={cn('eyebrow flex items-center gap-4', tone === 'dark' ? 'text-gold-light' : 'text-gold-text', className)}>
      <span>{children}</span>
      <span aria-hidden="true" className={cn('h-px w-12 origin-left animate-line sm:w-16', tone === 'dark' ? 'bg-gold/70' : 'bg-gold')} />
    </Tag>
  )
}
