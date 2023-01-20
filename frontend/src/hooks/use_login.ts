import { useState } from "react";
import { useAuthContext } from "./use_auth_context";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    
    setIsLoading(true);
    setError(null);

    
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //save user to localstorage
      localStorage.setItem("user", JSON.stringify(json));

      //update authContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { logIn, isLoading, error };
};
