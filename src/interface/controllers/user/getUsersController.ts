import { Request, Response } from "express";



const getUsersController = async (req: Request, res: Response):Promise<any> => {
 try {

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getUsersController;
