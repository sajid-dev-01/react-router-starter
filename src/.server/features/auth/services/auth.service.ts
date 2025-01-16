import { SessionEntity } from "../../session/session";
import { UserEntity } from "../../user/user";
import { Cookie } from "../cookie";

export interface AuthenticationService {
  validatePasswords(args: { password: string; hash: string }): Promise<boolean>;

  createSession(
    user: UserEntity
  ): Promise<{ session: SessionEntity; cookie: Cookie }>;
  validateSession(
    token: string
  ): Promise<{ user: UserEntity; session: SessionEntity }>;
  invalidateSession(
    sessionId: SessionEntity["id"]
  ): Promise<{ blankCookie: Cookie }>;

  isVerifyEmailSent(email: string): Promise<boolean>;
  sendVerifyEmail(email: string): Promise<void>;
  deleteVerifyEmail(email: string): Promise<void>;
}
