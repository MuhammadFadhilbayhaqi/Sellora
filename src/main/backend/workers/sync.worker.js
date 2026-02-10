const syncService = require('../services/sync.service');

let intervalId = null;
let retryDelay = 60_000; // mulai 1 menit
const MAX_DELAY = 10 * 60_000; // max 10 menit

function startSyncWorker() {
  if (intervalId) return;

  console.log('[SYNC] Worker started');

  const run = async () => {
    try {
      console.log('[SYNC] Tick started');

      await syncService.syncPendingTransactions();
      syncService.cleanupOldTransactions();

      console.log('[SYNC] Tick finished');

      // ✅ jika sukses → reset delay
      retryDelay = 60_000;
    } catch (err) {
      console.error('[SYNC] Worker error:', err.message);

      // ❌ gagal → backoff
      retryDelay = Math.min(retryDelay * 2, MAX_DELAY);
      console.log(`[SYNC] Backoff to ${retryDelay / 1000}s`);
    } finally {
      console.log(`[SYNC] Next run in ${retryDelay / 1000}s`);
      intervalId = setTimeout(run, retryDelay);
    }
  };

  run();
}

module.exports = {
  startSyncWorker,
};

