import Link from 'next/link'
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { LogoMark } from './LogoMark'
import type { NavItem } from './nav'
import type { ContactContent, SiteSettings } from '@/lib/validation'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function Footer({ settings, contact, nav }: { settings: SiteSettings; contact: ContactContent; nav: NavItem[] }) {
  const email = contact.email || settings.email
  const phone = contact.showPhone ? contact.phone || settings.phone : ''
  const year = new Date().getFullYear()

  return (
    <footer className="bg-green-gradient relative text-ivory/85">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoMark logoUrl={settings.logoUrl} className="h-32 w-auto sm:h-36" />
            {settings.footerText && <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{settings.footerText}</p>}
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-5 text-gold-light">Navigate</h2>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-gold-light">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-5 text-gold-light">Contact</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{contact.location}</li>
              {email && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="break-all transition-colors hover:text-gold-light">{email}</a>
                </li>
              )}
              {phone && (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="hover:text-gold-light">{phone}</a>
                </li>
              )}
              <li className="flex items-start gap-3"><CalendarDays className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />{contact.businessHours}</li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 text-gold-light">Legal</h2>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="transition-colors hover:text-gold-light">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-gold-light">Terms / Website Disclaimer</Link></li>
            </ul>
            {(settings.linkedinUrl || settings.socialLinks.length > 0) && (
              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {settings.linkedinUrl && (
                  <li>
                    <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex size-10 items-center justify-center rounded-full border border-gold/40 text-gold-light transition-colors hover:bg-gold hover:text-ink">
                      <LinkedInIcon className="size-4" />
                    </a>
                  </li>
                )}
                {settings.socialLinks.filter((s) => s.url).map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm underline-offset-4 hover:text-gold-light hover:underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-gold/20 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ivory/65">{settings.legalDisclaimer}</p>
          <p className="mt-4 text-xs text-ivory/55">&copy; {year} {settings.companyName}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
