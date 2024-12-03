import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import React, { useContext, useState } from "react";

interface State {
  email?: string;
  password?: string;
  username?: string | null;
  error?: string;
}

export function useRegister() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

  function setUser(username?: string | null) {
    setState({ ...state, username });
  }
  function setEmail(email: string) {
    setState({ ...state, email });
  }
  function setPassword(password: string) {
    setState({ ...state, password });
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();
    if (!state.email || !state.password || !state.username) {
      setState({
        ...state,
        error: "Please enter a username, email, and password.",
      });
      return;
    }
    try {
      await authState?.newUserSignin!(
        state.email,
        state.username,
        state.password
      );

      navigate({ to: "/" });
    } catch (err) {
      setState({
        ...state,

        error: "Registration failed. Please try again later.",
      });
      console.error(err);
    }
  }
  return {
    error: state.error,
    handleRegister,
    setUser,
    setEmail,
    setPassword,
  };
}
