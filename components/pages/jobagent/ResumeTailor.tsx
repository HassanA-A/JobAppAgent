import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOCK_RESUME_RESULT, type ResumeTailorResult } from '@/data/jobAgent'

// ─── Field components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-text-tertiary mb-1.5 font-medium">{children}</label>
}

function Input({
  value, onChange, placeholder,
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
    />
  )
}

function Textarea({
  value, onChange, placeholder, rows = 5,
}: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
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

// ─── Score ring ───────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 80 ? '#3DD68C' : score >= 60 ? '#F76B15' : '#E5484D'

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-medium text-text-primary font-display">{score}</span>
        <span className="text-2xs text-text-muted">/ 100</span>
      </div>
    </div>
  )
}

// ─── Bullet improvement row ───────────────────────────────────────────────────

function BulletImprovement({ original, improved }: { original: string; improved: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-border-subtle rounded-md overflow-hidden">
      <button
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-bg-card transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <AlertCircle size={13} className="text-status-amber mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-tertiary line-clamp-2">{original}</p>
        </div>
        {expanded ? (
          <ChevronUp size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-3 border-t border-border-subtle animate-slide-up">
          <div className="flex items-start gap-2 pt-3">
            <ArrowRight size={13} className="text-status-green mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">{improved}</p>
          </div>
          <button
            className="mt-2 text-2xs text-accent-purple hover:text-accent-purple-hover transition-colors"
            onClick={e => { e.stopPropagation(); navigator.clipboard?.writeText(improved) }}
          >
            Copy improved bullet
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Output card ─────────────────────────────────────────────────────────────

function TailorOutput({ result }: { result: ResumeTailorResult }) {
  const [summaryCopied, setSummaryCopied] = useState(false)

  function copySummary() {
    navigator.clipboard?.writeText(result.tailoredSummary)
    setSummaryCopied(true)
    setTimeout(() => setSummaryCopied(false), 2000)
  }

  return (
    <div className="card animate-slide-up overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border-b border-border-subtle">
        <CheckCircle2 size={13} className="text-status-green" />
        <span className="text-xs font-medium text-text-secondary">Tailor result</span>
        <span className="ml-auto text-2xs text-text-muted">Ready to apply</span>
      </div>

      <div className="p-4 space-y-5">
        {/* Match score */}
        <div className="flex items-center gap-4">
          <ScoreRing score={result.matchScore} />
          <div>
            <div className="text-sm font-medium text-text-primary font-display mb-0.5">
              {result.matchLabel}
            </div>
            <div className="text-xs text-text-tertiary">
              Strong alignment on tech stack. Some gaps in infrastructure and observability keywords.
            </div>
            {result.missingSections.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {result.missingSections.map(s => (
                  <span key={s} className="text-2xs px-2 py-0.5 rounded border border-status-amber/30 bg-status-amber-dim text-status-amber">
                    Missing: {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Missing keywords */}
        <div>
          <div className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Missing keywords
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.missingKeywords.map(kw => (
              <span key={kw} className="badge badge-red mono">{kw}</span>
            ))}
          </div>
        </div>

        {/* Bullet improvements */}
        <div>
          <div className="text-2xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Suggested bullet improvements
          </div>
          <div className="space-y-2">
            {result.bulletImprovements.map((b, i) => (
              <BulletImprovement key={i} original={b.original} improved={b.improved} />
            ))}
          </div>
        </div>

        {/* Tailored summary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xs font-medium text-text-muted uppercase tracking-wider">
              Tailored summary
            </div>
            <button
              onClick={copySummary}
              className="text-2xs text-accent-purple hover:text-accent-purple-hover transition-colors"
            >
              {summaryCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="bg-bg-base border border-border-subtle rounded-md p-3">
            <p className="text-xs text-text-secondary leading-relaxed">{result.tailoredSummary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ResumeTailor() {
  const [jobTitle, setJobTitle]       = useState('')
  const [company, setCompany]         = useState('')
  const [jobDesc, setJobDesc]         = useState('')
  const [resumeText, setResumeText]   = useState('')
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState<ResumeTailorResult | null>(null)

  function handleTailor() {
    if (!jobTitle || !jobDesc || !resumeText) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(MOCK_RESUME_RESULT)
      setLoading(false)
    }, 2200)
  }

  const canSubmit = jobTitle.trim() && jobDesc.trim() && resumeText.trim()

  return (
    <div className="space-y-4">
      {/* Input card */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <Label>Job title</Label>
            <Input value={jobTitle} onChange={setJobTitle} placeholder="e.g. Senior Software Engineer" />
          </div>
          <div>
            <Label>Company</Label>
            <Input value={company} onChange={setCompany} placeholder="e.g. Vercel" />
          </div>
        </div>
        <div className="mb-3">
          <Label>Job description</Label>
          <Textarea
            value={jobDesc}
            onChange={setJobDesc}
            placeholder="Paste the full job description here…"
            rows={6}
          />
        </div>
        <div className="mb-4">
          <Label>Your resume / work history</Label>
          <Textarea
            value={resumeText}
            onChange={setResumeText}
            placeholder="Paste your current resume text or relevant experience here…"
            rows={6}
          />
        </div>
        <button
          onClick={handleTailor}
          disabled={!canSubmit || loading}
          className={cn(
            'btn-primary w-full justify-center py-2.5',
            (!canSubmit || loading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Sparkles size={13} />
              Tailor Resume
            </>
          )}
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="card p-4 animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-bg-active flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-bg-active rounded w-1/3" />
              <div className="h-2 bg-bg-active rounded w-2/3" />
              <div className="h-2 bg-bg-active rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-1.5">
            {[80, 60, 70].map(w => (
              <div key={w} className="h-2 bg-bg-active rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="h-20 bg-bg-active rounded-md" />
        </div>
      )}

      {/* Output */}
      {result && !loading && <TailorOutput result={result} />}
    </div>
  )
}
