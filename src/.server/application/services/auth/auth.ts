import { CookieEntity } from "~/.server/domain/entites/cookie";
import { SessionEntity } from "~/.server/domain/entites/session";
import { UserEntity } from "~/.server/domain/entites/user";

export interface IAuthenticationService {
  validatePasswords(args: { password: string; hash: string }): Promise<boolean>;

  createSession(
    user: UserEntity
  ): Promise<{ session: SessionEntity; cookie: CookieEntity }>;
  validateSession(
    token: string
  ): Promise<{ user: UserEntity; session: SessionEntity }>;
  invalidateSession(
    sessionId: SessionEntity["id"]
  ): Promise<{ blankCookie: CookieEntity }>;

  isVerifyEmailSent(email: string): Promise<boolean>;
  sendVerifyEmail(email: string): Promise<void>;
  deleteVerifyEmail(email: string): Promise<void>;
}
