import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const loginIdSchema = z.object({
  id: z.string(),
});

export type LoginDTO = z.infer<typeof loginSchema>;