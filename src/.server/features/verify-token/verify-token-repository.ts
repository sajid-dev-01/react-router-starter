import { VerificationTokenEntity } from "./verify-token";

export interface CreateVerificationTokenDto extends VerificationTokenEntity {}

export interface VerifyTokenRepository {
  create(
    dto: CreateVerificationTokenDto
  ): Promise<VerificationTokenEntity | undefined>;
  findByEmail(email: string): Promise<VerificationTokenEntity | undefined>;
  deleteByEmail(email: string): Promise<void>;
}
