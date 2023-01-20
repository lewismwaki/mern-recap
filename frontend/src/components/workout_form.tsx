import React, { useState } from "react";
import { useAuthContext } from "../hooks/use_auth_context";
import { useWorkoutsContext } from "../hooks/use_workouts_context";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("New workout added", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className='text-xl my-4'>Add a new workout</h4>

      <label >Excersise Title:</label>
      <input
        className={emptyFields.includes("title") ? " border-red-400" : ""}
        type='text'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
        className={emptyFields.includes("load") ? " border-red-400" : ""}
        type='number'
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
      />

      <label>Reps: </label>
      <input
        className={emptyFields.includes("reps") ? " border-red-400" : ""}
        type='number'
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
      />

      <button>
        Add Workout
      </button>

      {error && (
        <div className='rounded-md mx-0 my-5 p-2 border-2 border-red-300 bg-red-100'>
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
