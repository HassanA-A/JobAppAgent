# JobAppAgent

JobAppAgent is a React/Vite job-application workflow prototype for tailoring resumes, drafting outreach, and tracking applications from a homelab-style dashboard UI.

The project is designed around a human-approved workflow: it can help generate drafts and organize job-search data, but it does not auto-apply, auto-message, send emails, or scrape LinkedIn.

## Features

- Resume tailoring workflow for matching a resume to a job description
- Outreach draft workflow for LinkedIn messages, cold emails, referral asks, and follow-ups
- Application tracker for jobs, contacts, statuses, and follow-up notes
- Dark dashboard UI styled for homelab/ops use
- Local-first design that can be connected to a FastAPI backend

## Safety Model

This app is intentionally draft-only.

- No automatic job applications
- No automatic emails
- No automatic LinkedIn messages
- No LinkedIn scraping
- No API keys exposed to the frontend
- Human review required before copying, sending, or submitting anything

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Resume Workflow

The intended resume workflow is:

1. Paste or load a base LaTeX resume.
2. Paste a job description.
3. Generate a tailored resume draft.
4. Review the LaTeX manually.
5. Copy or download the tailored `.tex` file.
6. Paste it into Overleaf manually.

Overleaf Git sync can be added later, but manual copy/paste is the default safe mode.

## Backend Integration

The full homelab-dashboard version uses FastAPI routes such as:

- `POST /api/job-agent/analyze-job`
- `POST /api/job-agent/tailor-resume`
- `POST /api/job-agent/draft-outreach`
- `POST /api/job-agent/save-resume-version`
- `GET /api/job-agent/applications`
- `GET /api/job-agent/contacts`
- `GET /api/job-agent/resume-versions`

AI calls should happen only on the backend. The frontend should call these API routes and should never receive or store provider API keys.

## Environment Variables

For backend-enabled deployments, use backend-side environment variables only:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai
```

Do not put API keys in frontend `.env` files that are exposed to Vite.

## Project Notes

This repo is the standalone Job Agent workspace. The integrated homelab dashboard version may live in a separate repo and include the FastAPI backend, SQLite storage, and local resume versioning.

