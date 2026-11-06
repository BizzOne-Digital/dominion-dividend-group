/**
 * Typed singleton content documents. Each page has its own collection and schema
 * (no unstructured JSON blobs). Image fields store URL strings only - binaries live in StoredUpload.
 */
import { Schema, model, models, type Model } from 'mongoose'

const key = { type: String, default: 'singleton', unique: true }
const iconItem = new Schema({ title: String, description: String, icon: String }, { _id: false })
const opts = { timestamps: true, minimize: false }

function singleton(name: string, schema: Schema): Model<Record<string, unknown>> {
  return (models[name] as Model<Record<string, unknown>>) || model<Record<string, unknown>>(name, schema)
}

export const SiteSettingsModel = singleton(
  'SiteSettings',
  new Schema(
    {
      key, companyName: String, legalName: String, corporationNumber: String, incorporationDate: String, shortName: String, tagline: String, logoUrl: String, faviconUrl: String,
      email: String, phone: String, linkedinUrl: String, footerText: String, legalDisclaimer: String,
      socialLinks: [new Schema({ label: String, url: String }, { _id: false })],
    },
    opts,
  ),
)

export const HomeContentModel = singleton(
  'HomeContent',
  new Schema(
    {
      key, heroTitle: String, heroDescription: String, heroImageUrl: String,
      primaryCtaText: String, primaryCtaUrl: String, secondaryCtaText: String, secondaryCtaUrl: String,
      missionLabel: String, missionHeading: String, missionText: String,
      pillarsLabel: String, pillars: [iconItem],
      businessLabel: String, businessHeading: String, businessCards: [iconItem],
      seedLabel: String, seedHeading: String, seedNoticeTitle: String, seedDescription: String,
      seedLegalNote: String, seedCtaText: String,
      approachLabel: String, approachHeading: String, approachText: String, principles: [iconItem],
      roadmapLabel: String, roadmapHeading: String, roadmapIntro: String,
      roadmap: [new Schema({ phase: String, title: String, description: String, status: String }, { _id: false })],
      commitmentsLabel: String, commitmentsHeading: String, commitmentsText: String, commitments: [String],
      commitmentsImageUrl: String,
      ctaHeading: String, ctaText: String, ctaButtonText: String, ctaButtonUrl: String,
      sections: {
        mission: Boolean, pillars: Boolean, businessModel: Boolean, seedRound: Boolean,
        approach: Boolean, roadmap: Boolean, commitments: Boolean, cta: Boolean,
      },
    },
    opts,
  ),
)

export const AboutContentModel = singleton(
  'AboutContent',
  new Schema(
    {
      key, heroLabel: String, heroTitle: String, heroIntro: String, heroImageUrl: String,
      whoWeAreTitle: String, whoWeAreText: String, statusNote: String, whoWeAreImageUrl: String,
      missionTitle: String, missionText: String, visionTitle: String, visionIntro: String, visionItems: [String],
      frameworkTitle: String, frameworkIntro: String, frameworkItems: [iconItem],
      initiativesTitle: String,
      initiatives: [new Schema({ title: String, description: String }, { _id: false })],
      initiativesDisclaimer: String, initiativesImageUrl: String,
      shareStructureVisible: Boolean, shareStructureTitle: String,
      shareStructureRows: [new Schema({ label: String, value: String }, { _id: false })],
    },
    opts,
  ),
)

export const ContactContentModel = singleton(
  'ContactContent',
  new Schema(
    {
      key, heading: String, intro: String, businessName: String, statusNote: String, email: String,
      phone: String, showPhone: Boolean, location: String, businessHours: String, inquiryCategories: [String],
    },
    opts,
  ),
)

export const BusinessModelPageModel = singleton(
  'BusinessModelPage',
  new Schema({ key, heading: String, subheading: String, intro: String, heroImageUrl: String, disclaimer: String }, opts),
)

export const SeedRoundSettingsModel = singleton(
  'SeedRoundSettings',
  new Schema(
    {
      key,
      published: { type: Boolean, default: false },
      showInNav: { type: Boolean, default: true },
      heroLabel: String, title: String, intro: String, heroImageUrl: String,
      targetLabel: String, targetDisplay: String, targetNote: String,
      useOfCapitalTitle: String, useOfCapital: [String],
      supportTitle: String, supportText: String, distinctionTitle: String, distinctionText: String,
      legalNotice: String,
      publishedAt: Date,
    },
    opts,
  ),
)
