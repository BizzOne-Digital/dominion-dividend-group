import type { Metadata } from 'next'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { LegalNotice } from '@/components/ui/LegalNotice'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ModelSections } from '@/components/business-model/ModelSections'
import { getBusinessModelPage, getBusinessSections } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Business Model',
  description:
    'The intended development framework of Dominion Dividend Group Management Company: governance, operations infrastructure, financial administration, compliance readiness, and professional development.',
  alternates: { canonical: '/business-model' },
  openGraph: { title: 'Our Business Model | Dominion Dividend Group', url: '/business-model' },
}

export default async function BusinessModelPage() {
  const [page, sections] = await Promise.all([getBusinessModelPage(), getBusinessSections()])
  const visible = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)
  return (
    <>
      <PageHero label="Our Business Model" title={page.heading} intro={page.subheading} imageUrl={page.heroImageUrl} />
      {page.intro && (
        <section className="bg-cream">
          <Container className="py-12 sm:py-14">
            <p className="max-w-4xl font-serif text-xl leading-relaxed text-text sm:text-2xl">{page.intro}</p>
          </Container>
        </section>
      )}
      <ModelSections sections={visible} />
      <section className="bg-ivory pb-16 sm:pb-24">
        <Container>
          <LegalNotice title="Development Framework Disclaimer">{page.disclaimer}</LegalNotice>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Request Information</ButtonLink>
            <ButtonLink href="/about" variant="outline-dark">About the Company</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
