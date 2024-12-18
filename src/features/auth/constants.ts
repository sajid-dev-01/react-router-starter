export const SESSION_COOKIE = "session";
export const REGISTRATION_COOKIE = "reg";

export const DEFAULT_LOGIN_REDIRECT = "/";

export const AUTH_URI = {
  signIn: "/signin",
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
} as const;
