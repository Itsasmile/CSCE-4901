import { defineConfig } from "drizzle-kit";
import { DbConfig } from "./db-config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: DbConfig.TURSO_DATABASE_URL,
    authToken: DbConfig.TURSO_AUTH_TOKEN,
  },
});
