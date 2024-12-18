import { createClient, ResultSet } from "@libsql/client";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";

import { dbConfig } from "../configs/db-config";
import * as schema from "./schema";

export const client = createClient({
  url: dbConfig.turso.url,
  authToken: dbConfig.turso.token,
});

export const db = drizzle(client, { schema });

export type DrizzleTransaction = SQLiteTransaction<
  "async",
  ResultSet,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

// export async function createTransaction<T extends typeof db>(
//   cb: (trx: T) => void
// ) {
//   await db.transaction(cb as any);
// }
