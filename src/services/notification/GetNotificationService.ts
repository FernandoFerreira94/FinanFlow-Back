import prismaClient from "../../prisma";

export default async function GetNotificationService(userId: string) {
  const notifications = await prismaClient.notification.findMany({
    where: {
      userId,
    },
    include: {
      expense: true, // Include related expense data if needed
    },
    orderBy: {
      createdAt: "desc", // Order by creation date, most recent first
    },
  });
  return notifications;
}
