import { useContext } from "react";
import { AuthContext } from "../context/auth_context";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
