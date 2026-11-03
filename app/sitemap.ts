import type { MetadataRoute } from 'next'
import { getSeedRound } from '@/lib/content'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')
  if (!base) return []
  const seed = await getSeedRound()
  const paths = ['/', '/about', '/business-model', '/contact', '/privacy', '/terms', ...(seed.published ? ['/seed-round-1'] : [])]
  return paths.map((p) => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.7 }))
}
