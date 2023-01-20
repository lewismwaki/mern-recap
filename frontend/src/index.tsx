import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { WorkoutsContextProvider } from "./context/workout_context";
import { AuthContextProvider } from "./context/auth_context";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
