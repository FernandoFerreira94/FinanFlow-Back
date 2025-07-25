import prismaClient from "../../prisma";

export default async function RemoveNotificationService(
  notificationId: string
) {
  try {
    const notification = await prismaClient.notification.delete({
      where: {
        id: notificationId,
      },
    });
    return notification;
  } catch (error) {
    throw new Error("Failed to remove notification");
  }
}
