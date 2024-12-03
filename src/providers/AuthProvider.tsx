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
    setAuthState({
      ...authState,
      loading: true,
    });

    await updateProfile(authState?.user!, { displayName: username });
  }

  async function updateProfilePic(photoURL: string) {
    setAuthState({
      ...authState,
      loading: true,
    });

    if (!authState.user) {
      throw new Error("User not found");
    }

    await updateProfile(authState?.user!, { photoURL: photoURL });
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
      if (!firebaseUser) {
        setAuthState({
          ...authState,
          user: firebaseUser,
          loading: true,
        });
        console.log("Failed to find user");
        return;
      }

      console.log("found user");

      setAuthState({
        ...authState,
        user: firebaseUser,
        loading: false,
      });
    });

    return () => {
      unsubscribe();
      console.log("unsubbed");
    };
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
