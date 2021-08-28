import express, { Request, Response, NextFunction } from "express";

// loading controllers
import authorize from "./controllers/auth/authorize";
import logout from "./controllers/auth/logout";
import token from "./controllers/auth/token";
import user from "./controllers/auth/user";
import createNote from "./controllers/notes/create";
import deleteNote from "./controllers/notes/delete";
import readNote from "./controllers/notes/read";
import readAllNotes from "./controllers/notes/readAll";
import updateNote from "./controllers/notes/update";
import checkUserAuth from "./middlewares/checkUserAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Welcome to Noteli API",
    data: null,
    isError: false,
  });
});

// Provide authorization url to CLI
router.post("/authorize", authorize);

// Authorize code and return token
router.post("/token", token);

// Retreive user's info based on token
router.post("/user", user);

// logs out the user
router.get("/logout", logout);

// Bearer token in headers required!

// create a note
router.post("/note", checkUserAuth, createNote);

// delete a note
router.delete("/note/:id", checkUserAuth, deleteNote);

// update a note
router.patch("/note/:id", checkUserAuth, updateNote);

// read a note
router.get("/note/:id", checkUserAuth, readNote);

// read notes
router.get("/notes", checkUserAuth, readAllNotes);

export default router;
