import { Request, Response } from "express";

import DetailUserService from "../../services/users/DetailUserService";

export default async function DetailUserController(
  req: Request,
  res: Response
) {
  const user_id = req.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const user = await DetailUserService(user_id);
    return res.json(user);
  } catch (error) {
    return res.status(404).json({error: error.message });
  }
}
