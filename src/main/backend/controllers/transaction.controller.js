const transactionService = require('../services/transaction.service');

async function createTransaction(payload) {
  try {
    const tx = transactionService.createTransaction(payload);
    return {
      success: true,
      data: tx,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

async function listTransactions(limit) {
  try {
    const data = transactionService.listTransactions(limit);
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

module.exports = {
  createTransaction,
  listTransactions,
};
