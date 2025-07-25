import prismaClient from "../../prisma";

interface UpdateProps {
  expenseId: string;
  paid: boolean;
}

export default async function UpdatedExpensePaidService({
  expenseId,
  paid,
}: UpdateProps) {
  const expensePaid = await prismaClient.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      paid,
    },
  });

  return expensePaid;
}
