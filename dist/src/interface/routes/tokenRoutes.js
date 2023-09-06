"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const tokenController_1 = __importDefault(require("../controllers/token/tokenController"));
const refreshAuthorization_1 = __importDefault(require("../../middleware/refreshAuthorization"));
const router = (0, express_1.Router)();
router.post("/", refreshAuthorization_1.default, tokenController_1.default);
exports.default = router;
