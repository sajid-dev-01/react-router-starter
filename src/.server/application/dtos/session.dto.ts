import { z } from "zod";

import { sessionEntitySchema } from "~/.server/domain/entites/session";

export const createSessionSchema = sessionEntitySchema;
export type CreateSessionDto = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = sessionEntitySchema.omit({
  id: true,
  userId: true,
});
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
