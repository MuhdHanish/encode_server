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
const signupGoogle_1 = require("../../../../app/usecases/authentication/userSignup/signupGoogle");
const userRepository_1 = require("../../../../framework/repository/userRepository");
const userModel_1 = require("../../../../framework/database/models/userModel");
const jwtTokenUtils_1 = require("../../../../utils/jwtTokenUtils");
const userRepository = (0, userRepository_1.userRepositoryEmpl)(userModel_1.userModel);
const googleSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { role } = req.body;
        const username = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.username;
        const email = (_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.email;
        const profile = (_c = req.userInfo) === null || _c === void 0 ? void 0 : _c.profile;
        const { user, message } = yield (0, signupGoogle_1.signupGoogle)(userRepository)(username, email, role, profile);
        if (message) {
            return res.status(409).json({ message });
        }
        else if (user) {
            const accessToken = yield (0, jwtTokenUtils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            const refreshToken = yield (0, jwtTokenUtils_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            return res.status(201).json({ user, accessToken, refreshToken });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = googleSignupController;
