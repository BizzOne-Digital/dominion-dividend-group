'use client'

import { Link2 } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { AdminImageField } from '@/components/admin/AdminImageField'
import { EmptyState } from '@/components/admin/EmptyState'
import { FormSection, ItemList, LoadingBlock, SaveBar, TextArea, TextField } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import type { SiteSettings } from '@/lib/validation'

export default function SettingsEditor() {
  const { data, loadError, saving, dirty, update, save } = useContentEditor<SiteSettings>('/api/admin/content/settings')
  if (loadError) return <p role="alert" className="text-red-800">{loadError}</p>
  if (!data) return <LoadingBlock />

  return (
    <>
      <AdminPageHeader title="Site Settings" description="Brand, contact details, footer and legal text used across the website." />
      <div className="space-y-6">
        <FormSection title="Brand">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Company Name" value={data.companyName} onChange={(v) => update({ companyName: v })} maxLength={160} />
            <TextField label="Short Name" value={data.shortName} onChange={(v) => update({ shortName: v })} maxLength={80} />
          </div>
          <TextField label="Tagline" value={data.tagline} onChange={(v) => update({ tagline: v })} maxLength={160} />
          <AdminImageField label="Logo" folder="misc" value={data.logoUrl} onChange={(v) => update({ logoUrl: v })} hint="Transparent PNG or WEBP recommended. Leave empty to use the default logo (public/logo.png)." />
          <AdminImageField label="Favicon" folder="misc" value={data.faviconUrl} onChange={(v) => update({ faviconUrl: v })} hint="Square PNG, at least 64x64." />
        </FormSection>
        <FormSection title="Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Email" type="email" value={data.email} onChange={(v) => update({ email: v })} maxLength={200} />
            <TextField label="Phone" value={data.phone} onChange={(v) => update({ phone: v })} hint="Shown only if enabled on the Contact page." maxLength={40} />
          </div>
          <TextField label="LinkedIn URL" value={data.linkedinUrl} onChange={(v) => update({ linkedinUrl: v })} placeholder="https://www.linkedin.com/company/..." maxLength={500} />
        </FormSection>
        <FormSection title="Social Links">
          {data.socialLinks.length === 0 && <EmptyState icon={Link2} title="No social links" description="Add links to show them in the footer." />}
          <ItemList
            label="Links" itemLabel="Link" max={10} items={data.socialLinks}
            onChange={(v) => update({ socialLinks: v })}
            create={() => ({ label: '', url: 'https://' })}
            render={(item, upd) => (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Label" value={item.label} onChange={(v) => upd({ label: v })} maxLength={60} />
                <TextField label="URL" value={item.url} onChange={(v) => upd({ url: v })} maxLength={500} />
              </div>
            )}
          />
        </FormSection>
        <FormSection title="Footer & Legal">
          <TextArea label="Footer Text" rows={3} value={data.footerText} onChange={(v) => update({ footerText: v })} maxLength={1000} />
          <TextArea label="Legal Disclaimer" rows={4} value={data.legalDisclaimer} onChange={(v) => update({ legalDisclaimer: v })} maxLength={2000} />
        </FormSection>
      </div>
      <SaveBar onSave={() => save()} saving={saving} dirty={dirty} />
    </>
  )
}
