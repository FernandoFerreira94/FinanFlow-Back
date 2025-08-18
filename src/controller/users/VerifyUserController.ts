import { Response, Request } from "express";

import VerifyUserService from "../../services/users/VerifyUserService";

export default async function VerifyUserController(
  req: Request,
  res: Response
) {
  const { name, email } = req.body;

  try {
    const user = await VerifyUserService({ name, email });

    if (!user) {
      return res.status(400).json({ error: "Usuário nao encontrado" });
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
}
