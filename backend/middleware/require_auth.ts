import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user_model";

export const requireAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET!) as any;
    req.user = await User.findOne({ _id: _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized, token not valid" });
  }
};
