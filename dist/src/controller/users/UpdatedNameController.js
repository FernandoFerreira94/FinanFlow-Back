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
exports.default = UpdatedNameController;
const UpdatedNameService_1 = __importDefault(require("../../services/users/UpdatedNameService"));
function UpdatedNameController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.user_id;
        const { newName } = req.body;
        if (!user_id || !newName) {
            return res
                .status(400)
                .json({ error: "User ID and new name are required." });
        }
        try {
            const updatedName = yield (0, UpdatedNameService_1.default)({
                userId: user_id,
                newName,
            });
            return res.status(200).json(updatedName);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
