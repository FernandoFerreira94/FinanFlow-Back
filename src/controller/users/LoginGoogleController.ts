import { Request, Response } from "express";
import LoginGoogleService from "../../services/users/LoginGoogleService";

export default async function loginGoogleController(
  req: Request,
  res: Response
) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Token do Google é obrigatório" });
    }

    const userData = await LoginGoogleService({ credential });

    return res.json(userData);
  } catch (error: any) {
    console.error("Erro no login Google:", error);
    return res.status(500).json({ message: error.message || "Erro interno" });
  }
}
