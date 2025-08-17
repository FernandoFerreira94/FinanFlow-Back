# 💰 Finan Flow - Backend

API RESTful robusta para controle de finanças pessoais, desenvolvida com **Node.js**, **Express**, **Prisma** e **PostgreSQL**.  
Permite a gestão completa de despesas (fixas, à vista e parceladas), autenticação via JWT e login social Google para uma experiência fluida e segura.

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

## ✅ Funcionalidades implementadas

### 👤 Usuário
- [x] Cadastro de usuário (`POST /users`)  
- [x] Login com geração de token JWT (`POST /session`)  
- [x] Middleware de autenticação (`isAuthenticated`)  
- [x] Rota protegida para detalhes do usuário (`GET /me`)  
- [x] Atualização de perfil e senha (`PUT /users/:id`)  

### 💸 Despesas
- [x] Cadastro completo de despesas (fixas, parceladas e à vista) (`POST /expenses`)  
- [x] Listagem, filtros e paginação por mês, categoria, status (pagas, atrasadas, pendentes) e nome (`GET /expenses`)  
- [x] Atualização e exclusão de despesas (`PUT /expenses/:id`, `DELETE /expenses/:id`)  
- [x] Notificações automáticas para despesas atrasadas (`GET /notifications`)  

---

## 🔐 Autenticação

- Rotas protegidas via **JWT**, com token enviado no cabeçalho `Authorization: Bearer <token>`.  
- Middleware `isAuthenticated` extrai ID do usuário do token para segurança e controle de acesso.  

### Login Social via Google

- Endpoint dedicado para login via Google (`POST /session/google`).  
- Validação do token Google com API oficial, criação ou recuperação do usuário no banco.  
- Geração de token JWT para uso nas rotas protegidas.  

> Login simplificado com Google melhora a experiência do usuário e acelera o acesso.
