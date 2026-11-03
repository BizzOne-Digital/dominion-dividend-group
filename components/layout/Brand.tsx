import { LogoMark } from './LogoMark'
import type { SiteSettings } from '@/lib/validation'

/** Header brand: logo image only (the logo already contains the name and tagline). */
export function Brand({ settings }: { settings: SiteSettings; compact?: boolean; id?: string }) {
  return <LogoMark logoUrl={settings.logoUrl} priority className="h-14 w-auto sm:h-16 lg:h-[76px]" />
}
