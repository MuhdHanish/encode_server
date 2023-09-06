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
exports.signupGoogle = void 0;
const signupGoogle = (userRepository) => (username, email, role, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = { username, email, role, profile };
    try {
        const user = yield userRepository.findByUsernameAndEmail(username, email);
        if (user) {
            if (user.username === username) {
                return { message: "Username already exists", user: null };
            }
            if (user.email === email) {
                return { message: "Email already exists", user: null };
            }
        }
        else {
            const createdUser = yield userRepository.googleUserCreate(userDetails);
            return { message: null, user: createdUser };
        }
        throw new Error("Unexpected condition or error occurred.");
    }
    catch (error) {
        throw error;
    }
});
exports.signupGoogle = signupGoogle;
