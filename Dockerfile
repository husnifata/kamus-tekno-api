# Dockerfile (Versi Rencana Darurat)

# Tahap 1: Gunakan image Bun terbaru
FROM oven/bun:1
WORKDIR /usr/src/app

# Salin HANYA package.json
COPY package.json ./

# Jalankan instalasi tanpa --frozen-lockfile. 
# Ini akan membuat lockfile di dalam container, BUKAN dari komputermu.
RUN bun install

# Salin sisa kode proyekmu
COPY . .

# Generate Prisma Client
RUN bunx prisma generate

# Set environment dan jalankan aplikasi
ENV NODE_ENV=production
CMD ["bun", "run", "src/index.ts"]