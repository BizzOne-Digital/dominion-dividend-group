import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SmartImage } from '@/components/ui/SmartImage'
import { Paragraphs } from '@/components/ui/Paragraphs'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { BusinessSection } from '@/lib/validation'

export function ModelSections({ sections }: { sections: BusinessSection[] }) {
  return (
    <section className="bg-ivory" aria-label="Business model areas">
      <Container className="py-16 sm:py-24">
        <ol className="space-y-6 sm:space-y-8">
          {sections.map((s, i) => (
            <li key={`${s.title}-${i}`}>
              <Reveal>
                <article
                  className={cn(
                    'grid overflow-hidden rounded-[4px] border border-gold/40 bg-white shadow-[0_14px_34px_-26px_rgba(3,27,20,0.5)]',
                    s.imageUrl && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]',
                  )}
                >
                  <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-10">
                    <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start">
                      <span className="font-serif text-4xl font-semibold text-gold-deep/60">{String(i + 1).padStart(2, '0')}</span>
                      <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/50 bg-cream">
                        <Icon name={s.icon} className="size-7 text-gold-deep" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.1rem]">{s.title}</h2>
                      <div className="mt-3 space-y-3 text-base leading-relaxed text-text sm:text-lg">
                        <Paragraphs text={s.description} />
                      </div>
                      {s.bullets.length > 0 && (
                        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-text">
                              <Check className="mt-1 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {s.imageUrl && (
                    <div className="relative min-h-56">
                      <SmartImage src={s.imageUrl} alt={s.title} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" />
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
