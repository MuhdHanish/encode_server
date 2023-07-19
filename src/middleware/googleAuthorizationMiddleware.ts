import { Request, Response, NextFunction } from "express";
import jwt from "../utils/jwtTokenUtils";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userInfo?: {
    email?: string,
    username?: string,
    profile?: string,
    role?: string
  }
}

interface googleCredential {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  iat: number;
  exp: number;
  jti: string;
}

export const googleLoginMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const decodeGoogleCredential: googleCredential | string | null | JwtPayload = jwt.decode(req.body.credential);
    const credential = decodeGoogleCredential as googleCredential;
    if (decodeGoogleCredential) {
      const parts: string[] = credential.email.split("@");
      const username = parts.length > 1 ? parts[0] : credential.name;
      const email = credential.email;
      req.userInfo = { username, email };
      next();
    } else {
      res.status(401).json({ message: "Un-Authorized request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const googleSignupMiddelware = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const decodeGoogleCredential = jwt.decode(req.body.credential.credential);
    const credential = decodeGoogleCredential as googleCredential;
    if (decodeGoogleCredential) {
      const parts: string[] = credential.email.split("@");
      const username = parts.length > 1 ? parts[0] : credential.name;
      const email = credential.email;
      const profile = credential.picture;
      const { role } = req.body;
      req.userInfo = { username, email, profile, role };
      next();
    } else {
      res.status(401).json({ message: "Un-Authorized request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}