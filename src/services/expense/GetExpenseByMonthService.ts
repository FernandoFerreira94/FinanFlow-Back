import prismaClient from "../../prisma";

interface GetExpenseByMonthParams {
  userId: string;
  month: number;
  year: number;
}

export default async function GetExpenseByMonthService({
  userId,
  month,
  year,
}: GetExpenseByMonthParams) {
  const startDate = new Date(year, month - 1, 1, 0, 0, 0);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const expensesBymounth = await prismaClient.expense.findMany({
    // Busca todas as despesas do usuário pelo ID dentro do mês e ano especificados
    where: {
      userId,
      dueDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    // Ordena as despesas pela data de vencimento em ordem menor para maior
    orderBy: {
      dueDate: "asc",
    },
  });

  return expensesBymounth;
}
