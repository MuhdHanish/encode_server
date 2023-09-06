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
exports.signupStepOne = void 0;
const otpSendAndStore_1 = require("../../../../utils/otpSendAndStore");
const signupStepOne = (userRepository) => (username, email, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findByUsernameAndEmail(username, email);
        if (user) {
            if (user.username === username) {
                return { message: "Username already exists", uId: null };
            }
            if (user.email === email) {
                return { message: "Email already exists", uId: null };
            }
        }
        const uId = yield (0, otpSendAndStore_1.otpSender)(email, `Otp verification of ${role}`);
        return { message: null, uId };
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.signupStepOne = signupStepOne;
