import * as z from "zod";

import { createEnv } from "./utils";

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_URL: z.string().optional().default("http://localhost:3000"),
  COMPANY_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ENCRYPTION_KEY: z.string(),
  // db
  DATABASE_URL: z.string(),
  DB_AUTH_TOKEN: z.string(),
  // auth
  EMAIL_CONFIRMATION_EXPIRES: z.coerce.number(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  // email
  SUPPORT_MAIL_ADDRESS: z.string(),
  MAIL_FROM_NAME: z.string(),
  MAIL_FROM_ADDRESS: z.string(),
  RESEND_API_KEY: z.string(),
  // test
  APP_MOCK_API_PORT: z.string().optional().default("8080"),
  ENABLE_API_MOCKING: z.coerce.boolean().optional(),
});

export const serverEnv = createEnv(envSchema, process.env);
