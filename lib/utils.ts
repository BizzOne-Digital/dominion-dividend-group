export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Legacy disk URLs (/uploads, /public/uploads) do not survive Vercel deploys: fall back safely. */
export function normalizeImageUrl(url?: string | null, fallback: string = PLACEHOLDER_IMAGE): string {
  if (!url) return fallback
  if (url.startsWith('/uploads/') || url.startsWith('/public/uploads/')) return fallback
  return url
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function siteUrl(path = ''): string | undefined {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  return base ? `${base}${path}` : undefined
}
