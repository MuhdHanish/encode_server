import mongoose, { Model, Schema, Document } from "mongoose";
import { Categroy } from "../../../domain/models/Category";

export type MongoDBCategory = Model<Document<any, any, any> & Categroy>;

const categorySchema = new Schema<Categroy>({
 categoryname: { type: String, required: true },
 description: { type: String, required: true },
 status: {type:Boolean,required:true,default:true}
});

export const categoryModel: MongoDBCategory = mongoose.connection.model<Document<any, any, any> & Categroy>('Category', categorySchema);