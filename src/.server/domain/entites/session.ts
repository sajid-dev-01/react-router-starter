import { z } from "zod";

export const sessionEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string().nullish(),
  userAgent: z.any().nullish(),
});

export type SessionEntity = z.infer<typeof sessionEntitySchema>;
