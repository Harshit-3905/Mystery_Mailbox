import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./Message";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: { type: String, required: [true, "Password is Required"] },
  verifyCode: { type: String, required: true },
  verifyCodeExpiry: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessages: { type: Boolean, default: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
