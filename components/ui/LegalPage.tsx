import { Container } from './Container'
import { PageHero } from './PageHero'

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; body: string }[] }) {
  return (
    <>
      <PageHero label="Legal" title={title} intro={`Last updated: ${updated}`} />
      <section className="bg-ivory">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-serif text-3xl font-semibold text-ink">{s.heading}</h2>
                <p className="mt-3 leading-relaxed text-text">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
