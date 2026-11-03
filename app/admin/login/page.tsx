import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'
import { LogoMark } from '@/components/layout/LogoMark'

export const metadata: Metadata = { title: 'Admin Login', robots: { index: false, follow: false } }

export default function LoginPage() {
  return (
    <main className="bg-green-gradient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark priority className="h-36 w-auto" />
          <h1 className="text-gold-gradient mt-4 font-serif text-3xl font-semibold">Administration</h1>
          <p className="mt-1 text-sm text-ivory/70">Dominion Dividend Group Management Company</p>
        </div>
        <div className="rounded-lg border border-gold/30 bg-ivory p-7 shadow-2xl sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
