import { serverEnv } from "../env/server-env";
import { absoluteUrl } from "../lib/helpers";

export const authConfig = {
  enableSignup: true,
  email: {
    enable: true,
    enableConfirmation: true,
    confirmationExpires: serverEnv.EMAIL_CONFIRMATION_EXPIRES * 1000,
  },
  magicLink: {
    enabel: false,
  },
  google: {
    enable: true,
    clientId: serverEnv.GOOGLE_CLIENT_ID,
    secret: serverEnv.GOOGLE_CLIENT_SECRET,
    redirectUri: absoluteUrl("/sign-in/google/callback"),
  },
  github: {
    enable: true,
    clientId: "", //env.GITHUB_CLIENT_ID,
    secret: "", // env.GITHUB_CLIENT_SECRET,
    redirectUri: absoluteUrl("/sign-in/github/callback"),
  },
};
