import { Request, Response } from "express";

import UpdatedPasswordUserService from "../../services/users/UpdatedPasswordUserService";

export default async function UpdatedPasswordUserController(
  req: Request,
  res: Response
) {
  const user_id = req.user_id;

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Old password and new password are required" });
  }

  try {
    const updatePassword = await UpdatedPasswordUserService({
      userId: user_id,
      oldPassword,
      newPassword,
    });

    return res.json(updatePassword);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
