# --- base: samakan versi dengan lokal (1.2.20)
FROM oven/bun:1.2.20 AS base
WORKDIR /usr/src/app

# Prisma & native addons
USER root
RUN apt-get update && apt-get install -y \
  openssl libssl-dev ca-certificates git python3 build-essential \
  && rm -rf /var/lib/apt/lists/*
USER bun

# --- deps: install dari lockfile teks
FROM base AS deps
WORKDIR /usr/src/app
COPY --chown=bun:bun package.json bun.lock ./
# debug: pastikan lockfile memang ada di dalam image
RUN ls -la && test -f bun.lock
RUN bun install --frozen-lockfile

# --- build
FROM deps AS builder
WORKDIR /usr/src/app
COPY --chown=bun:bun . .
RUN bunx prisma generate

# --- production
FROM base AS production
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app ./
CMD ["bun", "run", "src/index.ts"]
