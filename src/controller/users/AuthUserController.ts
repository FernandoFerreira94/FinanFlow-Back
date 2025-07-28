import { Request, Response } from "express";

import AuthUserService from "../../services/users/AuthUserService";

export default async function AuthUserController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Todos os campos são obrigatorios" });
    return;
  }

  try {
    const authUser = await AuthUserService({ email, password });
    return res.json(authUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
