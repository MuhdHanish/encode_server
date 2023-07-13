import { Category } from "../../../domain/models/Category";
import { categoryRepository } from "../../../framework/repository/categoryRepository";

export const getCategoryById = (categoryRepository: categoryRepository) => async (categoryId: string) => {
 const category = await categoryRepository.getCategoryById(categoryId);
 return category;
}