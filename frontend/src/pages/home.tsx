import React, { useEffect } from "react";
import WorkoutDetails from "../components/workout_details";
import WorkoutForm from "../components/workout_form";
import { useAuthContext } from "../hooks/use_auth_context";
import { useWorkoutsContext } from "../hooks/use_workouts_context";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className='grid gap-24  lg:grid-cols-3'>
      <div className='col-span-2'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
