import bcrypt from "bcryptjs";

import { IAuthenticationService } from "~/.server/application/abstruct/infrastructure/auth.service";
import { IEmailService } from "~/.server/application/abstruct/infrastructure/email.service";
import { IOtpService } from "~/.server/application/abstruct/infrastructure/otp.service";
import { ISessionRepository } from "~/.server/application/abstruct/repositories/session.repo";
import { IUserRepository } from "~/.server/application/abstruct/repositories/user.repo";
import { IVerifyTokenRepository } from "~/.server/application/abstruct/repositories/verify-token.repo";
import { appConfig } from "~/.server/configs/app-config";
import { authConfig } from "~/.server/configs/auth-config";
import { SESSION_COOKIE } from "~/.server/constants";
import { CookieEntity } from "~/.server/domain/entites/cookie";
import { SessionEntity } from "~/.server/domain/entites/session";
import { UserEntity } from "~/.server/domain/entites/user";
import { AuthenticationError } from "~/.server/domain/exceptions";
import { generateSessionId, generateSessionToken } from "~/.server/lib/session";
import VerifyOTPEmail from "~/emails/verify-otp";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly otpService: IOtpService,
    private readonly emailService: IEmailService,
    private readonly userRepository: IUserRepository,
    private readonly verifyTokenRepository: IVerifyTokenRepository,
    private readonly sessionRepository: ISessionRepository
  ) {}

  async validatePasswords({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  async validateSession(
    token: string
  ): Promise<{ user: UserEntity; session: SessionEntity }> {
    const sessionId = generateSessionId(token);
    const sessionInDb = await this.sessionRepository.findById(sessionId);
    if (!sessionInDb) throw new AuthenticationError();

    if (Date.now() >= sessionInDb.expiresAt.getTime()) {
      await this.sessionRepository.deleteById(sessionInDb.id);
      throw new AuthenticationError();
    }

    const user = await this.userRepository.findById(sessionInDb.userId);
    if (!user) {
      await this.sessionRepository.deleteById(sessionInDb.id);
      throw new AuthenticationError();
    }

    if (
      Date.now() >=
      sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS
    ) {
      sessionInDb.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
      await this.sessionRepository.updateById(sessionInDb.id, {
        expiresAt: sessionInDb.expiresAt,
      });
    }

    return { user, session: sessionInDb };
  }

  async createSession(
    user: UserEntity
  ): Promise<{ session: SessionEntity; cookie: CookieEntity }> {
    const token = generateSessionToken();
    const sessionId = generateSessionId(token);
    const session = await this.sessionRepository.create({
      id: sessionId,
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
      // TODO: insert data
      ipAddress: "",
      userAgent: "",
    });

    const cookie: CookieEntity = {
      name: SESSION_COOKIE,
      value: token,
      attributes: {
        httpOnly: true,
        sameSite: "lax",
        // TODO: update secure property
        // secure: serverEnv.NODE_ENV === "production",
        expires: session.expiresAt,
        path: "/",
      },
    };

    return { session, cookie };
  }

  async invalidateSession(
    sessionId: SessionEntity["id"]
  ): Promise<{ blankCookie: CookieEntity }> {
    await this.sessionRepository.deleteById(sessionId);
    // TODO: update secure property
    return { blankCookie: { name: "session", value: "", attributes: {} } };
  }

  async isVerifyEmailSent(email: string): Promise<boolean> {
    const existingToken = await this.verifyTokenRepository.findByEmail(email);
    if (existingToken) {
      // return true if verification token not expired
      if (existingToken.expiresAt >= new Date()) return true;
      // delete record if verification token expired
      await this.verifyTokenRepository.deleteByEmail(email);
    }

    return false;
  }

  async sendVerifyEmail(email: string): Promise<void> {
    const { encryptedKey, otp } = this.otpService.generateHOTP();
    const expiresAt = new Date(
      Date.now() + authConfig.email.confirmationExpires
    );

    await this.verifyTokenRepository.create({
      email,
      type: "email",
      token: encryptedKey,
      expiresAt,
    });

    await this.emailService.sendEmail({
      email,
      subject: `Verify your email for ${appConfig.name}`,
      body: VerifyOTPEmail({
        code: otp,
        appUrl: appConfig.url,
        appName: appConfig.name,
        expiration: authConfig.email.confirmationExpires,
        companyName: appConfig.companyName,
        companyAddr: appConfig.companyAddr,
      }),
    });
  }

  async deleteVerifyEmail(email: string): Promise<void> {
    await this.verifyTokenRepository.deleteByEmail(email);
  }
}
