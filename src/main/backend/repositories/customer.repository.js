
const db = require('../database/sqlite');

const getAll = () => {
    return db.prepare('SELECT * FROM pelanggan ORDER BY nama ASC').all();
};

const getById = (id) => {
    return db.prepare('SELECT * FROM pelanggan WHERE pelanggan_id = ?').get(id);
};

const create = (data) => {
    const { nama, alamat, kontak, tipe } = data;
    const info = db.prepare('INSERT INTO pelanggan (nama, alamat, kontak, tipe) VALUES (?, ?, ?, ?)').run(nama, alamat, kontak, tipe || 'umum');
    return { id: info.lastInsertRowid, ...data };
};

const update = (id, data) => {
    const { nama, alamat, kontak, tipe } = data;
    const info = db.prepare('UPDATE pelanggan SET nama = ?, alamat = ?, kontak = ?, tipe = ? WHERE pelanggan_id = ?').run(nama, alamat, kontak, tipe, id);
    return info.changes > 0;
};

const remove = (id) => {
    const info = db.prepare('DELETE FROM pelanggan WHERE pelanggan_id = ?').run(id);
    return info.changes > 0;
};

module.exports = { getAll, getById, create, update, remove };
