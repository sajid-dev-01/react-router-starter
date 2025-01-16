export type VerificationType = "email" | "magic-link";

export class VerificationTokenEntity {
  constructor(
    public email: string,
    public type: VerificationType,
    public token: string,
    public expiresAt: Date
  ) {}
}
