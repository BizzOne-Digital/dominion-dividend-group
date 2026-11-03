import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SmartImage } from '@/components/ui/SmartImage'
import { IMAGES } from '@/lib/content/defaults'
import type { HomeContent } from '@/lib/validation'

export function SeedPreview({ content }: { content: HomeContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest text-ivory" aria-labelledby="seed-title">
      <SmartImage src={IMAGES.mountainsNight} alt="" fill sizes="100vw" className="-z-20 object-cover object-right opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-forest/95 to-forest/60" />
      <Container className="py-16 sm:py-20">
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1px_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div>
            <Eyebrow tone="dark">{content.seedLabel}</Eyebrow>
            <h2 id="seed-title" className="text-gold-gradient mt-3 text-4xl leading-tight font-semibold sm:text-[2.6rem]">{content.seedHeading}</h2>
          </div>
          <span aria-hidden="true" className="hidden h-32 w-px bg-gold/50 lg:block" />
          <div>
            <h3 className="font-serif text-2xl leading-snug font-semibold text-gold-light sm:text-[1.9rem]">{content.seedNoticeTitle}</h3>
            <p className="mt-4 leading-relaxed text-ivory/90">{content.seedDescription}</p>
            <p className="mt-4 border-l-2 border-gold/70 pl-4 text-sm leading-relaxed text-ivory/75 italic">{content.seedLegalNote}</p>
            <ButtonLink href="/seed-round-1" variant="outline" className="mt-7 text-base">{content.seedCtaText}</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
