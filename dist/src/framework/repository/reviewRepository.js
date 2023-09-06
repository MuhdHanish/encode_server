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
exports.reviewRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewRepositoryEmpl = (reviewModel) => {
    const getAllReviews = (course) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviews = yield reviewModel
                .find({ course: new mongoose_1.default.Types.ObjectId(course) })
                .populate("user", "-password -isGoogle -role -status -following -followers")
                .exec();
            return reviews.length > 0 ? reviews : null;
        }
        catch (error) {
            console.error("Error getting all reviews:", error);
            return null;
        }
    });
    const getReviewByCredential = (id, course, user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const review = yield reviewModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id), course: new mongoose_1.default.Types.ObjectId(course), user: new mongoose_1.default.Types.ObjectId(user) });
            return review ? review.toObject() : null;
        }
        catch (error) {
            console.error("Error getting review by credentials:", error);
            return null;
        }
    });
    const editReview = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const editedReview = yield reviewModel.findByIdAndUpdate(id, review, { new: true });
            return editedReview ? editedReview : null;
        }
        catch (error) {
            console.error("Error editing review:", error);
            return null;
        }
    });
    const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedReview = yield reviewModel.findByIdAndDelete(id);
            return deletedReview ? deletedReview.toObject() : null;
        }
        catch (error) {
            console.error("Error deleting review:", error);
            return null;
        }
    });
    const postReview = (course, user, review, rating) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newReview = {
                course: new mongoose_1.default.Types.ObjectId(course),
                user: new mongoose_1.default.Types.ObjectId(user),
                review,
                rating
            };
            const createdReview = yield reviewModel.create(newReview);
            const savedReview = yield createdReview.populate("user", "-password -isGoogle -role -status -following -followers");
            return savedReview ? savedReview.toObject() : null;
        }
        catch (error) {
            console.error("Error posting review:", error);
            return null;
        }
    });
    const getReviewsCount = (course) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield reviewModel.find({ course: new mongoose_1.default.Types.ObjectId(course) }).countDocuments();
            return count;
        }
        catch (error) {
            console.error("Error getting reviews count:", error);
            return null;
        }
    });
    const isRecorded = (course, user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const review = yield reviewModel.findOne({ $and: [{ course: new mongoose_1.default.Types.ObjectId(course), user: new mongoose_1.default.Types.ObjectId(user) }] }).exec();
            return review ? review.toObject() : null;
        }
        catch (error) {
            console.error("Error checking if review is recorded:", error);
            return null;
        }
    });
    return {
        getAllReviews,
        postReview,
        getReviewsCount,
        isRecorded,
        deleteReview,
        editReview,
        getReviewByCredential
    };
};
exports.reviewRepositoryEmpl = reviewRepositoryEmpl;
