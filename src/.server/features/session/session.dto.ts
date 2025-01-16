import { z } from "zod";

const sessionEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createSessionSchema = sessionEntitySchema;
export type CreateSessionDto = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = sessionEntitySchema.omit({
  id: true,
  userId: true,
});
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
