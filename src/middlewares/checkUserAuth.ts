import axios from "axios";
import { Request, Response, NextFunction } from "express";
import config from "..";
import User from "../models/user";

const getUserData = async (token: string) => {
  try {
    const response = await axios.get(`${config.issuer_base_url}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const email = response.data.email;
    return email;
  } catch (error) {
    return false;
  }
};

const checkUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers.authorization;
    if (bearer != undefined) {
      try {
        const token = bearer.split(" ")[1];

        const email = await getUserData(token);

        const user = await User.findOne({ email }).exec();
        req.user = user;
        next();
      } catch (error) {
        req.user = null;
        next();
      }
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
