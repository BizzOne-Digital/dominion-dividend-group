import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-green-gradient flex min-h-screen items-center justify-center px-4 text-center text-ivory">
      <div className="max-w-lg">
        <p className="eyebrow text-gold-light">404</p>
        <h1 className="text-gold-gradient mt-4 font-serif text-5xl font-semibold">Page Not Available</h1>
        <p className="mt-4 text-ivory/80">The page you are looking for does not exist or is not currently published.</p>
        <Link href="/" className="bg-gold-metal mt-8 inline-flex min-h-12 items-center rounded-[3px] px-7 font-serif text-lg font-semibold text-ink">
          Return Home
        </Link>
      </div>
    </main>
  )
}
