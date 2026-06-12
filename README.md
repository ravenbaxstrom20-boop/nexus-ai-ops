# Nexus AI Ops

Nexus AI Ops is a centralized dashboard for managing fragmented business processes, integrated with AI for proactive task and relationship management.

## 🚀 Key Features

- **Job Tracking & CRM**: Centralized view of leads and active jobs.
- **AI-Driven Lead Management**: Automated lead scoring and enrichment using Google Gemini.
- **Workflow Automation**: Native TypeScript-based engine for custom business logic.
- **Proactive Insights**: AI-generated summaries and status updates.

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend**: React (TypeScript), Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js (TypeScript), Express.
- **Database**: Prisma ORM, PostgreSQL (Persistent), SQLite (Local Dev).
- **AI Integration**: Google Gemini 1.5 Flash.
- **Monorepo**: Managed with NPM Workspaces.

### Project Structure
- `apps/web`: The React dashboard frontend.
- `apps/api`: Backend services and RESTful API.
- `packages/db`: Prisma schema, migrations, and shared database client.
- `packages/workflow`: Core automation engine and AI action handlers.
- `packages/ui`: Shared UI components (planned).

## 📂 Documentation

- [API Reference](./API_REFERENCE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Workflow Engine](./WORKFLOW_ENGINE.md)
- [UI Design System](./UI_DESIGN.md)

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd nexus-ai-ops
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create `.env` files in `apps/api` and `apps/web` based on `.env.example`.
   Key variables needed:
   - `DATABASE_URL`: PostgreSQL or SQLite connection string.
   - `GEMINI_API_KEY`: Google Generative AI key.

4. **Prepare Database**:
   ```bash
   cd packages/db
   npx prisma generate
   npx prisma db push
   npx npm run seed
   ```

5. **Start Development Servers**:
   ```bash
   # From root
   npm run dev --workspace=@nexus/api
   npm run dev --workspace=@nexus/web
   ```

## 📄 License
MIT
