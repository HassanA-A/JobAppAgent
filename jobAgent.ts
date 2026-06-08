import { useState } from 'react'
import {
  Briefcase, Sparkles, Send, TableProperties,
  Server, Bot, UserCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ResumeTailor from './jobagent/ResumeTailor'
import OutreachDraft from './jobagent/OutreachDraft'
import ApplicationTracker from './jobagent/ApplicationTracker'

// ─── Section tab type ─────────────────────────────────────────────────────────

type Section = 'tailor' | 'outreach' | 'tracker'

const SECTIONS: { key: Section; icon: React.ElementType; label: string; sub: string }[] = [
  {
    key: 'tailor',
    icon: Sparkles,
    label: 'Resume Tailor',
    sub: 'Match your resume to a job description',
  },
  {
    key: 'outreach',
    icon: Send,
    label: 'Outreach Draft',
    sub: 'Generate LinkedIn DMs and cold emails',
  },
  {
    key: 'tracker',
    icon: TableProperties,
    label: 'Application Tracker',
    sub: 'Track status, contacts, and follow-ups',
  },
]

// ─── Status pills in header ───────────────────────────────────────────────────

function StatusPill({ icon: Icon, label, color }: {
  icon: React.ElementType; label: string; color: string
}) {
  return (
    <div className={cn(
      'flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-2xs font-medium',
      color
    )}>
      <Icon size={10} />
      {label}
    </div>
  )
}

// ─── Section card selector ────────────────────────────────────────────────────

function SectionSelector({
  active, onChange,
}: { active: Section; onChange: (s: Section) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
      {SECTIONS.map(({ key, icon: Icon, label, sub }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            'flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all duration-150',
            active === key
              ? 'bg-accent-purple-dim border-accent-purple/30 shadow-glow-purple'
              : 'bg-bg-raised border-border-default hover:border-border-strong hover:bg-bg-hover'
          )}
        >
          <div className={cn(
            'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5',
            active === key ? 'bg-accent-purple' : 'bg-bg-active'
          )}>
            <Icon size={13} className={active === key ? 'text-white' : 'text-text-muted'} />
          </div>
          <div>
            <div className={cn(
              'text-sm font-medium',
              active === key ? 'text-[#C4B5FD]' : 'text-text-secondary'
            )}>
              {label}
            </div>
            <div className="text-2xs text-text-muted mt-0.5 leading-relaxed">{sub}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function JobAgentPage() {
  const [section, setSection] = useState<Section>('tailor')

  return (
    <div className="p-6 max-w-screen-xl mx-auto animate-fade-in">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-7 h-7 bg-accent-purple rounded-md flex items-center justify-center shadow-glow-purple">
              <Briefcase size={13} className="text-white" />
            </div>
            <h1 className="text-xl font-medium text-text-primary font-display">Job Agent</h1>
          </div>
          <p className="text-xs text-text-muted max-w-md">
            Tailor resumes, draft outreach, and track applications — all from your homelab.
          </p>
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusPill
            icon={Server}
            label="Local App"
            color="bg-bg-raised border-border-default text-text-tertiary"
          />
          <StatusPill
            icon={Bot}
            label="AI Assisted"
            color="bg-accent-purple-dim border-accent-purple/20 text-[#A78BFA]"
          />
          <StatusPill
            icon={UserCheck}
            label="Human Approved"
            color="bg-status-green-dim border-status-green/20 text-status-green"
          />
        </div>
      </div>

      {/* ── Section selector ─────────────────────────────────────── */}
      <SectionSelector active={section} onChange={setSection} />

      {/* ── Active section ──────────────────────────────────────── */}
      <div key={section} className="animate-slide-up">
        {/* Section heading */}
        <div className="flex items-center gap-2 mb-4">
          {SECTIONS.map(s => s.key === section && (
            <div key={s.key} className="flex items-center gap-2">
              <s.icon size={14} className="text-accent-purple" />
              <h2 className="text-md font-medium text-text-primary font-display">{s.label}</h2>
            </div>
          ))}
          <div className="flex-1 border-t border-border-subtle ml-2" />
        </div>

        {section === 'tailor'   && <ResumeTailor />}
        {section === 'outreach' && <OutreachDraft />}
        {section === 'tracker'  && <ApplicationTracker />}
      </div>
    </div>
  )
}
