import { Request, Response } from "express";

import GetAllExpenseService from "../../services/expense/GetAllExpenseService";

export default async function GetAllExpenseController(
  req: Request,
  res: Response
) {
  try {
    // pegando o ID do usuário a partir dos parâmetros da requisição
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const expensesAll = await GetAllExpenseService(userId);
    
    return res.status(200).json(expensesAll);
  } catch (error) {
    console.error("Error fetching all expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
