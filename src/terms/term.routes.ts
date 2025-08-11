import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { createTermSchema, updateTermSchema } from "../validators/schemas";

const prisma = new PrismaClient();
export const termRoutes = new Hono();

// GET ALL TERMS (WITH THEIR CATEGORY)
termRoutes.get("/", async (c) => {
  const terms = await prisma.term.findMany({
    include: { category: true },
    orderBy: { term: "asc" },
  });
  return c.json(terms);
});

// GET A SINGLE TERM BY ID
termRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const term = await prisma.term.findUnique({
    where: { id: id },
    include: { category: true },
  });
  if (!term) {
    return c.json({ error: "Term not found" }, 404);
  }
  return c.json(term);
});

// CREATE A TERM
termRoutes.post("/", zValidator("json", createTermSchema), async (c) => {
  const validatedData = c.req.valid("json");
  const newTerm = await prisma.term.create({
    data: validatedData,
  });
  return c.json(newTerm, 201);
});

// UPDATE A TERM
termRoutes.put("/:id", zValidator("json", updateTermSchema), async (c) => {
  const id = c.req.param("id");
  const validatedData = c.req.valid("json");
  const updatedTerm = await prisma.term.update({
    where: { id: id },
    data: validatedData,
  });
  return c.json(updatedTerm);
});

// DELETE A TERM
termRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.term.delete({
    where: { id: id },
  });
  return c.json({ message: "Term deleted successfully" });
});
