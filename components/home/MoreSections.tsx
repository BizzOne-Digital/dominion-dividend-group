import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SmartImage } from '@/components/ui/SmartImage'
import { IMAGES } from '@/lib/content/defaults'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { HomeContent } from '@/lib/validation'

export function ApproachSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-cream" aria-labelledby="approach-title">
      <Container className="py-16 sm:py-24">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{c.approachLabel}</Eyebrow>
            <h2 id="approach-title" className="mt-3 text-4xl leading-tight font-semibold text-ink sm:text-5xl">{c.approachHeading}</h2>
          </div>
          <p className="text-lg leading-relaxed text-text">{c.approachText}</p>
        </Reveal>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-gold/40 bg-gold/40 md:grid-cols-3">
          {c.principles.map((p, i) => (
            <li key={p.title} className="bg-ivory">
              <Reveal delay={i * 110} className="h-full p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <Icon name={p.icon} className="size-10 text-gold-deep" strokeWidth={1.3} />
                  <span className="font-serif text-5xl font-semibold text-gold/30">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function RoadmapSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-green-gradient relative text-ivory" aria-labelledby="roadmap-title">
      <Container className="py-16 sm:py-24">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="dark">{c.roadmapLabel}</Eyebrow>
          <h2 id="roadmap-title" className="text-gold-gradient mt-3 text-4xl leading-tight font-semibold sm:text-5xl">{c.roadmapHeading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ivory/80">{c.roadmapIntro}</p>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute top-[11px] right-0 left-0 hidden h-px bg-gradient-to-r from-gold via-gold/50 to-gold/10 lg:block" />
          {c.roadmap.map((r, i) => {
            const active = /progress/i.test(r.status)
            return (
              <li key={`${r.phase}-${i}`} className="relative">
                <Reveal delay={i * 120}>
                  <span aria-hidden="true" className={cn('relative block size-6 rounded-full border-2', active ? 'border-gold bg-gold shadow-[0_0_0_6px_rgba(201,154,56,0.2)]' : 'border-gold/60 bg-ink')} />
                  <p className="eyebrow mt-6 text-gold-light">{r.phase}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-ivory">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">{r.description}</p>
                  {r.status && (
                    <span className={cn('mt-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold tracking-wide', active ? 'border-gold bg-gold/15 text-gold-light' : 'border-ivory/25 text-ivory/70')}>
                      {r.status}
                    </span>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

export function CommitmentsSection({ c }: { c: HomeContent }) {
  return (
    <section className="bg-ivory" aria-labelledby="commit-title">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-gold/40 lg:aspect-[4/5]">
            <SmartImage src={c.commitmentsImageUrl} alt="Institutional architecture representing structure and permanence" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
          <div aria-hidden="true" className="absolute -top-4 -right-4 -z-10 hidden h-2/3 w-2/3 border border-gold/50 sm:block" />
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <Eyebrow>{c.commitmentsLabel}</Eyebrow>
          <h2 id="commit-title" className="mt-3 text-4xl leading-tight font-semibold text-ink sm:text-5xl">{c.commitmentsHeading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-text">{c.commitmentsText}</p>
          <ul className="mt-8 space-y-4">
            {c.commitments.map((item) => (
              <li key={item} className="flex items-start gap-4 border-b border-gold/20 pb-4 last:border-0">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-pine">
                  <Check className="size-3.5 text-gold-light" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-text">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

export function CtaSection({ c }: { c: HomeContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory" aria-labelledby="cta-title">
      <SmartImage src={IMAGES.mountainsClouds} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-forest/70" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <Container className="py-16 sm:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-gold-gradient text-4xl leading-tight font-semibold sm:text-5xl">{c.ctaHeading}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ivory/85">{c.ctaText}</p>
          </div>
          {c.ctaButtonText && (
            <ButtonLink href={c.ctaButtonUrl || '/contact'} className="shrink-0">{c.ctaButtonText}</ButtonLink>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
