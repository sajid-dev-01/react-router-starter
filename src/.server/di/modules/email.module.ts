import { createModule } from "@evyweb/ioctopus";

import { ResendEmailService } from "~/.server/libs/email/resend-email-service";

import { DI_SYMBOLS } from "../types";

export function initEmailModule() {
  const emailModule = createModule();

  if (process.env.NODE_ENV === "test") {
    emailModule.bind(DI_SYMBOLS.EmailService).toClass(ResendEmailService);
  } else {
  }

  return emailModule;
}
