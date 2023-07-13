import mongoose from "mongoose";
import { Categroy } from "../../domain/models/Category";
import { MongoDBCategory } from "../database/models/categoryModel";

export type categoryRepostiory = {
 getCategories: () => Promise<Categroy[]|null>
 getCategoriesById: (catgoryId: string) => Promise<Categroy | null>,
 postCategory: (catgory: Categroy) => Promise<Categroy | null>,
}

export const categoryRepostioryEmpl = (categoryModel: MongoDBCategory): categoryRepostiory => {
 const getCategories = async (): Promise<Categroy[] | null> => {
  const cagories = await categoryModel.aggregate().exec();
  return cagories.length > 0 ? cagories : null;
 };
 const getCategoriesById = async (catgoryId:string): Promise<Categroy | null> => {
  const category = await categoryModel.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(catgoryId) } }]);
  return category.length > 0 ? category[0] : null;
 };
 const postCategory = async (newCategory: Categroy): Promise<Categroy | null> => {
  const createdCategory = (await categoryModel.create(newCategory)).toObject();
  const catgoryData: Categroy = {
   _id: createdCategory._id, categoryname: createdCategory.categoryname, description: createdCategory.description
  };
  return catgoryData;
 };
 return  {
  getCategories,
  getCategoriesById,
  postCategory
 }
}