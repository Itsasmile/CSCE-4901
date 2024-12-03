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
  const [authState, setAuthState] = useState<AuthState | null>({
    newUserSignin,
    signOut: userSignOut,
    updateDisplayName,
    updateProfilePic,
    userSignIn,
    user: null,
  });

  async function newUserSignin(
    email: string,
    username: string,
    password: string
  ) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      displayName: username,
      email: email,
    });
    await updateProfile(userCredential.user, { displayName: username });
    await userCredential.user.reload();

    setAuthState({
      ...authState,
      newUserSignin: newUserSignin,
      signOut: userSignOut,
      updateDisplayName,
      updateProfilePic,
      userSignIn,
      user: userCredential.user,
    });
  }

  async function userSignOut() {
    await signOut(auth);
    setAuthState({
      ...authState,
      newUserSignin: newUserSignin,
      signOut: userSignOut,
      updateDisplayName,
      updateProfilePic,
      userSignIn,
      user: null,
    });
  }

  async function updateDisplayName(username: string) {
    if (authState?.user) {
      console.log(authState?.user.displayName);
      throw new Error("User not found");
    }

    await updateProfile(authState?.user!, { displayName: username });
    console.log(updateProfile);
    await authState?.user!.reload();

    setAuthState({
      ...authState,
      newUserSignin: newUserSignin,
      signOut: userSignOut,
      updateDisplayName,
      updateProfilePic,
      userSignIn,
      user: authState!.user,
    });
  }
  

  async function updateProfilePic(photoURL: string) {
    await updateProfile(authState?.user!, { photoURL: photoURL });
    await authState!.user!.reload();

    setAuthState({
      ...authState,
      newUserSignin: newUserSignin,
      signOut: userSignOut,
      updateDisplayName,
      updateProfilePic,
      userSignIn,
      user: authState!.user,
    });
  }

  async function userSignIn(email: string, password: string) {
    const creds = await signInWithEmailAndPassword(auth, email, password);

    if (creds.user) {
      setAuthState({
        ...authState,
        newUserSignin: newUserSignin,
        signOut: userSignOut,
        updateDisplayName,
        updateProfilePic,
        userSignIn,

        user: creds.user,
      });
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthState({
        ...authState,
        user: firebaseUser,
        newUserSignin: newUserSignin,
        signOut: userSignOut,
        userSignIn,
        updateDisplayName,
        updateProfilePic,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
