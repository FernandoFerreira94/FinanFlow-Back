import e, { Request, Response } from "express";
import GetPantryExpenseService from "../../services/expense/GetPantryExpenseService";

export default async function GetPantryExpenseController(
  req: Request,
  res: Response
) {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required." });

    const pantryExpense = await GetPantryExpenseService(userId);
    return res.status(200).json(pantryExpense);
  } catch (error) {
    console.error("Error getting paid expenses:", error);
    return res.status(500).json({ error: error.message });
  }
}
