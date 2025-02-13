import "server-only";

import { GitHub, Google } from "arctic";
import { cache } from "react";

import { authConfig } from "~/.server/configs/auth-config";

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export const githubAuth = new GitHub(
  authConfig.github.clientId,
  authConfig.github.secret,
  authConfig.github.redirectUri
);

export const googleAuth = new Google(
  authConfig.google.clientId,
  authConfig.google.secret,
  authConfig.google.redirectUri
);

export const authenticate = cache(async () => {
  return {
    user: { id: "" },
  };
  // const sessionToken = await getSessionToken();

  // if (!sessionToken) return undefined;

  // const res = await validateSessionToken(sessionToken);

  // if (!res?.session) return undefined;
  //
  // return res;
});
