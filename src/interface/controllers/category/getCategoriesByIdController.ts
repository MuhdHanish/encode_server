import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { categoryModel } from "../../../framework/database/models/categoryModel";
import { getCategoryById } from "../../../app/usecases/category/getCategoryById";
import { categoryRepositoryEmpl } from "../../../framework/repository/categoryRepository";

const categoryRepository = categoryRepositoryEmpl(categoryModel);

const getCategoryByIdController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  const category = await getCategoryById(categoryRepository)(id);
  if (category) {
   return res.status(200).json({ message: "category fetched successfully", category });
  } else {
   return res.status(400).json({ message: "No category found" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getCategoryByIdController;