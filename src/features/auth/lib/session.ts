import "server-only";

import { createCookie } from "react-router";
import { cookies } from "next/headers";

import { serverEnv } from "~/env/env.server";

import { SESSION_COOKIE } from "../constants";

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  createCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: serverEnv.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie() {
  const cookie = await cookies();

  cookie.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: serverEnv.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export async function getSessionToken() {
  const cookie = await cookies();
  return cookie.get(SESSION_COOKIE)?.value;
}
