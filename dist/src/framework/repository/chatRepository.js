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
exports.chatRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../database/models/userModel");
const chatRepositoryEmpl = (chatModel) => {
    const accessChat = (userId, secUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let isChat = yield chatModel
                .findOne({
                $and: [
                    { users: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(userId) } } },
                    { users: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(secUserId) } } },
                ],
            })
                .populate("users", "-password -following -followers -isGoogle -role -status")
                .populate("latestMessage");
            isChat = yield userModel_1.userModel.populate(isChat, {
                path: "latestMessage.sender",
                select: "name email profile",
            });
            if (isChat) {
                return isChat;
            }
            else {
                const chatData = { users: [userId, secUserId] };
                const createdChat = yield chatModel.create(chatData);
                isChat = yield chatModel.findById(createdChat._id).populate("users", "-password -following -followers -isGoogle -role -status");
                return isChat ? isChat : null;
            }
        }
        catch (error) {
            console.log("Error on accessing chat :", error);
            return null;
        }
    });
    const fetchChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chats = yield chatModel
                .find({
                users: { $elemMatch: { $eq: new mongoose_1.default.Types.ObjectId(userId) } },
            })
                .populate("users", "-password -following -followers -isGoogle -role -status")
                .populate("latestMessage")
                .sort({ updatedAt: -1 });
            return chats.length > 0 ? chats : null;
        }
        catch (error) {
            console.log("Error on fetching chats :", error);
            return null;
        }
    });
    const updateLatestMessage = (chatId, message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedChat = yield chatModel.findByIdAndUpdate(chatId, { $set: { latestMessage: message } }, { new: true });
            return updatedChat ? updatedChat : null;
        }
        catch (error) {
            console.log("Error on updating latest message :", error);
            return null;
        }
    });
    return {
        accessChat,
        fetchChats,
        updateLatestMessage
    };
};
exports.chatRepositoryEmpl = chatRepositoryEmpl;
