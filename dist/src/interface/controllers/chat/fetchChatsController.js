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
const chat_1 = require("../../../app/usecases/chat/chat");
const chatModel_1 = require("../../../framework/database/models/chatModel");
const chatRepository_1 = require("../../../framework/repository/chatRepository");
const chatRepository = (0, chatRepository_1.chatRepositoryEmpl)(chatModel_1.chatModel);
const fetchChatsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const chats = yield (0, chat_1.fetchChats)(chatRepository)((_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id);
        return res.status(200).json({ message: "Fetched chats successfully", chats });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = fetchChatsController;
