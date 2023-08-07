import { Request, Response } from "express";
import { userModel } from "../../../framework/database/models/userModel";
import { getUsers, getUsersByRole, getUsersCount, getUsersCountByRole } from "../../../app/usecases/user/usersCases";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { validationResult } from "express-validator";

const userRepository = userRepositoryEmpl(userModel);

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers(userRepository)();
    return res.status(201).json({message:"users fetched successfully", users});
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
    return res.status(201).json({message:"users fetched by role successfully", users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersCountController = async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount(userRepository)();
    return res.status(201).json({message:"users count fetched successfully", count});
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
    return res.status(201).json({message:"users count fetched successfully", count});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

