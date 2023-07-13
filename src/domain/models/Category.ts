import mongoose from "mongoose";

export interface Categroy {
 _id?: mongoose.Types.ObjectId,
 categoryname?: string,
 description?: string,
 status?: boolean
};