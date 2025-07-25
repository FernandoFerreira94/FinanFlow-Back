import { Request, Response } from "express";

import UpdatedNameService from "../../services/users/UpdatedNameService";

export default async function UpdatedNameController(
  req: Request,
  res: Response
) {
  const user_id = req.user_id;
  const { newName } = req.body;

  if (!user_id || !newName) {
    return res
      .status(400)
      .json({ error: "User ID and new name are required." });
  }

  try {
    const updatedName = await UpdatedNameService({
      userId: user_id,
      newName,
    });

    return res.status(200).json(updatedName);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
