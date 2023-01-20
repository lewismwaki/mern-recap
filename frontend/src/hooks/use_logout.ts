import { useAuthContext } from "./use_auth_context";
import { useWorkoutsContext } from "./use_workouts_context";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const logOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logOut };
};
