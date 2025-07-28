import { Request, Response } from "express";

import CreateUserService from "../../services/users/CreateUserService";

export default async function CreateUserController(
  req: Request,
  res: Response
) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Todos os campos são obrigatorios" });
    return;
  }

  try {
    const creteUser = await CreateUserService({ name, email, password });

    res.json(creteUser);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Erro interno no servidor" });
    return;
  }
}
