import { Schema, model } from "mongoose";

interface Note {
  noteId: number;
  userId: object;
  title: string;
  content: string;
  createdAt: Date;
}

const schema = new Schema<Note>({
  noteId: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export default model<Note>("Note", schema);
