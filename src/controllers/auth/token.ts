import axios from "axios";
import { Request, Response } from "express";
import config from "../..";

const token = async (req: Request, res: Response) => {
  try {
    const code = req.body.code;

    const response = await axios.post(
      `${config.issuer_base_url}/oauth/token`,
      `grant_type=authorization_code&client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}&redirect_uri=${config.base_url}/callback`
    );
    res.status(200).json({ token: response.data["access_token"] });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Not authorized",
      isError: true,
    });
  }
};

export default token;
