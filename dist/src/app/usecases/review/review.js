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
exports.getReviewByCredential = exports.deleteReview = exports.updateReview = exports.isRecorded = exports.getReviewsCount = exports.postReview = exports.getAllReviews = void 0;
const getAllReviews = (reviewRepository) => (course) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviewRepository.getAllReviews(course);
    return reviews ? reviews : null;
});
exports.getAllReviews = getAllReviews;
const postReview = (reviewRepository) => (course, user, review, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const postedReview = yield reviewRepository.postReview(course, user, review, rating);
    return postedReview ? postedReview : null;
});
exports.postReview = postReview;
const getReviewsCount = (reviewRepository) => (course) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield reviewRepository.getReviewsCount(course);
    return count ? count : null;
});
exports.getReviewsCount = getReviewsCount;
const isRecorded = (reviewRepository) => (course, user) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewRepository.isRecorded(course, user);
    return review ? true : false;
});
exports.isRecorded = isRecorded;
const updateReview = (reviewRepository) => (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield reviewRepository.editReview(id, review);
    return updatedReview ? updatedReview : null;
});
exports.updateReview = updateReview;
const deleteReview = (reviewRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedReview = yield reviewRepository.deleteReview(id);
    return deletedReview ? deletedReview : null;
});
exports.deleteReview = deleteReview;
const getReviewByCredential = (reviewRepository) => (id, course, user) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewRepository.getReviewByCredential(id, course, user);
    return review ? review : null;
});
exports.getReviewByCredential = getReviewByCredential;
