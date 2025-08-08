"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loginGoogleController;
const LoginGoogleService_1 = __importDefault(require("../../services/users/LoginGoogleService"));
function loginGoogleController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { credential } = req.body;
            if (!credential) {
                return res.status(400).json({ message: "Token do Google é obrigatório" });
            }
            const userData = yield (0, LoginGoogleService_1.default)({ credential });
            return res.json(userData);
        }
        catch (error) {
            console.error("Erro no login Google:", error);
            return res.status(500).json({ message: error.message || "Erro interno" });
        }
    });
}
