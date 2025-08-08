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
exports.default = GetExpensesByMonthController;
const GetExpenseByMonthService_1 = __importDefault(require("../../services/expense/GetExpenseByMonthService"));
function GetExpensesByMonthController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const month = Number(req.params.month);
            const year = Number(req.params.year);
            if (!userId || !month || !year) {
                return res
                    .status(400)
                    .json({ error: "User ID, month and year are required." });
            }
            if (month < 1 || month > 12) {
                return res.status(400).json({ error: "Month must be between 1 and 12." });
            }
            const expenses = yield (0, GetExpenseByMonthService_1.default)({ userId, month, year });
            return res.status(200).json(expenses);
        }
        catch (error) {
            console.error("Error getting expenses by month:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
