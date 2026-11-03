'use client'

import { useState } from 'react'
import { AlertTriangle, ExternalLink, Globe, Lock } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { AdminImageField } from '@/components/admin/AdminImageField'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { FormSection, LoadingBlock, SaveBar, StringList, TextArea, TextField, Toggle } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import { cn } from '@/lib/utils'
import type { SeedRoundSettings } from '@/lib/validation'

export default function SeedRoundEditor() {
  const { data, loadError, saving, dirty, update, save } = useContentEditor<SeedRoundSettings>('/api/admin/content/seed-round')
  const [confirmPublish, setConfirmPublish] = useState(false)

  if (loadError) return <p role="alert" className="text-red-800">{loadError}</p>
  if (!data) return <LoadingBlock />

  async function setPublished(published: boolean) {
    if (!data) return
    const ok = await save({ ...data, published })
    if (ok) setConfirmPublish(false)
  }

  return (
    <>
      <AdminPageHeader title="Seed Round 1" description="Draft content and publication control for the /seed-round-1 page." />

      <div role="note" className="mb-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <p><strong>Legal review should be completed before publishing Seed Round 1 content.</strong> Do not add share prices, ownership percentages, return projections, subscription or payment details.</p>
      </div>

      <section className={cn('mb-6 flex flex-col gap-4 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between', data.published ? 'border-emerald-300 bg-emerald-50' : 'border-[#e4dccb] bg-white')}>
        <div className="flex items-center gap-3">
          {data.published ? <Globe className="size-6 text-emerald-700" aria-hidden="true" /> : <Lock className="size-6 text-muted" aria-hidden="true" />}
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">Publication Status</p>
            <p className="font-serif text-2xl font-semibold text-ink">{data.published ? 'Published' : 'Draft / Unpublished'}</p>
            <p className="text-xs text-muted">{data.published ? 'Visible at /seed-round-1.' : 'The public route returns 404 and no draft content is exposed.'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.published && (
            <a href="/seed-round-1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[#d9d2c3] bg-white px-4 py-2 text-sm font-semibold text-ink">
              <ExternalLink className="size-4" aria-hidden="true" /> View
            </a>
          )}
          {data.published ? (
            <button type="button" disabled={saving} onClick={() => setPublished(false)} className="rounded-md border border-[#d9d2c3] bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-[#f6f4ef] disabled:opacity-60">Unpublish</button>
          ) : (
            <button type="button" disabled={saving} onClick={() => setConfirmPublish(true)} className="rounded-md bg-pine px-4 py-2 text-sm font-semibold text-ivory hover:bg-forest disabled:opacity-60">Publish...</button>
          )}
        </div>
      </section>

      <div className="space-y-6">
        <FormSection title="Navigation">
          <Toggle label="Show in website navigation" description="Applies only while the page is published." checked={data.showInNav} onChange={(v) => update({ showInNav: v })} />
        </FormSection>
        <FormSection title="Hero">
          <TextField label="Label" value={data.heroLabel} onChange={(v) => update({ heroLabel: v })} maxLength={80} />
          <TextField label="Title" value={data.title} onChange={(v) => update({ title: v })} maxLength={200} />
          <TextArea label="Intro" value={data.intro} onChange={(v) => update({ intro: v })} maxLength={1500} />
          <AdminImageField label="Hero Image" value={data.heroImageUrl} onChange={(v) => update({ heroImageUrl: v })} />
        </FormSection>
        <FormSection title="Financing Target" description='Never describe this as "assets under management".'>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.targetLabel} onChange={(v) => update({ targetLabel: v })} maxLength={120} />
            <TextField label="Target Display Text" value={data.targetDisplay} onChange={(v) => update({ targetDisplay: v })} maxLength={60} />
          </div>
          <TextArea label="Target Note" rows={3} value={data.targetNote} onChange={(v) => update({ targetNote: v })} maxLength={600} />
        </FormSection>
        <FormSection title="Intended Use of Capital">
          <TextField label="Heading" value={data.useOfCapitalTitle} onChange={(v) => update({ useOfCapitalTitle: v })} maxLength={120} />
          <StringList label="Items" items={data.useOfCapital} onChange={(v) => update({ useOfCapital: v })} max={20} />
        </FormSection>
        <FormSection title="Purpose & Distinction">
          <TextField label="Support Heading" value={data.supportTitle} onChange={(v) => update({ supportTitle: v })} maxLength={160} />
          <TextArea label="Support Text" rows={5} value={data.supportText} onChange={(v) => update({ supportText: v })} hint="Separate paragraphs with a blank line." maxLength={2500} />
          <TextField label="Distinction Heading" value={data.distinctionTitle} onChange={(v) => update({ distinctionTitle: v })} maxLength={120} />
          <TextArea label="Distinction Text" rows={5} value={data.distinctionText} onChange={(v) => update({ distinctionText: v })} maxLength={2000} />
        </FormSection>
        <FormSection title="Legal Notice">
          <TextArea label="Legal Notice" rows={5} value={data.legalNotice} onChange={(v) => update({ legalNotice: v })} maxLength={2000} />
        </FormSection>
      </div>
      <SaveBar onSave={() => save()} saving={saving} dirty={dirty} />

      <ConfirmModal
        open={confirmPublish}
        title="Publish Seed Round 1?"
        message={<>This makes <strong>/seed-round-1</strong> publicly visible{data.showInNav ? ' and adds it to the navigation' : ''}. Confirm that Canadian securities counsel review and Founder authorization are complete. Any unsaved edits will be saved too.</>}
        confirmLabel="Publish"
        busy={saving}
        onConfirm={() => setPublished(true)}
        onCancel={() => setConfirmPublish(false)}
      />
    </>
  )
}
