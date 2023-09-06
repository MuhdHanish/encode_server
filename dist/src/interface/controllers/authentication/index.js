"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPasswordController = exports.forgotPasswordController = exports.googleLoginController = exports.loginController = void 0;
const loginController_1 = __importDefault(require("./loginController"));
exports.loginController = loginController_1.default;
const googleLoginController_1 = __importDefault(require("./googleLoginController"));
exports.googleLoginController = googleLoginController_1.default;
const forgotPasswordController_1 = __importDefault(require("./forgotPasswordController"));
exports.forgotPasswordController = forgotPasswordController_1.default;
const resetPasswordController_1 = __importDefault(require("./resetPasswordController"));
exports.resetUserPasswordController = resetPasswordController_1.default;
