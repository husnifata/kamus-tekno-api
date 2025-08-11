# 📖 API Kamus Istilah Teknologi & Startup

Sebuah REST API sederhana untuk mencari dan mengelola istilah-istilah di dunia teknologi dan startup. Proyek ini dibuat untuk memenuhi tugas mata kuliah [Nama Mata Kuliah].

## ✨ Fitur Utama

- CRUD penuh untuk entitas `Term` (Istilah) dan `Category` (Kategori).
- Validasi input yang kuat menggunakan Zod.
- Penanganan error terpusat.
- Dideploy sebagai container Docker di Render.

## 🛠️ Tech Stack

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** PostgreSQL (dari Neon)
- **ORM:** Prisma
- **Validasi:** Zod
- **Containerization:** Docker
- **Deployment:** Render


## 🔌 API Endpoints

| Method | Path                  | Deskripsi                                 |
|--------|-----------------------|-------------------------------------------|
| `GET`  | `/categories`         | Mendapatkan semua kategori.               |
| `GET`  | `/categories/:id`     | Mendapatkan satu kategori berdasarkan ID. |
| `POST` | `/categories`         | Membuat kategori baru.                    |
| `PUT`  | `/categories/:id`     | Memperbarui kategori.                     |
| `DELETE`|`/categories/:id`    | Menghapus kategori.                       |
| `GET`  | `/terms`              | Mendapatkan semua istilah (termasuk data kategori).|
| `GET`  | `/terms/:id`          | Mendapatkan satu istilah berdasarkan ID.  |
| `POST` | `/terms`              | Membuat istilah baru.                     |
| `PUT`  | `/terms/:id`          | Memperbarui istilah.                      |
| `DELETE`|`/terms/:id`         | Menghapus istilah.                        |

---

## 🚀 Menjalankan Secara Lokal

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/husnifata/kamus-tekno-api.git](https://github.com/husnifata/kamus-tekno-api.git)
    cd kamus-tekno-api
    ```
2.  **Install dependensi:**
    ```bash
    bun install
    ```
3.  **Setup environment variable:**
    Buat file `.env` di root folder dan isi dengan `DATABASE_URL` dari Neon.
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
    ```
4.  **Jalankan migrasi database:**
    ```bash
    bunx prisma migrate dev
    ```
5.  **Jalankan server development:**
    ```bash
    bun run src/index.ts
    ```
    Server akan berjalan di `http://localhost:3000`.
