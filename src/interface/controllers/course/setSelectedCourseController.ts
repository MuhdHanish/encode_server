import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { setSelectedCourse } from "../../../app/usecases/course/setCourses";
import { validationResult } from "express-validator";

const courseRepository = courseRepositoryEmpl(courseModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const setSelectedCourseController = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   const studentId = req.userInfo?.id;
    const course = await setSelectedCourse(courseRepository)(id,studentId as string);
    if (course) {
      return res.status(200).json({ message: "Student added to Course", course });
    } else {
      return res.status(400).json({ message: "No course found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default setSelectedCourseController;
