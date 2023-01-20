"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workout_controller_1 = require("../controllers/workout_controller");
const require_auth_1 = require("../middleware/require_auth");
const router = express_1.default.Router();
//protect all workout routes
router.use(require_auth_1.requireAuth);
// POST a new workout
router.post("/", workout_controller_1.postWorkout);
// GET all workouts
router.get("/", workout_controller_1.getWorkouts);
// GET a single workout
router.get("/:id", workout_controller_1.getWorkout);
// UPDATE a workout
router.patch("/:id", workout_controller_1.updateWorkout);
// DELETE a single workout
router.delete("/:id", workout_controller_1.deleteWorkout);
module.exports = router;
