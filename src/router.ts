import express, { Request, Response, NextFunction } from "express";

// loading controllers
import authorize from "./controllers/auth/authorize";
import logout from "./controllers/auth/logout";
import token from "./controllers/auth/token";
import user from "./controllers/auth/user";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Welcome to Noteli API",
    data: null,
    isError: false,
  });
});

router.post("/authorize", authorize);

router.post("/token", token);

router.post("/user", user);

router.get("/logout", logout);

export default router;
