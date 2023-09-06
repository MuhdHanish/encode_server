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
exports.updateLatestMessage = exports.fetchChats = exports.accessChat = void 0;
const accessChat = (chatRepository) => (userId, secUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chatRepository.accessChat(userId, secUserId);
    return chat ? chat : null;
});
exports.accessChat = accessChat;
const fetchChats = (chatRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatRepository.fetchChats(userId);
    return chats ? chats : null;
});
exports.fetchChats = fetchChats;
const updateLatestMessage = (chatRepository) => (chatId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const chat = yield chatRepository.updateLatestMessage(chatId, message);
    return chat ? chat : null;
});
exports.updateLatestMessage = updateLatestMessage;
