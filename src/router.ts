import { Router } from "express";

// MIDDLEWARE
import { isAuthenticated } from "./middleware/isAuthenticated";

// USER
import CreateUserController from "./controller/users/CreateUserController";
import AuthUserController from "./controller/users/AuthUserController";
import DetailUserController from "./controller/users/DetailUserController";

// EXPENSE
import CreateExpenseController from "./controller/expense/CreateExpenseController";
import GetAllExpenseController from "./controller/expense/GetAllExpenseController";
import GetExpensesByMonthController from "./controller/expense/GetExpenseByMounthController";
import GetPaidExpenseController from "./controller/expense/GetPaidExpenseController";
import GetUnpaidExpenseController from "./controller/expense/GetUnpaidExpenseController";
import RemoveExpenseController from "./controller/expense/RemoveExpenseController";
import UpdadeExpensePaidController from "./controller/expense/UpdadeExpensePaidController";

const router = Router();

// ROUTES USERS
router.post("/users", CreateUserController);
router.post("/session", AuthUserController);
router.get("/user", isAuthenticated, DetailUserController);

// ROUTES EXPENSES POST
router.post("/expense", isAuthenticated, CreateExpenseController);
// ROUTES EXPENSES GET
router.get("/all/:userId", isAuthenticated, GetAllExpenseController);
router.get("/paid/:userId", isAuthenticated, GetPaidExpenseController);
router.get("/unpaid/:userId", isAuthenticated, GetUnpaidExpenseController);
router.get(
  "/expense/:userId/:month/:year",
  isAuthenticated,
  GetExpensesByMonthController
);
router.delete("/expense/:expenseId", isAuthenticated, RemoveExpenseController);
router.put(
  "/update/expense/:expenseId/paid",
  isAuthenticated,
  UpdadeExpensePaidController
);

export { router };
