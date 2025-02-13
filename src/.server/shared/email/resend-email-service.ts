import { JSX } from "react";
import { Resend } from "resend";

import { emailConfig } from "~/.server/configs/email-config";

import { EmailService } from "./email-service";

export class ResendEmailService implements EmailService {
  private resend: Resend;

  constructor() {
    // this.resend = new Resend(emailConfig.resendApiKey)
    this.resend = {
      // @ts-expect-error
      emails: {
        send: async ({}: any) => {
          return { error: null } as any;
        },
      },
    };
  }

  async sendEmail({
    email,
    subject,
    body,
  }: {
    email: string;
    subject: string;
    body: JSX.Element;
  }): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: emailConfig.mailFrom,
      to: email,
      subject,
      react: body,
    });

    if (error) {
      console.log("email error: ", error.message);
      throw error;
    }
  }
}
