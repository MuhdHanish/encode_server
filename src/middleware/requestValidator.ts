import { body, param } from "express-validator";

export const loginValidator = [
  body("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const getLanguageByIdValidator = [
  param("id").notEmpty().withMessage("Category id is required")
];

export const forgotPasswordValidator = [
  body("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
];

export const getCourseByIdValidator = [
  param("id").notEmpty().withMessage("Course id is required")
];

export const getByRoleValidator = [
  param("role").notEmpty().withMessage("Role is required")
];

export const muteDataValidator = [
  param("id").notEmpty().withMessage("Id is required")
];

export const postLanguageValidator = [
  body("languagename").notEmpty().withMessage("Language name is required"),
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
  body("tutor").notEmpty().withMessage("Tutor id is required"),
  body("coursename").notEmpty().withMessage("Coursename is required"),
  body("language").notEmpty().withMessage("Language is required"),
  body("isPaid").notEmpty().withMessage("Is paid is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("level").notEmpty().withMessage("Level is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("demoUrl").notEmpty().withMessage("Demo video url is required"),
  body("chapters").notEmpty().withMessage("Demo video url is required"),
];


export const postReviewValidator = [
  param("id").notEmpty().withMessage("Course id is required"),
  body("review").notEmpty().withMessage("Review  is required"),
  body("rating").notEmpty().withMessage("Rating  is required"),
];

export const reviewValidator = [
  param("id").notEmpty().withMessage("Review id is required"),
  body("course").notEmpty().withMessage("Course id is required"),
  body("review").notEmpty().withMessage("Review  is required"),
  body("rating").notEmpty().withMessage("Rating  is required"),
];


export const deleteReviewValidator = [
  param("id").notEmpty().withMessage("Review id is required"),
  body("course").notEmpty().withMessage("Course id is required"),
];

export const editImageValidator = [
  body("profile").notEmpty().withMessage("Profile is required"),
];

export const editCredentialsValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("username").notEmpty().withMessage("Username is required"),
];

export const followUnfollowValidator = [
  param("id").notEmpty().withMessage("User id is required"),
];

export const accessChatValidator = [
  param("id").notEmpty().withMessage("Second user id is required"),
];

export const fethcMessagesValidator = [
  param("id").notEmpty().withMessage("Chat id is required"),
];

export const sendMessageValidator = [
  param("id").notEmpty().withMessage("Chat id is required"),
  body("content").notEmpty().withMessage("Content is required")
];