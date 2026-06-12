# Deployment Guide

Nexus AI Ops is designed to be easily deployable on platforms like **Render**, **Vercel**, or any Docker-compatible environment.

## 🚀 Deploying to Render

Render is our primary deployment platform. The project includes a `render.yaml` blueprint for one-click setup.

### 1. Prerequisites
- A Render account.
- A GitHub repository containing the Nexus AI Ops code.
- A Google Gemini API Key.

### 2. Setup Steps
1. Push your code to GitHub.
2. In Render, go to **Blueprints** and connect your repository.
3. Render will detect the `render.yaml` file and create:
   - A **PostgreSQL** database (Persistent).
   - A **Web Service** for the API.
4. **Environment Variables**: During setup (or after), ensure you add the following to the Web Service:
   - `GEMINI_API_KEY`: Your Google API key.
   - `DATABASE_URL`: Automatically managed by Render Blueprints.
   - `NODE_ENV`: `production`.

### 3. Build & Start Commands
Render uses the commands defined in `apps/api/render.yaml`:
- **Build**: `npm install && npx prisma generate && npx prisma db push --accept-data-loss && npx tsx packages/db/seed.ts`
- **Start**: `npx tsx apps/api/src/index.ts`

*Note: The `--accept-data-loss` flag is used during development/demo phases to ensure the schema stays in sync with the database.*

## 🎨 Deploying the Frontend (Vercel)

While the API serves the dashboard, for optimal performance, the `apps/web` package can be deployed as a static site to Vercel.

1. Connect the repository to Vercel.
2. Set the root directory to `apps/web`.
3. Set the Build Command: `npm run build`.
4. Set the Output Directory: `dist`.
5. Add Environment Variable:
   - `VITE_API_URL`: The URL of your deployed Render API.

## 🐳 Docker Deployment

The project includes a `Dockerfile` at the root for containerized deployments.

```bash
docker build -t nexus-ai-ops .
docker run -p 3001:3001 -e DATABASE_URL=your_db_url -e GEMINI_API_KEY=your_key nexus-ai-ops
```
