import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Welcome to Noteli API",
    data: null,
    isError: false,
  });
});

export default router;
