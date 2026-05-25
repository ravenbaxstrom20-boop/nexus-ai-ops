# Nexus AI Ops

Nexus AI Ops centralizes fragmented business processes into a single, AI-integrated dashboard.

## Technical Architecture

### Tech Stack
- **Frontend:** React (TypeScript) + Vite
- **Backend:** Node.js (TypeScript) + Express
- **Database:** PostgreSQL (for relational data) + Redis (for caching/queues)
- **AI Integration:** Gemini API (primary) with modular support for other LLMs.
- **Workflow Engine:** Native TypeScript-based automation engine for custom business logic.

### Project Structure (Monorepo)
- `apps/web`: The main React dashboard.
- `apps/api`: Backend services and API endpoints.
- `packages/db`: Prisma schema and database client.
- `packages/ui`: Shared UI component library.
- `packages/workflow`: Core automation engine logic and node definitions.

## Key Features
- Centralized Job Tracking & CRM.
- AI-driven lead management.
- Native workflow automation for business processes.
- Usage-based AI processing.

## Development Setup
(Instructions to be added as development progresses)
