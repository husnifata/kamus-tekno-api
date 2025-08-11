# Dockerfile - Percobaan Final dengan System Dependencies

FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Pindah ke user root untuk meng-install package sistem
USER root
# Install package yang sering dibutuhkan oleh Prisma
RUN apt-get update && apt-get install -y openssl libssl-dev

# Kembali ke user bun yang lebih aman
USER bun

#----------------------------------------------------

FROM base as deps
WORKDIR /usr/src/app

# Salin file dependensi dan install
COPY --chown=bun:bun package.json bun.lock ./
RUN bun install --frozen-lockfile

#----------------------------------------------------

FROM deps as builder
WORKDIR /usr/src/app

COPY --chown=bun:bun . .
RUN bunx prisma generate

#----------------------------------------------------

FROM builder as production
WORKDIR /usr/src/app
ENV NODE_ENV=production
CMD ["bun", "run", "src/index.ts"]