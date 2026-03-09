
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import './Master.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        kontak: '',
        tipe: 'umum'
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const data = await window.api.master.getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(cust =>
        cust.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cust.kontak && cust.kontak.includes(searchTerm))
    );

    const handleOpenModal = (customer = null) => {
        if (customer) {
            setCurrentCustomer(customer);
            setFormData({
                nama: customer.nama,
                alamat: customer.alamat || '',
                kontak: customer.kontak || '',
                tipe: customer.tipe || 'umum'
            });
        } else {
            setCurrentCustomer(null);
            setFormData({
                nama: '',
                alamat: '',
                kontak: '',
                tipe: 'umum'
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCustomer(null);
        setFormData({ nama: '', alamat: '', kontak: '', tipe: 'umum' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentCustomer) {
                await window.api.master.updateCustomer({ id: currentCustomer.pelanggan_id, ...formData });
            } else {
                await window.api.master.createCustomer(formData);
            }
            fetchCustomers();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Gagal menyimpan pelanggan: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                await window.api.master.deleteCustomer(id);
                fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    return (
        <div className="master-page">
            <div className="page-header">
                <h2>Data Pelanggan</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> Tambah Pelanggan
                </button>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari pelanggan..."
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
                                <th>Nama</th>
                                <th>Kontak</th>
                                <th>Tipe</th>
                                <th>Alamat</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((cust, index) => (
                                    <tr key={cust.pelanggan_id}>
                                        <td>{index + 1}</td>
                                        <td>{cust.nama}</td>
                                        <td>{cust.kontak || '-'}</td>
                                        <td>
                                            <span className={`badge ${cust.tipe === 'member' ? 'badge-primary' : 'badge-secondary'}`}>
                                                {cust.tipe}
                                            </span>
                                        </td>
                                        <td>{cust.alamat || '-'}</td>
                                        <td className="actions-cell">
                                            <button className="btn-icon edit" onClick={() => handleOpenModal(cust)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(cust.pelanggan_id)}>
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
                        <h3>{currentCustomer ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nama Pelanggan</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Kontak (HP/Telp)</label>
                                <input
                                    type="text"
                                    name="kontak"
                                    value={formData.kontak}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Tipe Pelanggan</label>
                                <select name="tipe" value={formData.tipe} onChange={handleInputChange}>
                                    <option value="umum">Umum</option>
                                    <option value="member">Member</option>
                                </select>
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

export default CustomerList;
