
const db = require('../database/sqlite');

const getAll = () => {
    return db.prepare('SELECT * FROM satuan ORDER BY nama ASC').all();
};

const getById = (id) => {
    return db.prepare('SELECT * FROM satuan WHERE satuan_id = ?').get(id);
};

const create = (data) => {
    const { nama } = data;
    const info = db.prepare('INSERT INTO satuan (nama) VALUES (?)').run(nama);
    return { id: info.lastInsertRowid, ...data };
};

const update = (id, data) => {
    const { nama } = data;
    const info = db.prepare('UPDATE satuan SET nama = ? WHERE satuan_id = ?').run(nama, id);
    return info.changes > 0;
};

const remove = (id) => {
    const info = db.prepare('DELETE FROM satuan WHERE satuan_id = ?').run(id);
    return info.changes > 0;
};

module.exports = { getAll, getById, create, update, remove };
