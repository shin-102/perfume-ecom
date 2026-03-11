import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './ProtectedRoute';
import AdminLogin from './components/AdminPanel/AdminLogin';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductsPage />} />

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Optional: Catch-all redirect or 404 can go here */}
    </Routes>
  );
}

export default App;
