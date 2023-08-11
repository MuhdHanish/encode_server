import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { validationResult } from "express-validator";
import { getDataToAdminDashboard,getDataToTutorDashboard } from "../../../app/usecases/course/getToDashBoard";

const courseRepository = courseRepositoryEmpl(courseModel);

export const getDataToTutorDashboardController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const data = await getDataToTutorDashboard(courseRepository)(id);
    if (data) {
      return res
        .status(200)
        .json({ message: "data fetched sucessfully", data });
    } else {
      return res.status(400).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getDataToAdminDashboardController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    const data = await getDataToAdminDashboard(courseRepository)();
    if (data) {
      return res
        .status(200)
        .json({ message: "data fetched sucessfully", data });
    } else {
      return res.status(400).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

