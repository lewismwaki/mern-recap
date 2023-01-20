import express from "express";
import { postWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from "../controllers/workout_controller";
import { requireAuth } from "../middleware/require_auth";

const router = express.Router();

//protect all workout routes
router.use(requireAuth);

// POST a new workout
router.post("/", postWorkout);

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

// DELETE a single workout
router.delete("/:id", deleteWorkout);

module.exports = router;
