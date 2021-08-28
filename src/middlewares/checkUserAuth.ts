import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers.authorization;
    if (bearer != undefined) {
      const token = bearer.split(" ")[1];
      const email = token.split("/")[1];

      const user = await User.findOne({ email }).exec();
      req.user = user;
      next();
    } else {
      req.user = null;
      next();
    }
  } catch (error) {
    req.user = null;
    next();
  }
};

export default checkUserAuth;
