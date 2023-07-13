import { body, header, param } from "express-validator";

export const loginValidator = [
  body("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const getCategoryByIdValidator = [
  param("id").notEmpty().withMessage("Category id is required")
];

export const postCategoryValidator = [
  body("categoryname").notEmpty().withMessage("Category name is required"),
  body("description").notEmpty().withMessage("description is required"),
];

export const signupValidatorOne = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("role").notEmpty().withMessage("Role is required"),
  body("role")
    .custom((value) => value === "student" || value === "tutor")
    .withMessage("Role must be either 'student' or 'tutor'"),
];

export const signupValidatorTwo = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").notEmpty().withMessage("Role is required"),
  body("role")
    .custom((value) => value === "student" || value === "tutor")
    .withMessage("Role must be either 'student' or 'tutor'"),
];


