# 💰 Finan Flow - Backend

API RESTful para controle de finanças pessoais desenvolvida com **Node.js**, **Express**, **Prisma** e **PostgreSQL**.  
Este backend foi criado para servir um painel de finanças onde o usuário pode gerenciar suas despesas (fixas, à vista e parceladas).

---

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (autenticação)
- Dotenv

---

## ✅ Funcionalidades já implementadas

### 👤 Usuário
- [x] Cadastro de usuário (`POST /users`)
- [x] Login com geração de token JWT (`POST /session`)
- [x] Middleware de autenticação (`isAuthenticated`)
- [x] Rota protegida para detalhes do usuário (`GET /me`)

### 💸 Despesas (em andamento)
- [ ] Cadastro de despesas (fixas, parceladas, à vista)
- [ ] Listagem e filtros por mês/categoria
- [ ] Dashboard com resumo de gastos

---

## 🔐 Autenticação

- As rotas protegidas usam **JWT**.
- O token é enviado via `Authorization: Bearer <token>`.
- O middleware `isAuthenticated` extrai o ID do usuário do token e injeta em `req.user_id`.


