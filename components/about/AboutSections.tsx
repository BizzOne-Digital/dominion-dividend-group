import { Check, Info } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { LegalNotice } from '@/components/ui/LegalNotice'
import { Icon } from '@/lib/icons'
import type { AboutContent } from '@/lib/validation'

export function WhoWeAre({ c }: { c: AboutContent }) {
  return (
    <section className="bg-ivory" aria-labelledby="who-title">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow>Overview</Eyebrow>
          <h2 id="who-title" className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{c.whoWeAreTitle}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-text">
            <Paragraphs text={c.whoWeAreText} />
          </div>
          {c.statusNote && (
            <p className="mt-8 flex items-start gap-3 rounded-[4px] border border-gold/50 bg-cream p-5 font-medium text-ink">
              <Info className="mt-0.5 size-5 shrink-0 text-gold-deep" aria-hidden="true" />
              {c.statusNote}
            </p>
          )}
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-gold/40 sm:aspect-[4/3] lg:aspect-[4/5]">
            <SmartImage src={c.whoWeAreImageUrl} alt="Modern institutional architecture viewed from below" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-10 hidden h-2/3 w-2/3 border border-gold/50 sm:block" />
        </Reveal>
      </Container>
    </section>
  )
}

export function MissionVision({ c }: { c: AboutContent }) {
  return (
    <section className="bg-green-gradient text-ivory" aria-labelledby="mission-vision-title">
      <h2 id="mission-vision-title" className="sr-only">Mission and Vision</h2>
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-0">
        <Reveal className="lg:pr-14">
          <Eyebrow tone="dark">{c.missionTitle}</Eyebrow>
          <p className="mt-6 font-serif text-2xl leading-relaxed text-ivory sm:text-[1.85rem]">{c.missionText}</p>
        </Reveal>
        <Reveal delay={120} className="border-gold/35 lg:border-l lg:pl-14">
          <Eyebrow tone="dark">{c.visionTitle}</Eyebrow>
          <p className="mt-6 text-lg leading-relaxed text-ivory/85">{c.visionIntro}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.visionItems.map((v) => (
              <li key={v} className="flex items-start gap-3 text-ivory/90">
                <Check className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

export function Framework({ c }: { c: AboutContent }) {
  return (
    <section className="bg-cream" aria-labelledby="framework-title">
      <Container className="py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <Eyebrow>Structure</Eyebrow>
          <h2 id="framework-title" className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{c.frameworkTitle}</h2>
          <p className="mt-4 text-lg text-muted">{c.frameworkIntro}</p>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.frameworkItems.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={(i % 4) * 90} className="h-full">
                <article className="h-full rounded-[4px] border border-gold/40 bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_36px_-24px_rgba(3,27,20,0.45)]">
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/50 bg-cream">
                    <Icon name={f.icon} className="size-6 text-gold-deep" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function FutureInitiatives({ c }: { c: AboutContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory" aria-labelledby="initiatives-title">
      <SmartImage src={c.initiativesImageUrl} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
      <Container className="py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="dark">Looking Ahead</Eyebrow>
          <h2 id="initiatives-title" className="text-gold-gradient mt-3 text-4xl font-semibold sm:text-5xl">{c.initiativesTitle}</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {c.initiatives.map((it, i) => (
            <li key={it.title}>
              <Reveal delay={i * 120} className="h-full">
                <article className="h-full border border-gold/35 bg-forest/70 p-7 sm:p-9">
                  <p className="eyebrow text-gold-light">Proposed / Planned</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold text-ivory">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/85">{it.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <LegalNotice title="Important" tone="dark" className="mt-10">{c.initiativesDisclaimer}</LegalNotice>
      </Container>
    </section>
  )
}
