"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.getWorkout = exports.getWorkouts = exports.postWorkout = void 0;
const workout_model_1 = __importDefault(require("../models/workout_model"));
const mongoose_1 = __importDefault(require("mongoose"));
// POST a new workout
const postWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, load, reps } = req.body;
    let emptyFields = [];
    if (!title)
        emptyFields.push("title");
    if (!reps)
        emptyFields.push("reps");
    if (!load)
        emptyFields.push("load");
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all the fields", emptyFields });
    }
    try {
        const user_id = req.user._id;
        const workout = yield workout_model_1.default.create({ title, load, reps, user_id });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.postWorkout = postWorkout;
// GET all workouts
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user._id;
        const workouts = yield workout_model_1.default.find({ user_id: user_id }).sort({
            createdAt: -1,
        });
        res.status(200).json(workouts);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getWorkouts = getWorkouts;
// GET a single workout
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = yield workout_model_1.default.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
exports.getWorkout = getWorkout;
// UPDATE a workout
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = yield workout_model_1.default.findByIdAndUpdate(id, Object.assign({}, req.body));
    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
exports.updateWorkout = updateWorkout;
// DELETE a single workout
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }
    const workout = yield workout_model_1.default.findByIdAndDelete(id);
    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
});
exports.deleteWorkout = deleteWorkout;
