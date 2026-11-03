import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/content'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = { themeColor: '#031b14' }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const base = process.env.NEXT_PUBLIC_SITE_URL
  return {
    metadataBase: base ? new URL(base) : undefined,
    title: {
      default: `${settings.companyName} | Institutional Foundation & Corporate Development`,
      template: `%s | ${settings.shortName}`,
    },
    description:
      'Dominion Dividend Group Management Company is a development-stage organization building the governance, operational infrastructure, and compliance readiness for future long-term investment-management operations.',
    applicationName: settings.shortName,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: { type: 'website', siteName: settings.companyName, locale: 'en_CA' },
    twitter: { card: 'summary_large_image' },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
