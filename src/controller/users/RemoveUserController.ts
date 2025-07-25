import { Request, Response } from "express";

import RemoveUserService from "../../services/users/RemoveUserService";

export default async function RemoveUserController(
  req: Request,
  res: Response
) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const removedUser = await RemoveUserService(userId);
    return res.status(200).json({
      message: "User removed successfully",
      user: removedUser,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
