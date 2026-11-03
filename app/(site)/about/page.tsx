import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Framework, FutureInitiatives, MissionVision, WhoWeAre } from '@/components/about/AboutSections'
import { getAboutContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Dominion Dividend Group Management Company, a proposed Canadian corporation in its pre-launch development stage, building governance, operations, and compliance readiness.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Dominion Dividend Group', url: '/about' },
}

export default async function AboutPage() {
  const c = await getAboutContent()
  return (
    <>
      <PageHero label={c.heroLabel} title={c.heroTitle} intro={c.heroIntro} imageUrl={c.heroImageUrl} />
      <WhoWeAre c={c} />
      <MissionVision c={c} />
      <Framework c={c} />
      <FutureInitiatives c={c} />
    </>
  )
}
