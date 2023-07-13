import { NextFunction, Request, Response } from "express";
import jwt from "../utils/jwtTokenUtils";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}


const refreshAuthorization =  (req: CustomRequest, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const { id, role } = jwt.verify(token, process.env.JWT_REFRESH_SECRET as jwt.Secret) as jwt.JwtPayload;
      req.userInfo = { id, role };
      next();
    } catch (err) {
      return res.status(403).json({ message: "Access forbidden, Invalid token" });
    }
  }
  else {
    return res.status(401).json({ message: "No authorization token found" });
  }
};

export default refreshAuthorization;
