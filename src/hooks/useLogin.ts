import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

interface State {
  email?: string;
  password?: string;
  error?: string;
}

export function useLogin() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();
  const authState = useContext(AuthContext);

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
      await authState?.userSignIn(state.email, state.password);
      navigate("/");
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
