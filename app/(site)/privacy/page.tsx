import type { Metadata } from 'next'
import { LegalPage } from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Dominion Dividend Group Management Company collects, uses, and protects information submitted through this website.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        { heading: 'Information We Collect', body: 'We collect only the information you choose to submit through our contact form: your name, email address, inquiry category, and message. We do not ask for, and you should not submit, financial account details or other sensitive personal information.' },
        { heading: 'How We Use Information', body: 'Information submitted is used solely to review and respond to your inquiry. It is not sold, rented, or shared with third parties for marketing purposes.' },
        { heading: 'Storage and Security', body: 'Inquiries are stored in a secured database with access restricted to authorised personnel. Reasonable administrative and technical safeguards are applied to protect submitted information.' },
        { heading: 'Retention', body: 'Inquiry records are retained only as long as reasonably necessary to respond and to maintain appropriate business records, after which they may be archived or deleted.' },
        { heading: 'Your Choices', body: 'You may request access to, correction of, or deletion of information you have submitted by contacting us through the contact page. This policy is intended to align with applicable Canadian privacy law, including PIPEDA, and will be reviewed by counsel as the organization develops.' },
      ]}
    />
  )
}
