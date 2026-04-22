# 1. Install Bun
FROM oven/bun:1-alpine AS base

# 2. Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile

# 3. Generate Prisma client
FROM base AS prisma-generator
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma/
RUN bunx prisma generate

# 4. Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma-generator /app/node_modules/.prisma ./node_modules/.prisma
COPY . .
RUN bun run build

# 5. Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3011

ENV PORT=3011
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]