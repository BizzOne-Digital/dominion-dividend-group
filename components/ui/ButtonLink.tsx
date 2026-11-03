import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline' | 'outline-dark'

const styles: Record<Variant, string> = {
  gold: 'bg-gold-metal text-ink shadow-[0_8px_24px_-12px_rgba(201,154,56,0.8)] hover:brightness-110 hover:-translate-y-px',
  outline: 'border border-gold/80 text-gold-light hover:bg-gold hover:text-ink',
  'outline-dark': 'border border-pine/40 text-pine hover:border-pine hover:bg-pine hover:text-ivory',
}

export function ButtonLink({ href, children, variant = 'gold', className, arrow = true }: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] px-6 py-3 font-serif text-lg font-semibold tracking-wide transition-all duration-300',
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />}
    </Link>
  )
}
