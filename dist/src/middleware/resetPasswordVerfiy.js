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
const otpSendAndStore_1 = require("../utils/otpSendAndStore");
const resetPasswordVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { enteredOtp } = req.body;
        const value = otpSendAndStore_1.cache.get(id);
        if (!value) {
            return res.status(401).json({ message: "Un-Authorized request" });
        }
        else {
            if (parseInt(enteredOtp) === value) {
                otpSendAndStore_1.cache.del(id);
                return res.status(200).json({ message: "Otp is verified, reset password" });
            }
            else {
                return res.status(400).json({ message: "Given Otp is invalid" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = resetPasswordVerify;
