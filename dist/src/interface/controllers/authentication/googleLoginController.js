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
const userLogin_1 = require("../../../app/usecases/authentication/userLogin");
const userModel_1 = require("../../../framework/database/models/userModel");
const userRepository_1 = require("../../../framework/repository/userRepository");
const jwtTokenUtils_1 = require("../../../utils/jwtTokenUtils");
const userRepository = (0, userRepository_1.userRepositoryEmpl)(userModel_1.userModel);
const googleLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.email;
        const user = yield (0, userLogin_1.userLogin)(userRepository)(email, email);
        if (user) {
            const accessToken = yield (0, jwtTokenUtils_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            const refreshToken = yield (0, jwtTokenUtils_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
            return res.status(200).json({ user, accessToken, refreshToken });
        }
        else {
            return res.status(401).json({ message: "No active account found with the given credentials" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = googleLoginController;
