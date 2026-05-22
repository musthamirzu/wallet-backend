const express = require("express");

const router = express.Router();

const walletController = require(
  "../controllers/wallet.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const validate = require(
  "../middlewares/validate.middleware"
);

const {
  amountValidation
} = require(
  "../validations/wallet.validation"
);

router.get(
  "/",
  authMiddleware,
  walletController.getWallet
);

router.post(
  "/add-money",
  authMiddleware,
  validate(amountValidation),
  walletController.addMoney
);

router.post(
  "/withdraw",
  authMiddleware,
  validate(amountValidation),
  walletController.withdrawMoney
);

module.exports = router;