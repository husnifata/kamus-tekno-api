# Dockerfile

# --- Tahap 1: Instalasi dependensi ---
# Menggunakan image resmi Bun sebagai dasar
FROM oven/bun:1 as deps
WORKDIR /usr/src/app

# Salin file dependensi dan install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# --- Tahap 2: Build aplikasi ---
# Mulai dari tahap dependensi sebelumnya
FROM deps as builder
WORKDIR /usr/src/app

# Salin semua file proyek
COPY . .

# Generate Prisma Client agar tersedia di dalam container
# Ini adalah langkah krusial
RUN bunx prisma generate

# --- Tahap 3: Final image untuk produksi ---
# Gunakan image yang sama untuk produksi
FROM builder as production
WORKDIR /usr/src/app

# Set environment variable untuk Node.js/Bun
ENV NODE_ENV=production

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["bun", "run", "src/index.ts"]