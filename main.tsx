import { useState } from 'react'
import { Plus, ExternalLink, ChevronUp, ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MOCK_APPLICATIONS, APP_STATUS_CONFIG,
  type Application, type AppStatus,
} from '@/data/jobAgent'

// ─── Status badge ─────────────────────────────────────────────────────────────

function AppStatusBadge({ status }: { status: AppStatus }) {
  const cfg = APP_STATUS_CONFIG[status]
  return (
    <span className={cn('badge', cfg.cls)}>
      <span className={cn('status-dot', cfg.dot)} />
      {cfg.label}
    </span>
  )
}

// ─── Status select inline ─────────────────────────────────────────────────────

function StatusSelect({ value, onChange }: { value: AppStatus; onChange: (s: AppStatus) => void }) {
  const statuses = Object.keys(APP_STATUS_CONFIG) as AppStatus[]
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as AppStatus)}
      className="text-2xs bg-transparent border-none outline-none cursor-pointer text-text-muted hover:text-text-secondary"
    >
      {statuses.map(s => (
        <option key={s} value={s}>{APP_STATUS_CONFIG[s].label}</option>
      ))}
    </select>
  )
}

// ─── Add row modal ────────────────────────────────────────────────────────────

function AddApplicationModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (app: Application) => void
}) {
  const [company, setCompany]   = useState('')
  const [role, setRole]         = useState('')
  const [contact, setContact]   = useState('')
  const [notes, setNotes]       = useState('')
  const [status, setStatus]     = useState<AppStatus>('drafted')

  function handleAdd() {
    if (!company || !role) return
    onAdd({
      id: Date.now().toString(),
      company, role, contact,
      contactTitle: '',
      status,
      followUpDate: null,
      appliedDate: new Date().toISOString().split('T')[0],
      notes,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in p-4">
      <div className="card w-full max-w-md border border-border-strong">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
          <h3 className="text-sm font-medium text-text-primary">Add application</h3>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="p-4 space-y-3">
          {[
            { label: 'Company *', val: company, set: setCompany, ph: 'e.g. Vercel' },
            { label: 'Role *', val: role, set: setRole, ph: 'e.g. Senior Engineer' },
            { label: 'Contact name', val: contact, set: setContact, ph: 'e.g. Jess Kim' },
          ].map(({ label, val, set, ph }) => (
            <div key={label}>
              <label className="block text-xs text-text-tertiary mb-1.5">{label}</label>
              <input
                value={val}
                onChange={e => set(e.target.value)}
                placeholder={ph}
                className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-text-tertiary mb-1.5">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as AppStatus)}
              className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-purple transition-colors"
            >
              {(Object.keys(APP_STATUS_CONFIG) as AppStatus[]).map(s => (
                <option key={s} value={s}>{APP_STATUS_CONFIG[s].label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-tertiary mb-1.5">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="Any relevant context…"
              className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple transition-colors resize-none"
            />
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-2 justify-end">
          <button className="btn-ghost text-xs" onClick={onClose}>Cancel</button>
          <button
            className={cn('btn-primary text-xs', (!company || !role) && 'opacity-50 cursor-not-allowed')}
            onClick={handleAdd}
            disabled={!company || !role}
          >
            <Plus size={12} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main table ───────────────────────────────────────────────────────────────

type SortCol = 'company' | 'role' | 'status' | 'appliedDate'

export default function ApplicationTracker() {
  const [apps, setApps]           = useState<Application[]>(MOCK_APPLICATIONS)
  const [search, setSearch]       = useState('')
  const [sortCol, setSortCol]     = useState<SortCol>('appliedDate')
  const [sortDir, setSortDir]     = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilter] = useState<AppStatus | 'all'>('all')
  const [showAdd, setShowAdd]     = useState(false)

  function toggleSort(col: SortCol) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  function updateStatus(id: string, status: AppStatus) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const filtered = apps
    .filter(a =>
      (filterStatus === 'all' || a.status === filterStatus) &&
      (search === '' || `${a.company} ${a.role} ${a.contact}`.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      let diff = 0
      if (sortCol === 'company')     diff = a.company.localeCompare(b.company)
      if (sortCol === 'role')        diff = a.role.localeCompare(b.role)
      if (sortCol === 'status')      diff = a.status.localeCompare(b.status)
      if (sortCol === 'appliedDate') diff = a.appliedDate.localeCompare(b.appliedDate)
      return sortDir === 'asc' ? diff : -diff
    })

  const counts = (Object.keys(APP_STATUS_CONFIG) as AppStatus[]).reduce(
    (acc, s) => ({ ...acc, [s]: apps.filter(a => a.status === s).length }),
    {} as Record<AppStatus, number>
  )

  function SortIcon({ col }: { col: SortCol }) {
    if (sortCol !== col) return <ChevronUp size={10} className="opacity-20" />
    return sortDir === 'asc'
      ? <ChevronUp size={10} className="text-accent-purple" />
      : <ChevronDown size={10} className="text-accent-purple" />
  }

  return (
    <div className="space-y-3">
      {showAdd && (
        <AddApplicationModal
          onClose={() => setShowAdd(false)}
          onAdd={a => setApps(prev => [a, ...prev])}
        />
      )}

      {/* Summary row */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'text-xs px-3 py-1.5 rounded-md border transition-colors mono',
            filterStatus === 'all'
              ? 'border-border-strong bg-bg-hover text-text-primary'
              : 'border-border-default bg-transparent text-text-muted hover:text-text-secondary'
          )}
        >
          All ({apps.length})
        </button>
        {(Object.entries(APP_STATUS_CONFIG) as [AppStatus, typeof APP_STATUS_CONFIG[AppStatus]][]).map(([s, cfg]) => (
          counts[s] > 0 && (
            <button
              key={s}
              onClick={() => setFilter(filterStatus === s ? 'all' : s)}
              className={cn(
                'badge cursor-pointer transition-opacity',
                cfg.cls,
                filterStatus !== 'all' && filterStatus !== s && 'opacity-40'
              )}
            >
              <span className={cn('status-dot', cfg.dot)} />
              {cfg.label} {counts[s]}
            </button>
          )
        ))}
      </div>

      {/* Search + add */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-bg-raised border border-border-default rounded-md px-3 py-2">
          <Search size={12} className="text-text-muted flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search applications…"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
        <button className="icon-btn" title="Filter"><SlidersHorizontal size={13} /></button>
        <button className="btn-primary text-xs" onClick={() => setShowAdd(true)}>
          <Plus size={12} /> Add
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border-subtle">
                {([
                  ['Company',    'company'    ],
                  ['Role',       'role'       ],
                  ['Contact',    null         ],
                  ['Status',     'status'     ],
                  ['Applied',    'appliedDate'],
                  ['Follow-up',  null         ],
                  ['Notes',      null         ],
                ] as [string, SortCol | null][]).map(([label, col]) => (
                  <th
                    key={label}
                    onClick={() => col && toggleSort(col)}
                    className={cn(
                      'table-head text-left whitespace-nowrap',
                      col && 'cursor-pointer hover:text-text-secondary transition-colors select-none'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {col && <SortIcon col={col} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id} className="table-row group">
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-text-primary">{app.company}</span>
                      {app.url && (
                        <a href={app.url} target="_blank" rel="noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink size={10} className="text-text-muted hover:text-status-blue" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-text-secondary">{app.role}</span>
                  </td>
                  <td className="table-cell">
                    {app.contact ? (
                      <div>
                        <div className="text-sm text-text-secondary">{app.contact}</div>
                        {app.contactTitle && (
                          <div className="text-2xs text-text-muted">{app.contactTitle}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                      <AppStatusBadge status={app.status} />
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <StatusSelect
                          value={app.status}
                          onChange={s => updateStatus(app.id, s)}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-xs text-text-tertiary mono">{app.appliedDate}</span>
                  </td>
                  <td className="table-cell">
                    {app.followUpDate ? (
                      <span className="text-xs text-status-amber mono">{app.followUpDate}</span>
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="table-cell max-w-[200px]">
                    <p className="text-xs text-text-tertiary truncate">{app.notes || '—'}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-text-muted">No applications match your filter.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border-subtle flex items-center justify-between">
          <span className="text-2xs text-text-muted">
            {filtered.length} of {apps.length} applications
          </span>
          <span className="text-2xs text-text-muted mono">
            {apps.filter(a => a.status === 'replied').length} replies · {apps.filter(a => a.status === 'follow-up').length} pending follow-up
          </span>
        </div>
      </div>
    </div>
  )
}
