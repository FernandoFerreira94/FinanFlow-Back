import { Router } from "express";

// MIDDLEWARE
import { isAuthenticated } from "./middleware/isAuthenticated";

// USER
import CreateUserController from "./controller/users/CreateUserController";
import AuthUserController from "./controller/users/AuthUserController";
import DetailUserController from "./controller/users/DetailUserController";
import UpdatedPasswordUserController from "./controller/users/UpdatedPasswordUserController";
import UpdatedNameController from "./controller/users/UpdatedNameController";
import RemoveUserController from "./controller/users/RemoveUserController";
import LoginGoogleController from "./controller/users/LoginGoogleController";
import VerifyUserController from "./controller/users/VerifyUserController";
import ChangePasswordController from "./controller/users/ChangePasswordController";

// EXPENSE
import CreateExpenseController from "./controller/expense/CreateExpenseController";
import GetAllExpenseController from "./controller/expense/GetAllExpenseController";
import GetExpensesByMonthController from "./controller/expense/GetExpenseByMounthController";
import GetPaidExpenseController from "./controller/expense/GetPaidExpenseController";
import GetUnpaidExpenseController from "./controller/expense/GetUnpaidExpenseController";
import RemoveExpenseController from "./controller/expense/RemoveExpenseController";
import UpdadedExpensePaidController from "./controller/expense/UpdatedExpensePaidController";
import GetPantryExpenseController from "./controller/expense/GetPantryExpenseController";
import UpdateReadExpenseController from "./controller/expense/UpdateReadExpenseController";

const router = Router();

//****ROUTER USERS****

//  USERS POST
router.post("/users", CreateUserController);
router.post("/session", AuthUserController);
router.post("/auth/google", LoginGoogleController);

//  USERS GET
router.get("/user", isAuthenticated, DetailUserController);
router.post("/user/verifyuser", VerifyUserController);

//  USERS PUT
router.put("/update/password", isAuthenticated, UpdatedPasswordUserController);
router.put("/update/name", isAuthenticated, UpdatedNameController);
router.put("/update/changepassword/", ChangePasswordController);

// USERS DELETE
router.delete("/user/delete/:userId", isAuthenticated, RemoveUserController);

//****ROUTER EXPENSES****

//  EXPENSES POST
router.post("/expense", isAuthenticated, CreateExpenseController);

//  EXPENSES GET
router.get("/all/:userId", isAuthenticated, GetAllExpenseController);
router.get("/paid/:userId", isAuthenticated, GetPaidExpenseController);
router.get("/unpaid/:userId", isAuthenticated, GetUnpaidExpenseController);
router.get(
  "/month/:month/:year/:userId",
  isAuthenticated,
  GetExpensesByMonthController
);
router.get(
  "/notification/:userId",
  isAuthenticated,
  GetPantryExpenseController
);

//  EXPENSES PUT
router.put(
  "/update/expense/:expenseId",
  isAuthenticated,
  UpdadedExpensePaidController
);
router.put(
  "/update/read/:expenseId",
  isAuthenticated,
  UpdateReadExpenseController
);

//  EXPENSES DELETE
router.delete("/expense/:expenseId", isAuthenticated, RemoveExpenseController);

export { router };
