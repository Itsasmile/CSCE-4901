import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface Props {
  children?: ReactNode;
}

interface AuthState {
  newUserSignin: (email: string, username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateDisplayName: (username: string) => Promise<void>;
  updateProfilePic: (photoURL: string) => Promise<void>;
  userSignIn: (email: string, password: string) => Promise<void>;
  user: User | null; // Use Firebase's User type
  loading: boolean;
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

  async function newUserSignin(email: string, username: string, password: string) {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", creds.user.uid), {
      displayName: username,
      email: email,
    });
    await updateProfile(creds.user, { displayName: username });
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      user: creds.user,
    }));
  }

  async function userSignOut() {
    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    await signOut(auth);
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      user: null,
    }));
  }

  async function updateDisplayName(username: string) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated. Cannot update display name.");
    }

    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await updateProfile(currentUser, { displayName: username });
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        user: { ...currentUser, displayName: username },
      }));
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      throw error;
    }
  }

  async function updateProfilePic(photoURL: string) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated. Cannot update profile picture.");
    }

    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await updateProfile(currentUser, { photoURL });
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
        user: { ...currentUser, photoURL },
      }));
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      throw error;
    }
  }

  async function userSignIn(email: string, password: string) {
    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const creds = await signInWithEmailAndPassword(auth, email, password);
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      user: creds.user,
    }));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setAuthState((prevState) => ({
        ...prevState,
        user: firebaseUser,
        loading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}
