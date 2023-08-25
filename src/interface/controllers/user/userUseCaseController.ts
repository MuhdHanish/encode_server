import { Request, Response } from "express";
import { userModel } from "../../../framework/database/models/userModel";
import { blockUser, editCredentials, editProfileImage, followMethods, getUsers, getUsersByRole, getUsersCount, getUsersCountByRole,removeMethods,unBlockUser, unfollowMethods } from "../../../app/usecases/user/usersCases";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { validationResult } from "express-validator";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { courseModel } from "../../../framework/database/models/courseModel";
import { getCourseStudents } from "../../../app/usecases/course/courseCases";

const courseRepository = courseRepositoryEmpl(courseModel);
const userRepository = userRepositoryEmpl(userModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
};

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
    return res.status(201).json({ message: "Students fetched successfully", students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editUserProfileImageController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { profile } = req.body;
    const user = await editProfileImage(userRepository)(req.userInfo?.id as string, profile);
    if (user) {
      return res.status(200).json({ message: "updated profile image", user });
    } else {
      return res.status(400).json({ message: "Cannot update credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editUserCredentialController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, username } = req.body;
    const user = await editCredentials(userRepository)(req.userInfo?.id as string, email, username);
    if (user) {
      return res.status(200).json({ message: "Updated credentials", user });
    } else {
      return res.status(400).json({ message: "Cannot update credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const followMethodsController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const user = await followMethods(userRepository)(req.userInfo?.id as string, id);
    if (user) {
      return res.status(200).json({ message: "User followed successfully", user });
    } else {
      return res.status(400).json({ message: "Unable to follow user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const unfollowMethodsController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const user = await unfollowMethods(userRepository)(req.userInfo?.id as string, id);
    if (user) {
      return res.status(200).json({ message: "User unfollowed successfully", user });
    } else {
      return res.status(400).json({ message: "Unable to unfollow user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeMethodsController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const user = await removeMethods(userRepository)(req.userInfo?.id as string, id);
    if (user) {
      return res.status(200).json({ message: "User removed successfully", user });
    } else {
      return res.status(400).json({ message: "Unable to remove user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};