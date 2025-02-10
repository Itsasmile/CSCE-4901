import { AuthContext } from "@/context/AuthContext";
import { db } from "@/db-connection";
import { usersTable } from "@/db/schema";
import { createAccount, signIn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { useCallback, useContext } from "react";

export function useAuth() {
  const authState = useContext(AuthContext);

  async function userSignUp(email: string, username: string, password: string) {
    const user = await createAccount(username, email, password);

    authState?.setUser(user);
  }

  async function userSignOut() {
    authState?.setUser(undefined);
  }

  const updateDisplayName = useCallback(
    async (username: string) => {
      console.log(authState);
      if (!authState) {
        throw new Error("User not authenticated. Cannot update display name.");
      }

      await db
        .update(usersTable)
        .set({
          displayName: username,
        })
        .where(eq(usersTable.id, authState.user!.id));

      authState.setUser({
        ...authState.user!,
        displayName: username,
      });
    },
    [authState]
  );

  const updateProfilePic = useCallback(
    async function updateProfilePic(imageBase64: string) {
      if (!authState) {
        throw new Error(
          "User not authenticated. Cannot update profile picture."
        );
      }

      await db
        .update(usersTable)
        .set({
          profilePicture: imageBase64,
        })
        .where(eq(usersTable.id, authState.user!.id));

      authState.setUser({
        ...authState.user!,
        profilePicture: imageBase64,
      });
    },
    [authState]
  );

  async function userSignIn(email: string, password: string) {
    const user = await signIn(email, password);

    if (!user) throw new Error("Failed to signin user");

    authState!.setUser(user);
  }

  return {
    userSignIn,
    userSignUp,
    userSignOut,
    updateDisplayName,
    updateProfilePic,
  };
}
