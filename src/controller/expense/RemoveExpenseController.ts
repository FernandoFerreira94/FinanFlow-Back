import { Request, Response } from "express";

import RemoveExpenseService from "../../services/expense/RemoveExpenseService";

export default async function RemoveExpenseController(
  req: Request,
  res: Response
) {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      return res.status(400).json({ error: "Expense ID is required." });
    }

    const removeExpense = await RemoveExpenseService(expenseId);

    return res.status(200).json({
      message: "Expense removed successfully.",
      expense: removeExpense,
    });
  } catch (error) {
    console.error("Error removing expense:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
