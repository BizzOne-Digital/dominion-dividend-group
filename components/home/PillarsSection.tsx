import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/lib/icons'
import type { IconItem } from '@/lib/validation'

export function PillarsSection({ label, pillars }: { label: string; pillars: IconItem[] }) {
  return (
    <section className="bg-green-gradient relative text-ivory" aria-labelledby="pillars-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold/40" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold/40" />
      <Container className="py-14 lg:py-12">
        <div className="grid gap-10 2xl:grid-cols-[12rem_minmax(0,1fr)] 2xl:items-center 2xl:gap-8">
          <div>
            <h2 id="pillars-title" className="eyebrow text-[0.85rem] text-gold-light">{label}</h2>
            <span aria-hidden="true" className="mt-3 block h-px w-14 bg-gold/70" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {pillars.map((p, i) => (
              <li key={p.title} className="lg:border-l lg:border-gold/35 lg:px-7 xl:px-8">
                <Reveal delay={i * 90} className="flex h-full items-start gap-4 rounded-[4px] border border-gold/25 bg-ink/40 p-5 lg:border-0 lg:bg-transparent lg:p-0">
                  <Icon name={p.icon} className="size-10 shrink-0 text-gold" strokeWidth={1.4} />
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-ivory">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ivory/80">{p.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
