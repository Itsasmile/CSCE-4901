import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";

interface State {
  email?: string;
  password?: string;
  error?: string;
}

export function useLogin() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();
  const { userSignIn } = useAuth();

  function enterEmail(email: string) {
    setState({ ...state, email });
  }

  function enterPassword(password: string) {
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
      await userSignIn(state.email, state.password);
      navigate({ to: "/" });
    } catch (err) {
      setState({
        ...state,
        error: "Login failed. Please check your email and password.",
      });
      console.error(err);
    }
  }

  return { error: state.error, handleLogin, enterEmail, enterPassword };
}
