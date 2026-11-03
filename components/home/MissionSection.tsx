import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'

export function MissionSection({ label, heading, text }: { label: string; heading: string; text: string }) {
  return (
    <section className="bg-cream" aria-labelledby="mission-title">
      <Container className="py-16 sm:py-20">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_1px_minmax(0,1fr)] lg:gap-14">
          <div>
            <Eyebrow>{label}</Eyebrow>
            <h2 id="mission-title" className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{heading}</h2>
          </div>
          <span aria-hidden="true" className="hidden h-24 w-px bg-gold/60 lg:block" />
          <span aria-hidden="true" className="block h-px w-16 bg-gold/60 lg:hidden" />
          <p className="font-serif text-xl leading-relaxed text-text sm:text-2xl lg:text-[1.6rem]">{text}</p>
        </Reveal>
      </Container>
    </section>
  )
}
