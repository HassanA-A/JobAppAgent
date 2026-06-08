import { cn } from '@/lib/utils'
import { Loader2, AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  sub?: string
  progress?: number
  progressColor?: string
  statusLabel?: string
  statusColor?: string
  children?: ReactNode
  className?: string
}

export function MetricCard({
  label, value, unit, sub, progress, progressColor = 'bg-accent-purple',
  statusLabel, statusColor, children, className,
}: MetricCardProps) {
  return (
    <div className={cn('card p-4 flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="metric-label">{label}</span>
        {statusLabel && (
          <span className={cn('text-2xs font-medium flex items-center gap-1', statusColor)}>
            <span className="w-1 h-1 rounded-full bg-current" />
            {statusLabel}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-medium text-text-primary font-display tracking-tight leading-none">
          {value}
        </span>
        {unit && <span className="text-lg text-text-tertiary font-display">{unit}</span>}
      </div>
      {sub && <div className="text-xs text-text-tertiary">{sub}</div>}
      {progress !== undefined && (
        <div className="progress-bar mt-1">
          <div
            className={cn('progress-fill', progressColor)}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
      {children}
    </div>
  )
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  className?: string
  height?: string
}

export function ProgressBar({ value, max = 100, color = 'bg-accent-purple', className, height = 'h-[3px]' }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className={cn('bg-bg-active rounded-full overflow-hidden', height, className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700', color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

type StatusVariant = 'running' | 'stopped' | 'error' | 'warning' | 'active' | 'idle' | 'beta' | 'synced'

const STATUS_CONFIG: Record<StatusVariant, { cls: string; dot: string; label: string }> = {
  running: { cls: 'badge-green',  dot: 'bg-status-green', label: 'Running' },
  stopped: { cls: 'badge-gray',   dot: 'bg-text-muted',   label: 'Stopped' },
  error:   { cls: 'badge-red',    dot: 'bg-status-red',   label: 'Error'   },
  warning: { cls: 'badge-amber',  dot: 'bg-status-amber', label: 'Warning' },
  active:  { cls: 'badge-purple', dot: 'bg-[#A78BFA]',    label: 'Active'  },
  idle:    { cls: 'badge-gray',   dot: 'bg-text-muted',   label: 'Idle'    },
  beta:    { cls: 'badge-amber',  dot: 'bg-status-amber', label: 'Beta'    },
  synced:  { cls: 'badge-blue',   dot: 'bg-status-blue',  label: 'Synced'  },
}

interface StatusBadgeProps {
  status: StatusVariant
  label?: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={cn(config.cls, className)}>
      <span className={cn('status-dot', config.dot)} />
      {label ?? config.label}
    </span>
  )
}

// ─── StatusDot ───────────────────────────────────────────────────────────────

export function StatusDot({ status }: { status: StatusVariant }) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={cn(
      'status-dot',
      config.dot,
      (status === 'running' || status === 'active') && 'shadow-glow-green'
    )} />
  )
}

// ─── LoadingSpinner ───────────────────────────────────────────────────────────

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <Loader2 size={20} className="text-text-muted animate-spin" />
    </div>
  )
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-xl font-medium text-text-primary font-display">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}

// ─── EmptyState ──────────────────────────────────────────────────────────────

export function EmptyState({ icon: Icon, title, subtitle }: {
  icon: React.ElementType
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <div className="w-10 h-10 rounded-xl bg-bg-active flex items-center justify-center">
        <Icon size={18} className="text-text-muted" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

// ─── Quant Badge ─────────────────────────────────────────────────────────────

export function QuantBadge({ quant }: { quant: string }) {
  const cls = quant.startsWith('Q4') ? 'badge-purple'
    : quant.startsWith('Q8') ? 'badge-green'
    : quant === 'FP16' ? 'badge-blue'
    : 'badge-gray'
  return <span className={cn('badge mono', cls)}>{quant}</span>
}

// ─── Separator ────────────────────────────────────────────────────────────────

export function Separator({ className }: { className?: string }) {
  return <div className={cn('border-t border-border-subtle', className)} />
}
