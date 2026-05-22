const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/wallet.routes");
const transactionRoutes = require("./routes/transaction.routes");
const kycRoutes = require("./routes/kyc.routes");
const session = require(
  "express-session"
);

const passport = require(
  "./config/passport"
);
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/kyc", kycRoutes);
app.use(
  session({
    secret: "wallet_secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());
app.use(errorMiddleware);

module.exports = app;