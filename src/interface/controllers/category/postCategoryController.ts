import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { postCategory } from "../../../app/usecases/category/postCategory";
import { categoryModel } from "../../../framework/database/models/categoryModel";
import { categoryRepositoryEmpl } from "../../../framework/repository/categoryRepository";

const categoryRepository = categoryRepositoryEmpl(categoryModel);

const postCategoryController = async (req: Request, res: Response) => {
 try {
  console.log(req.body)
  
  const { categoryame, description } = req.body;
  const category = await postCategory(categoryRepository)(categoryame, description);
  if (category) {
   return res.status(201).json({ message: "New category created", category });
  } else {
   return res.status(409).json({ message: "Category creation failed" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postCategoryController;