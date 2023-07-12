import { NextFunction, Request, Response } from "express";
import jwt from "../utils/jwtTokenUtils";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const userAuthorization = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const { id, role }: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET as jwt.Secret);
      req.userInfo = { id, role };
      next();
    } catch (err) {
      return res.status(403).json({ message: "Access Forbidden" });
    }
  }
  else {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default userAuthorization;
