import { createContext } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext<User | null>(auth.currentUser);
