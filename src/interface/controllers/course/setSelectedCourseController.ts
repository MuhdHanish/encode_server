import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { setSelectedCourse } from "../../../app/usecases/course/setCourses";

const courseRepository = courseRepositoryEmpl(courseModel);

const setSelectedCourseController = async (req: Request, res: Response) => {
  try {
    const { courseId, userId } = req.body;
    const course = await setSelectedCourse(courseRepository)(courseId,userId);
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
