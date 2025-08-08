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
exports.default = UpdateReadExpenseController;
const UpdateReadExpenseService_1 = __importDefault(require("../../services/expense/UpdateReadExpenseService"));
function UpdateReadExpenseController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { expenseId, userId } = req.params;
            if (!expenseId || !userId) {
                return res
                    .status(400)
                    .json({ error: "Expense ID and User ID are required." });
            }
            const updateRead = yield (0, UpdateReadExpenseService_1.default)({ expenseId, userId });
            return res.status(200).json(updateRead);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
