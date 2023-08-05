import { Request, Response } from "express";
import { userModel } from "../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { setSelectedCourse } from "../../../app/usecases/course/setCourses";

const userRepository = userRepositoryEmpl(userModel);

const setSelectedCourseController = async (req: Request, res: Response) => {
  try {
    const { userId, cousreId } = req.body;
    const user = await setSelectedCourse(userRepository)(userId, cousreId);
    if (user) {
      return res.status(200).json({ message: "Course added to profile" });
    } else {
      return res.status(400).json({ message: "No course found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default setSelectedCourseController;
