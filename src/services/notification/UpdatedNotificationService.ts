import prismaClient from "../../prisma";

export default async function UpdatedNotificationservice(
  notificationId: string
) {
  const notification = await prismaClient.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
  return notification;
}
