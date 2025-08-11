FROM oven/bun:1.2.20

# Tools buat Prisma & native addons
USER root
RUN apt-get update && apt-get install -y \
  openssl libssl-dev ca-certificates git python3 build-essential \
  && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /usr/src/app && chown -R bun:bun /usr/src/app /home/bun
USER bun
WORKDIR /usr/src/app

# 1) Copy deps + PRISMA lebih dulu (agar postinstall tidak gagal)
COPY --chown=bun:bun package.json bun.lock ./
COPY --chown=bun:bun prisma ./prisma

# 2) Install deps (tanpa frozen dulu biar lewat; nanti bisa balikkan)
RUN echo "== deps stage ==" && whoami && pwd && ls -la && \
    echo "bun version:" && bun --version && \
    bun install --verbose

# 3) Copy source lain & generate Prisma client (kalau perlu lagi)
COPY --chown=bun:bun . .
RUN bunx prisma generate

ENV NODE_ENV=production
CMD ["bun", "run", "src/index.ts"]
