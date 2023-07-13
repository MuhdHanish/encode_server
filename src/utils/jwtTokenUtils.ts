import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateAccessToken = async (id: mongoose.Types.ObjectId, role: string) => {
  const expiresIn = "30s";
  const accessToken =  jwt.sign({id,role}, process.env.JWT_ACCESS_SECRET as jwt.Secret, { expiresIn });
  return accessToken;
};

export const generateRefreshToken = async (id: mongoose.Types.ObjectId, role: string) => {
  const expiresIn = "60s";
  const refreshToken =  jwt.sign({id,role}, process.env.JWT_REFRESH_SECRET as jwt.Secret, { expiresIn });
  return refreshToken;
};

export default jwt;
