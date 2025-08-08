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
exports.default = DetailUserController;
const DetailUserService_1 = __importDefault(require("../../services/users/DetailUserService"));
function DetailUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = req.user_id;
        if (!user_id) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        try {
            const user = yield (0, DetailUserService_1.default)(user_id);
            return res.json(user);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    });
}
