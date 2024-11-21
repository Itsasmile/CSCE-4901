import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase services

interface State {
  email?: string;
  password?: string;
  error?: string;
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
