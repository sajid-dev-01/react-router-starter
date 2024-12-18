import { z } from "zod";

export type VerificationType = "email" | "magic-link";
export type AccountType = "email" | "oidc" | "oauth" | "webauthn";
export type OAuthProvider = "google" | "github" | "facebook";

export const accountEntitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  accountType: z.enum(["email", "oidc", "oauth", "webauthn"]),
  provider: z.enum(["google", "github", "facebook"]),
  providerAccountId: z.string(),
  refreshToken: z.string().nullish(),
  accessToken: z.string().nullish(),
  expiresAt: z.number().nullish(),
  tokenType: z.string().nullish(),
  scope: z.string().nullish(),
  idToken: z.string().nullish(),
  sessionState: z.string().nullish(),
});

export type AccountEntity = z.infer<typeof accountEntitySchema>;
