"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChatsController = exports.sendMessageController = void 0;
const chat_1 = require("../chat");
Object.defineProperty(exports, "fetchChatsController", { enumerable: true, get: function () { return chat_1.fetchChatsController; } });
const sendMessageController_1 = __importDefault(require("./sendMessageController"));
exports.sendMessageController = sendMessageController_1.default;
