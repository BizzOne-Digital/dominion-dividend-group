import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SmartImage } from '@/components/ui/SmartImage'
import { GrowthGraphic } from './GrowthGraphic'
import type { HomeContent } from '@/lib/validation'

export function Hero({ content }: { content: HomeContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory" aria-labelledby="hero-title">
      {/* Mountain photography */}
      <SmartImage
        src={content.heroImageUrl}
        alt="Mountain peak illuminated by golden sunrise light"
        fill
        priority
        sizes="100vw"
        className="-z-30 animate-reveal object-cover object-[65%_center] opacity-75"
      />
      {/* Forest-green grading + legibility gradients */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#14553a] opacity-85 mix-blend-color" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_68%_22%,rgba(231,197,107,0.30),transparent_55%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-r from-ink via-ink/80 to-transparent lg:via-ink/55" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-20 h-2/5 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      {/* Sunrise glow behind the peak */}
      <div
        aria-hidden="true"
        className="absolute top-[4%] right-[18%] -z-10 size-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,228,150,0.55)_0%,rgba(231,197,107,0.25)_35%,transparent_70%)] blur-xl sm:size-[460px] lg:size-[560px]"
      />

      <GrowthGraphic className="pointer-events-none absolute right-0 bottom-0 -z-10 w-full max-w-[860px] opacity-90 sm:w-[78%] lg:w-[58%]" />

      <Container className="flex min-h-[min(calc(88vh-80px),760px)] items-center pt-16 pb-56 sm:pb-64 lg:min-h-[min(calc(90vh-88px),820px)] lg:py-24">
        <div className="max-w-[44rem]">
          <h1 id="hero-title" className="text-gold-gradient animate-fade-up font-serif text-[2.35rem] leading-[1.06] font-semibold sm:text-5xl lg:text-[4rem] xl:text-[4.4rem]">
            {content.heroTitle}
          </h1>
          <span aria-hidden="true" className="mt-7 block h-[3px] w-20 origin-left animate-line bg-gold" style={{ animationDelay: '250ms' }} />
          <p className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-ivory/90 sm:text-lg" style={{ animationDelay: '150ms' }}>
            {content.heroDescription}
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: '300ms' }}>
            {content.primaryCtaText && <ButtonLink href={content.primaryCtaUrl || '/about'}>{content.primaryCtaText}</ButtonLink>}
            {content.secondaryCtaText && (
              <ButtonLink href={content.secondaryCtaUrl || '/business-model'} variant="outline">
                {content.secondaryCtaText}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
