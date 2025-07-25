import { Request, Response } from "express";

import UpdadeExpensePaidService from "../../services/expense/UpdadeExpensePaidService";

export default async function EditExpensePaidController(
  req: Request,
  res: Response
) {
  try {
    const { expenseId } = req.params;
    const { paid } = req.body;

    if (typeof paid !== "boolean") {
      return res.status(400).json({ error: "Invalid paid status" });
    }

    const updateExpense = await UpdadeExpensePaidService({ expenseId, paid });

    return res.status(200).json(updateExpense);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
