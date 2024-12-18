//import { Resend } from "resend";
import { JSX } from "react";

import { IEmailService } from "~/.server/application/common/services/email";
import { emailConfig } from "~/.server/configs/email-config";

// const resend = new Resend(env.RESEND_API_KEY);
const resend = {
  emails: {
    send: async ({}: any) => {
      return { error: null } as any;
    },
  },
};

export class EmailService implements IEmailService {
  async sendEmail({
    email,
    subject,
    body,
  }: {
    email: string;
    subject: string;
    body: JSX.Element;
  }): Promise<void> {
    const { error } = await resend.emails.send({
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
