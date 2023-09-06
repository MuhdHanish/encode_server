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
exports.sendMessage = exports.fetchMessages = void 0;
const fetchMessages = (messageRepository) => (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageRepository.fetchMessages(chatId);
    return messages ? messages : null;
});
exports.fetchMessages = fetchMessages;
const sendMessage = (messageRepository) => (senderId, chatId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield messageRepository.sendMessage(senderId, chatId, content);
    return message ? message : null;
});
exports.sendMessage = sendMessage;
