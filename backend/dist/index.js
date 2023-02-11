"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
//init express
const app = (0, express_1.default)();
app.use(cors());
//middleware
app.use(express_1.default.json()); // prep data for req.body
app.use((req, res, next) => {
    console.log(`${req.method} request at ${req.path}`);
    next();
}); // log request details
app.use("/api/workouts", workoutRoutes); // handle routes
app.use("/api/user", userRoutes); // handle routes
const PORT = process.env.PORT || 5000;
//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`connected to db & listening on port ${PORT} `);
    }); // listen for requests
})
    .catch((error) => {
    console.log(error);
    console.log("failed to connect to db");
});
