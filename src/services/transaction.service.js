const { Transaction, Wallet } = require("../models");

const getTransactions = async (
  userId,
  page = 1,
  limit = 10,
  type = null
) => {

  const offset = (page - 1) * limit;

  const wallet = await Wallet.findOne({
    where: {
      user_id: userId
    }
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const transactions =
    await Transaction.findAndCountAll({

      where: {
        wallet_id: wallet.id,

        ...(type && { type })
      },

      limit,
      offset,

      order: [["created_at", "DESC"]]
    });

  return {

    total: transactions.count,

    currentPage: page,

    totalPages: Math.ceil(
      transactions.count / limit
    ),

    transactions: transactions.rows
  };
};

const getTransactionById = async (
  userId,
  transactionId
) => {

  const wallet = await Wallet.findOne({
    where: {
      user_id: userId
    }
  });

  const transaction =
    await Transaction.findOne({

      where: {
        id: transactionId,
        wallet_id: wallet.id
      }
    });

  if (!transaction) {
    throw new Error(
      "Transaction not found"
    );
  }

  return transaction;
};

module.exports = {
  getTransactions,
  getTransactionById
};