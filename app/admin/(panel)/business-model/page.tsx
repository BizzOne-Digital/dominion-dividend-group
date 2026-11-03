'use client'

import { Eye, EyeOff } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { AdminImageField } from '@/components/admin/AdminImageField'
import { FormSection, IconSelect, ItemList, LoadingBlock, SaveBar, StringList, TextArea, TextField, Toggle } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import type { BusinessModelPage, BusinessSection } from '@/lib/validation'

type SectionInput = Omit<BusinessSection, 'order'>

export default function BusinessModelEditor() {
  const page = useContentEditor<BusinessModelPage>('/api/admin/content/business-page')
  const list = useContentEditor<SectionInput[]>('/api/admin/business-model')

  const error = page.loadError || list.loadError
  if (error) return <p role="alert" className="text-red-800">{error}</p>
  if (!page.data || !list.data) return <LoadingBlock />

  const p = page.data
  const saving = page.saving || list.saving
  const dirty = page.dirty || list.dirty

  async function saveAll() {
    if (page.dirty) await page.save()
    if (list.dirty && list.data) {
      // strip the order field; server assigns order from array position
      await list.save(list.data.map(({ title, description, icon, imageUrl, bullets, visible }) => ({ title, description, icon, imageUrl, bullets, visible })))
    }
  }

  return (
    <>
      <AdminPageHeader title="Business Model" description="Page header, sections, icons, images, ordering and visibility." />
      <div className="space-y-6">
        <FormSection title="Page Header">
          <TextField label="Heading" value={p.heading} onChange={(v) => page.update({ heading: v })} maxLength={160} />
          <TextField label="Subheading" value={p.subheading} onChange={(v) => page.update({ subheading: v })} maxLength={250} />
          <TextArea label="Intro" rows={3} value={p.intro} onChange={(v) => page.update({ intro: v })} maxLength={1500} />
          <AdminImageField label="Hero Image" value={p.heroImageUrl} onChange={(v) => page.update({ heroImageUrl: v })} />
          <TextArea label="Disclaimer" rows={3} value={p.disclaimer} onChange={(v) => page.update({ disclaimer: v })} maxLength={1200} />
        </FormSection>

        <FormSection title="Sections" description="Use the arrows to reorder. Hidden sections are not shown publicly.">
          <ItemList<SectionInput>
            label="Business model sections" itemLabel="Section" max={20} items={list.data}
            onChange={(v) => list.replace(v)}
            create={() => ({ title: 'New section', description: '', icon: 'landmark', imageUrl: '', bullets: [], visible: true })}
            render={(s, upd) => (
              <>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {s.visible ? <Eye className="size-4 text-emerald-700" aria-hidden="true" /> : <EyeOff className="size-4 text-muted" aria-hidden="true" />}
                  <span className={s.visible ? 'text-emerald-800' : 'text-muted'}>{s.visible ? 'Visible' : 'Hidden'}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Title" value={s.title} onChange={(v) => upd({ title: v })} maxLength={160} />
                  <IconSelect value={s.icon} onChange={(v) => upd({ icon: v as SectionInput['icon'] })} />
                </div>
                <TextArea label="Description" rows={3} value={s.description} onChange={(v) => upd({ description: v })} maxLength={2000} />
                <StringList label="Bullet points (optional)" items={s.bullets} onChange={(v) => upd({ bullets: v })} max={15} />
                <AdminImageField label="Section Image (optional)" value={s.imageUrl} onChange={(v) => upd({ imageUrl: v })} />
                <Toggle label="Visible on website" checked={s.visible} onChange={(v) => upd({ visible: v })} />
              </>
            )}
          />
        </FormSection>
      </div>
      <SaveBar onSave={saveAll} saving={saving} dirty={dirty} />
    </>
  )
}
