import Note from "../../models/note";
import { Request, Response } from "express";

const readAllNotes = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      // read
      Note.find({ userId: req.user._id })
        .select("noteId title content")
        .exec()
        .then((doc) => {
          res.status(200).json({
            code: 200,
            message: "Successfully grabbed your notes!",
            data: doc,
            isError: false,
          });
        })
        .catch((err) => {
          res.status(404).json({
            code: 404,
            message: "Something's wrong on our side",
            data: null,
            isError: true,
          });
        });
    } else {
      res.status(401).json({
        code: 401,
        message: "Not authorized",
        data: null,
        isError: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      code: 404,
      message: "Something's wrong on our side",
      data: null,
      isError: true,
    });
  }
};

export default readAllNotes;
