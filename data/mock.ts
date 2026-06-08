export interface OllamaModel {
  id: string
  name: string
  tag: string
  fullName: string
  sizeGB: number
  contextWindow: number
  quantization: string
  status: 'ready' | 'idle'
  lastUsed: Date | null
}

export interface Container {
  id: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'restarting'
  cpuPercent: number
  memUsedMB: number
  ports: string[]
  uptime: number | null
}

export function formatBytes(value: number) {
  if (value >= 1024) return `${(value / 1024).toFixed(1)} TB`
  return `${value.toFixed(1)} GB`
}

export function formatContext(value: number) {
  return value >= 1000 ? `${Math.round(value / 1000)}k` : `${value}`
}

export function timeAgo(value: Date | null) {
  if (!value) return 'Never'
  const minutes = Math.max(1, Math.round((Date.now() - value.getTime()) / 60000))
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export function formatUptime(seconds: number) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h`
  return `${hours}h`
}

export function getMockSystemMetrics() {
  return {
    hostname: 'ubuntu-home',
    os: 'Ubuntu 24.04',
    kernelVersion: '6.8.0',
    uptime: 421300,
    cpu: { usage: 24, model: 'Ryzen 9', cores: 16, temp: 58 },
    ram: { percent: 73, used: 23.4, total: 32 },
    gpu: { usage: 8, model: 'RTX 4090', vramUsed: 3.1, vramTotal: 24, temp: 44 },
    disk: { percent: 61, used: 680, total: 1000, readSpeed: 18, writeSpeed: 42 },
    network: { downloadMbps: 124, uploadMbps: 38, interface: 'eth0' },
    tailscale: { connected: true, peers: 8, ip: '100.64.0.12', hostname: 'ubuntu-home' },
  }
}

export function getMockModels(): OllamaModel[] {
  return [
    { id: '1', name: 'llama3', tag: 'latest', fullName: 'Meta Llama 3', sizeGB: 4.7, contextWindow: 8192, quantization: 'Q4_K_M', status: 'ready', lastUsed: new Date(Date.now() - 25 * 60000) },
    { id: '2', name: 'codellama', tag: '13b', fullName: 'Code Llama 13B', sizeGB: 7.3, contextWindow: 16384, quantization: 'Q5_K_M', status: 'ready', lastUsed: new Date(Date.now() - 5 * 3600000) },
    { id: '3', name: 'mistral', tag: 'latest', fullName: 'Mistral 7B', sizeGB: 4.1, contextWindow: 8192, quantization: 'Q4_0', status: 'idle', lastUsed: null },
  ]
}

export function getMockContainers(): Container[] {
  return [
    { id: '1', name: 'postgres', image: 'postgres:16', status: 'running', cpuPercent: 4.2, memUsedMB: 812, ports: ['5432:5432'], uptime: 172800 },
    { id: '2', name: 'ollama', image: 'ollama/ollama:latest', status: 'running', cpuPercent: 18.4, memUsedMB: 4096, ports: ['11434:11434'], uptime: 86400 },
    { id: '3', name: 'redis', image: 'redis:7', status: 'stopped', cpuPercent: 0, memUsedMB: 0, ports: ['6379:6379'], uptime: null },
  ]
}

export function getMockInfra() {
  return []
}

export function getMockAgents() {
  return []
}
