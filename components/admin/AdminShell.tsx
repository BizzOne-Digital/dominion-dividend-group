'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Briefcase, ExternalLink, Home, Image as ImageIcon, Inbox, Info, LayoutDashboard, LogOut, Mail, Menu, Settings, TrendingUp, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToastProvider } from './Toast'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pages/home', label: 'Home Page', icon: Home },
  { href: '/admin/pages/about', label: 'About Page', icon: Info },
  { href: '/admin/business-model', label: 'Business Model', icon: Briefcase },
  { href: '/admin/seed-round', label: 'Seed Round 1', icon: TrendingUp },
  { href: '/admin/pages/contact', label: 'Contact', icon: Mail },
  { href: '/admin/images', label: 'Images', icon: ImageIcon },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    router.replace('/admin/login')
    router.refresh()
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-gold/25 px-5 py-5">
        <span className="bg-gold-metal inline-flex size-9 items-center justify-center rounded font-serif text-lg font-bold text-ink">D</span>
        <div className="leading-tight">
          <p className="font-serif text-lg font-semibold text-gold-light">DDG Admin</p>
          <p className="text-[0.7rem] text-ivory/60">Content Management</p>
        </div>
      </div>
      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: I }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                    active ? 'bg-gold/15 font-semibold text-gold-light' : 'text-ivory/75 hover:bg-white/5 hover:text-ivory',
                  )}
                >
                  <I className="size-4.5 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="space-y-1 border-t border-gold/25 p-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ivory/75 hover:bg-white/5 hover:text-ivory">
          <ExternalLink className="size-4.5" aria-hidden="true" /> View Website
        </a>
        <button type="button" onClick={logout} disabled={loggingOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ivory/75 hover:bg-white/5 hover:text-ivory disabled:opacity-60">
          <LogOut className="size-4.5" aria-hidden="true" /> {loggingOut ? 'Signing out...' : 'Logout'}
        </button>
        <p className="truncate px-3 pt-2 text-[0.7rem] text-ivory/45" title={email}>{email}</p>
      </div>
    </div>
  )

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f6f4ef] text-text">
        <aside className="bg-green-gradient fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-gold/20 lg:block">{sidebar}</aside>

        {/* Mobile top bar + drawer */}
        <div className="bg-green-gradient sticky top-0 z-30 flex h-14 items-center justify-between px-4 lg:hidden">
          <p className="font-serif text-lg font-semibold text-gold-light">DDG Admin</p>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open admin menu" aria-expanded={open} className="inline-flex size-10 items-center justify-center text-gold-light">
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
            <div className="bg-green-gradient absolute inset-y-0 left-0 w-72">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close admin menu" className="absolute top-4 right-3 text-ivory/80">
                <X className="size-6" aria-hidden="true" />
              </button>
              {sidebar}
            </div>
          </div>
        )}

        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
        </main>
      </div>
    </ToastProvider>
  )
}

export function AdminPageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions}
    </div>
  )
}


