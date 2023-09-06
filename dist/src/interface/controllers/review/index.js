"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewController = exports.updateReviewController = exports.postReviewController = exports.getAllReviewsController = void 0;
const deleteReviewController_1 = __importDefault(require("./deleteReviewController"));
exports.deleteReviewController = deleteReviewController_1.default;
const getAllReviewsController_1 = __importDefault(require("./getAllReviewsController"));
exports.getAllReviewsController = getAllReviewsController_1.default;
const postReviewController_1 = __importDefault(require("./postReviewController"));
exports.postReviewController = postReviewController_1.default;
const updateReviewController_1 = __importDefault(require("./updateReviewController"));
exports.updateReviewController = updateReviewController_1.default;
