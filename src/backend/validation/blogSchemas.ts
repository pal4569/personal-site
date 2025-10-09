import { z } from "zod";

export const createBlogSchema = z.object({
  author: z.string().min(1),
  title: z.string().min(1),
  content: z.array(z.string()).min(1),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.array(z.string().min(1)),
});

export const blogIdParamSchema = z.object({
  id: z.string(),
});

export type CreateBlogDTO = z.infer<typeof createBlogSchema>;
export type UpdateBlogDTO = z.infer<typeof updateBlogSchema>;
