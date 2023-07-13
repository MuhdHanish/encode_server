import mongoose, { Model, Schema, Document } from "mongoose";
import { Category } from "../../../domain/models/Category";

export type MongoDBCategory = Model<Document<any, any, any> & Category>;

const categorySchema = new Schema<Category>({
  categoryname: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

export const categoryModel: MongoDBCategory = mongoose.connection.model<Document<any, any, any> & Category>('Category', categorySchema);