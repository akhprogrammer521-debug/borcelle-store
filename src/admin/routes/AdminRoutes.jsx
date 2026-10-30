import { Routes, Route, Link } from "react-router";
import { MotionConfig } from "framer-motion";
import AdminAuthProvider from "../Providers/AdminAuthProvider";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import Terms from "../pages/Terms";
import "../assets/css/admin.css";

export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <MotionConfig reducedMotion="user">
        <div className="admin-app" dir="rtl">
          <Routes>
            <Route path="login" element={<Login />} />

            <Route element={<ProtectedAdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<Orders />} />
                <Route path="terms" element={<Terms />} />
              </Route>
            </Route>

            <Route path="*" element={
              <div className="admin-empty">
                <h3>الصفحة غير موجودة</h3>
                <Link to="/admin">العودة إلى لوحة الإدارة</Link>
              </div>
            } />
          </Routes>
        </div>
      </MotionConfig>
    </AdminAuthProvider>
  );
}