'use client'

import { AdminPageHeader } from '@/components/admin/AdminShell'
import { FormSection, LoadingBlock, SaveBar, StringList, TextArea, TextField, Toggle } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import type { ContactContent } from '@/lib/validation'

export default function ContactEditor() {
  const { data, loadError, saving, dirty, update, save } = useContentEditor<ContactContent>('/api/admin/content/contact')
  if (loadError) return <p role="alert" className="text-red-800">{loadError}</p>
  if (!data) return <LoadingBlock />

  return (
    <>
      <AdminPageHeader title="Contact Page" description="Public contact details and inquiry form categories." />
      <div className="space-y-6">
        <FormSection title="Page Content">
          <TextField label="Heading" value={data.heading} onChange={(v) => update({ heading: v })} maxLength={160} />
          <TextArea label="Intro" rows={3} value={data.intro} onChange={(v) => update({ intro: v })} maxLength={1000} />
        </FormSection>
        <FormSection title="Business Details" description="Never publish a residential address or personal number.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Business Name" value={data.businessName} onChange={(v) => update({ businessName: v })} maxLength={160} />
            <TextField label="Status Note" value={data.statusNote} onChange={(v) => update({ statusNote: v })} maxLength={200} />
            <TextField label="Business Email" type="email" value={data.email} onChange={(v) => update({ email: v })} maxLength={200} />
            <TextField label="Location" value={data.location} onChange={(v) => update({ location: v })} maxLength={120} />
            <TextField label="Business Hours" value={data.businessHours} onChange={(v) => update({ businessHours: v })} maxLength={120} />
            <TextField label="Phone" value={data.phone} onChange={(v) => update({ phone: v })} maxLength={40} />
          </div>
          <Toggle label="Show phone number publicly" description="Off by default. Only enable for a business line." checked={data.showPhone} onChange={(v) => update({ showPhone: v })} />
        </FormSection>
        <FormSection title="Inquiry Categories" description="Submissions are validated against this list on the server.">
          <StringList label="Categories" items={data.inquiryCategories} onChange={(v) => update({ inquiryCategories: v })} placeholder="New category" max={12} />
        </FormSection>
      </div>
      <SaveBar onSave={() => save()} saving={saving} dirty={dirty} />
    </>
  )
}
