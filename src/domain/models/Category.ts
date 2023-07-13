import mongoose from "mongoose";

export interface Category {
 _id?: mongoose.Types.ObjectId,
 categoryname?: string,
 description?: string,
 status?: boolean
};