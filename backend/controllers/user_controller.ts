import User from "../models/user_model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserSchemaType } from "../schema/user.schema";

const createToken = (_id: any) => {
  return jwt.sign({ _id: _id }, process.env.SECRET!, { expiresIn: "3d" });
};

// login
export const loginUser = async (req: Request<{},{}, UserSchemaType>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// sign up
export const signUpUser = async (req: Request<{},{}, UserSchemaType>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
