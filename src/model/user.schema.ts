import { Schema, Document, Model, model } from "mongoose";

export const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    default: "",
    required: true
  },
  lastName: {
    type: String,
    default: "",
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
});

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
}

export const User: Model<IUser> = model<IUser>("User", UserSchema);
