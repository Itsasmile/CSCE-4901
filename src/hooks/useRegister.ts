import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase services
import { updateProfile } from "firebase/auth";

interface State {
  email?: string;
  password?: string;
  username?: string;
  error?: string;
}

export function useRegister() {
  const [state, setState] = useState<State>({});
  const navigate = useNavigate();

  function setUser(username: string) {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      await updateProfile(userCredential.user, { displayName: state.username });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: state.username,
        email: state.email,
      });
      // Navigate to dashboard after successful registration
      navigate("/");
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
