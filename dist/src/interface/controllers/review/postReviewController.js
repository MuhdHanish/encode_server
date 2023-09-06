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
const review_1 = require("../../../app/usecases/review/review");
const reviewModel_1 = require("../../../framework/database/models/reviewModel");
const reviewRepository_1 = require("../../../framework/repository/reviewRepository");
const express_validator_1 = require("express-validator");
const changeRating_1 = require("../../../app/usecases/course/changeRating");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const courseModel_1 = require("../../../framework/database/models/courseModel");
const reviewRepository = (0, reviewRepository_1.reviewRepositoryEmpl)(reviewModel_1.reviewModel);
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const postReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const { review, rating } = req.body;
        const recorded = yield (0, review_1.isRecorded)(reviewRepository)(id, (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id);
        if (!recorded) {
            const newReview = yield (0, review_1.postReview)(reviewRepository)(id, (_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.id, review, rating);
            if (newReview) {
                const count = yield (0, review_1.getReviewsCount)(reviewRepository)(id);
                const updatedCourse = yield (0, changeRating_1.changeRating)(courseRepository)(newReview.course, newReview.rating, count);
                if (updatedCourse) {
                    return res.status(201).json({ message: "New review added ", newReview });
                }
                else {
                    return res.status(400).json({ message: "Error on changing review of course" });
                }
            }
            else {
                return res.status(400).json({ message: "Error on adding review" });
            }
        }
        else {
            return res.status(409).json({ message: "Review already recorded" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = postReviewController;
