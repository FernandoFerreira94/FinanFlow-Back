import { Request, Response } from "express";

import RemoveNotificationService from "../../services/notification/RemoveNotificationService";

export default async function RemoveNotificationController(
  req: Request,
  res: Response
) {
  const { notificationId } = req.params;

  if (!notificationId) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  try {
    const notification = await RemoveNotificationService(notificationId);
    res.status(200).json({
      message: "Notification removed successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove notification" });
  }
}
