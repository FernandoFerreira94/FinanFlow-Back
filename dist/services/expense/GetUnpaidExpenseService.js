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
exports.default = GetUnpaidExpenseService;
const prisma_1 = __importDefault(require("../../prisma"));
// FUNÇÃO PARA PEGAR TODAS AS DESPESAS NÃO PAGAS DO USUÁRIO
function GetUnpaidExpenseService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const expensesAll = yield prisma_1.default.expense.findMany({
            // Busca todas as despesas não pagas do usuário pelo ID que ainda não foram pagas
            where: {
                userId,
                paid: false,
            },
            // Ordena as despesas pela data de vencimento em ordem menor para maior
            orderBy: {
                dueDate: "asc",
            },
        });
        return expensesAll;
    });
}
