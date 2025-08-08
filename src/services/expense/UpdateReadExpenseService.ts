import prismaClient from "../../prisma";

interface UpdateProps {
  expenseId: string;
  userId: string;
}

export default async function UpdateReadExpenseService({
  expenseId,
  userId,
}: UpdateProps) {
  const expensePaid = await prismaClient.expense.update({
    where: {
      id: expenseId,
      userId: userId,
    },
    data: {
      read: true,
    },
  });

  return expensePaid;
}
