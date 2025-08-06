import prismaClient from "../../prisma";

interface ExpenseProps {
  name: string;
  amount: number;
  purchaseDate?: Date; // opcional, se não passar usa data atual
  dueDate: Date;
  type: "FIXED" | "INSTALLMENT";
  userId: string;
  installments?: number;
  paymentDate?: Date;
  paid?: boolean;
}

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

function toDateOnly(date: Date): Date {
  const onlyDate = new Date(date);
  onlyDate.setHours(0, 0, 0, 0);
  return onlyDate;
}
export default async function CreateExpenseService(data: ExpenseProps) {
  const expenseExist = await prismaClient.expense.findFirst({
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
      const valorFinal =
        i === data.installments - 1
          ? parseFloat((data.amount - totalAcumulado).toFixed(2))
          : valorParcela;

      totalAcumulado += valorFinal;

      const parcela = await prismaClient.expense.create({
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
  const expense = await prismaClient.expense.create({
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
      paid: data.paid ?? false,
      userId: data.userId,
    },
  });

  return expense;
}
