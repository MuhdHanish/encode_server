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
exports.unListLanguage = exports.listLanguage = exports.getLanguagesCount = void 0;
const getLanguagesCount = (languageRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield languageRepository.getLanguagesCount();
    return count ? count : null;
});
exports.getLanguagesCount = getLanguagesCount;
const listLanguage = (languageRepository) => (languageId) => __awaiter(void 0, void 0, void 0, function* () {
    const language = yield languageRepository.listLanguage(languageId);
    return language ? language : null;
});
exports.listLanguage = listLanguage;
const unListLanguage = (languageRepository) => (languageId) => __awaiter(void 0, void 0, void 0, function* () {
    const language = yield languageRepository.unListLanguage(languageId);
    return language ? language : null;
});
exports.unListLanguage = unListLanguage;
