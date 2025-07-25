import prismaClient from "../../prisma";

interface CreateNotificationServiceProps {
  userId: string;
  expenseId: string;
}

export default async function CreateNotificationService({
  userId,
  expenseId,
}: CreateNotificationServiceProps) {
  const notification = await prismaClient.notification.create({
    data: {
      userId,
      expenseId,
    },
  });

  return notification;
}
