import Link from 'next/link'
import { AlertTriangle, FileCheck2, FilePen, Image as ImageIcon, Inbox, MailOpen, TrendingUp, type LucideIcon } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminShell'
import { EmptyState } from '@/components/admin/EmptyState'
import { connectDB, isDbConfigured } from '@/lib/db'
import { Inquiry } from '@/models/Inquiry'
import { StoredUpload } from '@/models/StoredUpload'
import { getSeedRound } from '@/lib/content'
import { cn } from '@/lib/utils'

async function getStats() {
  if (!isDbConfigured()) return null
  try {
    await connectDB()
    const [total, unread, uploads, recent, seed] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      StoredUpload.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(6).select('name email category status createdAt').lean(),
      getSeedRound(),
    ])
    return { total, unread, uploads, recent, seed }
  } catch (err) {
    console.error('[dashboard]', err)
    return null
  }
}

function Stat({ icon: I, label, value, tone = 'default', href }: { icon: LucideIcon; label: string; value: string | number; tone?: 'default' | 'warn' | 'ok'; href?: string }) {
  const body = (
    <div className="flex items-center gap-4 rounded-lg border border-[#e4dccb] bg-white p-5 shadow-sm transition hover:border-gold/60">
      <span className={cn('inline-flex size-12 items-center justify-center rounded-full', tone === 'warn' ? 'bg-amber-50 text-amber-700' : tone === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-cream text-gold-deep')}>
        <I className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</p>
        <p className="mt-0.5 font-serif text-3xl font-semibold text-ink">{value}</p>
      </div>
    </div>
  )
  return href ? <Link href={href}>{body}</Link> : body
}

export default async function DashboardPage() {
  const stats = await getStats()

  if (!stats) {
    return (
      <>
        <AdminPageHeader title="Dashboard" />
        <EmptyState icon={AlertTriangle} title="Database unavailable" description="Check that MONGODB_URI is configured and the Atlas cluster allows connections from this deployment." />
      </>
    )
  }

  const { seed } = stats
  // 4 public pages are always published; Seed Round 1 depends on the Founder's approval.
  const published = 4 + (seed.published ? 1 : 0)
  const drafts = seed.published ? 0 : 1

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of website content, inquiries and publication status." />

      {!seed.published && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>Seed Round 1 is in <strong>Draft / Unpublished</strong> status and is hidden from the public website. <Link href="/admin/seed-round" className="font-semibold underline">Manage Seed Round 1</Link></p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat icon={Inbox} label="Total Inquiries" value={stats.total} href="/admin/inquiries" />
        <Stat icon={MailOpen} label="New Inquiries" value={stats.unread} tone={stats.unread ? 'warn' : 'default'} href="/admin/inquiries?status=new" />
        <Stat icon={ImageIcon} label="Uploaded Images" value={stats.uploads} href="/admin/images" />
        <Stat icon={FileCheck2} label="Published Pages" value={published} tone="ok" />
        <Stat icon={FilePen} label="Draft Pages" value={drafts} tone={drafts ? 'warn' : 'default'} />
        <Stat icon={TrendingUp} label="Seed Round Status" value={seed.published ? 'Published' : 'Draft'} tone={seed.published ? 'ok' : 'warn'} href="/admin/seed-round" />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-ink">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm font-semibold text-pine hover:underline">View all</Link>
        </div>
        {stats.recent.length === 0 ? (
          <EmptyState icon={Inbox} title="No inquiries yet" description="Contact form submissions will appear here." />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#e4dccb] bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-[#e4dccb] bg-[#fbfaf6] text-xs tracking-wider text-muted uppercase">
                <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Received</th></tr>
              </thead>
              <tbody>
                {stats.recent.map((i) => (
                  <tr key={String(i._id)} className="border-b border-[#f0ebe0] last:border-0">
                    <td className="px-4 py-3"><p className="font-semibold text-ink">{i.name}</p><p className="text-xs text-muted">{i.email}</p></td>
                    <td className="px-4 py-3 text-text">{i.category}</td>
                    <td className="px-4 py-3"><span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', i.status === 'new' ? 'bg-amber-100 text-amber-900' : i.status === 'read' ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-700')}>{i.status}</span></td>
                    <td className="px-4 py-3 text-muted">{new Date(i.createdAt).toLocaleDateString('en-CA')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
