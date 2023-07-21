import { Category } from "../../../domain/models/Category";
import { categoryRepository } from "../../../framework/repository/categoryRepository";

export const getCategoryById = (categoryRepository: categoryRepository) => async (categoryId: string):Promise<Category|null> => {
  const category = await categoryRepository.getCategoryById(categoryId);
  if (category) {
    return category;
  } else {
    return null
  }
}