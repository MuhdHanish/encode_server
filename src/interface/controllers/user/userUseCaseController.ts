import { Request, Response } from "express";
import { userModel } from "../../../framework/database/models/userModel";
import { blockUser, getUsers, getUsersByRole, getUsersCount, getUsersCountByRole,unBlockUser } from "../../../app/usecases/user/usersCases";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { validationResult } from "express-validator";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { courseModel } from "../../../framework/database/models/courseModel";
import { getCourseStudents } from "../../../app/usecases/course/courseCases";

const courseRepository = courseRepositoryEmpl(courseModel);
const userRepository = userRepositoryEmpl(userModel);

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers(userRepository)();
    return res.status(201).json({message:"Users fetched successfully", users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersByRoleController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { role } = req.params;
    const users = await getUsersByRole(userRepository)(role);
    return res.status(201).json({message:"Users fetched by role successfully", users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersCountController = async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount(userRepository)();
    return res.status(201).json({message:"Users count fetched successfully", count});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersCountByRoleController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { role } = req.params;
    const count = await getUsersCountByRole(userRepository)(role);
    return res.status(201).json({message:"Users count fetched successfully", count});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const blockUserContorller = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const user = await blockUser(userRepository)(id);
    return res.status(201).json({message:"Blocked user successfully", user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const unBlockUserContorller = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const user = await unBlockUser(userRepository)(id);
    return res.status(201).json({message:"Unblocked user successfully", user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseStudentsController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const students = await getCourseStudents(courseRepository)(id);
    return res.status(201).json({message:"Students fetched successfully", students});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}