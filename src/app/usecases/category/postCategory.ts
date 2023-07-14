import { Category } from "../../../domain/models/Category";
import { categoryRepository } from "../../../framework/repository/categoryRepository";

export const postCategory = (categoryRepository: categoryRepository) => async(categoryname: string, description: string):Promise<Category|null> => {
  const category = await categoryRepository.postCategory({categoryname,description});
  return category;
}