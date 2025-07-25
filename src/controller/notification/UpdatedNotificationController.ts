import { Request, Response } from "express";

import UpdatedNotificationservice from "../../services/notification/UpdatedNotificationService";

export default async function UpdatedNotificationController(
  req: Request,
  res: Response
) {
  const { notificationId } = req.body;

  if (!notificationId) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  try {
    const notification = await UpdatedNotificationservice(notificationId);
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification" });
  }
}