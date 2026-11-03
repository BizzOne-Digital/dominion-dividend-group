import { z } from 'zod'
import { ICON_NAMES } from './icon-names'

const text = (max = 300) => z.string().trim().max(max)
const longText = (max = 4000) => z.string().trim().max(max)

/** Image fields only accept MongoDB uploads, bundled images, or Unsplash. */
export const imageUrl = z
  .string()
  .trim()
  .max(500)
  .refine(
    (v) =>
      v === '' ||
      /^\/api\/uploads\/(products|gallery|pages|misc)\/[A-Za-z0-9._-]+$/.test(v) ||
      /^\/images\/[A-Za-z0-9._/-]+$/.test(v) ||
      v.startsWith('https://images.unsplash.com/'),
    'Image must be an uploaded image, a /images path, or an Unsplash URL',
  )

/** Links: internal paths or http(s) URLs only (blocks javascript: etc). */
export const linkUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === '' || (v.startsWith('/') && !v.startsWith('//')) || /^https?:\/\/[^\s]+$/.test(v), 'Invalid URL')

const optionalEmail = z.string().trim().max(200).refine((v) => v === '' || z.string().email().safeParse(v).success, 'Invalid email')

export const iconName = z.enum(ICON_NAMES)

export const iconItem = z.object({ title: text(120), description: longText(600), icon: iconName })
export type IconItem = z.infer<typeof iconItem>

/* ---------------- Site settings ---------------- */
export const siteSettingsSchema = z.object({
  companyName: text(160),
  shortName: text(80),
  tagline: text(160),
  logoUrl: imageUrl,
  faviconUrl: imageUrl,
  email: optionalEmail,
  phone: text(40),
  linkedinUrl: linkUrl,
  footerText: longText(1000),
  legalDisclaimer: longText(2000),
  socialLinks: z.array(z.object({ label: text(60), url: linkUrl })).max(10),
})
export type SiteSettings = z.infer<typeof siteSettingsSchema>

/* ---------------- Home ---------------- */
export const homeSchema = z.object({
  heroTitle: text(200),
  heroDescription: longText(1200),
  heroImageUrl: imageUrl,
  primaryCtaText: text(60),
  primaryCtaUrl: linkUrl,
  secondaryCtaText: text(60),
  secondaryCtaUrl: linkUrl,
  missionLabel: text(60),
  missionHeading: text(120),
  missionText: longText(1500),
  pillarsLabel: text(60),
  pillars: z.array(iconItem).max(6),
  businessLabel: text(60),
  businessHeading: text(160),
  businessCards: z.array(iconItem).max(6),
  seedLabel: text(60),
  seedHeading: text(160),
  seedNoticeTitle: text(200),
  seedDescription: longText(1500),
  seedLegalNote: longText(1000),
  seedCtaText: text(60),
  approachLabel: text(60),
  approachHeading: text(160),
  approachText: longText(1500),
  principles: z.array(iconItem).max(6),
  roadmapLabel: text(60),
  roadmapHeading: text(160),
  roadmapIntro: longText(1000),
  roadmap: z.array(z.object({ phase: text(40), title: text(120), description: longText(600), status: text(40) })).max(8),
  commitmentsLabel: text(60),
  commitmentsHeading: text(160),
  commitmentsText: longText(1500),
  commitments: z.array(text(200)).max(12),
  commitmentsImageUrl: imageUrl,
  ctaHeading: text(160),
  ctaText: longText(800),
  ctaButtonText: text(60),
  ctaButtonUrl: linkUrl,
  sections: z.object({
    approach: z.boolean(),
    roadmap: z.boolean(),
    commitments: z.boolean(),
    cta: z.boolean(),
    mission: z.boolean(),
    pillars: z.boolean(),
    businessModel: z.boolean(),
    seedRound: z.boolean(),
  }),
})
export type HomeContent = z.infer<typeof homeSchema>

/* ---------------- About ---------------- */
export const aboutSchema = z.object({
  heroLabel: text(80),
  heroTitle: text(200),
  heroIntro: longText(1200),
  heroImageUrl: imageUrl,
  whoWeAreTitle: text(120),
  whoWeAreText: longText(2000),
  statusNote: text(300),
  whoWeAreImageUrl: imageUrl,
  missionTitle: text(120),
  missionText: longText(1500),
  visionTitle: text(120),
  visionIntro: longText(1000),
  visionItems: z.array(text(160)).max(12),
  frameworkTitle: text(120),
  frameworkIntro: longText(1000),
  frameworkItems: z.array(iconItem).max(12),
  initiativesTitle: text(120),
  initiatives: z.array(z.object({ title: text(120), description: longText(800) })).max(6),
  initiativesDisclaimer: longText(800),
  initiativesImageUrl: imageUrl,
})
export type AboutContent = z.infer<typeof aboutSchema>

/* ---------------- Contact ---------------- */
export const contactSchema = z.object({
  heading: text(160),
  intro: longText(1000),
  businessName: text(160),
  statusNote: text(200),
  email: optionalEmail,
  phone: text(40),
  showPhone: z.boolean(),
  location: text(120),
  businessHours: text(120),
  inquiryCategories: z.array(text(80).min(1)).min(1).max(12),
})
export type ContactContent = z.infer<typeof contactSchema>

/* ---------------- Business model ---------------- */
export const businessPageSchema = z.object({
  heading: text(160),
  subheading: text(250),
  intro: longText(1500),
  heroImageUrl: imageUrl,
  disclaimer: longText(1200),
})
export type BusinessModelPage = z.infer<typeof businessPageSchema>

export const businessSectionSchema = z.object({
  title: text(160).min(1),
  description: longText(2000),
  icon: iconName,
  imageUrl: imageUrl,
  bullets: z.array(text(200)).max(15),
  visible: z.boolean(),
})
export type BusinessSection = z.infer<typeof businessSectionSchema> & { order: number }
export const businessSectionsSchema = z.array(businessSectionSchema).max(20)

/* ---------------- Seed round ---------------- */
export const seedRoundSchema = z.object({
  published: z.boolean(),
  showInNav: z.boolean(),
  heroLabel: text(80),
  title: text(200),
  intro: longText(1500),
  heroImageUrl: imageUrl,
  targetLabel: text(120),
  targetDisplay: text(60),
  targetNote: longText(600),
  useOfCapitalTitle: text(120),
  useOfCapital: z.array(text(160)).max(20),
  supportTitle: text(160),
  supportText: longText(2500),
  distinctionTitle: text(120),
  distinctionText: longText(2000),
  legalNotice: longText(2000),
})
export type SeedRoundSettings = z.infer<typeof seedRoundSchema>

/* ---------------- Inquiry ---------------- */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  category: z.string().trim().min(1, 'Please select an inquiry category').max(80),
  message: z.string().trim().min(10, 'Please enter a message of at least 10 characters').max(5000),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
})

export const INQUIRY_STATUSES = ['new', 'read', 'archived'] as const
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number]
