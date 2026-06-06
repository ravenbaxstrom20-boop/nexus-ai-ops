# Nexus AI Ops — Production Dockerfile
FROM node:20-slim

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root workspace configs
COPY package.json package-lock.json tsconfig.json ./

# Copy package manifests
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
COPY packages/db/package.json ./packages/db/
COPY packages/workflow/package.json ./packages/workflow/

# Install all dependencies (cached layer — only re-runs if package.json changes)
RUN npm install

# Copy source code (excludes node_modules and junk via .dockerignore)
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

# Use tsx to run TypeScript directly
CMD ["npx", "tsx", "apps/api/src/index.ts"]