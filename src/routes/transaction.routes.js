const express = require("express");

const router = express.Router();

const transactionController = require(
  "../controllers/transaction.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

router.get(
  "/",
  authMiddleware,
  transactionController.getTransactions
);

router.get(
  "/:id",
  authMiddleware,
  transactionController.getTransactionById
);

module.exports = router;