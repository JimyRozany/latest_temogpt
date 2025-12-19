import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6).max(100),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
});

export const createArticleSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().max(1000),
  // userId: z.string(),
  categoryId: z.string(),
});
export const updateArticleSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  body: z.string().max(1000).optional(),
  userId: z.string(),
  categoryId: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(3).max(50),
});
export const updateCategorySchema = z.object({
  name: z.string().min(3).max(50).optional(),
});
