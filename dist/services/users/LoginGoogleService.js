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
exports.default = LoginGoogleService;
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
function LoginGoogleService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ credential, }) {
        const decoded = jsonwebtoken_2.default.decode(credential);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
            throw new Error("Token Google inválido");
        }
        const email = decoded.email;
        const name = decoded.name || "Usuário Google";
        // Verifica se usuário existe no banco pelo email
        let user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        // Se não existir, cria um novo usuário
        if (!user) {
            user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: "#", // ou algum campo opcional, pois login google não usa senha no seu backend
                },
            });
        }
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "30d",
        });
        return {
            token,
            id: user.id,
            name: user.name,
            email: user.email,
        };
    });
}
