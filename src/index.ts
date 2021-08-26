import express, { Application, Request, Response } from "express";
import router from "./router";

const app: Application = express();

// Middlewares here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(400).json({
    code: 400,
    message: "Bad Request",
    isError: true,
  });
});

app.use("/api", router);

app.listen(process.env.PORT || 8080, () => {
  console.log("server started!");
});
