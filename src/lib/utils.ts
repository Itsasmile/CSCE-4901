import { db } from "@/db-connection";
import { usersTable } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "./types";
import { and, eq } from "drizzle-orm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function createAccount(
  username: string,
  email: string,
  password: string
) {
  const user: typeof usersTable.$inferInsert = {
    username: username,
    email: email,
    password: password,
  };

  try {
    await db.insert(usersTable).values(user);
  } catch {
    return undefined;
  }

  return user as User;
}

export async function signIn(email: string, password: string) {
  try {
    const user = (
      await db
        .select()
        .from(usersTable)
        .where(
          and(eq(usersTable.email, email), eq(usersTable.password, password))
        )
    )[0];

    return user as User;
  } catch (error) {
    console.error("An error has occured", error);
  }

  return undefined;
}
