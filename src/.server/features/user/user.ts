import { RoleEntity } from "./role";

export type VerificationType = "email" | "magic-link";
export type AccountType = "email" | "oidc" | "oauth" | "webauthn";
export type OAuthProvider = "google" | "github" | "facebook";

export class AccountEntity {
  // @ts-expect-error
  public readonly id: string;
  // @ts-expect-error
  public readonly providerAccountId: string;
  public readonly accessToken?: string;
  public readonly refreshToken?: string;
  public readonly expiresAt?: number;
  public readonly tokenType?: string;
  public readonly scope?: string;
  public readonly idToken?: string;
  public readonly sessionState?: string;
  // @ts-expect-error
  public readonly userId: string;
  // @ts-expect-error
  public readonly user: UserEntity;
  // @ts-expect-error
  public readonly accountType: AccountType;
  // @ts-expect-error
  public readonly provider: OAuthProvider;

  constructor(props: AccountEntity) {
    Object.assign(this, props);
  }

  static create(props: Omit<AccountEntity, "id">) {
    const id = crypto.randomUUID();

    return new AccountEntity({
      ...props,
      id,
    });
  }
}

export class UserEntity {
  // @ts-expect-error
  public readonly id: string;
  // @ts-expect-error
  public readonly createdAt: Date;
  // @ts-expect-error
  public readonly updatedAt: Date;
  // @ts-expect-error
  public readonly name: string;
  // @ts-expect-error
  public readonly email: string;
  // @ts-expect-error
  public readonly roleId: string;
  public readonly image?: string;
  public readonly password?: string;
  public readonly emailVerified?: Date;
  public readonly account?: AccountEntity;
  public readonly role?: RoleEntity;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }

  static create(props: Omit<UserEntity, "id">) {
    const id = crypto.randomUUID();
    const now = new Date();
    const createdAt = now;
    const updatedAt = now;

    return new UserEntity({
      ...props,
      id,
      createdAt,
      updatedAt,
    });
  }
}
