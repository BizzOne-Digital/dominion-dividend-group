import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/ui/PageHero'
import { SeedLegal, SupportAndDistinction, TargetBlock, UseOfCapital } from '@/components/seed-round/SeedSections'
import { getSeedRound } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const seed = await getSeedRound()
  if (!seed.published) return { title: 'Not Found', robots: { index: false, follow: false } }
  return {
    title: 'Seed Round 1',
    description: 'Draft corporate-development information about the proposed Seed Round 1 corporate financing for the Management Company. Not an offer or solicitation.',
    alternates: { canonical: '/seed-round-1' },
    openGraph: { title: 'Seed Round 1 | Dominion Dividend Group', url: '/seed-round-1' },
  }
}

export default async function SeedRoundPage() {
  const seed = await getSeedRound()
  // Draft/unpublished: no draft content is rendered or exposed publicly.
  if (!seed.published) notFound()

  return (
    <>
      <PageHero label={seed.heroLabel} title={seed.title} intro={seed.intro} imageUrl={seed.heroImageUrl} />
      <TargetBlock s={seed} />
      <UseOfCapital s={seed} />
      <SupportAndDistinction s={seed} />
      <SeedLegal text={seed.legalNotice} />
    </>
  )
}
