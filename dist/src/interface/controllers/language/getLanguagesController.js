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
const LanguageModel_1 = require("../../../framework/database/models/LanguageModel");
const LanguageRepository_1 = require("../../../framework/repository/LanguageRepository");
const getLanguages_1 = require("../../../app/usecases/language/getLanguages");
const languageRepository = (0, LanguageRepository_1.languageRepositoryEmpl)(LanguageModel_1.LanguageModel);
const getLanguagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield (0, getLanguages_1.getLanguages)(languageRepository)();
        if (languages) {
            return res.status(200).json({ message: "Languages fetched successfully", languages });
        }
        else {
            return res.status(400).json({ message: "No languages found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = getLanguagesController;
