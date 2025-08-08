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
exports.default = RemoveUserController;
const RemoveUserService_1 = __importDefault(require("../../services/users/RemoveUserService"));
function RemoveUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        try {
            const removedUser = yield (0, RemoveUserService_1.default)(userId);
            return res.status(200).json({
                message: "User removed successfully",
                user: removedUser,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
