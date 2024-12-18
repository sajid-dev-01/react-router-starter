import { z } from "zod";

import { verificationTokenEntitySchema } from "~/.server/domain/entites/verify-token";

export const createVerificationTokenSchema = verificationTokenEntitySchema;
export type CreateVerificationTokenDto = z.infer<
  typeof createVerificationTokenSchema
>;
