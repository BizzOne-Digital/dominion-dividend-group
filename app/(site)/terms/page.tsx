import type { Metadata } from 'next'
import { LegalPage } from '@/components/ui/LegalPage'
import { getSiteSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Terms / Website Disclaimer',
  description: 'Terms of use and website disclaimer for Dominion Dividend Group Management Company.',
  alternates: { canonical: '/terms' },
}

export default async function TermsPage() {
  const settings = await getSiteSettings()
  return (
    <LegalPage
      title="Terms / Website Disclaimer"
      updated="November 2026"
      sections={[
        { heading: 'Development-Stage Organization', body: settings.legalDisclaimer },
        { heading: 'No Offer or Solicitation', body: 'Nothing on this website constitutes an offer to sell, or a solicitation of an offer to buy, any securities or investment product in any jurisdiction. No securities offering is currently available through this website.' },
        { heading: 'No Investment Advice', body: 'Content on this website is general corporate-development information only. It is not investment, legal, tax, or accounting advice and should not be relied upon for any investment decision.' },
        { heading: 'Forward-Looking Information', body: 'References to proposed initiatives, plans, or future operations are intentions only. They are subject to change, to professional and regulatory review, and may not occur.' },
        { heading: 'Accuracy of Information', body: 'Information is provided as is and may be updated without notice. While care is taken in preparing content, no representation is made as to its completeness or accuracy.' },
        { heading: 'Contact', body: 'Questions about these terms may be submitted through the contact page.' },
      ]}
    />
  )
}
