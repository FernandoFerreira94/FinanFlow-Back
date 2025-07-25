import prismaClient from "../../prisma";

// FUNÇÃO PARA PEGAR TODAS AS DESPESAS PAGAS DO USUÁRIO

export default async function GetPaidExpenseService(userId: string) {
  const expensesAll = await prismaClient.expense.findMany({
    // Busca todas as despesas pagas do usuário pelo ID que já foram pagas
    where: {
      userId,
      paid: true,
    },
    // Ordena as despesas pela data de vencimento em ordem menor para maior
    orderBy: {
      dueDate: "asc",
    },
  });
  return expensesAll;
}
