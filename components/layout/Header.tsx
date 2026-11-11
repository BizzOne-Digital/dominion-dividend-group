'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from './nav'

export function Header({ nav, brand }: { nav: NavItem[]; brand: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    // Lock scroll without the page shifting when the scrollbar disappears.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    // Focus after the slide finishes; preventScroll stops the browser jerking the panel into view.
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 380)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-gold/40 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/90">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[88px] lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Dominion Dividend Group home">
          {brand}
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-8 2xl:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative py-2 font-serif text-[1.1rem] font-medium tracking-wide transition-colors',
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-gold after:transition-transform after:duration-300 after:content-['']",
                    isActive(item.href) ? 'text-ivory after:scale-x-100' : 'text-ivory/80 after:scale-x-0 hover:text-ivory hover:after:scale-x-100',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 xl:gap-6">
          <span aria-hidden="true" className="hidden h-9 w-px bg-gold/40 xl:block" />
          <Link
            href="/contact"
            className="hidden rounded-[4px] border border-gold px-5 py-2.5 font-serif text-[1.05rem] font-semibold text-gold-light transition-colors duration-300 hover:bg-gold hover:text-ink sm:inline-flex"
          >
            Request Information
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[4px] border border-gold/50 text-gold-light xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open navigation menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer: rendered OUTSIDE <header> because the header's backdrop-blur
          creates a containing block that would trap position:fixed children inside it.
          The clipping layer stops the off-screen panel from widening the page. */}
      {/* Kept mounted and visible so both open and close animate; `inert` removes it from focus/AT when closed. */}
      <div className={cn('fixed inset-0 z-[60] overflow-hidden xl:hidden', !open && 'pointer-events-none')} inert={!open}>
      <div
        className={cn('absolute inset-0 bg-ink/70 transition-opacity duration-[380ms] ease-out', open ? 'opacity-100' : 'opacity-0')}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'bg-green-gradient absolute inset-y-0 right-0 flex w-full flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:max-w-sm sm:border-l sm:border-gold/40',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-gold/25 px-5">
          <span className="eyebrow text-gold-light">Menu</span>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[4px] border border-gold/50 text-gold-light"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center border-l-2 py-3 pl-4 font-serif text-xl transition-colors',
                    isActive(item.href) ? 'border-gold text-gold-light' : 'border-transparent text-ivory/85 hover:border-gold/50 hover:text-ivory',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-gold/25 p-5">
          <Link href="/contact" className="bg-gold-metal flex min-h-12 items-center justify-center rounded-[4px] font-serif text-lg font-semibold text-ink">
            Request Information
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}
