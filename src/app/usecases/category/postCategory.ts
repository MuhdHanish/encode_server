import { Category } from "../../../domain/models/Category";
import { categoryRepository } from "../../../framework/repository/categoryRepository";

export const postCategory = (categoryRepository: categoryRepository) => async (categoryname: string, description: string) => {
 const categoryDetails: Category = { categoryname, description };
 const category = await categoryRepository.postCategory(categoryDetails);
 return category;
}