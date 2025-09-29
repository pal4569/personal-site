import { z } from "zod";

export const createBlogSchema = z.object({
  author: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(10),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(10).optional(),
});

export const blogIdParamSchema = z.object({
  id: z.string(),
});

export type CreateBlogDTO = z.infer<typeof createBlogSchema>;
export type UpdateBlogDTO = z.infer<typeof updateBlogSchema>;
