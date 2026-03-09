
const db = require('../database/sqlite');

const getAll = () => {
    return db.prepare(`
        SELECT p.*, k.nama as kategori_nama, s.nama as satuan_nama 
        FROM produk p
        LEFT JOIN kategori k ON p.kategori_id = k.kategori_id
        LEFT JOIN satuan s ON p.satuan_id = s.satuan_id
        ORDER BY p.nama ASC
    `).all();
};

const getById = (id) => {
    return db.prepare(`
        SELECT p.*, k.nama as kategori_nama, s.nama as satuan_nama 
        FROM produk p
        LEFT JOIN kategori k ON p.kategori_id = k.kategori_id
        LEFT JOIN satuan s ON p.satuan_id = s.satuan_id
        WHERE p.produk_id = ?
    `).get(id);
};

const create = (data) => {
    const { nama, kategori_id, satuan_id, harga_jual, harga_beli, pajak, status, deskripsi, stok } = data;
    const finalKategoriId = kategori_id === '' ? null : kategori_id;
    const finalSatuanId = satuan_id === '' ? null : satuan_id;

    console.log('Repo: create product', { ...data, kategori_id: finalKategoriId, satuan_id: finalSatuanId });

    const info = db.prepare(`
        INSERT INTO produk (nama, kategori_id, satuan_id, harga_jual, harga_beli, pajak, status, deskripsi, stok)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(nama, finalKategoriId, finalSatuanId, harga_jual, harga_beli, pajak, status || 'aktif', deskripsi, stok || 0);
    return { id: info.lastInsertRowid, ...data, kategori_id: finalKategoriId, satuan_id: finalSatuanId };
};

const update = (id, data) => {
    const { nama, kategori_id, satuan_id, harga_jual, harga_beli, pajak, status, deskripsi, stok } = data;
    const finalKategoriId = kategori_id === '' ? null : kategori_id;
    const finalSatuanId = satuan_id === '' ? null : satuan_id;

    const info = db.prepare(`
        UPDATE produk SET 
            nama = ?, kategori_id = ?, satuan_id = ?, harga_jual = ?, 
            harga_beli = ?, pajak = ?, status = ?, deskripsi = ?, stok = ?
        WHERE produk_id = ?
    `).run(nama, finalKategoriId, finalSatuanId, harga_jual, harga_beli, pajak, status, deskripsi, stok, id);
    return info.changes > 0;
};

const remove = (id) => {
    const info = db.prepare('DELETE FROM produk WHERE produk_id = ?').run(id);
    return info.changes > 0;
};

module.exports = { getAll, getById, create, update, remove };
