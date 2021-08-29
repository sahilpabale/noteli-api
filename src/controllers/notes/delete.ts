import Note from "../../models/note";
import { Request, Response } from "express";

const deleteNote = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const id = req.params.id.trim();

      Note.findOne({ noteId: parseInt(id), userId: req.user._id })
        .exec()
        .then((doc) => {
          if (doc == null) {
            res.status(400).json({
              code: 400,
              message: "Note doesn't exist!",
              data: null,
              idError: true,
            });
          } else {
            // delete note
            doc.delete();
            res.status(200).json({
              code: 200,
              message: "Note deleted successfully!",
              data: {
                noteId: parseInt(id),
              },
              isError: false,
            });
          }
        })
        .catch((err) => {
          res.send(err);
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
      message: "Something's wrong on our side",
      data: null,
      serverError: true,
    });
  }
};

export default deleteNote;
