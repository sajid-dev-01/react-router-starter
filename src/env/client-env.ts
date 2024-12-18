import * as z from "zod";

import { createEnv } from "./utils";

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_URL: z.string().optional().default("http://localhost:3000"),
  COMPANY_NAME: z.string(),
});

export const clientEnv = createEnv(envSchema, import.meta.env);
