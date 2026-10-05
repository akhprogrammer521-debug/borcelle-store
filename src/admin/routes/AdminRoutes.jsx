import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/Dashboard';
import ResourcePage from '../pages/ResourcePage';
import '../admin.css';

export default function AdminRoutes() {
  return (
    <><Toaster position="top-right" containerStyle={{ top: 22, right: 20, zIndex: 100 }} toastOptions={{ duration: 3600, style: { border: '1px solid #f5d8e3', borderRadius: '16px', background: '#fff', color: '#273244', boxShadow: '0 18px 44px -25px rgba(80,44,69,.34)', padding: '13px 16px', fontSize: '13px', fontWeight: 600 }, success: { iconTheme: { primary: '#e65288', secondary: '#fff' } }, error: { iconTheme: { primary: '#dc526a', secondary: '#fff' } } }} /><Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ResourcePage key="products" resource="products" />} />
          <Route path="categories" element={<ResourcePage key="categories" resource="categories" />} />
          <Route path="brands" element={<ResourcePage key="brands" resource="brands" />} />
          <Route path="orders" element={<ResourcePage key="orders" resource="orders" />} />
          <Route path="cities" element={<ResourcePage key="cities" resource="cities" />} />
          <Route path="municipals" element={<ResourcePage key="municipals" resource="municipals" />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes></>
  );
}
