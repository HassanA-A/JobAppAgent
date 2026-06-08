import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function cpuColor(value: number) {
  if (value >= 80) return 'bg-status-red'
  if (value >= 60) return 'bg-status-amber'
  return 'bg-accent-purple'
}

export function ramColor(value: number) {
  if (value >= 85) return 'bg-status-red'
  if (value >= 70) return 'bg-status-amber'
  return 'bg-status-green'
}

export function diskColor(value: number) {
  if (value >= 90) return 'bg-status-red'
  if (value >= 75) return 'bg-status-amber'
  return 'bg-status-blue'
}
