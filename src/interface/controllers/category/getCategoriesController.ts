import { Request, Response } from "express";
import { categoryModel } from "../../../framework/database/models/categoryModel";
import { categoryRepositoryEmpl } from "../../../framework/repository/categoryRepository";
import { getCategories } from "../../../app/usecases/category/getCategories";

const categoryRepository = categoryRepositoryEmpl(categoryModel);

const getCategoriesController = async(req:Request, res:Response) => {
 try {
  const categories = await getCategories(categoryRepository)();
  if (categories) {
   return res.status(200).json({ message: "Category fetched successfully", categories });
  } else {
   return res.status(400).json({ message: "No categories found" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getCategoriesController;