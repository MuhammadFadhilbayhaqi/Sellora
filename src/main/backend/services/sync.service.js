const transactionRepository = require('../repositories/transaction.repository');
const cloudRepository = require('../repositories/transaction.cloud.repository');

async function syncPendingTransactions() {
  const pending = transactionRepository.getPendingTransactions();

  if (pending.length === 0) {
    console.log('[SYNC] No pending transactions');
    return;
  }

  console.log(`[SYNC] Syncing ${pending.length} pending transactions`);

  let hadNetworkError = false;

  for (const tx of pending) {
    try {
      await cloudRepository.upsertTransaction(tx);
      transactionRepository.markTransactionSynced(tx.id);
      console.log('[SYNC] Synced transaction:', tx.id);
    } catch (err) {
      console.error('[SYNC] Failed to sync transaction:', tx.id, err.message);

      // 🔥 Tandai error sistemik
      if (
        err.message.includes('fetch failed') ||
        err.code === 'ECONNREFUSED'
      ) {
        hadNetworkError = true;
      }
    }
  }

  // 🔥 Trigger backoff di worker
  if (hadNetworkError) {
    throw new Error('NETWORK_ERROR');
  }
}

function cleanupOldTransactions() {
  const deleted = transactionRepository.deleteOldSyncedTransactions(30);

  if (deleted > 0) {
    console.log(`[SYNC] Cleaned ${deleted} old transactions`);
  } else {
    console.log('[SYNC] No old transactions to clean');
  }
}

module.exports = {
  syncPendingTransactions,
  cleanupOldTransactions,
};