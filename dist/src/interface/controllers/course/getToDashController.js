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
exports.getDataToAdminDashboardController = exports.getDataToTutorDashboardController = void 0;
const courseModel_1 = require("../../../framework/database/models/courseModel");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const express_validator_1 = require("express-validator");
const getToDashBoard_1 = require("../../../app/usecases/course/getToDashBoard");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const getDataToTutorDashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const data = yield (0, getToDashBoard_1.getDataToTutorDashboard)(courseRepository)(id);
        if (data) {
            return res
                .status(200)
                .json({ message: "data fetched sucessfully", data });
        }
        else {
            return res.status(400).json({ message: "No data found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDataToTutorDashboardController = getDataToTutorDashboardController;
const getDataToAdminDashboardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, getToDashBoard_1.getDataToAdminDashboard)(courseRepository)();
        if (data) {
            return res
                .status(200)
                .json({ message: "data fetched sucessfully", data });
        }
        else {
            return res.status(400).json({ message: "No data found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDataToAdminDashboardController = getDataToAdminDashboardController;
