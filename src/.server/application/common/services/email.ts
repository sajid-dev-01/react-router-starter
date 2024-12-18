import { JSX } from "react";

export interface IEmailService {
  sendEmail({
    email,
    subject,
    body,
  }: {
    email: string;
    subject: string;
    body: JSX.Element;
  }): Promise<void>;
}
