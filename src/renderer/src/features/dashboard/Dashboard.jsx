import React from 'react';
import {
    TrendingUp,
    ShoppingCart,
    Package,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const data = [
    { name: 'Sen', value: 4000 },
    { name: 'Sel', value: 3000 },
    { name: 'Rab', value: 5000 },
    { name: 'Kam', value: 2780 },
    { name: 'Jum', value: 6890 },
    { name: 'Sab', value: 8390 },
    { name: 'Min', value: 5490 },
];

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2 className="welcome-text">Selamat Datang, Admin!</h2>
                <p className="date-text">Senin, 02 Februari 2026</p>
            </div>

            {/* Ringkasan Penjualan */}
            <div className="summary-grid">
                <div className="summary-card">
                    <div className="card-header">
                        <div className="card-icon blue">
                            <TrendingUp size={24} />
                        </div>
                        <MoreHorizontal size={20} color="#94a3b8" cursor="pointer" />
                    </div>
                    <div>
                        <div className="card-title">Total Penjualan</div>
                        <div className="card-value">Rp 12.500.000</div>
                        <div className="card-trend trend-up">
                            <ArrowUpRight size={16} />
                            <span>+15% dari kemarin</span>
                        </div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-header">
                        <div className="card-icon green">
                            <ShoppingCart size={24} />
                        </div>
                        <MoreHorizontal size={20} color="#94a3b8" cursor="pointer" />
                    </div>
                    <div>
                        <div className="card-title">Total Transaksi</div>
                        <div className="card-value">145</div>
                        <div className="card-trend trend-up">
                            <ArrowUpRight size={16} />
                            <span>+8% dari kemarin</span>
                        </div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-header">
                        <div className="card-icon orange">
                            <Package size={24} />
                        </div>
                        <MoreHorizontal size={20} color="#94a3b8" cursor="pointer" />
                    </div>
                    <div>
                        <div className="card-title">Stok Terjual</div>
                        <div className="card-value">320 Item</div>
                        <div className="card-trend trend-up">
                            <ArrowUpRight size={16} />
                            <span>+12% dari kemarin</span>
                        </div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-header">
                        <div className="card-icon purple">
                            <Users size={24} />
                        </div>
                        <MoreHorizontal size={20} color="#94a3b8" cursor="pointer" />
                    </div>
                    <div>
                        <div className="card-title">Pelanggan Baru</div>
                        <div className="card-value">12</div>
                        <div className="card-trend trend-down">
                            <ArrowDownRight size={16} />
                            <span>-2% dari kemarin</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                {/* Grafik Penjualan */}
                <div className="content-card">
                    <div className="section-title">Grafik Penjualan</div>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1e2d',
                                        borderRadius: '8px',
                                        border: 'none',
                                        color: 'white'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stok Terlaris */}
                <div className="content-card">
                    <div className="section-title">Stok Terlaris</div>
                    <div className="stock-list">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="stock-item">
                                <div className="stock-image">
                                    <Package size={20} />
                                </div>
                                <div className="stock-info">
                                    <span className="stock-name">Kopi Arabika {item}</span>
                                    <span className="stock-category">Minuman</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="stock-price">Rp 25.000</div>
                                    <div className="stock-sold">84 Terjual</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
