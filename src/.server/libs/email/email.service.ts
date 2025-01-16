import { JSX } from "react";

export interface EmailService {
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
