import { CheckCircle2, GitBranch } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { LegalNotice } from '@/components/ui/LegalNotice'
import type { SeedRoundSettings } from '@/lib/validation'

export function TargetBlock({ s }: { s: SeedRoundSettings }) {
  return (
    <section className="bg-cream" aria-labelledby="target-title">
      <Container className="py-14 sm:py-20">
        <Reveal className="grid gap-8 border border-gold/50 bg-ivory p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1.2fr)] lg:items-center lg:gap-12">
          <div>
            <Eyebrow>{s.targetLabel}</Eyebrow>
            <p id="target-title" className="mt-4 font-serif text-5xl font-semibold text-ink sm:text-6xl lg:text-7xl">{s.targetDisplay}</p>
          </div>
          <span aria-hidden="true" className="hidden h-28 w-px bg-gold/60 lg:block" />
          <p className="text-lg leading-relaxed text-text">{s.targetNote}</p>
        </Reveal>
      </Container>
    </section>
  )
}

export function UseOfCapital({ s }: { s: SeedRoundSettings }) {
  return (
    <section className="bg-ivory" aria-labelledby="use-title">
      <Container className="py-14 sm:py-20">
        <Reveal>
          <Eyebrow>Allocation Framework</Eyebrow>
          <h2 id="use-title" className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{s.useOfCapitalTitle}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {s.useOfCapital.map((item, i) => (
            <li key={item}>
              <Reveal delay={(i % 5) * 70} className="h-full">
                <div className="flex h-full items-start gap-3 rounded-[4px] border border-gold/40 bg-white p-5 transition-colors hover:border-gold">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-[0.95rem] leading-snug font-medium text-ink">{item}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function SupportAndDistinction({ s }: { s: SeedRoundSettings }) {
  return (
    <section className="bg-green-gradient text-ivory" aria-label="Purpose of Seed Round 1">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-0">
        <Reveal className="lg:pr-14">
          <Eyebrow tone="dark">Purpose</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold text-ivory sm:text-4xl">{s.supportTitle}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ivory/85">
            <Paragraphs text={s.supportText} />
          </div>
        </Reveal>
        <Reveal delay={120} className="border-gold/35 lg:border-l lg:pl-14">
          <div className="flex items-center gap-3">
            <GitBranch className="size-6 text-gold" aria-hidden="true" />
            <Eyebrow tone="dark">Clarification</Eyebrow>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-gold-light sm:text-4xl">{s.distinctionTitle}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ivory/85">
            <Paragraphs text={s.distinctionText} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function SeedLegal({ text }: { text: string }) {
  return (
    <section className="bg-cream" aria-label="Legal notice">
      <Container className="py-14 sm:py-20">
        <LegalNotice title="Legal Notice" className="border-2 border-l-8 border-gold/60 bg-ivory text-base sm:text-lg">
          <p className="text-base leading-relaxed text-ink sm:text-lg">{text}</p>
        </LegalNotice>
      </Container>
    </section>
  )
}
