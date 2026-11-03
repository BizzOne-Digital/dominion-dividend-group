'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'email' | 'category' | 'message', string>>

export function ContactForm({ categories, defaultCategory }: { categories: string[]; defaultCategory?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState('')

  function validate(data: Record<string, string>): Errors {
    const e: Errors = {}
    if (data.name.trim().length < 2) e.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = 'Please enter a valid email address.'
    if (!data.category) e.category = 'Please select an inquiry category.'
    if (data.message.trim().length < 10) e.message = 'Please enter a message of at least 10 characters.'
    return e
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (status === 'sending') return
    const form = ev.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const v = validate(data)
    setErrors(v)
    setFormError('')
    if (Object.keys(v).length) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        const fe = (json.fieldErrors ?? {}) as Record<string, string[]>
        setErrors(Object.fromEntries(Object.entries(fe).map(([k, msgs]) => [k, msgs[0]])) as Errors)
        setFormError(json.error ?? 'Unable to submit your inquiry. Please try again.')
        setStatus('error')
        return
      }
      form.reset()
      setStatus('sent')
    } catch {
      setFormError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-[4px] border border-gold/60 bg-cream p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
        <h3 className="mt-4 font-serif text-3xl font-semibold text-ink">Thank you</h3>
        <p className="mt-2 text-text">Your inquiry has been received. A member of our team will respond as appropriate.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-pine underline underline-offset-4">
          Submit another inquiry
        </button>
      </div>
    )
  }

  const field = 'mt-2 block w-full rounded-[3px] border bg-white px-4 py-3 text-base text-text placeholder:text-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={formError ? 'form-error' : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">Full Name <span aria-hidden="true" className="text-gold-deep">*</span></label>
          <input id="name" name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} className={cn(field, errors.name ? 'border-red-700' : 'border-[#d9d2c3]')} />
          {errors.name && <p id="name-err" className="mt-1.5 text-sm text-red-800">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">Email Address <span aria-hidden="true" className="text-gold-deep">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-err' : undefined} className={cn(field, errors.email ? 'border-red-700' : 'border-[#d9d2c3]')} />
          {errors.email && <p id="email-err" className="mt-1.5 text-sm text-red-800">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="category" className="text-sm font-semibold text-ink">Inquiry Category <span aria-hidden="true" className="text-gold-deep">*</span></label>
        <select id="category" name="category" required defaultValue={defaultCategory && categories.includes(defaultCategory) ? defaultCategory : ''} aria-invalid={!!errors.category} aria-describedby={errors.category ? 'category-err' : undefined} className={cn(field, errors.category ? 'border-red-700' : 'border-[#d9d2c3]')}>
          <option value="" disabled>Select a category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.category && <p id="category-err" className="mt-1.5 text-sm text-red-800">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">Message <span aria-hidden="true" className="text-gold-deep">*</span></label>
        <textarea id="message" name="message" rows={6} required maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} className={cn(field, 'resize-y', errors.message ? 'border-red-700' : 'border-[#d9d2c3]')} />
        {errors.message && <p id="message-err" className="mt-1.5 text-sm text-red-800">{errors.message}</p>}
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {formError && <p id="form-error" role="alert" className="rounded-[3px] border border-red-800/30 bg-red-50 px-4 py-3 text-sm text-red-900">{formError}</p>}
      <p className="text-xs leading-relaxed text-muted">
        Please do not include confidential financial information. Submitting this form does not create any client, advisory, or investment relationship.
      </p>
      <button type="submit" disabled={status === 'sending'} className="bg-gold-metal inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] px-8 font-serif text-lg font-semibold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {status === 'sending' && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
        {status === 'sending' ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
