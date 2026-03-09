
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import './Master.css';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        kontak: '',
        email: ''
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await window.api.master.getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSuppliers = suppliers.filter(sup =>
        sup.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sup.kontak && sup.kontak.includes(searchTerm))
    );

    const handleOpenModal = (supplier = null) => {
        if (supplier) {
            setCurrentSupplier(supplier);
            setFormData({
                nama: supplier.nama,
                alamat: supplier.alamat || '',
                kontak: supplier.kontak || '',
                email: supplier.email || ''
            });
        } else {
            setCurrentSupplier(null);
            setFormData({
                nama: '',
                alamat: '',
                kontak: '',
                email: ''
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentSupplier(null);
        setFormData({ nama: '', alamat: '', kontak: '', email: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentSupplier) {
                await window.api.master.updateSupplier({ id: currentSupplier.supplier_id, ...formData });
            } else {
                await window.api.master.createSupplier(formData);
            }
            fetchSuppliers();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving supplier:', error);
            alert('Gagal menyimpan supplier: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            try {
                await window.api.master.deleteSupplier(id);
                fetchSuppliers();
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    return (
        <div className="master-page">
            <div className="page-header">
                <h2>Data Supplier</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> Tambah Supplier
                </button>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari supplier..."
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
                                <th>Nama Supplier</th>
                                <th>Kontak</th>
                                <th>Email</th>
                                <th>Alamat</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.length > 0 ? (
                                filteredSuppliers.map((sup, index) => (
                                    <tr key={sup.supplier_id}>
                                        <td>{index + 1}</td>
                                        <td>{sup.nama}</td>
                                        <td>{sup.kontak || '-'}</td>
                                        <td>{sup.email || '-'}</td>
                                        <td>{sup.alamat || '-'}</td>
                                        <td className="actions-cell">
                                            <button className="btn-icon edit" onClick={() => handleOpenModal(sup)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(sup.supplier_id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="empty-state">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{currentSupplier ? 'Edit Supplier' : 'Tambah Supplier'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nama Supplier</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Kontak</label>
                                <input
                                    type="text"
                                    name="kontak"
                                    value={formData.kontak}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Alamat</label>
                                <textarea
                                    name="alamat"
                                    value={formData.alamat}
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

export default SupplierList;
