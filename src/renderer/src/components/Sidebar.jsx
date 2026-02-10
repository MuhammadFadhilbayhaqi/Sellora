import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Database,
    Package,
    ShoppingCart,
    CreditCard,
    FileText,
    ChevronDown,
    ChevronRight,
    Box,
    Layers,
    Ruler,
    Users,
    Truck,
    UserCircle,
    TrendingUp,
    ClipboardList,
    Warehouse,
    ShoppingBag,
    History,
    Receipt,
    RotateCcw,
    PieChart,
    Wallet,
    Activity,
    Settings
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({
        master: true,
        stok: false,
        pembelian: false,
        transaksi: false,
        laporan: false
    });

    const toggleMenu = (menu) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const MenuItem = ({ icon: Icon, label, to, exact = false }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            end={exact}
        >
            <Icon className="menu-item-icon" />
            <span>{label}</span>
            {/* If strictly active, maybe add a small indicator or just rely on bg color */}
        </NavLink>
    );

    const SubMenuItem = ({ label, to }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
        >
            {label}
        </NavLink>
    );

    const AccordionMenu = ({ icon: Icon, label, menuKey, children }) => {
        const isExpanded = expandedMenus[menuKey];
        // Check if any child path is active to auto-expand or highlight parent
        // simple heuristic: just let user toggle manually for now or auto-open

        return (
            <div className="accordion-menu">
                <div className="menu-item" onClick={() => toggleMenu(menuKey)}>
                    <Icon className="menu-item-icon" />
                    <span style={{ flex: 1 }}>{label}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {isExpanded && (
                    <div className="submenu-container">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container">S</div>
                <span className="app-name">Sellora</span>
            </div>

            <div className="sidebar-menu">
                <div className="menu-category">Main</div>
                <MenuItem icon={LayoutDashboard} label="Dashboard" to="/" exact />

                <div className="menu-category">Management</div>

                <AccordionMenu icon={Database} label="Master Data" menuKey="master">
                    <SubMenuItem label="Produk" to="/master/produk" />
                    <SubMenuItem label="Kategori Produk" to="/master/kategori" />
                    <SubMenuItem label="Satuan" to="/master/satuan" />
                    <SubMenuItem label="Pelanggan" to="/master/pelanggan" />
                    <SubMenuItem label="Supplier" to="/master/supplier" />
                    <SubMenuItem label="Pengguna" to="/master/pengguna" />
                </AccordionMenu>

                <AccordionMenu icon={Package} label="Stok" menuKey="stok">
                    <SubMenuItem label="Pergerakan Stok" to="/stok/pergerakan" />
                    <SubMenuItem label="Stok Opname" to="/stok/opname" />
                    <SubMenuItem label="Stok Gudang" to="/stok/gudang" />
                </AccordionMenu>

                <div className="menu-category">Transaction</div>

                <AccordionMenu icon={ShoppingCart} label="Pembelian" menuKey="pembelian">
                    <SubMenuItem label="Pembelian Barang" to="/pembelian/baru" />
                    <SubMenuItem label="Riwayat Pembelian" to="/pembelian/riwayat" />
                </AccordionMenu>

                <AccordionMenu icon={CreditCard} label="Transaksi" menuKey="transaksi">
                    <SubMenuItem label="Penjualan" to="/transaksi/penjualan" />
                    <SubMenuItem label="Riwayat Penjualan" to="/transaksi/riwayat" />
                    <SubMenuItem label="Pembayaran" to="/transaksi/pembayaran" />
                    <SubMenuItem label="Refund" to="/transaksi/refund" />
                </AccordionMenu>

                <div className="menu-category">Reports</div>

                <AccordionMenu icon={FileText} label="Laporan" menuKey="laporan">
                    <SubMenuItem label="Laporan Penjualan" to="/laporan/penjualan" />
                    <SubMenuItem label="Laporan Pembelian" to="/laporan/pembelian" />
                    <SubMenuItem label="Laporan Stok" to="/laporan/stok" />
                    <SubMenuItem label="Laporan Keuangan" to="/laporan/keuangan" />
                    <SubMenuItem label="Audit Log" to="/laporan/audit" />
                </AccordionMenu>

                <div className="menu-category">System</div>
                <MenuItem icon={Settings} label="Pengaturan" to="/settings" />
            </div>

            <div className="sidebar-footer">
                <div style={{ fontSize: '12px', color: '#666' }}>
                    v1.0.0
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
