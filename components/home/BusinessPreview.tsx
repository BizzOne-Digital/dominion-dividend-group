import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Icon } from '@/lib/icons'
import type { IconItem } from '@/lib/validation'

export function BusinessPreview({ label, heading, cards }: { label: string; heading: string; cards: IconItem[] }) {
  return (
    <section className="bg-ivory" aria-labelledby="business-title">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 2xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] 2xl:items-center 2xl:gap-12">
          <Reveal>
            <Eyebrow>{label}</Eyebrow>
            <h2 id="business-title" className="mt-3 text-4xl leading-[1.1] font-semibold text-ink sm:text-[2.7rem]">{heading}</h2>
            <ButtonLink href="/business-model" variant="outline-dark" className="mt-7 text-base">Explore the Business Model</ButtonLink>
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-3">
            {cards.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 110} className="h-full">
                  <article className="group flex h-full gap-4 rounded-[4px] border border-gold/45 bg-white p-6 shadow-[0_12px_30px_-22px_rgba(3,27,20,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_40px_-24px_rgba(3,27,20,0.5)] md:flex-col lg:flex-row">
                    <Icon name={c.icon} className="size-11 shrink-0 text-gold-deep" strokeWidth={1.3} />
                    <div>
                      <h3 className="font-serif text-[1.4rem] leading-snug font-semibold text-ink">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
