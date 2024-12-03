import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";

interface State {
  username?: string;
  error?: string;
  success?: string;
}

export function useChangeName() {
  const [state, setState] = useState<State>({});
  const authState = useContext(AuthContext);

  function setName(username: string) {
    setState({ ...state, username });
  }

  async function handleNameChange(e: React.FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();

    console.log("handleNameChange called with username:", state.username);
    if (!state.username) {
      setState({ ...state, error: "Please enter a new name." });
      return;
    }

    console.log(
      "Checking user authentication. AuthState user:",
      authState?.user
    );
    if (!authState?.user) {
      setState({
        ...state,
        error: "User not authenticated. Please log in again.",
      });
      return;
    }

    try {
      console.log("Attempting to update display name to:", state.username);
      authState?.updateDisplayName!(state.username).then(() => {
        setState({
          ...state,
          success: "Name updated successfully.",
          error: undefined,
        });
      });
    } catch (err) {
      console.error(err);
      setState({
        ...state,
        error: "Name change failed. Please try again later.",
      });
    }
  }

  return {
    success: state.success,
    error: state.error,
    handleNameChange,
    setName,
  };
}
