let config: any;
// load .env
if (process.env.NODE_ENV !== "production") {
  console.log("loaded");
  require("dotenv").config();

  config = {
    mongo_uri: process.env.MONGO_URI!,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    base_url: process.env.BASE_URL,
    issuer_base_url: process.env.ISSUER_BASE_URL,
  };
}

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

export default config;
