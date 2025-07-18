import { Router } from "express";

// MIDDLEWARE
import { isAuthenticated } from "./middleware/isAuthenticated";

// USER
import CreateUserController from "./controller/users/CreateUserController";
import AuthUserController from "./controller/users/AuthUserController";
import DetailUserController from "./controller/users/DetailUserController";

const router = Router();

// ROUTES USERS
router.post("/users", CreateUserController);
router.post("/session", AuthUserController);
router.get("/me", isAuthenticated, DetailUserController);

export { router };
