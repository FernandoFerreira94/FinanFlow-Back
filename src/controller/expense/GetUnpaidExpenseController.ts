import { Request, Response } from "express";
import GetUnpaidExpenseService from "../../services/expense/GetUnpaidExpenseService";

export default async function GetUnpaidExpenseController(
  req: Request,
  res: Response
) {
  try {
    // Passando Id do usuário como parâmetro
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required." });

    const expensesUnpaid = await GetUnpaidExpenseService(userId);
    return res.status(200).json(expensesUnpaid);
  } catch (error) {
    console.error("Error getting paid expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
