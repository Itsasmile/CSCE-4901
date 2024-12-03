import { User } from "firebase/auth";

export type AuthState = {
    user: User  | null;
    newUserSignin: (email: string, username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateDisplayName: (username: string) => Promise<void>;
    updateProfilePic: (photoURL: string) => Promise<void>;
    userSignIn: (email: string, password: string) => Promise<void>;
};