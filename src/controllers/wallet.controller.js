const walletService = require("../services/wallet.service");

const sendResponse = require("../utils/response");

const getWallet = async (req, res, next) => {
  try {

    const wallet =
      await walletService.getWallet(req.user.id);

    return sendResponse(
      res,
      200,
      true,
      "Wallet fetched successfully",
      wallet
    );

  } catch (error) {
    next(error);
  }
};

const addMoney = async (req, res, next) => {
  try {

    const { amount } = req.body;

    const wallet =
      await walletService.addMoney(
        req.user.id,
        amount
      );

    return sendResponse(
      res,
      200,
      true,
      "Money added successfully",
      wallet
    );

  } catch (error) {
    next(error);
  }
};

const withdrawMoney = async (req, res, next) => {
  try {

    const { amount } = req.body;

    const wallet =
      await walletService.withdrawMoney(
        req.user.id,
        amount
      );

    return sendResponse(
      res,
      200,
      true,
      "Money withdrawn successfully",
      wallet
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWallet,
  addMoney,
  withdrawMoney
};