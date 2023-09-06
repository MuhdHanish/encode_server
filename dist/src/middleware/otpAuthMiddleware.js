"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otpSendAndStore_1 = require("../utils/otpSendAndStore");
const otpAuthMiddleware = (req, res, next) => {
    try {
        const { id } = req.params;
        const { enteredOtp } = req.body;
        const value = otpSendAndStore_1.cache.get(id);
        if (!value) {
            return res.status(401).json({ message: "Given Otp is invalid" });
        }
        else {
            if (parseInt(enteredOtp) === value) {
                otpSendAndStore_1.cache.del(id);
                next();
            }
            else {
                return res.status(400).json({ message: "Given Otp is invalid" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = otpAuthMiddleware;
