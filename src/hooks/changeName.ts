import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface State {
    username?: string;
    error?: string;
    success?: string;
}

export function useChangeName() {
    const [state, setState] = useState<State>({});
    const navigate = useNavigate();
    const authState = useContext(AuthContext);

    function setName(username: string) {
        setState({ ...state, username});
    }

    async function handleNameChange(e: React.FormEvent<HTMLFormElement>) {
        e.stopPropagation();
        e.preventDefault();
        if (!state.username) {
            setState({ ...state, error: "Please enter a new name." });
            return;
        }
        try {
            await authState?.updateDisplayName(state.username);
            setState({ ...state, success: "Name updated successfully." });
            //navigate("/");
        } catch (err) {
            setState({
                ...state,
                error: "Name change failed. Please try again later.",
            });
            console.error(err);
        }
    }
    return {
        success: state.success,
        error: state.error,
        handleNameChange,
        setName,
    };
}