# Deployment Guide

Nexus AI Ops is designed to be easily deployable in a production environment using modern cloud platforms.

## 🚀 Backend Deployment (Render)

Render is the recommended platform for the Nexus AI Ops API and PostgreSQL database.

### 1. PostgreSQL Database
1. Go to the Render Dashboard and click **New > Database**.
2. Name it `nexus-db`.
3. Select the **Free** plan (or higher).
4. Copy the **Internal Database URL** once created.

### 2. API Web Service
1. Click **New > Blueprint** or **New > Web Service**.
2. Connect your GitHub repository.
3. If using Blueprints, Render will automatically detect the `render.yaml` file.
4. If setting up manually:
   - **Environment**: `Node`.
   - **Build Command**: `npm install && npx prisma generate --schema=packages/db/prisma/schema.prisma && npx prisma db push --schema=packages/db/prisma/schema.prisma --accept-data-loss && npx tsx packages/db/prisma/seed.ts`
   - **Start Command**: `npx tsx apps/api/src/index.ts`
5. **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `GEMINI_API_KEY`: Your Google API key.
   - `NODE_ENV`: `production`.
   - `PORT`: `3001`.

## 🎨 Frontend Deployment (Vercel)

The frontend is a Vite-based React application that should be deployed as a static site.

1. Connect your repository to Vercel.
2. Select `apps/web` as the root directory.
3. **Build Command**: `npm run build`.
4. **Output Directory**: `dist`.
5. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Render API (e.g., `https://nexus-ai-api.onrender.com`).

## 🐳 Docker (Optional)

You can also run the entire system using the provided Dockerfile in the root directory.

```bash
docker build -t nexus-ai-ops .
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e GEMINI_API_KEY="your-key" \
  nexus-ai-ops
```
