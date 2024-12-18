// import bcrypt from "bcryptjs";
// import { IUserRepository } from "~/.server/application/repositories/user.repo";
// import { IAuthenticationService } from "~/.server/application/services/auth/auth";
// import { SessionEntity as Session, sessionEntitySchema } from "~/.server/domain/entites/session";
// import { UserEntity as User } from "~/.server/domain/entites/user";
// import { CookieEntity as Cookie } from "~/.server/domain/entites/cookie";
// import { AuthenticationError } from "~/.server/domain/errors";
// import { SESSION_COOKIE } from "~/features/auth/constants";
//
// export class MockAuthenticationService implements IAuthenticationService {
//   private _sessions: Record<string, { session: Session; user: User }>;
//
//   constructor(private _usersRepository: IUserRepository) {
//     this._sessions = {};
//   }
//
//   validatePasswords({
//     password,
//     hash,
//   }: {
//     password: string;
//     hash: string;
//   }
//   ): Promise<boolean> {
//     return bcrypt.compare(password, hash);
//   }
//
//   async validateSession(
//     sessionId: string
//   ): Promise<{ user: User; session: Session }> {
//     const result = this._sessions[sessionId] ?? { user: null, session: null };
//
//     if (!result.user || !result.session) {
//       throw new AuthenticationError();
//     }
//
//     const user = await this._usersRepository.findById(result.user.id);
//
//     return { user: user!, session: result.session };
//   }
//
//   async createSession(
//     user: User
//   ): Promise<{ session: Session; cookie: Cookie }> {
//     const luciaSession: Session = {
//       id: 'random_session_id',
//       userId: user.id,
//       expiresAt: new Date(new Date().getTime() + 86400000 * 7), // 7 days
//     };
//     const session = sessionEntitySchema.parse(luciaSession);
//     const cookie: Cookie = {
//       name: SESSION_COOKIE,
//       value: session.id + '_' + user.id,
//       attributes: {},
//     };
//
//     this._sessions[session.id] = { session, user };
//
//     return { session, cookie };
//   }
//
//   async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
//     delete this._sessions[sessionId];
//     const blankCookie: Cookie = {
//       name: SESSION_COOKIE,
//       value: '',
//       attributes: {},
//     };
//     return Promise.resolve({ blankCookie });
//   }
//
//   generateUserId(): string {
//     return (Math.random() + 1).toString(36).substring(7);
//   }
// }
