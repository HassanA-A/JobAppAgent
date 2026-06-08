export type AppStatus = 'drafted' | 'applied' | 'interview' | 'replied' | 'follow-up' | 'offer' | 'rejected'

export interface Application {
  id: string
  company: string
  role: string
  contact: string
  contactTitle: string
  url?: string
  status: AppStatus
  followUpDate: string | null
  appliedDate: string
  notes: string
}

export interface ResumeTailorResult {
  matchScore: number
  matchLabel: string
  missingSections: string[]
  missingKeywords: string[]
  bulletImprovements: Array<{ original: string; improved: string }>
  tailoredSummary: string
}

export interface OutreachResult {
  linkedinDm: string
  coldEmail: {
    subject: string
    body: string
  }
  followUp: {
    subject: string
    body: string
  }
}

export const APP_STATUS_CONFIG: Record<AppStatus, { label: string; cls: string; dot: string }> = {
  drafted: { label: 'Drafted', cls: 'badge-gray', dot: 'bg-text-muted' },
  applied: { label: 'Applied', cls: 'badge-blue', dot: 'bg-status-blue' },
  interview: { label: 'Interview', cls: 'badge-purple', dot: 'bg-accent-purple' },
  replied: { label: 'Replied', cls: 'badge-green', dot: 'bg-status-green' },
  'follow-up': { label: 'Follow up', cls: 'badge-amber', dot: 'bg-status-amber' },
  offer: { label: 'Offer', cls: 'badge-green', dot: 'bg-status-green' },
  rejected: { label: 'Rejected', cls: 'badge-red', dot: 'bg-status-red' },
}

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    company: 'Vercel',
    role: 'Senior Software Engineer',
    contact: 'Jess Kim',
    contactTitle: 'Engineering Manager',
    url: 'https://vercel.com/careers',
    status: 'interview',
    followUpDate: '2026-06-12',
    appliedDate: '2026-06-01',
    notes: 'Frontend platform role with infra overlap.',
  },
  {
    id: '2',
    company: 'Supabase',
    role: 'Developer Experience Engineer',
    contact: 'Alex Rivera',
    contactTitle: 'DX Lead',
    url: 'https://supabase.com/careers',
    status: 'applied',
    followUpDate: '2026-06-10',
    appliedDate: '2026-06-03',
    notes: 'Highlight Postgres, React, and docs experience.',
  },
]

export const MOCK_RESUME_RESULT: ResumeTailorResult = {
  matchScore: 82,
  matchLabel: 'Strong match',
  missingSections: ['Observability', 'Distributed systems'],
  missingKeywords: ['Postgres', 'CI/CD', 'TypeScript', 'Kubernetes'],
  bulletImprovements: [
    {
      original: 'Built internal tools for engineering teams.',
      improved: 'Built TypeScript internal tools that reduced engineering support time by 35%.',
    },
    {
      original: 'Worked on deployment automation.',
      improved: 'Automated CI/CD deployment workflows with validation checks and rollback paths.',
    },
  ],
  tailoredSummary: 'Full-stack engineer with strong TypeScript, automation, and infrastructure experience for product-focused teams.',
}

export const MOCK_OUTREACH_RESULT: OutreachResult = {
  linkedinDm: 'Hi, I saw your team is hiring and would love to connect. My background in TypeScript, automation, and infrastructure seems closely aligned.',
  coldEmail: {
    subject: 'Interest in the open engineering role',
    body: 'Hello, I am interested in the role and wanted to share a concise note about my fit. I have built production React and automation systems for engineering teams.',
  },
  followUp: {
    subject: 'Following up on my application',
    body: 'Hi, just following up on my earlier note. I would still be excited to learn more about the team and where I might be useful.',
  },
}
