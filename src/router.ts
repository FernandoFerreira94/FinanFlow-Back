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

// EXPENSE
import CreateExpenseController from "./controller/expense/CreateExpenseController";
import GetAllExpenseController from "./controller/expense/GetAllExpenseController";
import GetExpensesByMonthController from "./controller/expense/GetExpenseByMounthController";
import GetPaidExpenseController from "./controller/expense/GetPaidExpenseController";
import GetUnpaidExpenseController from "./controller/expense/GetUnpaidExpenseController";
import RemoveExpenseController from "./controller/expense/RemoveExpenseController";
import UpdadedExpensePaidController from "./controller/expense/UpdatedExpensePaidController";

// NOTIFICATION
import CreateNotificationController from "./controller/notification/CreateNotificationController";
import GetNotificationController from "./controller/notification/GetNotificationController";
import UpdatedNotificationController from "./controller/notification/UpdatedNotificationController";
import RemoveNotificationController from "./controller/notification/RemoveNotificationController";

const router = Router();

//****ROUTER USERS****

//  USERS POST
router.post("/users", CreateUserController);
router.post("/session", AuthUserController);

//  USERS GET
router.get("/user", isAuthenticated, DetailUserController);

//  USERS PUT
router.put("/update/password", isAuthenticated, UpdatedPasswordUserController);
router.put("/update/name", isAuthenticated, UpdatedNameController);

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

//  EXPENSES PUT
router.put(
  "/update/expense/:expenseId",
  isAuthenticated,
  UpdadedExpensePaidController
);

//  EXPENSES DELETE
router.delete("/expense/:expenseId", isAuthenticated, RemoveExpenseController);

//****ROUTER NOTIFICATION****

//  NOTIFICATION POST
router.post("/notification", isAuthenticated, CreateNotificationController);

//  NOTIFICATION GET
router.get("/notification", isAuthenticated, GetNotificationController);

//  NOTIFICATION PUT
router.put("/notification", isAuthenticated, UpdatedNotificationController);

// NOTIFICATION DELETE
router.delete(
  "/notification/:notificationId",
  isAuthenticated,
  RemoveNotificationController
);
export { router };
