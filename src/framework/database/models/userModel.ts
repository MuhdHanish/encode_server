import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "../../../domain/models/User";

export type MongoDBUser = Model<Document<any, any, any> & User>;

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isGoogle: { type: Boolean, required: true },
  status: { type: Boolean, required: true, default: true },
  role: { type: String, required: true },
  profile: {
    type: String,
    default:
      "https://cdn.create.vista.com/api/media/small/356209164/stock-vector-user-avatar-illustration-anonymous-sign",
  },
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('User', userSchema);