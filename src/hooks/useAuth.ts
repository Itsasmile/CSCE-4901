import { AuthContext } from "@/context/AuthContext";
import { db } from "@/db-connection";
import { usersTable } from "@/db/schema";
import { createAccount, signIn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { useCallback, useContext, useEffect } from "react";

export function useAuth() {
  const authState = useContext(AuthContext);

  async function userSignUp(email: string, username: string, password: string) {
    const user = await createAccount(username, email, password);

    authState?.setUser(user);
  }

  async function userSignOut() {
    authState?.setUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("password");
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

  useEffect(() => {
    const email = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    signIn(email!, password!).then((user) => {
      if (!user) throw new Error("Failed to signin user");
      authState!.setUser(user);
    });
  }, []);

  async function userSignIn(email: string, password: string) {
    const user = await signIn(email, password);

    if (!user) throw new Error("Failed to signin user");

    authState!.setUser(user);
    localStorage.setItem("user", email);
    localStorage.setItem("password", password);
  }

  return {
    userSignIn,
    userSignUp,
    userSignOut,
    updateDisplayName,
    updateProfilePic,
  };
}
