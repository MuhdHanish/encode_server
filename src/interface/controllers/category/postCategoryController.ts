import { Request, Response } from "express";
import { postCategory } from "../../../app/usecases/category/postCategory";
import { categoryModel } from "../../../framework/database/models/categoryModel";
import { categoryRepositoryEmpl } from "../../../framework/repository/categoryRepository";
import { Category } from "../../../domain/models/Category";
import { validationResult } from "express-validator";
import { getCategoryByName } from "../../../app/usecases/category/getCategoryByCredentail";

const categoryRepository = categoryRepositoryEmpl(categoryModel);

const postCategoryController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { categoryname, description }: Category = req.body;
  const exist = await getCategoryByName(categoryRepository)(categoryname as string);
  if (!exist) {
   const category = await postCategory(categoryRepository)(categoryname as string, description as string);
   if (category) {
    return res.status(201).json({ message: "New category created", category });
   } else {
    return res.status(400).json({ message: "Category creation failed" });
   }
  } else {
   return res.status(409).json({ message: "Category already existed" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postCategoryController;