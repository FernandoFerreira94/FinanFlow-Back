import prismaClient from "../../prisma";

// FUNÇÃO PARA PEGAR TODAS AS DESPESAS PAGAS DO USUÁRIO

export default async function GetPantryExpense(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expensesAll = await prismaClient.expense.findMany({
    // Busca todas as despesas pagas do usuário pelo ID que já foram pagas
    where: {
      userId,
      paid: false,
      dueDate: {
        lt: today,
      },
    },
    // Ordena as despesas pela data de vencimento em ordem menor para maior
    orderBy: {
      dueDate: "asc",
    },
  });
  return expensesAll;
}
