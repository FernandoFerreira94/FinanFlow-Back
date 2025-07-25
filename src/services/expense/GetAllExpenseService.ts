import prismaClient from "../../prisma";

// FUNÇÃO PARA PEGAR TODAS AS DESPESAS DO USUÁRIO
// SEM FILTRO DE PAGO OU NÃO PAGO

export default async function GetAllExpenseService(userId: string) {
  const expensesAll = await prismaClient.expense.findMany({
    // Busca todas as despesas do usuário pelo ID
    where: {
      userId,
    },
    // Ordena as despesas pela data de vencimento em ordem menor para maior
    orderBy: {
      dueDate: "asc",
    },
  });
  return expensesAll;
}
