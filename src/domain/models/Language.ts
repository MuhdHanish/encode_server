import mongoose from "mongoose";

export interface Language {
 _id?: mongoose.Types.ObjectId,
 languagename?: string,
 description?: string,
 status?: boolean
};