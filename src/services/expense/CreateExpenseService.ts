import prismaClient from "../../prisma";

interface ExpenseProps {
  name: string;
  amount: number;
  purchaseDate?: Date; // opcional, se não passar usa data atual
  dueDate: Date;
  type: "FIXED" | "INSTALLMENT" | "SINGLE";
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

export default async function CreateExpenseService(data: ExpenseProps) {
  if (data.type === "INSTALLMENT") {
    if (!data.installments || data.installments < 1) {
      throw new Error("Número de parcelas inválido.");
    }

    const valorParcela = parseFloat(
      (data.amount / data.installments).toFixed(2)
    );
    const despesasParceladas = [];

    for (let i = 0; i < data.installments; i++) {
      const parcela = await prismaClient.expense.create({
        data: {
          name: `${data.name} (${i + 1}/${data.installments})`,
          amount: valorParcela,
          dueDate: addMonths(new Date(data.dueDate), i),
          paymentDate: null,
          purchaseDate: data.purchaseDate
            ? new Date(data.purchaseDate)
            : new Date(),
          type: data.type,
          installments: data.installments,
          paid: false,
          userId: data.userId,
        },
      });

      despesasParceladas.push(parcela);
    }

    return despesasParceladas;
  }

  // FIXED ou SINGLE
  const expense = await prismaClient.expense.create({
    data: {
      name: data.name,
      amount: data.amount,
      dueDate: new Date(data.dueDate),
      paymentDate: data.paymentDate ? new Date(data.paymentDate) : null,
      type: data.type,
      installments: data.installments,
      paid: data.paid ?? false,
      userId: data.userId,
    },
  });

  return expense;
}
