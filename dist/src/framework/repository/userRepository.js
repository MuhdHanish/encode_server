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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepositoryEmpl = (userModel) => {
    const findByUsernameAndEmail = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel.findOne({ $or: [{ username }, { email }] }).exec();
            return user !== null ? user.toObject() : null;
        }
        catch (error) {
            console.error("Error finding user by username and email:", error);
            return null;
        }
    });
    const findByUsernameOrEmailAndPassword = (usernameOrEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .populate("following", "-password -isGoogle -role -status")
                .populate("followers", "-password -isGoogle -role -status")
                .exec();
            if (user) {
                const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
                if (passwordMatch) {
                    if (user.role === "admin") {
                        const { _id, role, status, profile } = user.toObject();
                        return { _id, role, status, profile };
                    }
                    else {
                        const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                        return userWithoutPassword;
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const findByUsernameOrEmail = (usernameOrEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            })
                .exec();
            if (user) {
                const _b = user.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
                return userWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error finding user by username or email and password:", error);
            return null;
        }
    });
    const create = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(userDetails.password, 12);
            const userData = {
                username: userDetails.username,
                email: userDetails.email,
                password: hashPass,
                role: userDetails.role,
                isGoogle: false,
            };
            const createdUser = (yield userModel.create(userData)).toObject();
            if (createdUser) {
                const { password } = createdUser, userWithoutPassword = __rest(createdUser, ["password"]);
                return userWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    });
    const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel.find({ role: { $ne: "admin" } }, { password: 0 });
            if (users) {
                return users;
            }
            return null;
        }
        catch (error) {
            console.error("Error get users:", error);
            return null;
        }
    });
    const getUsersCount = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield userModel.find({ role: { $ne: "admin" } }).countDocuments();
            if (count) {
                return count;
            }
            return null;
        }
        catch (error) {
            console.error("Error get users count:", error);
            return null;
        }
    });
    const getUsersByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel.find({ role }, { password: 0 });
            if (users) {
                return users;
            }
            return null;
        }
        catch (error) {
            console.error("Error get users by role:", error);
            return null;
        }
    });
    const getUsersCountByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield userModel.find({ role }).countDocuments();
            if (count) {
                return count;
            }
            return null;
        }
        catch (error) {
            console.error("Error get users count by role:", error);
            return null;
        }
    });
    const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel.findByIdAndUpdate(userId, { $set: { status: false } }, { new: true });
            const _c = user === null || user === void 0 ? void 0 : user.toObject(), { password } = _c, userWthOutPassword = __rest(_c, ["password"]);
            return userWthOutPassword ? userWthOutPassword : null;
        }
        catch (error) {
            console.error("Error block user:", error);
            return null;
        }
    });
    const unBlockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel.findByIdAndUpdate(userId, { $set: { status: true } }, { new: true });
            const _d = user === null || user === void 0 ? void 0 : user.toObject(), { password } = _d, userWthOutPassword = __rest(_d, ["password"]);
            return userWthOutPassword ? userWthOutPassword : null;
        }
        catch (error) {
            console.error("Error un block:", error);
            return null;
        }
    });
    const googleUserCreate = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(userDetails.email, 12);
            const userData = {
                username: userDetails.username,
                email: userDetails.email,
                password: hashPass,
                role: userDetails.role,
                profile: userDetails.profile,
                isGoogle: true,
            };
            const createdUser = (yield userModel.create(userData)).toObject();
            if (createdUser) {
                const { password } = createdUser, userWithoutPassword = __rest(createdUser, ["password"]);
                return userWithoutPassword;
            }
            return null;
        }
        catch (error) {
            console.error("Error creating Google user:", error);
            return null;
        }
    });
    const resetPassword = (usernameOrEmail, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashPass = bcryptjs_1.default.hashSync(newPassword, 12);
            const user = yield userModel
                .findOneAndUpdate({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            }, { $set: { password: hashPass } }, { new: true })
                .exec();
            if (user) {
                const _e = user.toObject(), { password } = _e, restoredUser = __rest(_e, ["password"]);
                return restoredUser;
            }
            return null;
        }
        catch (error) {
            console.error("Error on reseting the password:", error);
            return null;
        }
    });
    const updateProfileImage = (id, profile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedProfile = yield userModel.findByIdAndUpdate(id, { $set: { profile: profile } }, { new: true });
            return updatedProfile ? updatedProfile.toObject() : null;
        }
        catch (error) {
            console.error("Error updating profile image:", error);
            return null;
        }
    });
    const updateCredentials = (id, email, username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedProfile = yield userModel.findByIdAndUpdate(id, { $set: { email, username } }, { new: true });
            return updatedProfile ? updatedProfile.toObject() : null;
        }
        catch (error) {
            console.error("Error updating credentials:", error);
            return null;
        }
    });
    const followMethods = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findByIdAndUpdate(id, { $addToSet: { following: new mongoose_1.default.Types.ObjectId(userId) } }, { new: true })
                .populate("following", "-password -isGoogle -role -status")
                .populate("followers", "-password -isGoogle -role -status")
                .exec();
            yield userModel.findByIdAndUpdate(userId, { $addToSet: { followers: new mongoose_1.default.Types.ObjectId(id) } }, { new: true });
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error("Error following user:", error);
            return null;
        }
    });
    const unfollowMethods = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findByIdAndUpdate(id, { $pull: { following: new mongoose_1.default.Types.ObjectId(userId) } }, { new: true })
                .populate("following", "-password -isGoogle -role -status")
                .populate("followers", "-password -isGoogle -role -status")
                .exec();
            yield userModel.findByIdAndUpdate(userId, { $pull: { followers: new mongoose_1.default.Types.ObjectId(id) } }, { new: true });
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error("Error unfollowing user:", error);
            return null;
        }
    });
    const removeMethods = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel
                .findByIdAndUpdate(id, { $pull: { followers: new mongoose_1.default.Types.ObjectId(userId) } }, { new: true })
                .populate("following", "-password -isGoogle -role -status")
                .populate("followers", "-password -isGoogle -role -status")
                .exec();
            yield userModel.findByIdAndUpdate(userId, { $pull: { following: new mongoose_1.default.Types.ObjectId(id) } }, { new: true });
            return user ? user.toObject() : null;
        }
        catch (error) {
            console.error("Error unfollowing user:", error);
            return null;
        }
    });
    return {
        create,
        findByUsernameAndEmail,
        findByUsernameOrEmailAndPassword,
        findByUsernameOrEmail,
        getUsersByRole,
        getUsers,
        getUsersCount,
        blockUser,
        unBlockUser,
        getUsersCountByRole,
        googleUserCreate,
        resetPassword,
        updateProfileImage,
        updateCredentials,
        followMethods,
        unfollowMethods,
        removeMethods
    };
};
exports.userRepositoryEmpl = userRepositoryEmpl;
