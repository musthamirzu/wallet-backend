const sequelize = require("../config/db");
const generateReference = require(
  "../utils/generateReferenceId"
);
const {
  Wallet,
  Transaction
} = require("../models");

const getWallet = async (userId) => {

  const wallet = await Wallet.findOne({
    where: {
      user_id: userId
    }
  });

  return wallet;
};

const addMoney = async (userId, amount) => {

  const dbTransaction = await sequelize.transaction();

  try {

    const wallet = await Wallet.findOne({
      where: {
        user_id: userId
      },
      transaction: dbTransaction
    });

    wallet.balance =
      parseFloat(wallet.balance) + amount;

    wallet.deposit_balance =
      parseFloat(wallet.deposit_balance) + amount;

    await wallet.save({
      transaction: dbTransaction
    });

    await Transaction.create(
      {
        wallet_id: wallet.id,
        reference_id:
      generateReference(),
        type: "CREDIT",
        amount,
        description: "Money added to wallet"
      },
      {
        transaction: dbTransaction
      }
    );

    await dbTransaction.commit();

    return wallet;

  } catch (error) {

    await dbTransaction.rollback();

    throw error;
  }
};

const withdrawMoney = async (userId, amount) => {

  const dbTransaction = await sequelize.transaction();

  try {

    const wallet = await Wallet.findOne({
      where: {
        user_id: userId
      },
      transaction: dbTransaction
    });

    if (parseFloat(wallet.balance) < amount) {
      throw new Error("Insufficient balance");
    }

    wallet.balance =
      parseFloat(wallet.balance) - amount;
    wallet.deposit_balance =
      parseFloat(wallet.deposit_balance) - amount;

    await wallet.save({
      transaction: dbTransaction
    });

    await Transaction.create(
      {
        wallet_id: wallet.id,
        reference_id:
        generateReference(),
        type: "WITHDRAW",
        amount,
        description: "Money withdrawn from wallet"
      },
      {
        transaction: dbTransaction
      }
    );

    await dbTransaction.commit();

    return wallet;

  } catch (error) {

    await dbTransaction.rollback();

    throw error;
  }
};

module.exports = {
  getWallet,
  addMoney,
  withdrawMoney
};