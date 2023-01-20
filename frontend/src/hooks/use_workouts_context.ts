import { useContext } from "react";
import { WorkoutsContext } from "../context/workout_context";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used within a WorkoutsContextProvider"
    );
  }
  return context;
};
