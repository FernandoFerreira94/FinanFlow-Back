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
exports.default = CreateExpenseService;
const prisma_1 = __importDefault(require("../../prisma"));
function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}
function toDateOnly(date) {
    const onlyDate = new Date(date);
    onlyDate.setHours(0, 0, 0, 0);
    return onlyDate;
}
function CreateExpenseService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const expenseExist = yield prisma_1.default.expense.findFirst({
            where: {
                name: data.name,
                amount: data.amount,
                type: data.type,
                userId: data.userId,
                paid: false,
            },
        });
        if (expenseExist) {
            throw new Error("Despesa já cadastrada");
        }
        if (data.type === "INSTALLMENT") {
            if (!data.installments || data.installments < 1) {
                throw new Error("Número de parcelas inválido.");
            }
            const valorParcelaBruto = data.amount / data.installments;
            const valorParcela = parseFloat(valorParcelaBruto.toFixed(2));
            const despesasParceladas = [];
            let totalAcumulado = 0;
            for (let i = 0; i < data.installments; i++) {
                // Última parcela ajusta o valor para bater com o total (por conta de arredondamento)
                const valorFinal = i === data.installments - 1
                    ? parseFloat((data.amount - totalAcumulado).toFixed(2))
                    : valorParcela;
                totalAcumulado += valorFinal;
                const parcela = yield prisma_1.default.expense.create({
                    data: {
                        name: data.name,
                        amount: valorFinal,
                        dueDate: toDateOnly(addMonths(new Date(data.dueDate), i)),
                        paymentDate: null,
                        purchaseDate: data.purchaseDate
                            ? toDateOnly(new Date(data.purchaseDate))
                            : toDateOnly(new Date()),
                        type: data.type,
                        installments: data.installments,
                        installmentNumber: i + 1,
                        totalInstallments: data.installments,
                        paid: false,
                        userId: data.userId,
                    },
                });
                despesasParceladas.push(parcela);
            }
            return despesasParceladas;
        }
        // FIXED
        const expense = yield prisma_1.default.expense.create({
            data: {
                name: data.name,
                amount: data.amount,
                dueDate: toDateOnly(new Date(data.dueDate)),
                paymentDate: data.paymentDate
                    ? toDateOnly(new Date(data.paymentDate))
                    : null,
                purchaseDate: data.purchaseDate
                    ? toDateOnly(new Date(data.purchaseDate))
                    : toDateOnly(new Date()),
                type: data.type,
                installments: data.installments,
                paid: (_a = data.paid) !== null && _a !== void 0 ? _a : false,
                userId: data.userId,
            },
        });
        return expense;
    });
}
