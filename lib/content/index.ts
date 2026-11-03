import 'server-only'
import { cache } from 'react'
import { connectDB, isDbConfigured } from '../db'
import { BusinessModelSection } from '@/models/BusinessModelSection'
import { CONTENT_REGISTRY, mergeWithDefaults, type ContentKey } from './registry'
import { defaultBusinessSections } from './defaults'
import type {
  AboutContent, BusinessModelPage, BusinessSection, ContactContent, HomeContent, SeedRoundSettings, SiteSettings,
} from '../validation'

export async function loadSingleton<T extends object>(key: ContentKey): Promise<T> {
  const { model, defaults } = CONTENT_REGISTRY[key]
  if (!isDbConfigured()) return structuredClone(defaults) as T
  try {
    await connectDB()
    const doc = await model.findOne({ key: 'singleton' }).lean<Record<string, unknown>>()
    return mergeWithDefaults(defaults as T, doc)
  } catch (err) {
    console.error(`[content] failed to load "${key}", using defaults`, err)
    return structuredClone(defaults) as T
  }
}

export const getSiteSettings = cache(() => loadSingleton<SiteSettings>('settings'))
export const getHomeContent = cache(() => loadSingleton<HomeContent>('home'))
export const getAboutContent = cache(() => loadSingleton<AboutContent>('about'))
export const getContactContent = cache(() => loadSingleton<ContactContent>('contact'))
export const getBusinessModelPage = cache(() => loadSingleton<BusinessModelPage>('business-page'))
export const getSeedRound = cache(() => loadSingleton<SeedRoundSettings>('seed-round'))

export async function loadBusinessSections(): Promise<BusinessSection[]> {
  if (!isDbConfigured()) return structuredClone(defaultBusinessSections)
  try {
    await connectDB()
    const docs = await BusinessModelSection.find().sort({ order: 1 }).lean()
    if (docs.length === 0) return structuredClone(defaultBusinessSections)
    return docs.map((d, i) => ({
      title: d.title,
      description: d.description ?? '',
      icon: (d.icon ?? 'landmark') as BusinessSection['icon'],
      imageUrl: d.imageUrl ?? '',
      bullets: d.bullets ?? [],
      visible: d.visible ?? true,
      order: d.order ?? i,
    }))
  } catch (err) {
    console.error('[content] failed to load business sections, using defaults', err)
    return structuredClone(defaultBusinessSections)
  }
}

export const getBusinessSections = cache(loadBusinessSections)

/** Seed Round 1 appears in navigation only when published AND enabled for nav. */
export const getSeedNavVisible = cache(async () => {
  const seed = await getSeedRound()
  return seed.published && seed.showInNav
})
