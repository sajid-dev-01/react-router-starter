import { serverEnv } from "../env/server-env";

export const emailConfig = {
  supportMailAddress: serverEnv.SUPPORT_MAIL_ADDRESS,
  mailFrom: serverEnv.MAIL_FROM_ADDRESS,
  mailFromName: serverEnv.MAIL_FROM_NAME,
  resendApiKey: serverEnv.RESEND_API_KEY,
};
