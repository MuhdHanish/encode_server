"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignupMiddelware = exports.googleLoginMiddleware = void 0;
const jwtTokenUtils_1 = __importDefault(require("../utils/jwtTokenUtils"));
const googleLoginMiddleware = (req, res, next) => {
    try {
        const decodeGoogleCredential = jwtTokenUtils_1.default.decode(req.body.credential);
        const credential = decodeGoogleCredential;
        if (decodeGoogleCredential) {
            const parts = credential.email.split("@");
            const username = parts.length > 1 ? parts[0] : credential.name;
            const email = credential.email;
            req.userInfo = { username, email };
            next();
        }
        else {
            res.status(401).json({ message: "Un-Authorized request" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.googleLoginMiddleware = googleLoginMiddleware;
const googleSignupMiddelware = (req, res, next) => {
    try {
        const decodeGoogleCredential = jwtTokenUtils_1.default.decode(req.body.credential.credential);
        const credential = decodeGoogleCredential;
        if (decodeGoogleCredential) {
            const parts = credential.email.split("@");
            const username = parts.length > 1 ? parts[0] : credential.name;
            const email = credential.email;
            const profile = credential.picture;
            const { role } = req.body;
            req.userInfo = { username, email, profile, role };
            next();
        }
        else {
            res.status(401).json({ message: "Un-Authorized request" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.googleSignupMiddelware = googleSignupMiddelware;
