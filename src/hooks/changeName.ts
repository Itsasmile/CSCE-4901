import React, { useState } from "react";
import { useAuth } from "./useAuth";

interface State {
  username?: string;
  error?: string;
  success?: string;
}

export function useChangeName() {
  const [state, setState] = useState<State>({});
  const { updateDisplayName } = useAuth();

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

    try {
      console.log("Attempting to update display name to:", state.username);
      await updateDisplayName(state.username);

      setState({
        ...state,
        success: "Name updated successfully.",
        error: undefined,
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
