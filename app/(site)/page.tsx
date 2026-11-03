import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { MissionSection } from '@/components/home/MissionSection'
import { PillarsSection } from '@/components/home/PillarsSection'
import { BusinessPreview } from '@/components/home/BusinessPreview'
import { SeedPreview } from '@/components/home/SeedPreview'
import { ApproachSection, CommitmentsSection, CtaSection, RoadmapSection } from '@/components/home/MoreSections'
import { getHomeContent, getSeedRound } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Dominion Dividend Group Management Company | Institutional Foundation & Corporate Development' },
  description:
    'A development-stage Canadian organization establishing the governance, operational infrastructure, financial administration, and compliance readiness for future long-term investment-management operations.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dominion Dividend Group Management Company',
    description: 'Building the foundation for institutional investment management: governance, operations, compliance readiness, and long-term growth.',
    url: '/',
  },
}

export default async function HomePage() {
  const [home, seed] = await Promise.all([getHomeContent(), getSeedRound()])
  const s = home.sections
  return (
    <>
      <Hero content={home} />
      {s.mission && <MissionSection label={home.missionLabel} heading={home.missionHeading} text={home.missionText} />}
      {s.pillars && home.pillars.length > 0 && <PillarsSection label={home.pillarsLabel} pillars={home.pillars} />}
      {s.approach && home.principles.length > 0 && <ApproachSection c={home} />}
      {s.businessModel && home.businessCards.length > 0 && (
        <BusinessPreview label={home.businessLabel} heading={home.businessHeading} cards={home.businessCards} />
      )}
      {s.roadmap && home.roadmap.length > 0 && <RoadmapSection c={home} />}
      {s.commitments && home.commitments.length > 0 && <CommitmentsSection c={home} />}
      {/* Seed Round content is never exposed publicly until the Founder publishes it. */}
      {s.seedRound && seed.published && <SeedPreview content={home} />}
      {s.cta && <CtaSection c={home} />}
    </>
  )
}
