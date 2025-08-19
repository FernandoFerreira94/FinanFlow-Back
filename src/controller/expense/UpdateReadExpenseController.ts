import { Request, Response } from "express";
import UpdateReadExpenseService from "../../services/expense/UpdateReadExpenseService";

export default async function UpdateReadExpenseController(
  req: Request,
  res: Response
) {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      return res.status(400).json({ error: "Expense ID are required." });
    }

    const updateRead = await UpdateReadExpenseService({ expenseId });

    return res.status(200).json(updateRead);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
