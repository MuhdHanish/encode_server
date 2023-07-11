import { Request, Response, NextFunction } from "express";

const otpAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const sessionValue = req.session.stepOneOtp;

    if (sessionValue === null) {
      return res.status(401).json({ message: "Un-Authorized request" });
    } else {
      if (parseInt(id) === sessionValue) {
        req.session.stepOneOtp = null;
        next();
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default otpAuthMiddleware;
