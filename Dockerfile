# Dockerfile (Versi Final yang Benar)

# --- Tahap 1: Instalasi dependensi ---
    FROM oven/bun:1 as deps
    WORKDIR /usr/src/app
    
    # Salin file dependensi dan install
    COPY package.json bun.lock ./
    RUN bun install --frozen-lockfile
    
    # --- Tahap 2: Build aplikasi ---
    FROM deps as builder
    WORKDIR /usr/src/app
    
    COPY . .
    
    # Generate Prisma Client
    RUN bunx prisma generate
    
    # --- Tahap 3: Final image untuk produksi ---
    FROM builder as production
    WORKDIR /usr/src/app
    
    ENV NODE_ENV=production
    CMD ["bun", "run", "src/index.ts"]