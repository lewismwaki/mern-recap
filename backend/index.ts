import express, { Request, Response, NextFunction } from "express";
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv").config();

//init express
const app = express();

//middleware
app.use(express.json()); // prep data for req.body

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request at ${req.path}`);
  next();
}); // log request details

app.use("/api/workouts", workoutRoutes); // handle routes
app.use("/api/user", userRoutes); // handle routes

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.port} `);
    }); // listen for requests
  })
  .catch((error: any) => {
    console.log(error);
    console.log("failed to connect to db");
  });
