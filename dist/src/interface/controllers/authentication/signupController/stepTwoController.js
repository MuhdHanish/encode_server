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
const userModel_1 = require("../../../../framework/database/models/userModel");
const express_validator_1 = require("express-validator");
const userRepository_1 = require("../../../../framework/repository/userRepository");
const signupStepTwo_1 = require("../../../../app/usecases/authentication/userSignup/signupStepTwo");
const jwtTokenUtils_1 = require("../../../../utils/jwtTokenUtils");
const userRepository = (0, userRepository_1.userRepositoryEmpl)(userModel_1.userModel);
const stepTwoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { username, email, password, role } = req.body;
        const user = yield (0, signupStepTwo_1.signupStepTwo)(userRepository)(username, email, password, role);
        if (!user) {
            return res.status(400).json({ message: "Registration failed" });
        }
        else {
            const accessToken = yield (0, jwtTokenUtils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            const refreshToken = yield (0, jwtTokenUtils_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            return res.status(201).json({ user, accessToken, refreshToken });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = stepTwoController;
