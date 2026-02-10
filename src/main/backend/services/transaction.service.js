const crypto = require('crypto');
const transactionRepository = require('../repositories/transaction.repository');

function createTransaction(payload) {
  if (payload.totalAmount <= 0) {
    throw new Error('Total amount must be greater than zero');
  }

  const transaction = {
    id: crypto.randomUUID(),
    invoiceNumber: `INV-${Date.now()}`,
    totalAmount: payload.totalAmount,
    paymentMethod: payload.paymentMethod,
    items: payload.items,
    status: 'pending',
    createdAt: Date.now(),
  };

  transactionRepository.insertTransaction(transaction);

  return transaction;
}

function listTransactions(limit) {
  return transactionRepository.getRecentTransactions(limit);
}

module.exports = {
  createTransaction,
  listTransactions,
};
