# PayFlow 💳

Plataforma de gestão de assinaturas full stack — do cadastro ao pagamento recorrente.

🔗 **Demo ao vivo:** [payflow-teal-seven.vercel.app](https://payflow-teal-seven.vercel.app)

---

## Sobre o projeto

PayFlow é uma plataforma SaaS de assinaturas construída do zero com arquitetura de microserviços. O projeto foi desenvolvido para demonstrar integração real com gateway de pagamento, autenticação segura, múltiplas linguagens e deploy em produção com pipeline automatizado.

---

## Screenshots

### Tela de Login
![Login](assets/login.png)

### Tela de Cadastro
![Cadastro](assets/cadastro.png)

### Dashboard — Planos de Assinatura
![Dashboard](assets/plano.png)

### Checkout Stripe
![Checkout](assets/checkout.png)

---

## Tecnologias

### Frontend
- Angular 21 + TypeScript
- SCSS com animações e responsividade mobile

### Backend
- Node.js + Express (API Gateway)
- C# + .NET 10 (Payment Service)

### Banco de Dados
- MongoDB (usuários e sessões)
- PostgreSQL (transações financeiras)

### Pagamentos
- Stripe — checkout de assinaturas recorrentes com webhooks

### Infraestrutura
- Docker + Docker Compose
- CI/CD com GitHub Actions
- Deploy: Vercel (frontend) + Railway (backend + bancos)

---

## Arquitetura
payflow/
├── frontend/          ← Angular + TypeScript
├── api-gateway/       ← Node.js + Express
├── payment-service/   ← C# + .NET 10
├── notification-service/
├── docker-compose.yml
└── .github/workflows/ci.yml

---

## Funcionalidades

- Cadastro com validação de senha (mínimo 6 caracteres, letra e caractere especial)
- Login com autenticação JWT
- Dashboard com planos Free, Pro e Enterprise
- Checkout de assinatura recorrente via Stripe
- Proteção de rotas — usuário sem token é redirecionado para login
- CI/CD — testes rodam automaticamente a cada push

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker Desktop
- Angular CLI (`npm install -g @angular/cli`)
- .NET 10 SDK

### 1. Clone o repositório
```bash
git clone https://github.com/LuuckySilva/Payflow
cd Payflow
```

### 2. Suba os bancos de dados
```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente
```bash
cp api-gateway/.env.example api-gateway/.env
# Preencha as variáveis no .env
```

### 4. Inicie o API Gateway
```bash
cd api-gateway
npm install
npm run dev
```

### 5. Inicie o Payment Service
```bash
cd payment-service/PaymentService
dotnet run
```

### 6. Inicie o Frontend
```bash
cd frontend/payflow-frontend
npm install
ng serve
```

Acesse: http://localhost:4200

---

## Variáveis de ambiente

```env
PORT=3000
MONGODB_URI=mongodb://admin:senha@localhost:27017/payflow?authSource=admin
POSTGRES_URI=postgresql://admin:senha@localhost:5432/payflow
JWT_SECRET=sua_chave_secreta
STRIPE_SECRET_KEY=sk_test_sua_chave
STRIPE_WEBHOOK_SECRET=whsec_sua_chave
```

---

## Testes

```bash
# API Gateway
cd api-gateway
npm test

# Payment Service
cd payment-service/PaymentService
dotnet test
```

O pipeline de CI roda automaticamente no GitHub Actions a cada push na branch main.

---

## Autor

**Lucas Silva**
- LinkedIn: [linkedin.com/in/olucas-silvaa](https://linkedin.com/in/olucas-silvaa)
- GitHub: [github.com/LuuckySilva](https://github.com/LuuckySilva)