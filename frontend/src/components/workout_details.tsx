import React from "react";
import { useWorkoutsContext } from "../hooks/use_workouts_context";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/use_auth_context";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;

    const response = await fetch(
      "https://gritgym-backend.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className='bg-white rounded my-5 mx-auto p-5 relative shadow-sm hover:shadow-xl transition-shadow'>
      <h4 className='text-xl mx-0 mt-0 mb-2 text-fuchsia-600 font-semibold'>
        {workout.title}
      </h4>
      <p className='text m-0 text-gray-900'>
        <span className='font-semibold'>Load (kgs): </span> {workout.load}
      </p>

      <p className='text m-0 text-gray-900 '>
        <span className='font-semibold'> Reps: </span> {workout.reps}
      </p>

      <p className='text-sm mt-2 text-gray-900 font-normal italic'>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}{" "}
      </p>

      <span
        className='material-symbols-outlined cursor-pointer p-1 absolute top-5 right-5 rounded-2xl bg-slate-200'
        onClick={handleDelete}
      >
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
