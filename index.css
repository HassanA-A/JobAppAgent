import { useState } from 'react'
import { Send, Loader2, Copy, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_OUTREACH_RESULT, type OutreachResult } from '@/data/jobAgent'

type OutreachTab = 'linkedin' | 'email' | 'followup'
type Tone = 'Professional' | 'Casual' | 'Concise'

// ─── Field helpers ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-text-tertiary mb-1.5 font-medium">{children}</label>
}

function Input({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors resize-none mono leading-relaxed"
    />
  )
}

function ToneSelect({ value, onChange }: { value: Tone; onChange: (t: Tone) => void }) {
  const tones: Tone[] = ['Professional', 'Casual', 'Concise']
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value as Tone)}
        className="w-full appearance-none bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-purple transition-colors cursor-pointer pr-8"
      >
        {tones.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
    </div>
  )
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className={cn(
        'icon-btn transition-all',
        copied && 'text-status-green border-status-green/30 bg-status-green-dim'
      )}
      title="Copy to clipboard"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
    </button>
  )
}

// ─── Output card ─────────────────────────────────────────────────────────────

function OutreachOutput({ result }: { result: OutreachResult }) {
  const [tab, setTab] = useState<OutreachTab>('linkedin')

  const tabs: { key: OutreachTab; label: string }[] = [
    { key: 'linkedin', label: 'LinkedIn DM' },
    { key: 'email',    label: 'Cold Email' },
    { key: 'followup', label: 'Follow-up' },
  ]

  return (
    <div className="card animate-slide-up overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border-subtle">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex-1 py-2.5 text-xs font-medium transition-colors relative',
              tab === key
                ? 'text-text-primary bg-bg-card'
                : 'text-text-muted hover:text-text-secondary hover:bg-bg-card/50'
            )}
          >
            {label}
            {tab === key && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-purple" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === 'linkedin' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-blue">LinkedIn DM</span>
                <span className="text-2xs text-text-muted">{result.linkedinDm.length} chars</span>
              </div>
              <CopyButton text={result.linkedinDm} />
            </div>
            <div className="bg-bg-base border border-border-subtle rounded-md p-3">
              <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
                {result.linkedinDm}
              </p>
            </div>
            <p className="text-2xs text-text-muted mt-2">
              LinkedIn DMs are capped at 300 chars. This draft is under the limit.
            </p>
          </div>
        )}

        {tab === 'email' && (
          <div className="animate-fade-in space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xs text-text-muted font-medium uppercase tracking-wider">Subject</span>
                <CopyButton text={result.coldEmail.subject} />
              </div>
              <div className="bg-bg-base border border-border-subtle rounded-md px-3 py-2">
                <p className="text-xs text-text-primary mono">{result.coldEmail.subject}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xs text-text-muted font-medium uppercase tracking-wider">Body</span>
                <CopyButton text={result.coldEmail.body} />
              </div>
              <div className="bg-bg-base border border-border-subtle rounded-md p-3">
                <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {result.coldEmail.body}
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'followup' && (
          <div className="animate-fade-in space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xs text-text-muted font-medium uppercase tracking-wider">Subject</span>
                <CopyButton text={result.followUp.subject} />
              </div>
              <div className="bg-bg-base border border-border-subtle rounded-md px-3 py-2">
                <p className="text-xs text-text-primary mono">{result.followUp.subject}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xs text-text-muted font-medium uppercase tracking-wider">Body</span>
                <CopyButton text={result.followUp.body} />
              </div>
              <div className="bg-bg-base border border-border-subtle rounded-md p-3">
                <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {result.followUp.body}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OutreachDraft() {
  const [contactName, setContactName] = useState('')
  const [company, setCompany]         = useState('')
  const [role, setRole]               = useState('')
  const [notes, setNotes]             = useState('')
  const [tone, setTone]               = useState<Tone>('Professional')
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState<OutreachResult | null>(null)

  function handleDraft() {
    if (!company || !role) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_OUTREACH_RESULT)
      setLoading(false)
    }, 1800)
  }

  const canSubmit = company.trim() && role.trim()

  return (
    <div className="space-y-4">
      {/* Input card */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <Label>Contact name</Label>
            <Input value={contactName} onChange={setContactName} placeholder="e.g. Jess Kim" />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={company} onChange={setCompany} placeholder="e.g. Linear" />
          </div>
          <div>
            <Label>Role / position</Label>
            <Input value={role} onChange={setRole} placeholder="e.g. Product Engineer" />
          </div>
          <div>
            <Label>Tone</Label>
            <ToneSelect value={tone} onChange={setTone} />
          </div>
        </div>

        <div className="mb-4">
          <Label>Notes about contact or company</Label>
          <Textarea
            value={notes}
            onChange={setNotes}
            placeholder="e.g. Met at a conference, follows me on Twitter, worked at Stripe before…"
            rows={3}
          />
        </div>

        <button
          onClick={handleDraft}
          disabled={!canSubmit || loading}
          className={cn(
            'btn-primary w-full justify-center py-2.5',
            (!canSubmit || loading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Drafting…
            </>
          ) : (
            <>
              <Send size={13} />
              Draft Outreach
            </>
          )}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="card animate-pulse">
          <div className="flex border-b border-border-subtle">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 py-2.5 px-4">
                <div className="h-2.5 bg-bg-active rounded mx-auto w-2/3" />
              </div>
            ))}
          </div>
          <div className="p-4 space-y-3">
            <div className="h-2 bg-bg-active rounded w-1/4" />
            <div className="space-y-2">
              {[100, 90, 95, 80].map(w => (
                <div key={w} className="h-2 bg-bg-active rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {result && !loading && <OutreachOutput result={result} />}
    </div>
  )
}
