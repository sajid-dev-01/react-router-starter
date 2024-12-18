import { z } from "zod";

export type VerificationType = "email" | "magic-link";

export const verificationTokenEntitySchema = z.object({
  email: z.string(),
  type: z.enum(["email", "magic-link"]),
  token: z.string(),
  expiresAt: z.date(),
});
export type VerificationTokenEntity = z.infer<
  typeof verificationTokenEntitySchema
>;
