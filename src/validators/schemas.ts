// src/validators/schemas.ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters long" }),
});

export const updateCategorySchema = createCategorySchema;

export const createTermSchema = z.object({
  term: z.string().min(2),
  definition: z.string().min(10),
  categoryId: z.string().cuid({ message: "Invalid category ID format" }),
});

export const updateTermSchema = createTermSchema.partial(); // .partial() membuat semua field menjadi opsional
