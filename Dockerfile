# =============================================================================
# Staark Inc — Dockerfile
# Multi-stage: deps → builder → runner
# Next.js în modul standalone pentru imagine mică și boot rapid.
# =============================================================================

# ── Stage 1: Dependențe ───────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Instalează dependențele native necesare
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js standalone — include serverul minimal fără node_modules în container
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── Stage 3: Runner (producție) ───────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# User non-root pentru securitate
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copiază doar ce e necesar din build
COPY --from=builder /app/public                    ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

# Directoare pentru volume
RUN mkdir -p /app/public/uploads /app/logs && \
    chown -R nextjs:nodejs /app/public/uploads /app/logs

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]