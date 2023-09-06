"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageValidator = exports.fethcMessagesValidator = exports.accessChatValidator = exports.followUnfollowValidator = exports.editCredentialsValidator = exports.editImageValidator = exports.deleteReviewValidator = exports.reviewValidator = exports.postReviewValidator = exports.postCourseValidator = exports.signupValidatorTwo = exports.signupValidatorOne = exports.postLanguageValidator = exports.muteDataValidator = exports.getByRoleValidator = exports.getCourseByIdValidator = exports.forgotPasswordValidator = exports.getLanguageByIdValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.getLanguageByIdValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Category id is required")
];
exports.forgotPasswordValidator = [
    (0, express_validator_1.body)("identifier").notEmpty().withMessage("Identifier is required (username or email)"),
];
exports.getCourseByIdValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Course id is required")
];
exports.getByRoleValidator = [
    (0, express_validator_1.param)("role").notEmpty().withMessage("Role is required")
];
exports.muteDataValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Id is required")
];
exports.postLanguageValidator = [
    (0, express_validator_1.body)("languagename").notEmpty().withMessage("Language name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required")
];
exports.signupValidatorOne = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.body)("role")
        .custom((value) => value === "student" || value === "tutor")
        .withMessage("Role must be either 'student' or 'tutor'"),
];
exports.signupValidatorTwo = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (0, express_validator_1.body)("role").notEmpty().withMessage("Role is required"),
    (0, express_validator_1.body)("role")
        .custom((value) => value === "student" || value === "tutor")
        .withMessage("Role must be either 'student' or 'tutor'"),
];
exports.postCourseValidator = [
    (0, express_validator_1.body)("tutor").notEmpty().withMessage("Tutor id is required"),
    (0, express_validator_1.body)("coursename").notEmpty().withMessage("Coursename is required"),
    (0, express_validator_1.body)("language").notEmpty().withMessage("Language is required"),
    (0, express_validator_1.body)("isPaid").notEmpty().withMessage("Is paid is required"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Price is required"),
    (0, express_validator_1.body)("level").notEmpty().withMessage("Level is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("demoUrl").notEmpty().withMessage("Demo video url is required"),
    (0, express_validator_1.body)("chapters").notEmpty().withMessage("Demo video url is required"),
];
exports.postReviewValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Course id is required"),
    (0, express_validator_1.body)("review").notEmpty().withMessage("Review  is required"),
    (0, express_validator_1.body)("rating").notEmpty().withMessage("Rating  is required"),
];
exports.reviewValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Review id is required"),
    (0, express_validator_1.body)("course").notEmpty().withMessage("Course id is required"),
    (0, express_validator_1.body)("review").notEmpty().withMessage("Review  is required"),
    (0, express_validator_1.body)("rating").notEmpty().withMessage("Rating  is required"),
];
exports.deleteReviewValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Review id is required"),
    (0, express_validator_1.body)("course").notEmpty().withMessage("Course id is required"),
];
exports.editImageValidator = [
    (0, express_validator_1.body)("profile").notEmpty().withMessage("Profile is required"),
];
exports.editCredentialsValidator = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
];
exports.followUnfollowValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("User id is required"),
];
exports.accessChatValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Second user id is required"),
];
exports.fethcMessagesValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Chat id is required"),
];
exports.sendMessageValidator = [
    (0, express_validator_1.param)("id").notEmpty().withMessage("Chat id is required"),
    (0, express_validator_1.body)("content").notEmpty().withMessage("Content is required")
];
