const supabase = require('../database/supabase');

async function upsertTransaction(tx) {
  const { error } = await supabase
    .from('transactions')
    .upsert({
      id: tx.id,
      invoice_number: tx.invoice_number,
      total_amount: tx.total_amount,
      payment_method: tx.payment_method,
      items: tx.items,
      status: tx.status,
      created_at: tx.created_at,
      synced_at: Date.now(),
    });

  if (error) {
    throw error;
  }
}

module.exports = {
  upsertTransaction,
};