'use client'

import { AdminPageHeader } from '@/components/admin/AdminShell'
import { AdminImageField } from '@/components/admin/AdminImageField'
import { FormSection, IconSelect, ItemList, LoadingBlock, SaveBar, StringList, TextArea, TextField, Toggle } from '@/components/admin/fields'
import { useContentEditor } from '@/components/admin/useContentEditor'
import type { HomeContent, IconItem } from '@/lib/validation'

const newItem = (): IconItem => ({ title: 'New item', description: '', icon: 'landmark' })

function IconItemFields({ item, update }: { item: IconItem; update: (p: Partial<IconItem>) => void }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Title" value={item.title} onChange={(v) => update({ title: v })} maxLength={120} />
        <IconSelect value={item.icon} onChange={(v) => update({ icon: v as IconItem['icon'] })} />
      </div>
      <TextArea label="Description" rows={2} value={item.description} onChange={(v) => update({ description: v })} maxLength={600} />
    </>
  )
}

export default function HomeEditor() {
  const { data, loadError, saving, dirty, update, save } = useContentEditor<HomeContent>('/api/admin/content/home')
  if (loadError) return <p role="alert" className="text-red-800">{loadError}</p>
  if (!data) return <LoadingBlock />
  const sections = data.sections

  return (
    <>
      <AdminPageHeader title="Home Page" description="Edit homepage content and control which sections are visible." />
      <div className="space-y-6">
        <FormSection title="Section Visibility">
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Mission" checked={sections.mission} onChange={(v) => update({ sections: { ...sections, mission: v } })} />
            <Toggle label="Core Pillars" checked={sections.pillars} onChange={(v) => update({ sections: { ...sections, pillars: v } })} />
            <Toggle label="Business Model Preview" checked={sections.businessModel} onChange={(v) => update({ sections: { ...sections, businessModel: v } })} />
            <Toggle label="Seed Round 1 Preview" description="Only shown publicly when Seed Round 1 is published." checked={sections.seedRound} onChange={(v) => update({ sections: { ...sections, seedRound: v } })} />
            <Toggle label="Our Approach" checked={sections.approach} onChange={(v) => update({ sections: { ...sections, approach: v } })} />
            <Toggle label="Development Roadmap" checked={sections.roadmap} onChange={(v) => update({ sections: { ...sections, roadmap: v } })} />
            <Toggle label="Our Commitments" checked={sections.commitments} onChange={(v) => update({ sections: { ...sections, commitments: v } })} />
            <Toggle label="Closing Call to Action" checked={sections.cta} onChange={(v) => update({ sections: { ...sections, cta: v } })} />
          </div>
        </FormSection>

        <FormSection title="Hero">
          <TextField label="Hero Title" value={data.heroTitle} onChange={(v) => update({ heroTitle: v })} maxLength={200} />
          <TextArea label="Hero Description" value={data.heroDescription} onChange={(v) => update({ heroDescription: v })} maxLength={1200} />
          <AdminImageField label="Hero Background" folder="pages" value={data.heroImageUrl} onChange={(v) => update({ heroImageUrl: v })} hint="Wide landscape image, at least 2000px. Mountain imagery fits the brand best." />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Primary CTA Text" value={data.primaryCtaText} onChange={(v) => update({ primaryCtaText: v })} maxLength={60} />
            <TextField label="Primary CTA URL" value={data.primaryCtaUrl} onChange={(v) => update({ primaryCtaUrl: v })} hint="e.g. /about" maxLength={500} />
            <TextField label="Secondary CTA Text" value={data.secondaryCtaText} onChange={(v) => update({ secondaryCtaText: v })} hint="Leave empty to hide" maxLength={60} />
            <TextField label="Secondary CTA URL" value={data.secondaryCtaUrl} onChange={(v) => update({ secondaryCtaUrl: v })} maxLength={500} />
          </div>
        </FormSection>

        <FormSection title="Mission">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.missionLabel} onChange={(v) => update({ missionLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.missionHeading} onChange={(v) => update({ missionHeading: v })} maxLength={120} />
          </div>
          <TextArea label="Mission Text" value={data.missionText} onChange={(v) => update({ missionText: v })} maxLength={1500} />
        </FormSection>

        <FormSection title="Core Pillars">
          <TextField label="Section Label" value={data.pillarsLabel} onChange={(v) => update({ pillarsLabel: v })} maxLength={60} />
          <ItemList label="Pillars" itemLabel="Pillar" max={6} items={data.pillars} onChange={(v) => update({ pillars: v })} create={newItem} render={(item, upd) => <IconItemFields item={item} update={upd} />} />
        </FormSection>

        <FormSection title="Our Approach">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.approachLabel} onChange={(v) => update({ approachLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.approachHeading} onChange={(v) => update({ approachHeading: v })} maxLength={160} />
          </div>
          <TextArea label="Text" rows={3} value={data.approachText} onChange={(v) => update({ approachText: v })} maxLength={1500} />
          <ItemList label="Principles" itemLabel="Principle" max={6} items={data.principles} onChange={(v) => update({ principles: v })} create={newItem} render={(item, upd) => <IconItemFields item={item} update={upd} />} />
        </FormSection>

        <FormSection title="Development Roadmap" description="Avoid specific dates or promises; describe phases as intentions.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.roadmapLabel} onChange={(v) => update({ roadmapLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.roadmapHeading} onChange={(v) => update({ roadmapHeading: v })} maxLength={160} />
          </div>
          <TextArea label="Intro" rows={3} value={data.roadmapIntro} onChange={(v) => update({ roadmapIntro: v })} maxLength={1000} />
          <ItemList
            label="Phases" itemLabel="Phase" max={8} items={data.roadmap}
            onChange={(v) => update({ roadmap: v })}
            create={() => ({ phase: `Phase ${data.roadmap.length + 1}`, title: 'New phase', description: '', status: 'Planned' })}
            render={(item, upd) => (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextField label="Phase Label" value={item.phase} onChange={(v) => upd({ phase: v })} maxLength={40} />
                  <TextField label="Title" value={item.title} onChange={(v) => upd({ title: v })} maxLength={120} />
                  <TextField label="Status" value={item.status} onChange={(v) => upd({ status: v })} hint='"In Progress" is highlighted in gold' maxLength={40} />
                </div>
                <TextArea label="Description" rows={2} value={item.description} onChange={(v) => upd({ description: v })} maxLength={600} />
              </>
            )}
          />
        </FormSection>

        <FormSection title="Our Commitments">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.commitmentsLabel} onChange={(v) => update({ commitmentsLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.commitmentsHeading} onChange={(v) => update({ commitmentsHeading: v })} maxLength={160} />
          </div>
          <TextArea label="Text" rows={3} value={data.commitmentsText} onChange={(v) => update({ commitmentsText: v })} maxLength={1500} />
          <StringList label="Commitments" items={data.commitments} onChange={(v) => update({ commitments: v })} max={12} />
          <AdminImageField label="Section Image" value={data.commitmentsImageUrl} onChange={(v) => update({ commitmentsImageUrl: v })} />
        </FormSection>

        <FormSection title="Closing Call to Action">
          <TextField label="Heading" value={data.ctaHeading} onChange={(v) => update({ ctaHeading: v })} maxLength={160} />
          <TextArea label="Text" rows={3} value={data.ctaText} onChange={(v) => update({ ctaText: v })} maxLength={800} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Button Text" value={data.ctaButtonText} onChange={(v) => update({ ctaButtonText: v })} maxLength={60} />
            <TextField label="Button URL" value={data.ctaButtonUrl} onChange={(v) => update({ ctaButtonUrl: v })} maxLength={500} />
          </div>
        </FormSection>

        <FormSection title="Business Model Preview">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.businessLabel} onChange={(v) => update({ businessLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.businessHeading} onChange={(v) => update({ businessHeading: v })} maxLength={160} />
          </div>
          <ItemList label="Cards" itemLabel="Card" max={6} items={data.businessCards} onChange={(v) => update({ businessCards: v })} create={newItem} render={(item, upd) => <IconItemFields item={item} update={upd} />} />
        </FormSection>

        <FormSection title="Seed Round 1 Preview" description="Displayed only after Seed Round 1 is published from the Seed Round page.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Label" value={data.seedLabel} onChange={(v) => update({ seedLabel: v })} maxLength={60} />
            <TextField label="Heading" value={data.seedHeading} onChange={(v) => update({ seedHeading: v })} maxLength={160} />
          </div>
          <TextField label="Notice Title" value={data.seedNoticeTitle} onChange={(v) => update({ seedNoticeTitle: v })} maxLength={200} />
          <TextArea label="Description" value={data.seedDescription} onChange={(v) => update({ seedDescription: v })} maxLength={1500} />
          <TextArea label="Legal Note" rows={3} value={data.seedLegalNote} onChange={(v) => update({ seedLegalNote: v })} maxLength={1000} />
          <TextField label="CTA Text" value={data.seedCtaText} onChange={(v) => update({ seedCtaText: v })} maxLength={60} />
        </FormSection>
      </div>
      <SaveBar onSave={() => save()} saving={saving} dirty={dirty} />
    </>
  )
}
