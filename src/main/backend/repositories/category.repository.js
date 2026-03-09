
const db = require('../database/sqlite');

const getAll = () => {
    return db.prepare('SELECT * FROM kategori ORDER BY nama ASC').all();
};

const getById = (id) => {
    return db.prepare('SELECT * FROM kategori WHERE kategori_id = ?').get(id);
};

const create = (data) => {
    const { nama, deskripsi } = data;
    const info = db.prepare('INSERT INTO kategori (nama, deskripsi) VALUES (?, ?)').run(nama, deskripsi);
    return { id: info.lastInsertRowid, ...data };
};

const update = (id, data) => {
    const { nama, deskripsi } = data;
    const info = db.prepare('UPDATE kategori SET nama = ?, deskripsi = ? WHERE kategori_id = ?').run(nama, deskripsi, id);
    return info.changes > 0;
};

const remove = (id) => {
    const info = db.prepare('DELETE FROM kategori WHERE kategori_id = ?').run(id);
    return info.changes > 0;
};

module.exports = { getAll, getById, create, update, remove };
