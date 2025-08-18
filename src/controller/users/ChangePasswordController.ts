import { Request, Response } from "express";

import ChangePasswordService from "../../services/users/ChangePasswordService";

export default async function ChangePasswordController(
  req: Request,
  res: Response
) {
  const { newPassword, user_id } = req.body;

  if (!newPassword || !user_id) {
    return res
      .status(400)
      .json({ error: "New password and user ID are required" });
  }

  try {
    const updatePassword = await ChangePasswordService({
      userId: user_id,
      newPassword,
    });

    return res.json(updatePassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
