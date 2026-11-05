'use client'

import { AdminPageHeader } from '@/components/admin/AdminShell'
import { AdminImageField } from '@/components/admin/AdminImageField'
import { FormSection, IconSelect, ItemList, LoadingBlock, SaveBar, StringList, TextArea, TextField, Toggle } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import type { AboutContent, IconItem } from '@/lib/validation'

export default function AboutEditor() {
  const { data, loadError, saving, dirty, update, save } = useContentEditor<AboutContent>('/api/admin/content/about')
  if (loadError) return <p role="alert" className="text-red-800">{loadError}</p>
  if (!data) return <LoadingBlock />

  return (
    <>
      <AdminPageHeader title="About Page" description="Company overview, mission, vision and future initiatives." />
      <div className="space-y-6">
        <FormSection title="Hero">
          <TextField label="Label" value={data.heroLabel} onChange={(v) => update({ heroLabel: v })} maxLength={80} />
          <TextField label="Hero Title" value={data.heroTitle} onChange={(v) => update({ heroTitle: v })} maxLength={200} />
          <TextArea label="Intro" value={data.heroIntro} onChange={(v) => update({ heroIntro: v })} maxLength={1200} />
          <AdminImageField label="Hero Image" value={data.heroImageUrl} onChange={(v) => update({ heroImageUrl: v })} />
        </FormSection>

        <FormSection title="Who We Are">
          <TextField label="Heading" value={data.whoWeAreTitle} onChange={(v) => update({ whoWeAreTitle: v })} maxLength={120} />
          <TextArea label="Text" rows={5} value={data.whoWeAreText} onChange={(v) => update({ whoWeAreText: v })} hint="Separate paragraphs with a blank line." maxLength={2000} />
          <TextField label="Status Note" value={data.statusNote} onChange={(v) => update({ statusNote: v })} hint="Keep the pre-incorporation statement until incorporation is confirmed." maxLength={300} />
          <AdminImageField label="Section Image" value={data.whoWeAreImageUrl} onChange={(v) => update({ whoWeAreImageUrl: v })} />
        </FormSection>

        <FormSection title="Mission & Vision">
          <TextField label="Mission Heading" value={data.missionTitle} onChange={(v) => update({ missionTitle: v })} maxLength={120} />
          <TextArea label="Mission" value={data.missionText} onChange={(v) => update({ missionText: v })} maxLength={1500} />
          <TextField label="Vision Heading" value={data.visionTitle} onChange={(v) => update({ visionTitle: v })} maxLength={120} />
          <TextArea label="Vision Intro" rows={2} value={data.visionIntro} onChange={(v) => update({ visionIntro: v })} maxLength={1000} />
          <StringList label="Vision Principles" items={data.visionItems} onChange={(v) => update({ visionItems: v })} max={12} />
        </FormSection>

        <FormSection title="Development Framework">
          <TextField label="Heading" value={data.frameworkTitle} onChange={(v) => update({ frameworkTitle: v })} maxLength={120} />
          <TextArea label="Intro" rows={2} value={data.frameworkIntro} onChange={(v) => update({ frameworkIntro: v })} maxLength={1000} />
          <ItemList<IconItem>
            label="Framework Cards" itemLabel="Card" max={12} items={data.frameworkItems}
            onChange={(v) => update({ frameworkItems: v })}
            create={() => ({ title: 'New area', description: '', icon: 'landmark' })}
            render={(item, upd) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Title" value={item.title} onChange={(v) => upd({ title: v })} maxLength={120} />
                  <IconSelect value={item.icon} onChange={(v) => upd({ icon: v as IconItem['icon'] })} />
                </div>
                <TextArea label="Description" rows={2} value={item.description} onChange={(v) => upd({ description: v })} maxLength={600} />
              </>
            )}
          />
        </FormSection>

        <FormSection title="Share Structure">
          <Toggle label="Show on About page" checked={data.shareStructureVisible} onChange={(v) => update({ shareStructureVisible: v })} />
          <TextField label="Heading" value={data.shareStructureTitle} onChange={(v) => update({ shareStructureTitle: v })} maxLength={200} />
          <ItemList
            label="Rows" itemLabel="Row" max={10} items={data.shareStructureRows}
            onChange={(v) => update({ shareStructureRows: v })}
            create={() => ({ label: 'New row', value: '' })}
            render={(item, upd) => (
              <>
                <TextField label="Label" value={item.label} onChange={(v) => upd({ label: v })} maxLength={120} />
                <TextArea label="Value" rows={2} value={item.value} onChange={(v) => upd({ value: v })} maxLength={600} />
              </>
            )}
          />
        </FormSection>

        <FormSection title="Future Initiatives">
          <TextField label="Heading" value={data.initiativesTitle} onChange={(v) => update({ initiativesTitle: v })} maxLength={120} />
          <ItemList
            label="Initiatives" itemLabel="Initiative" max={6} items={data.initiatives}
            onChange={(v) => update({ initiatives: v })}
            create={() => ({ title: 'New initiative', description: '' })}
            render={(item, upd) => (
              <>
                <TextField label="Title" value={item.title} onChange={(v) => upd({ title: v })} maxLength={120} />
                <TextArea label="Description" rows={3} value={item.description} onChange={(v) => upd({ description: v })} maxLength={800} />
              </>
            )}
          />
          <TextArea label="Disclaimer" rows={2} value={data.initiativesDisclaimer} onChange={(v) => update({ initiativesDisclaimer: v })} maxLength={800} />
          <AdminImageField label="Background Image" value={data.initiativesImageUrl} onChange={(v) => update({ initiativesImageUrl: v })} />
        </FormSection>
      </div>
      <SaveBar onSave={() => save()} saving={saving} dirty={dirty} />
    </>
  )
}
