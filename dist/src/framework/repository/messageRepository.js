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
exports.messageRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageRepositoryEmpl = (messageModel) => {
    const fetchMessages = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield messageModel.find({ chat: new mongoose_1.default.Types.ObjectId(chatId) })
                .populate("sender", "-password -following -followers -isGoogle -role -status")
                .populate("chat");
            return messages.length > 0 ? messages : null;
        }
        catch (error) {
            console.log("Error on fetching messages :", error);
            return null;
        }
    });
    const sendMessage = (senderId, chatId, content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = {
                sender: new mongoose_1.default.Types.ObjectId(senderId),
                chat: new mongoose_1.default.Types.ObjectId(chatId),
                content
            };
            let message = (yield messageModel.create(newMessage));
            message = yield message.populate("sender", "-password -following -followers -isGoogle -role -status");
            message = yield message.populate("chat");
            return message ? message : null;
        }
        catch (error) {
            console.log("Error on fetching messages :", error);
            return null;
        }
    });
    return {
        fetchMessages,
        sendMessage
    };
};
exports.messageRepositoryEmpl = messageRepositoryEmpl;
