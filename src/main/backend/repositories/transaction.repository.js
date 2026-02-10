const db = require('../database/sqlite');

function insertTransaction(tx) {
  const stmt = db.prepare(`
    INSERT INTO transactions (
      id,
      invoice_number,
      total_amount,
      payment_method,
      items,
      status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    tx.id,
    tx.invoiceNumber,
    tx.totalAmount,
    tx.paymentMethod,
    JSON.stringify(tx.items),
    tx.status,
    tx.createdAt
  );
}

function getRecentTransactions(limit = 50) {
  const stmt = db.prepare(`
    SELECT
      id,
      invoice_number,
      total_amount,
      payment_method,
      items,
      status,
      created_at,
      synced_at
    FROM transactions
    ORDER BY created_at DESC
    LIMIT ?
  `);

  const rows = stmt.all(limit);

  return rows.map(row => ({
    ...row,
    items: JSON.parse(row.items),
  }));
}

function getPendingTransactions(limit = 20) {
  const stmt = db.prepare(`
    SELECT
      id,
      invoice_number,
      total_amount,
      payment_method,
      items,
      status,
      created_at
    FROM transactions
    WHERE status = 'pending'
    ORDER BY created_at ASC
    LIMIT ?
  `);

  const rows = stmt.all(limit);

  return rows.map(row => ({
    ...row,
    items: JSON.parse(row.items),
  }));
}

function markTransactionSynced(id) {
  db.prepare(`
    UPDATE transactions
    SET status = 'synced', synced_at = ?
    WHERE id = ?
  `).run(Date.now(), id);
}

function deleteOldSyncedTransactions(olderThanDays = 30) {
  const threshold = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;

  const result = db.prepare(`
    DELETE FROM transactions
    WHERE status = 'synced'
      AND created_at < ?
  `).run(threshold);

  return result.changes;
}


module.exports = {
  insertTransaction,
  getRecentTransactions,
  getPendingTransactions,
  markTransactionSynced,
  deleteOldSyncedTransactions,
};