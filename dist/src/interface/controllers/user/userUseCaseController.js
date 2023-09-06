"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMethodsController = exports.unfollowMethodsController = exports.followMethodsController = exports.editUserCredentialController = exports.editUserProfileImageController = exports.getCourseStudentsController = exports.unBlockUserContorller = exports.blockUserContorller = exports.getUsersCountByRoleController = exports.getUsersCountController = exports.getUsersByRoleController = exports.getUsersController = void 0;
const userModel_1 = require("../../../framework/database/models/userModel");
const usersCases_1 = require("../../../app/usecases/user/usersCases");
const userRepository_1 = require("../../../framework/repository/userRepository");
const express_validator_1 = require("express-validator");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const courseModel_1 = require("../../../framework/database/models/courseModel");
const courseCases_1 = require("../../../app/usecases/course/courseCases");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const userRepository = (0, userRepository_1.userRepositoryEmpl)(userModel_1.userModel);
;
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersCases_1.getUsers)(userRepository)();
        return res.status(201).json({ message: "Users fetched successfully", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersController = getUsersController;
const getUsersByRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { role } = req.params;
        const users = yield (0, usersCases_1.getUsersByRole)(userRepository)(role);
        return res.status(201).json({ message: "Users fetched by role successfully", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersByRoleController = getUsersByRoleController;
const getUsersCountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, usersCases_1.getUsersCount)(userRepository)();
        return res.status(201).json({ message: "Users count fetched successfully", count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersCountController = getUsersCountController;
const getUsersCountByRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { role } = req.params;
        const count = yield (0, usersCases_1.getUsersCountByRole)(userRepository)(role);
        return res.status(201).json({ message: "Users count fetched successfully", count });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersCountByRoleController = getUsersCountByRoleController;
const blockUserContorller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const user = yield (0, usersCases_1.blockUser)(userRepository)(id);
        return res.status(201).json({ message: "Blocked user successfully", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.blockUserContorller = blockUserContorller;
const unBlockUserContorller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const user = yield (0, usersCases_1.unBlockUser)(userRepository)(id);
        return res.status(201).json({ message: "Unblocked user successfully", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unBlockUserContorller = unBlockUserContorller;
const getCourseStudentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const students = yield (0, courseCases_1.getCourseStudents)(courseRepository)(id);
        return res.status(201).json({ message: "Students fetched successfully", students });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCourseStudentsController = getCourseStudentsController;
const editUserProfileImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { profile } = req.body;
        const user = yield (0, usersCases_1.editProfileImage)(userRepository)((_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id, profile);
        if (user) {
            return res.status(200).json({ message: "updated profile image", user });
        }
        else {
            return res.status(400).json({ message: "Cannot update credentials" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editUserProfileImageController = editUserProfileImageController;
const editUserCredentialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { email, username } = req.body;
        const user = yield (0, usersCases_1.editCredentials)(userRepository)((_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.id, email, username);
        if (user) {
            return res.status(200).json({ message: "Updated credentials", user });
        }
        else {
            return res.status(400).json({ message: "Cannot update credentials" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editUserCredentialController = editUserCredentialController;
const followMethodsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const user = yield (0, usersCases_1.followMethods)(userRepository)((_c = req.userInfo) === null || _c === void 0 ? void 0 : _c.id, id);
        if (user) {
            return res.status(200).json({ message: "User followed successfully", user });
        }
        else {
            return res.status(400).json({ message: "Unable to follow user" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.followMethodsController = followMethodsController;
const unfollowMethodsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const user = yield (0, usersCases_1.unfollowMethods)(userRepository)((_d = req.userInfo) === null || _d === void 0 ? void 0 : _d.id, id);
        if (user) {
            return res.status(200).json({ message: "User unfollowed successfully", user });
        }
        else {
            return res.status(400).json({ message: "Unable to unfollow user" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unfollowMethodsController = unfollowMethodsController;
const removeMethodsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const user = yield (0, usersCases_1.removeMethods)(userRepository)((_e = req.userInfo) === null || _e === void 0 ? void 0 : _e.id, id);
        if (user) {
            return res.status(200).json({ message: "User removed successfully", user });
        }
        else {
            return res.status(400).json({ message: "Unable to remove user" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeMethodsController = removeMethodsController;
