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
const jwtTokenUtils_1 = require("../../../utils/jwtTokenUtils");
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const accessToken = yield (0, jwtTokenUtils_1.generateAccessToken)((_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id, (_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.role);
        return res.status(201).json({ message: "New acces token created", accessToken });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = refreshTokenController;
