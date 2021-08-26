import axios from "axios";
import { Request, Response } from "express";
import config from "../..";

const logout = async (req: Request, res: Response) => {
  try {
    const { issuer_base_url, client_id } = config;

    await axios.get(`${issuer_base_url}/v2/logout?client_id=${client_id}`);

    res.status(200).send("logged out");
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export default logout;
