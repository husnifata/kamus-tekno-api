import { Hono } from "hono";
import { z } from "zod";
import { categoryRoutes } from "./categories/category.routes";
import { termRoutes } from "./terms/term.routes";
import { Prisma } from "@prisma/client";

const app = new Hono();

// Middleware sederhana untuk logging setiap request
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const end = Date.now();
  console.log(
    `[${c.req.method}] ${c.req.url} - ${c.res.status} (${end - start}ms)`
  );
});

// Endpoint root untuk health check
app.get("/", (c) => {
  return c.json({ message: "API Kamus Teknologi & Startup!" });
});

// Error Handler Terpusat
app.onError((err, c) => {
  console.error(`[onError]`, err);

  // Handle error validasi dari Zod
  if (err instanceof z.ZodError) {
    return c.json(
      {
        error: "Validation failed",
        details: err.flatten().fieldErrors,
      },
      400
    );
  }

  // Handle error "record not found" dari Prisma
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    return c.json({ error: "Resource not found" }, 404);
  }

  // Fallback untuk semua error lainnya
  return c.json({ error: "An internal server error occurred" }, 500);
});

// Merakit (mounting) semua routes
app.route("/categories", categoryRoutes);
app.route("/terms", termRoutes);

// Konfigurasi server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`🚀 Server berjalan di http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
