import { User } from "@/lib/types";
import { createContext, Dispatch, SetStateAction } from "react";

export const AuthContext = createContext<
  | {
      user: User | undefined;
      setUser: Dispatch<SetStateAction<User | undefined>>;
    }
  | undefined
>(undefined);
