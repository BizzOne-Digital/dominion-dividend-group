import Image from 'next/image'
import { normalizeImageUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const DEFAULT_LOGO = '/logo.png'

/**
 * Client logo. Uses /public/logo.png by default; a logo uploaded in
 * Admin → Site Settings overrides it.
 */
export function LogoMark({ logoUrl, className = 'h-16 w-auto', priority = false }: {
  logoUrl?: string
  className?: string
  priority?: boolean
  id?: string
}) {
  return (
    <Image
      src={normalizeImageUrl(logoUrl, DEFAULT_LOGO) || DEFAULT_LOGO}
      alt="Dominion Dividend Group Management Company logo"
      width={1536}
      height={1024}
      sizes="(min-width: 1024px) 160px, 120px"
      priority={priority}
      className={cn('rounded-[3px] object-contain', className)}
    />
  )
}
