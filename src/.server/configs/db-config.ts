import { serverEnv } from "../env/server-env";

export const dbConfig = {
  driver: "turso",
  turso: {
    url: serverEnv.DATABASE_URL,
    token: serverEnv.DB_AUTH_TOKEN,
  },
};
