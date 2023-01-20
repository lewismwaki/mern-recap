import Workout from "../models/workout_model";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { WorkoutSchemaType } from "../schema/workout.schema";

interface RequestWithUser
  extends Request<{ id: string }, {}, WorkoutSchemaType> {
  user?: any;
}

// POST a new workout
export const postWorkout = async (req: RequestWithUser, res: Response) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!load) emptyFields.push("load");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// GET all workouts
export const getWorkouts = async (req: RequestWithUser, res: Response) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id: user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single workout
export const getWorkout = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// UPDATE a workout
export const updateWorkout = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// DELETE a single workout
export const deleteWorkout = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
