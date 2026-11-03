import 'server-only'
import type { Model } from 'mongoose'
import type { ZodTypeAny } from 'zod'
import {
  AboutContentModel, BusinessModelPageModel, ContactContentModel, HomeContentModel, SeedRoundSettingsModel, SiteSettingsModel,
} from '@/models/content'
import {
  aboutSchema, businessPageSchema, contactSchema, homeSchema, seedRoundSchema, siteSettingsSchema,
} from '../validation'
import {
  defaultAbout, defaultBusinessPage, defaultContact, defaultHome, defaultSeedRound, defaultSiteSettings,
} from './defaults'

export type ContentKey = 'settings' | 'home' | 'about' | 'contact' | 'business-page' | 'seed-round'

export const CONTENT_REGISTRY: Record<
  ContentKey,
  { model: Model<Record<string, unknown>>; schema: ZodTypeAny; defaults: object }
> = {
  settings: { model: SiteSettingsModel, schema: siteSettingsSchema, defaults: defaultSiteSettings },
  home: { model: HomeContentModel, schema: homeSchema, defaults: defaultHome },
  about: { model: AboutContentModel, schema: aboutSchema, defaults: defaultAbout },
  contact: { model: ContactContentModel, schema: contactSchema, defaults: defaultContact },
  'business-page': { model: BusinessModelPageModel, schema: businessPageSchema, defaults: defaultBusinessPage },
  'seed-round': { model: SeedRoundSettingsModel, schema: seedRoundSchema, defaults: defaultSeedRound },
}

export function isContentKey(v: string): v is ContentKey {
  return Object.prototype.hasOwnProperty.call(CONTENT_REGISTRY, v)
}

const META_FIELDS = new Set(['_id', '__v', 'key', 'createdAt', 'updatedAt', 'publishedAt'])

/** Overlay a stored document on top of defaults; nested plain objects merge one level deep. */
export function mergeWithDefaults<T extends object>(defaults: T, doc: Record<string, unknown> | null): T {
  const out = structuredClone(defaults) as Record<string, unknown>
  if (!doc) return out as T
  for (const [k, v] of Object.entries(doc)) {
    if (META_FIELDS.has(k) || v === undefined || v === null || !(k in out)) continue
    const base = out[k]
    if (base && typeof base === 'object' && !Array.isArray(base) && typeof v === 'object' && !Array.isArray(v)) {
      const clean = Object.fromEntries(Object.entries(v as object).filter(([, x]) => x !== undefined && x !== null))
      out[k] = { ...(base as object), ...clean }
    } else {
      out[k] = v
    }
  }
  return JSON.parse(JSON.stringify(out)) as T
}
