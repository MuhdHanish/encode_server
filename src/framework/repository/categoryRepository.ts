import { Category } from "../../domain/models/Category";
import { MongoDBCategory } from "../database/models/categoryModel";

export type categoryRepository = {
  getCategories: () => Promise<Category[] | null>;
  getCategoryByName: (categoryname:string) => Promise<Category | null>;
  getCategoryById: (id:string) => Promise<Category | null>;
  postCategory: (category: Category) => Promise<Category | null>;
  editCategory: (category: Category) => Promise<Category | null>;
};

export const categoryRepositoryEmpl = (categoryModel: MongoDBCategory): categoryRepository => {
  const getCategories = async (): Promise<Category[] | null> => {
    try {
      const categories = await categoryModel.find().exec();
      return categories.length > 0 ? categories : null;
    } catch (error) {
      console.error("Error getting categories:", error);
      return null;
    }
  };

  const getCategoryById = async (categoryId: string): Promise<Category | null> => {
    try {
      const category = await categoryModel.findOne({ _id: categoryId }).exec();
      return category !== null ? category.toObject() : null;
    } catch (error) {
      console.error("Error getting category by ID:", error);
      return null;
    }
  };

  const getCategoryByName = async (categoryname: string): Promise<Category | null> => {
    try {
      const category = await categoryModel
        .findOne({ categoryname: { $regex: new RegExp(`^${categoryname}$`, "i") } })
        .exec();
      return category !== null ? category.toObject() : null;
    } catch (error) {
      console.error("Error getting category by name:", error);
      return null;
    }
  };

  const postCategory = async (categoryDetails: Category): Promise<Category | null> => {
    try {
      const createdCategory = await categoryModel.create(categoryDetails);
      return createdCategory !== null ? createdCategory.toObject() : null;
    } catch (error) {
      console.error("Error creating category:", error);
      return null;
    }
  };

  const editCategory = async (categoryDetails: Category): Promise<Category | null> => {
    try {
      const { _id, categoryname, description } = categoryDetails;
      const updatedCategory = await categoryModel
        .findByIdAndUpdate(_id, { categoryname, description }, { new: true })
        .exec();
      return updatedCategory !== null ? updatedCategory.toObject() : null;
    } catch (error) {
      console.error("Error editing category:", error);
      return null;
    }
  };

  return {
    getCategories,
    getCategoryByName,
    getCategoryById,
    postCategory,
    editCategory,
  };
};
