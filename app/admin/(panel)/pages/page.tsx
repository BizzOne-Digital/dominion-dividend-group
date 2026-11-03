import Link from 'next/link'
import { ChevronRight, Home, Info, Mail } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'

const PAGES = [
  { href: '/admin/pages/home', title: 'Home Page', desc: 'Hero, mission, core pillars, business model cards, Seed Round preview, section visibility.', icon: Home },
  { href: '/admin/pages/about', title: 'About Page', desc: 'Hero, who we are, mission, vision, development framework, future initiatives.', icon: Info },
  { href: '/admin/pages/contact', title: 'Contact Page', desc: 'Business details, email, phone visibility, hours, inquiry categories.', icon: Mail },
]

export default function PagesIndex() {
  return (
    <>
      <AdminPageHeader title="Pages" description="Select a page to edit its content." />
      <ul className="grid gap-4 md:grid-cols-3">
        {PAGES.map(({ href, title, desc, icon: I }) => (
          <li key={href}>
            <Link href={href} className="flex h-full flex-col rounded-lg border border-[#e4dccb] bg-white p-6 shadow-sm transition hover:border-gold/60">
              <I className="size-7 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pine">Edit <ChevronRight className="size-4" aria-hidden="true" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
