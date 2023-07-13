import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "../../../domain/models/User";

export type MongoDBUser = Model<Document<any, any, any> & User>;

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  isGoogle: { type: Boolean, required: true },
  status: { type: Boolean, required: true, default: true },
  role: { type: String, required: true, trim: true },
  profile: {
    type: String,
    default:
      "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-purple-game-icon-design-image_1168962.jpg",
  },
});

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('User', userSchema);