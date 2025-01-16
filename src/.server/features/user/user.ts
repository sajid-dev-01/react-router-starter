export type VerificationType = "email" | "magic-link";
export type AccountType = "email" | "oidc" | "oauth" | "webauthn";
export type OAuthProvider = "google" | "github" | "facebook";

export class AccountEntity {
  // @ts-expect-error
  public id: string;
  // @ts-expect-error
  public userId: string;
  // @ts-expect-error
  public accountType: AccountType;
  // @ts-expect-error
  public provider: OAuthProvider;
  // @ts-expect-error
  public providerAccountId: string;
  public accessToken?: string | null;
  public refreshToken?: string | null;
  public expiresAt?: number | null;
  public tokenType?: string | null;
  public scope?: string | null;
  public idToken?: string | null;
  public sessionState?: string | null;

  constructor(props: AccountEntity) {
    Object.assign(this, props);
  }
}

export class UserEntity {
  // @ts-expect-error
  public id: string;
  // @ts-expect-error
  public name: string;
  // @ts-expect-error
  public email: string;
  // @ts-expect-error
  public roleId: string;
  // @ts-expect-error
  public createdAt: Date;
  // @ts-expect-error
  public updatedAt: Date;
  public image?: string | null;
  public password?: string | null;
  public emailVerified?: Date | null;
  public account?: AccountEntity;
  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}
