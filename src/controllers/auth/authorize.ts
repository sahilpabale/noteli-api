import { Request, Response } from "express";
import config from "../..";

const authorize = async (req: Request, res: Response) => {
  res.status(200).json({
    url: `${config.issuer_base_url}/authorize?response_type=code&client_id=${config.client_id}&redirect_uri=${config.base_url}/callback&scope=openid%20profile%20email&state=testing`,
  });
};

export default authorize;
