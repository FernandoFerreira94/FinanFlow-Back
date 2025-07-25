import { Request, Response } from "express";
import GetPaidExpenseService from "../../services/expense/GetPaidExpenseService";

export default async function GetPaidExpensesController(
  req: Request,
  res: Response
) {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required." });

    const expensesPaid = await GetPaidExpenseService(userId);
    return res.status(200).json(expensesPaid);
  } catch (error) {
    console.error("Error getting paid expenses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
