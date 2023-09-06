"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtTokenUtils_1 = __importDefault(require("../utils/jwtTokenUtils"));
const tutorAuthorization = (req, res, next) => {
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1];
            const { id, role } = jwtTokenUtils_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            if (role == "tutor") {
                req.userInfo = { id, role };
                next();
            }
            else {
                return res.status(403).json({ message: "Un-Authorized, access forbidden" });
            }
        }
        else {
            return res.status(401).json({ message: "No authorization token found" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Access forbidden, Invalid token" });
    }
};
exports.default = tutorAuthorization;
