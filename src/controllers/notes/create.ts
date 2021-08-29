import Note from "../../models/note";
import { Request, Response } from "express";

const createNote = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const { title, content } = req.body;
      if (!(title == undefined || content == undefined)) {
        // algo to count noteId
        Note.find({ userId: req.user._id })
          .select("noteId")
          .exec()
          .then(async (data) => {
            let noteId = 0;
            data.forEach((val) => {
              if (val.noteId > noteId) {
                noteId = val.noteId;
              }
            });

            // create a note
            const note = new Note({
              noteId: noteId + 1,
              userId: req.user._id,
              title,
              content,
              createdAt: new Date(),
            });

            await note.save();

            res.status(200).json({
              code: 200,
              message: "Note created successfully!",
              data: { noteId: noteId + 1 },
              isError: false,
            });
          })
          .catch((err) => {
            res.status(400).json({
              code: 400,
              message: "Failed to create your note!",
              data: null,
              noteError: true,
            });
          });
      } else {
        res.status(400).json({
          code: 400,
          message: "Note is empty to be created!",
          data: null,
          parseError: true,
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
      message: "Something's wrong on our side!",
      data: null,
      serverError: true,
    });
  }
};

export default createNote;
