import express from "express";
import { loginUser, signUpUser } from "../controllers/user_controller";

const router = express.Router();

// login user
router.post("/login", loginUser);

// sign up user
router.post("/signup", signUpUser);

module.exports = router;
