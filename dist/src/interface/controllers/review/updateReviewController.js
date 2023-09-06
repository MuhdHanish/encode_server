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
const reviewRepository = (0, reviewRepository_1.reviewRepositoryEmpl)(reviewModel_1.reviewModel);
const updateReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const { course, review, rating } = req.body;
        const exist = yield (0, review_1.getReviewByCredential)(reviewRepository)(id, course, (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id);
        if (exist) {
            const updatedReview = yield (0, review_1.updateReview)(reviewRepository)(id, { review, rating });
            if (updatedReview) {
                return res.status(200).json({ message: "Review updated successfully", updatedReview });
            }
            else {
                return res.status(400).json({ message: "Error on updating review" });
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorized: No review found with your credential" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = updateReviewController;
