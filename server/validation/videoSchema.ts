import { z } from "zod";

export const createVideoSchema = z.object({
  link: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const videoIdParamSchema = z.object({
  id: z.string(),
});

export type CreateVideoDTO = z.infer<typeof createVideoSchema>;