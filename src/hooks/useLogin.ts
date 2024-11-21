import { useState } from "react";
import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase services
import { User, updateProfile } from "firebase/auth";

interface State {
  email?: string;
  password?: string;
  error?: string;
  user?: User | undefined;
}

export function useLogin() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();

  function setEmail(email: string) {
    setState({ ...state, email });
  }

  function setPassword(password: string) {
    setState({ ...state, password });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();
    if (!state.email || !state.password) {
      setState({ ...state, error: "Please enter your email and password." });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      if (auth.currentUser) {
        console.log("Current User:", auth.currentUser);
        console.log("Current Display Name:", auth.currentUser.displayName);

        // Update the user's display name for change profile.
        const newDisplayName = "Updated Display Name"; // Replace with the desired display name
        await updateProfile(auth.currentUser, { displayName: newDisplayName });
        console.log("Updated Display Name:", auth.currentUser.displayName);
      }
      // Navigate to dashboard after successful login
      navigate("/");
    } catch (err) {
      setState({
        ...state,
        error: "Login failed. Please check your email and password.",
      });
    }
  }

  return { error: state.error, handleLogin, setEmail, setPassword };
}
