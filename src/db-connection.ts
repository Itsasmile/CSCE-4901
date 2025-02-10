import { drizzle } from "drizzle-orm/libsql";
import { DbConfig } from "../db-config";

const db = drizzle({
  connection: {
    url: DbConfig.TURSO_DATABASE_URL,
    authToken: DbConfig.TURSO_AUTH_TOKEN,
  },
});

export { db };
