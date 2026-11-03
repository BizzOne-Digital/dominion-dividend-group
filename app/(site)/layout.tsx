import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Brand } from '@/components/layout/Brand'
import { getNavItems } from '@/components/layout/nav'
import { getContactContent, getSeedNavVisible, getSiteSettings } from '@/lib/content'

export const revalidate = 300

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, contact, showSeed] = await Promise.all([getSiteSettings(), getContactContent(), getSeedNavVisible()])
  const nav = getNavItems(showSeed)
  return (
    <>
      <Header nav={nav} brand={<Brand settings={settings} />} />
      <main id="main">{children}</main>
      <Footer settings={settings} contact={contact} nav={nav} />
    </>
  )
}
