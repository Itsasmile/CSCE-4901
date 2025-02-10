import { useState } from "react";
import { useAuth } from "./useAuth";

interface State {
  error?: string;
  success?: string;
}

export function useChangeProfile() {
  const [state, setState] = useState<State>({});
  const { updateProfilePic } = useAuth();

  async function handleProfileChange(mimeType: string, buffer?: ArrayBuffer) {
    if (!buffer) {
      setState({
        ...state,
        error:
          "Invalid file type, please upload another photo cus you are gay.",
      });
      return;
    }

    try {
      await updateProfilePic(
        `data:${mimeType};base64,${btoa(String.fromCharCode(...new Uint8Array(buffer)))}`
      );
      setState({
        ...state,
        success: "Picture uploaded successfully.",
        error: undefined,
      });
    } catch (err) {
      console.error(err);
      setState({
        ...state,
        error: "Invalid file type, please upload another photo.",
      });
    }
  }
  return {
    success: state.success,
    error: state.error,
    handleProfileChange,
  };
}
