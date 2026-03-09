
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import './Master.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        kategori_id: '',
        satuan_id: '',
        harga_jual: 0,
        harga_beli: 0,
        pajak: 0,
        status: 'aktif',
        deskripsi: '',
        stok: 0
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [productsData, categoriesData, unitsData] = await Promise.all([
                window.api.master.getProducts(),
                window.api.master.getCategories(),
                window.api.master.getUnits()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setUnits(unitsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await window.api.master.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(prod =>
        prod.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.kategori_nama && prod.kategori_nama.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleOpenModal = (product = null) => {
        if (product) {
            setCurrentProduct(product);
            setFormData({
                nama: product.nama,
                kategori_id: product.kategori_id || '',
                satuan_id: product.satuan_id || '',
                harga_jual: product.harga_jual || 0,
                harga_beli: product.harga_beli || 0,
                pajak: product.pajak || 0,
                status: product.status || 'aktif',
                deskripsi: product.deskripsi || '',
                stok: product.stok || 0
            });
        } else {
            setCurrentProduct(null);
            setFormData({
                nama: '',
                kategori_id: '',
                satuan_id: '',
                harga_jual: 0,
                harga_beli: 0,
                pajak: 0,
                status: 'aktif',
                deskripsi: '',
                stok: 0
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await window.api.master.updateProduct({ id: currentProduct.produk_id, ...formData });
            } else {
                await window.api.master.createProduct(formData);
            }
            fetchProducts();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Gagal menyimpan produk: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await window.api.master.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="master-page">
            <div className="page-header">
                <h2>Data Produk</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> Tambah Produk
                </button>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Harga Jual</th>
                                <th>Stok</th>
                                <th>Status</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((prod, index) => (
                                    <tr key={prod.produk_id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{prod.nama}</div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{prod.deskripsi}</div>
                                        </td>
                                        <td>{prod.kategori_nama || '-'}</td>
                                        <td>Rp {parseInt(prod.harga_jual).toLocaleString('id-ID')}</td>
                                        <td>
                                            {prod.stok} {prod.satuan_nama}
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                backgroundColor: prod.status === 'aktif' ? '#dcfce7' : '#f1f5f9',
                                                color: prod.status === 'aktif' ? '#166534' : '#64748b'
                                            }}>
                                                {prod.status}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button className="btn-icon edit" onClick={() => handleOpenModal(prod)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(prod.produk_id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty-state">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '700px' }}>
                        <h3>{currentProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="form-group">
                                    <label>Nama Produk</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kategori</label>
                                    <select name="kategori_id" value={formData.kategori_id} onChange={handleInputChange}>
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.kategori_id} value={cat.kategori_id}>{cat.nama}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Harga Beli</label>
                                    <input
                                        type="number"
                                        name="harga_beli"
                                        value={formData.harga_beli}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Harga Jual</label>
                                    <input
                                        type="number"
                                        name="harga_jual"
                                        value={formData.harga_jual}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Satuan</label>
                                    <select name="satuan_id" value={formData.satuan_id} onChange={handleInputChange}>
                                        <option value="">Pilih Satuan</option>
                                        {units.map(unit => (
                                            <option key={unit.satuan_id} value={unit.satuan_id}>{unit.nama}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Stok Awal</label>
                                    <input
                                        type="number"
                                        name="stok"
                                        value={formData.stok}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Pajak (%)</label>
                                    <input
                                        type="number"
                                        name="pajak"
                                        value={formData.pajak}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange}>
                                        <option value="aktif">Aktif</option>
                                        <option value="nonaktif">Nonaktif</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Deskripsi</label>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={handleCloseModal}>Batal</button>
                                <button type="submit" className="btn-primary">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
