import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];


export const signupValidatorOne = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("role").notEmpty().withMessage("Role is required"),
];

export const signupValidatorTwo = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("isGoogle").isBoolean().withMessage("isGoogle should be a boolean"),
];


