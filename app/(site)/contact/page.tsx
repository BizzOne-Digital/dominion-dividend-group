import type { Metadata } from 'next'
import { Building2, CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/contact/ContactForm'
import { getContactContent, getSiteSettings } from '@/lib/content'
import { IMAGES } from '@/lib/content/defaults'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Dominion Dividend Group Management Company for corporate, development, and professional services inquiries. Ontario, Canada. By appointment.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Dominion Dividend Group', url: '/contact' },
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [c, settings, sp] = await Promise.all([getContactContent(), getSiteSettings(), searchParams])
  const email = c.email || settings.email
  const phone = c.showPhone ? c.phone || settings.phone : ''

  const items = [
    { icon: Building2, label: 'Business', value: c.businessName, note: c.statusNote || (settings.corporationNumber ? 'Corporation No. ' + settings.corporationNumber + ' · Effective Date: ' + settings.incorporationDate : '') },
    { icon: MapPin, label: 'Location', value: c.location },
    ...(email ? [{ icon: Mail, label: 'Email', value: email, href: `mailto:${email}` }] : []),
    ...(phone ? [{ icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}` }] : []),
    { icon: CalendarDays, label: 'Business Hours', value: c.businessHours },
  ]

  return (
    <>
      <PageHero label="Contact" title={c.heading} intro={c.intro} imageUrl={IMAGES.mountainsClouds} />
      <section className="bg-cream">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
          <aside aria-label="Contact details" className="bg-green-gradient h-fit rounded-[4px] border border-gold/40 p-7 text-ivory sm:p-9">
            <h2 className="font-serif text-3xl font-semibold text-gold-light">Company Details</h2>
            <ul className="mt-7 space-y-6">
              {items.map(({ icon: I, label, value, note, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40">
                    <I className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-[0.65rem] text-gold-light/90">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block break-words text-ivory hover:text-gold-light">{value}</a>
                    ) : (
                      <p className="mt-1 text-ivory">{value}</p>
                    )}
                    {note && <p className="mt-1 text-xs text-ivory/65 italic">{note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
          <div className="rounded-[4px] border border-gold/40 bg-ivory p-6 shadow-[0_18px_40px_-30px_rgba(3,27,20,0.5)] sm:p-10">
            <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Submit an Inquiry</h2>
            <p className="mt-2 mb-8 text-muted">All fields are required.</p>
            <ContactForm categories={c.inquiryCategories} defaultCategory={sp.category} />
          </div>
        </Container>
      </section>
    </>
  )
}
