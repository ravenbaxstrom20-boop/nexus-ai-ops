# Root Dockerfile for Nexus AI Ops Monorepo
FROM node:20-slim AS base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root workspace configs
COPY package.json package-lock.json tsconfig.json ./

# Copy package manifests
COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/
COPY packages/workflow/package.json ./packages/workflow/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN cd packages/db && npx prisma generate

# Build the api
RUN npm run build -w @nexus/api

# Final stage
FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Only copy what's needed for production
COPY --from=base /app ./

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["npm", "run", "start", "-w", "@nexus/api"]
