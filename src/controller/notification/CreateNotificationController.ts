import { Request, Response } from "express";

import CreateNotificationService from "../../services/notification/CreateNotificationService";

export default async function CreateNotificationController(
  req: Request,
  res: Response
) {
  const userId = req.user_id;

  const { expenseId } = req.body;

  if (!expenseId) {
    return res.status(400).json({ error: "Expense ID is required" });
  }

  try {
    const notification = await CreateNotificationService({
      userId,
      expenseId,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
}
