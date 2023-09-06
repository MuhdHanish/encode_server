"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLanguageController = exports.editLanguageController = exports.getLanguageByIdController = exports.getLanguagesController = void 0;
const getLanguagesController_1 = __importDefault(require("./getLanguagesController"));
exports.getLanguagesController = getLanguagesController_1.default;
const getLanguagesByIdController_1 = __importDefault(require("./getLanguagesByIdController"));
exports.getLanguageByIdController = getLanguagesByIdController_1.default;
const postLanguageController_1 = __importDefault(require("./postLanguageController"));
exports.postLanguageController = postLanguageController_1.default;
const editLanguageController_1 = __importDefault(require("./editLanguageController"));
exports.editLanguageController = editLanguageController_1.default;
