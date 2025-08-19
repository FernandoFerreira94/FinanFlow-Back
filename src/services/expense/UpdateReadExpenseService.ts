import prismaClient from "../../prisma";

interface UpdateProps {
  expenseId: string;
 
}

export default async function UpdateReadExpenseService({
  expenseId,
}: UpdateProps) {
  const expensePaid = await prismaClient.expense.update({
    where: {
      id: expenseId,
    
    },
    data: {
      read: true,
    },
  });

  return expensePaid;
}
