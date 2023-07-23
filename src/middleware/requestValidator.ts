import { body, param } from "express-validator";

export const loginValidator = [
  body("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const getCategoryByIdValidator = [
  param("id").notEmpty().withMessage("Category id is required")
];

export const getCourseByIdValidator = [
  param("id").notEmpty().withMessage("Course id is required")
];

export const postCategoryValidator = [
  body("categoryname").notEmpty().withMessage("Category name is required"),
  body("description").notEmpty().withMessage("Description is required")
]


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

export const postCourseValidator = [
  body("tutorId").notEmpty().withMessage("Tutor id is required"),
  body("coursename").notEmpty().withMessage("Coursename is required"),
  body("shortDescription").notEmpty().withMessage("Short description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("isPaid").notEmpty().withMessage("Is paid is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("level").notEmpty().withMessage("Level is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("imgUrl").notEmpty().withMessage("Image url is required"),
  body("videoUrl").notEmpty().withMessage("Video url is required"),
];



