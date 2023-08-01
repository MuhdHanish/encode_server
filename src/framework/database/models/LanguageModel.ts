import mongoose, { Model, Schema, Document } from "mongoose";
import { Language } from "../../../domain/models/Language";

export type MongoDBLanguage = Model<Document<any, any, any> & Language>;

const languageSchema = new Schema<Language>({
  languagename: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

export const LanguageModel: MongoDBLanguage = mongoose.connection.model<Document<any, any, any> & Language>('Language',languageSchema);