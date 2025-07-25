import prismaClient from "../../prisma";

// FUNÇÃO PARA PEGAR TODAS AS DESPESAS NÃO PAGAS DO USUÁRIO

export default async function GetUnpaidExpenseService(userId: string) {
  const expensesAll = await prismaClient.expense.findMany({
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
}
