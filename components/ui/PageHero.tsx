import { Container } from './Container'
import { Eyebrow } from './Eyebrow'
import { SmartImage } from './SmartImage'

/** Internal-page hero: dark green with subtle mountain imagery. */
export function PageHero({ label, title, intro, imageUrl, children }: {
  label: string
  title: string
  intro?: string
  imageUrl?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      {imageUrl && (
        <SmartImage src={imageUrl} alt="" fill priority sizes="100vw" className="-z-20 animate-reveal object-cover opacity-40" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-forest/40" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow tone="dark">{label}</Eyebrow>
          <h1 className="text-gold-gradient mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
