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
exports.forgotPassword = void 0;
const otpSendAndStore_1 = require("../../../utils/otpSendAndStore");
const forgotPassword = (userRepository) => (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userRepository.findByUsernameOrEmail(usernameOrEmail);
    if (currentUser && currentUser.status) {
        const uId = yield (0, otpSendAndStore_1.otpSender)(currentUser === null || currentUser === void 0 ? void 0 : currentUser.email, `Otp verification`);
        return uId;
    }
    return null;
});
exports.forgotPassword = forgotPassword;
