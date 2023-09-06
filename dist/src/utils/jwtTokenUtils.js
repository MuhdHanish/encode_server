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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const expiresIn = "1hr";
    const accessToken = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_ACCESS_SECRET, { expiresIn });
    return accessToken;
});
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const expiresIn = "1hr";
    const refreshToken = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn });
    return refreshToken;
});
exports.generateRefreshToken = generateRefreshToken;
exports.default = jsonwebtoken_1.default;
