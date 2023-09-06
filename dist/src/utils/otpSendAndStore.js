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
exports.otpSender = exports.cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const uuid_1 = require("uuid");
const sendOtp = require("node-otp-sender");
exports.cache = new node_cache_1.default();
const otpSender = (email, subject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uId = (0, uuid_1.v4)();
        const { otp } = yield sendOtp(process.env.SENDER_EMAIL, process.env.SENDER_PASSWORD, email, subject);
        exports.cache.set(uId, otp, 125);
        return uId;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.otpSender = otpSender;
