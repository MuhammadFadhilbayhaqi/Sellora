
const db = require('../database/sqlite');

const getAll = () => {
    return db.prepare('SELECT * FROM supplier WHERE deleted_at IS NULL ORDER BY nama ASC').all();
};

const getById = (id) => {
    return db.prepare('SELECT * FROM supplier WHERE supplier_id = ? AND deleted_at IS NULL').get(id);
};

const create = (data) => {
    const { nama, kontak, alamat, email } = data;
    const now = Date.now();
    const info = db.prepare('INSERT INTO supplier (nama, kontak, alamat, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)').run(nama, kontak, alamat, email, now, now);
    return { id: info.lastInsertRowid, ...data, created_at: now, updated_at: now };
};

const update = (id, data) => {
    const { nama, kontak, alamat, email } = data;
    const now = Date.now();
    const info = db.prepare('UPDATE supplier SET nama = ?, kontak = ?, alamat = ?, email = ?, updated_at = ?, synced_at = NULL WHERE supplier_id = ?').run(nama, kontak, alamat, email, now, id);
    return info.changes > 0;
};

const remove = (id) => {
    const now = Date.now();
    const info = db.prepare('UPDATE supplier SET deleted_at = ?, updated_at = ?, synced_at = NULL WHERE supplier_id = ?').run(now, now, id);
    return info.changes > 0;
};

const getPendingSync = () => {
    return db.prepare('SELECT * FROM supplier WHERE synced_at IS NULL OR synced_at < updated_at').all();
};

const markSynced = (id) => {
    return db.prepare('UPDATE supplier SET synced_at = ? WHERE supplier_id = ?').run(Date.now(), id);
};

module.exports = { getAll, getById, create, update, remove, getPendingSync, markSynced };
