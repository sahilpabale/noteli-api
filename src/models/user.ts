import { Schema, model } from "mongoose";

interface User {
  auth0Id: string;
  email: string;
  name: string;
  createdAt: Date;
}

const schema = new Schema<User>({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export default model<User>("User", schema);
