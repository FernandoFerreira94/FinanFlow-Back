import { Request, Response } from "express";
import GetExpenseByMounthService from "../../services/expense/GetExpenseByMonthService";

export default async function GetExpensesByMonthController(
  req: Request,
  res: Response
) {
  try {
    const userId = req.params.userId;
    const month = Number(req.params.month);
    const year = Number(req.params.year);

    if (!userId || !month || !year) {
      return res
        .status(400)
        .json({ error: "User ID, month and year are required." });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({ error: "Month must be between 1 and 12." });
    }

    const expenses = await GetExpenseByMounthService({ userId, month, year });
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Error getting expenses by month:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
