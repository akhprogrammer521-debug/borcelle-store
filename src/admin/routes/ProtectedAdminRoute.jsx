import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

export default function ProtectedAdminRoute() {
  const { adminToken } = useContext(AdminAuthContext);

  return adminToken
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
}