import axios from "axios";
import { Request, Response } from "express";
import config from "../..";

const user = async (req: Request, res: Response) => {
  try {
    const bearer = req.headers.authorization;
    if (bearer != undefined) {
      const token = bearer.split(" ")[1];
      const response = await axios.post(
        `${config.issuer_base_url}/userinfo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.status(200).json(response.data);
    } else {
      res.status(400).json({
        err: "no token",
      });
    }
  } catch (error) {
    res.status(400).json({
      err: "err",
    });
  }
};

export default user;
