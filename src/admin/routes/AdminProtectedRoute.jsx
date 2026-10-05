import { useSyncExternalStore } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { getAdminToken, subscribeToAdminToken } from '../utils/auth';

export default function AdminProtectedRoute() {
  const token = useSyncExternalStore(subscribeToAdminToken, getAdminToken);
  const location = useLocation();
  return token ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location }} />;
}
