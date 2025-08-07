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
      paymentDate: paid ? new Date() : null,
    },
  });

  // Formatando a data se ela existir
  const formattedDate = expensePaid.paymentDate
    ? new Date(expensePaid.paymentDate).toLocaleDateString("pt-BR")
    : null;

  return {
    ...expensePaid,
    paymentDate: formattedDate,
  };
}
