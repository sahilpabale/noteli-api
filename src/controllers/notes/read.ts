import Note from "../../models/note";
import { Request, Response } from "express";

const readNote = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = parseInt(req.params.id);

      if (id == null) {
        res.status(400).json({
          code: 400,
          message: "Failed to parse your note.",
          data: null,
          noteError: true,
        });
      } else {
        // read
        Note.findOne({ noteId: id, userId: req.user._id })
          .select("title content")
          .exec()
          .then((doc) => {
            if (doc == null) {
              res.status(404).json({
                code: 404,
                message: "You have provided wrong ID!",
                data: null,
                idError: true,
              });
            } else {
              res.status(200).json({
                code: 200,
                message: "Successfully grabbed your note!",
                data: doc,
                isError: false,
              });
            }
          })
          .catch((error) => {
            if (error.name == "CastError") {
              res.status(404).json({
                code: 404,
                message: "Please provide a valid ID!",
                data: null,
                parseError: true,
              });
            } else {
              res.status(404).json({
                code: 404,
                message: "Something's wrong on our side",
                data: null,
                serverError: true,
              });
            }
          });
      }
    } else {
      res.status(401).json({
        code: 401,
        message: "Not authorized",
        data: null,
        authError: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      code: 404,
      message: "Something's wrong on our side",
      data: null,
      serverError: true,
    });
  }
};

export default readNote;
