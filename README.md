# WalletX Backend

A secure digital wallet backend built using Node.js, Express.js, PostgreSQL, Sequelize ORM, JWT Authentication, Google OAuth, and Twilio OTP verification.

---

# Features

- Mobile OTP Authentication
- Google OAuth Login
- JWT Authentication
- Wallet Management
- Add Money
- Withdraw Money
- Transaction History
- Passbook System
- User Profile Management
- Protected APIs
- Twilio SMS OTP
- Sequelize ORM
- PostgreSQL Database

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- Passport.js
- Google OAuth 2.0
- Twilio Verify API
- dotenv
- Helmet
- CORS

---

# Project Structure

```bash
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
│
server.js
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/musthamirzu/wallet-backend.git
```

## Navigate

```bash
cd wallet-backend
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env`

```env
PORT=5006

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5006/api/auth/google/callback

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_VERIFY_SERVICE_SID=
```

---

# Run Project

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# Authentication Flow

## Mobile OTP

1. User enters mobile number
2. Twilio sends OTP
3. User verifies OTP
4. JWT token generated

---

## Google OAuth

1. User clicks Continue with Google
2. Google Authentication
3. Backend validates user
4. JWT token generated
5. Redirect to frontend

---

# API Endpoints

## Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Send OTP |
| POST | `/api/auth/verify-otp` | Verify OTP |
| GET | `/api/auth/google` | Google OAuth |

---

## User

| Method | Endpoint |
|--------|----------|
| GET | `/api/users/profile` |
| PUT | `/api/users/profile` |

---

## Wallet

| Method | Endpoint |
|--------|----------|
| GET | `/api/wallet` |
| POST | `/api/wallet/add-money` |
| POST | `/api/wallet/withdraw` |

---

## Transactions

| Method | Endpoint |
|--------|----------|
| GET | `/api/transactions` |

---

# Security

- JWT Protected Routes
- Environment Variables
- Helmet Security
- Input Validation
- Protected Secrets

---

# Future Improvements

- Razorpay Integration
- UPI Payments
- Wallet Transfer
- Notifications
- Admin Dashboard
- Analytics

---

# Author

Musthafa Abbas
