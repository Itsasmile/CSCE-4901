import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  displayName: text(),
  email: text().notNull(),
  profilePicture: text(),
  password: text().notNull(),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const reviewsTables = sqliteTable("reviews", {
  id: int().primaryKey({ autoIncrement: true }),
  gameId: int().notNull(),
  authorId: int().notNull(),
  content: text(),
  rating: int().notNull(),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  avatar: text(),
});

export const gamesTables = sqliteTable("games", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  short_description: text(),
  categories: text({ mode: "json" }).$type<string[]>().notNull(),
  accessibility: text({ mode: "json" }).$type<string[]>().notNull(),
  image: text(),
  platform: text().notNull(),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  rating: int(),
});
