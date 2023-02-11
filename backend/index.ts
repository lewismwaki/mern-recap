import express, { Request, Response, NextFunction } from "express";
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//init express
const app = express();

app.use(cors());

//middleware
app.use(express.json()); // prep data for req.body

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request at ${req.path}`);
  next();
}); // log request details

app.use("https://gritgym-backend.onrender.com/api/workouts", workoutRoutes); // handle routes
app.use("https://gritgym-backend.onrender.com/api/user", userRoutes); // handle routes

const PORT = process.env.PORT || 5000;
//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db & listening on port ${PORT} `);
    }); // listen for requests
  })
  .catch((error: any) => {
    console.log(error);
    console.log("failed to connect to db");
  });
