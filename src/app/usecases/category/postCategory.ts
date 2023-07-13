import { Category } from "../../../domain/models/Category";
import { categoryRepository } from "../../../framework/repository/categoryRepository";

export const postCategory = (categoryRepository: categoryRepository) => async (categoryname: string, description: string):Promise<Category|null> => {
 const exist = await categoryRepository.getCategoryByName(categoryname);
 if (!exist) {
  const categoryDetails: Category = { categoryname, description };
  const category = await categoryRepository.postCategory(categoryDetails);
  return category;
 } else {
  return null;
 }
}