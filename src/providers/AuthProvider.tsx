import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  children?: ReactNode;
}
export function AuthProvider({ children }: Props): ReactNode {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
