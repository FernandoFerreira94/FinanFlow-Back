import prismaClient from "../../prisma";

export default async function RemoveExpenseService(expenseId: string) {
  const expenseRemove = await prismaClient.expense.delete({
    where: {
      id: expenseId,
    },
  });
  return expenseRemove;
}
