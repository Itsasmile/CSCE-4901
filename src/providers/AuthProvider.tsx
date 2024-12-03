import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { AuthState } from "@/lib/types";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

interface Props {
  children?: ReactNode;
}
export function AuthProvider({ children }: Props): ReactNode {
  const [authState, setAuthState] = useState<AuthState>({
    newUserSignin,
    signOut: userSignOut,
    updateDisplayName,
    updateProfilePic,
    userSignIn,
    user: null,
    loading: true,
  });

  async function newUserSignin(
    email: string,
    username: string,
    password: string
  ) {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", creds.user.uid), {
      displayName: username,
      email: email,
    });
    await updateProfile(creds.user, { displayName: username });
    setAuthState({
      ...authState,
      loading: true,
    });
  }

  async function userSignOut() {
    setAuthState({
      ...authState,
      loading: true,
    });
    await signOut(auth);
  }

  async function updateDisplayName(username: string) {
    const currentUser = auth.currentUser; // Use the most recent authenticated user
    console.log("Updating display name. Current user:", currentUser);

    if (!currentUser) {
      console.error("User is null during display name update.");
      throw new Error("User not authenticated. Cannot update display name.");
    }

    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await updateProfile(currentUser, { displayName: username });
      console.log("Display name successfully updated to:", username);

      // Reset loading state after update
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        user: { ...prevState.user, displayName: username }, // Update user locally
      }));
    } catch (error) {
      console.error("Failed to update display name:", error);

      // Ensure loading is reset even if an error occurs
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));

      throw error;
    }
  }

  async function updateProfilePic(photoURL: string) {
    const currentUser = auth.currentUser; // Use the most recent authenticated user
    console.log("Updating profile picture. Current user:", currentUser);

    if (!currentUser) {
      console.error("User is null during profile picture update.");
      throw new Error("User not authenticated. Cannot update profile picture.");
    }

    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await updateProfile(currentUser, { photoURL: photoURL });
      console.log("Profile picture successfully updated to:", photoURL);

      // Reset loading state after update and update user locally
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        user: { ...prevState.user, photoURL }, // Update user locally
      }));
    } catch (error) {
      console.error("Failed to update profile picture:", error);

      // Ensure loading is reset even if an error occurs
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));

      throw error;
    }
  }

  async function userSignIn(email: string, password: string) {
    setAuthState({
      ...authState,
      loading: true,
    });

    await signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    console.log("resubbed");
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setAuthState((prevState) => {
        // Only update state if there's a meaningful change
        if (prevState.user?.uid === firebaseUser?.uid && !prevState.loading) {
          return prevState; // No change, avoid re-render
        }

        console.log("Updating auth state. FirebaseUser:", firebaseUser);
        return {
          ...prevState,
          user: firebaseUser,
          loading: false,
        };
      });
    });

    return () => {
      console.log("unsubbed");
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
