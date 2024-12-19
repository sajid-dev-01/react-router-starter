import { VerificationTokenEntity } from "~/.server/domain/entites/verify-token";

import { CreateVerificationTokenDto } from "../dtos/verfy-token.dto";

export interface IVerifyTokenRepository {
  create(
    dto: CreateVerificationTokenDto
  ): Promise<VerificationTokenEntity | undefined>;
  findByEmail(email: string): Promise<VerificationTokenEntity | undefined>;
  deleteByEmail(email: string): Promise<void>;
}
