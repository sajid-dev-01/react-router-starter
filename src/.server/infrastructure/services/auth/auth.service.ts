// import bcrypt from "bcryptjs";
//
// import VerifyOTPEmail from "~/emails/verify-otp";
//
// import { IEmailService } from "~/.server/application/common/services/email";
// import { ISessionRepository } from "~/.server/application/repositories/session.repo";
// import { IUserRepository } from "~/.server/application/repositories/user.repo";
// import { IVerifyTokenRepository } from "~/.server/application/repositories/verify-token.repo";
// import { IAuthenticationService } from "~/.server/application/services/auth/auth";
// import { IOtpService } from "~/.server/application/services/auth/otp";
// import { appConfig } from "~/.server/configs/app-config";
// import { authConfig } from "~/.server/configs/auth-config";
// import { CookieEntity } from "~/.server/domain/entites/cookie";
// import { SessionEntity } from "~/.server/domain/entites/session";
// import { UserEntity } from "~/.server/domain/entites/user";
// import { AuthenticationError } from "~/.server/domain/errors";
// import { generateSessionId, generateSessionToken } from "~/.server/lib/session";
//
// const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
// const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;
//
// export class AuthenticationService implements IAuthenticationService {
//   constructor(
//     private readonly _otpService: IOtpService,
//     private readonly _emailService: IEmailService,
//     private readonly _userRepository: IUserRepository,
//     private readonly _verificationTokenRepository: IVerifyTokenRepository,
//     private readonly _sessionRepository: ISessionRepository
//   ) { }
//
//   async validatePasswords({
//     password,
//     hash,
//   }: {
//     password: string;
//     hash: string;
//   }): Promise<boolean> {
//     return bcrypt.compareSync(password, hash);
//   }
//
//   async validateSession(
//     token: string
//   ): Promise<{ user: UserEntity; session: SessionEntity }> {
//     const sessionId = generateSessionId(token);
//     const sessionInDb = await this._sessionRepository.findById(sessionId);
//     if (!sessionInDb) throw new AuthenticationError();
//
//     if (Date.now() >= sessionInDb.expiresAt.getTime()) {
//       await this._sessionRepository.deleteById(sessionInDb.id);
//       throw new AuthenticationError();
//     }
//
//     const user = await this._userRepository.findById(sessionInDb.userId);
//     if (!user) {
//       await this._sessionRepository.deleteById(sessionInDb.id);
//       throw new AuthenticationError();
//     }
//
//     if (
//       Date.now() >=
//       sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS
//     ) {
//       sessionInDb.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
//       await this._sessionRepository.updateById(sessionInDb.id, {
//         expiresAt: sessionInDb.expiresAt,
//       });
//     }
//
//     return { user, session: sessionInDb };
//   }
//
//   async createSession(
//     user: UserEntity
//   ): Promise<{ session: SessionEntity; cookie: CookieEntity }> {
//     const token = generateSessionToken();
//     const sessionId = generateSessionId(token);
//     const session = await this._sessionRepository.create({
//       id: sessionId,
//       userId: user.id,
//       expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
//       // TODO: insert data
//       ipAddress: "",
//       userAgent: "",
//     });
//
//     const cookie: CookieEntity = {
//       name: "session",
//       value: token,
//       attributes: {
//         httpOnly: true,
//         sameSite: "lax",
//         // TODO: update secure property
//         // secure: serverEnv.NODE_ENV === "production",
//         expires: session.expiresAt,
//         path: "/",
//       },
//     };
//
//     return { session, cookie };
//   }
//
//   async invalidateSession(
//     sessionId: SessionEntity["id"]
//   ): Promise<{ blankCookie: CookieEntity }> {
//     await this._sessionRepository.deleteById(sessionId);
//     // TODO: update secure property
//     return { blankCookie: { name: "session", value: "", attributes: {} } };
//   }
//
//   async isVerifyEmailSent(email: string): Promise<boolean> {
//     const existingToken =
//       await this._verificationTokenRepository.findByEmail(email);
//     if (existingToken) {
//       // return true if verification token not expired
//       if (existingToken.expiresAt >= new Date()) return true;
//       // delete record if verification token expired
//       await this._verificationTokenRepository.deleteByEmail(email);
//     }
//
//     return false;
//   }
//
//   async sendVerifyEmail(email: string): Promise<void> {
//     const { encryptedKey, otp } = this._otpService.generateHOTP();
//     const expiresAt = new Date(
//       Date.now() + authConfig.email.confirmationExpires
//     );
//
//     await this._verificationTokenRepository.create({
//       email,
//       type: "email",
//       token: encryptedKey,
//       expiresAt,
//     });
//
//     await this._emailService.sendEmail({
//       email,
//       subject: `Verify your email for ${appConfig.name}`,
//       body: VerifyOTPEmail({
//         code: otp,
//         appUrl: appConfig.url,
//         appName: appConfig.name,
//         expiration: authConfig.email.confirmationExpires,
//         companyName: appConfig.companyName,
//         companyAddr: appConfig.companyAddr,
//       }),
//     });
//   }
//
//   async deleteVerifyEmail(email: string): Promise<void> {
//     await this._verificationTokenRepository.deleteByEmail(email);
//   }
// }
