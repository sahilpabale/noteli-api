import Note from "../../models/note";
import { Request, Response } from "express";

const updateNote = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const toBeUpdated = req.body;

      Note.updateOne(
        { noteId: parseInt(req.params.id), userId: req.user._id },
        toBeUpdated
      )
        .exec()
        .then((doc) => {
          if (!doc.acknowledged) {
            res.status(400).json({
              code: 400,
              message: "Nothing to update!",
              data: null,
              updateError: true,
            });
          } else {
            if (doc.matchedCount == 1) {
              res.status(200).json({
                code: 200,
                message: "Updated note successfully!",
                data: null,
                isError: false,
              });
            } else {
              res.status(400).json({
                code: 400,
                message: "Please provide a valid ID!",
                data: null,
                idError: true,
              });
            }
          }
        })
        .catch((err) => {
          if (err.name == "CastError") {
            res.status(400).json({
              code: 400,
              message: "Failed to parse your note.",
              data: null,
              noteError: true,
            });
          } else {
            res.status(404).json({
              code: 404,
              message: "Something's wrong on our side.",
              data: null,
              serverError: true,
            });
          }
        });
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
      message: "Something's wrong on our side.",
      data: null,
      serverError: true,
    });
  }
};

export default updateNote;
