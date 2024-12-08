import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

interface State {
  error?: string;
  success?: string;
}

export function useChangeProfile() {
  const [state, setState] = useState<State>({});
  const authState = useContext(AuthContext);

  async function handleProfileChange(url?: string) {
    if (!url) {
      setState({
        ...state,
        error:
          "Invalid file type, please upload another photo cus you are gay.",
      });
      return;
    }

    try {
      await authState?.updateProfilePic(url);
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
