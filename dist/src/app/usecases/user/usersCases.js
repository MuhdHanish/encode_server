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
exports.removeMethods = exports.unfollowMethods = exports.followMethods = exports.editCredentials = exports.editProfileImage = exports.unBlockUser = exports.blockUser = exports.getUsersCountByRole = exports.getUsersCount = exports.getUsersByRole = exports.getUsers = void 0;
const getUsers = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getUsers();
    return users ? users : null;
});
exports.getUsers = getUsers;
const getUsersByRole = (userRepository) => (role) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepository.getUsersByRole(role);
    return users ? users : null;
});
exports.getUsersByRole = getUsersByRole;
const getUsersCount = (userRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield userRepository.getUsersCount();
    return count ? count : null;
});
exports.getUsersCount = getUsersCount;
const getUsersCountByRole = (userRepository) => (role) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield userRepository.getUsersCountByRole(role);
    return count ? count : null;
});
exports.getUsersCountByRole = getUsersCountByRole;
const blockUser = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.blockUser(userId);
    return user ? user : null;
});
exports.blockUser = blockUser;
const unBlockUser = (userRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.unBlockUser(userId);
    return user ? user : null;
});
exports.unBlockUser = unBlockUser;
const editProfileImage = (userRepository) => (id, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.updateProfileImage(id, profile);
    return user ? user : null;
});
exports.editProfileImage = editProfileImage;
const editCredentials = (userRepository) => (id, email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.updateCredentials(id, email, username);
    return user ? user : null;
});
exports.editCredentials = editCredentials;
const followMethods = (userRepository) => (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.followMethods(id, userId);
    return user ? user : null;
});
exports.followMethods = followMethods;
const unfollowMethods = (userRepository) => (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.unfollowMethods(id, userId);
    return user ? user : null;
});
exports.unfollowMethods = unfollowMethods;
const removeMethods = (userRepository) => (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.removeMethods(id, userId);
    return user ? user : null;
});
exports.removeMethods = removeMethods;
