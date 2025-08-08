"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// MIDDLEWARE
const isAuthenticated_1 = require("./middleware/isAuthenticated");
// USER
const CreateUserController_1 = __importDefault(require("./controller/users/CreateUserController"));
const AuthUserController_1 = __importDefault(require("./controller/users/AuthUserController"));
const DetailUserController_1 = __importDefault(require("./controller/users/DetailUserController"));
const UpdatedPasswordUserController_1 = __importDefault(require("./controller/users/UpdatedPasswordUserController"));
const UpdatedNameController_1 = __importDefault(require("./controller/users/UpdatedNameController"));
const RemoveUserController_1 = __importDefault(require("./controller/users/RemoveUserController"));
const LoginGoogleController_1 = __importDefault(require("./controller/users/LoginGoogleController"));
// EXPENSE
const CreateExpenseController_1 = __importDefault(require("./controller/expense/CreateExpenseController"));
const GetAllExpenseController_1 = __importDefault(require("./controller/expense/GetAllExpenseController"));
const GetExpenseByMounthController_1 = __importDefault(require("./controller/expense/GetExpenseByMounthController"));
const GetPaidExpenseController_1 = __importDefault(require("./controller/expense/GetPaidExpenseController"));
const GetUnpaidExpenseController_1 = __importDefault(require("./controller/expense/GetUnpaidExpenseController"));
const RemoveExpenseController_1 = __importDefault(require("./controller/expense/RemoveExpenseController"));
const UpdatedExpensePaidController_1 = __importDefault(require("./controller/expense/UpdatedExpensePaidController"));
const GetPantryExpenseController_1 = __importDefault(require("./controller/expense/GetPantryExpenseController"));
const UpdateReadExpenseController_1 = __importDefault(require("./controller/expense/UpdateReadExpenseController"));
const router = (0, express_1.Router)();
exports.router = router;
//****ROUTER USERS****
//  USERS POST
router.post("/users", CreateUserController_1.default);
router.post("/session", AuthUserController_1.default);
router.post("/auth/google", LoginGoogleController_1.default);
//  USERS GET
router.get("/user", isAuthenticated_1.isAuthenticated, DetailUserController_1.default);
//  USERS PUT
router.put("/update/password", isAuthenticated_1.isAuthenticated, UpdatedPasswordUserController_1.default);
router.put("/update/name", isAuthenticated_1.isAuthenticated, UpdatedNameController_1.default);
// USERS DELETE
router.delete("/user/delete/:userId", isAuthenticated_1.isAuthenticated, RemoveUserController_1.default);
//****ROUTER EXPENSES****
//  EXPENSES POST
router.post("/expense", isAuthenticated_1.isAuthenticated, CreateExpenseController_1.default);
//  EXPENSES GET
router.get("/all/:userId", isAuthenticated_1.isAuthenticated, GetAllExpenseController_1.default);
router.get("/paid/:userId", isAuthenticated_1.isAuthenticated, GetPaidExpenseController_1.default);
router.get("/unpaid/:userId", isAuthenticated_1.isAuthenticated, GetUnpaidExpenseController_1.default);
router.get("/month/:month/:year/:userId", isAuthenticated_1.isAuthenticated, GetExpenseByMounthController_1.default);
router.get("/notification/:userId", isAuthenticated_1.isAuthenticated, GetPantryExpenseController_1.default);
//  EXPENSES PUT
router.put("/update/expense/:expenseId", isAuthenticated_1.isAuthenticated, UpdatedExpensePaidController_1.default);
router.put("/update/read/:userId/:expenseId", isAuthenticated_1.isAuthenticated, UpdateReadExpenseController_1.default);
//  EXPENSES DELETE
router.delete("/expense/:expenseId", isAuthenticated_1.isAuthenticated, RemoveExpenseController_1.default);
