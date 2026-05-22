const transactionService = require(
  "../services/transaction.service"
);

const sendResponse = require(
  "../utils/response"
);

const getTransactions = async (
  req,
  res,
  next
) => {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const type =
      req.query.type || null;

    const result =
      await transactionService.getTransactions(
        req.user.id,
        page,
        limit,
        type
      );

    return sendResponse(
      res,
      200,
      true,
      "Transactions fetched successfully",
      result
    );

  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (
  req,
  res,
  next
) => {
  try {

    const transaction =
      await transactionService.getTransactionById(
        req.user.id,
        req.params.id
      );

    return sendResponse(
      res,
      200,
      true,
      "Transaction fetched successfully",
      transaction
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  getTransactionById
};