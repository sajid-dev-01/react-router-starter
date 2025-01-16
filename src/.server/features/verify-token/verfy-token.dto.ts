import { z } from "zod";

const verificationTokenEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createVerificationTokenSchema = verificationTokenEntitySchema;
export type CreateVerificationTokenDto = z.infer<
  typeof createVerificationTokenSchema
>;
