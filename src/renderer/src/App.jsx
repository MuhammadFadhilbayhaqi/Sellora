import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './features/dashboard/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryList from './features/master/CategoryList';
import UnitList from './features/master/UnitList';
import ProductList from './features/master/ProductList';
import CustomerList from './features/master/CustomerList';
import SupplierList from './features/master/SupplierList';
import UserList from './features/master/UserList';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />

            {/* Master Data Routes */}
            <Route path="master/kategori" element={<CategoryList />} />
            <Route path="master/satuan" element={<UnitList />} />
            <Route path="master/produk" element={<ProductList />} />
            <Route path="master/pelanggan" element={<CustomerList />} />
            <Route path="master/supplier" element={<SupplierList />} />
            <Route path="master/pengguna" element={<UserList />} />

            <Route path="*" element={<div>Halaman belum tersedia</div>} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
