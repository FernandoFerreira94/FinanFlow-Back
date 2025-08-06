import { Request, Response } from "express";

import CreateExpenseService from "../../services/expense/CreateExpenseService";

export default async function CreateExpenseController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      amount,
      dueDate,
      type,
      userId,
      installments,
      paymentDate,
      paid,
      purchaseDate, // <--- ADICIONAR AQUI
    } = req.body;

    const expense = await CreateExpenseService({
      name,
      amount,
      dueDate,
      type,
      userId,
      installments,
      paymentDate,
      paid,
      purchaseDate, // <--- E AQUI
    });

    return res.status(201).json(expense);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
