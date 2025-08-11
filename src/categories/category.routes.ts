import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/schemas";

const prisma = new PrismaClient();
export const categoryRoutes = new Hono();

// GET ALL CATEGORIES
categoryRoutes.get("/", async (c) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return c.json(categories);
});

// GET A SINGLE CATEGORY BY ID
categoryRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const category = await prisma.category.findUnique({
    where: { id: id },
  });
  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }
  return c.json(category);
});

// CREATE A CATEGORY
categoryRoutes.post(
  "/",
  zValidator("json", createCategorySchema),
  async (c) => {
    const validatedData = c.req.valid("json");
    const newCategory = await prisma.category.create({
      data: validatedData,
    });
    return c.json(newCategory, 201);
  }
);

// UPDATE A CATEGORY
categoryRoutes.put(
  "/:id",
  zValidator("json", updateCategorySchema),
  async (c) => {
    const id = c.req.param("id");
    const validatedData = c.req.valid("json");
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: validatedData,
    });
    return c.json(updatedCategory);
  }
);

// DELETE A CATEGORY
categoryRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.category.delete({
    where: { id: id },
  });
  return c.json({ message: "Category deleted successfully" });
});
