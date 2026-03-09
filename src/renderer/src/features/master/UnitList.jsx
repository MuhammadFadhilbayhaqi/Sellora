
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import './Master.css';

const UnitList = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentUnit, setCurrentUnit] = useState(null);
    const [formData, setFormData] = useState({ nama: '' });

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {
        try {
            const data = await window.api.master.getUnits();
            setUnits(data);
        } catch (error) {
            console.error('Error fetching units:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUnits = units.filter(unit =>
        unit.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (unit = null) => {
        if (unit) {
            setCurrentUnit(unit);
            setFormData({ nama: unit.nama });
        } else {
            setCurrentUnit(null);
            setFormData({ nama: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentUnit(null);
        setFormData({ nama: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUnit) {
                await window.api.master.updateUnit({ id: currentUnit.satuan_id, ...formData });
            } else {
                await window.api.master.createUnit(formData);
            }
            fetchUnits();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving unit:', error);
            alert('Gagal menyimpan satuan: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this unit?')) {
            try {
                await window.api.master.deleteUnit(id);
                fetchUnits();
            } catch (error) {
                console.error('Error deleting unit:', error);
            }
        }
    };

    return (
        <div className="master-page">
            <div className="page-header">
                <h2>Satuan Produk</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> Tambah Satuan
                </button>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari satuan..."
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
                                <th style={{ width: '80px' }}>No</th>
                                <th>Nama Satuan</th>
                                <th style={{ width: '100px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUnits.length > 0 ? (
                                filteredUnits.map((unit, index) => (
                                    <tr key={unit.satuan_id}>
                                        <td>{index + 1}</td>
                                        <td>{unit.nama}</td>
                                        <td className="actions-cell">
                                            <button className="btn-icon edit" onClick={() => handleOpenModal(unit)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(unit.satuan_id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="empty-state">Data tidak ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{currentUnit ? 'Edit Satuan' : 'Tambah Satuan'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nama Satuan</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleInputChange}
                                    required
                                />
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

export default UnitList;
