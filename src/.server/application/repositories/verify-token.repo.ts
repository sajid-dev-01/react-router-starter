import { CreateVerificationTokenDto } from "../dtos/verfy-token.dto";

import { VerificationTokenEntity } from "~/.server/domain/entites/verify-token";

export interface IVerifyTokenRepository {
  create(
    dto: CreateVerificationTokenDto
  ): Promise<VerificationTokenEntity | undefined>;
  findByEmail(email: string): Promise<VerificationTokenEntity | undefined>;
  deleteByEmail(email: string): Promise<void>;
}
