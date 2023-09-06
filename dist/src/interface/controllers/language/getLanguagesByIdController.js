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
const express_validator_1 = require("express-validator");
const LanguageModel_1 = require("../../../framework/database/models/LanguageModel");
const getLanguageById_1 = require("../../../app/usecases/language/getLanguageById");
const LanguageRepository_1 = require("../../../framework/repository/LanguageRepository");
const languageRepository = (0, LanguageRepository_1.languageRepositoryEmpl)(LanguageModel_1.LanguageModel);
const getLanguageByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const language = yield (0, getLanguageById_1.getLanguageById)(languageRepository)(id);
        if (language) {
            return res.status(200).json({ message: "Language fetched successfully", language });
        }
        else {
            return res.status(400).json({ message: "No language found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = getLanguageByIdController;
