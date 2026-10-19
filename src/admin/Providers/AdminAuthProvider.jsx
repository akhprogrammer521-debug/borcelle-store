import { useState } from "react";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

export default function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("adminToken")
  );

  const loginAdmin = (token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  // استدعاؤها داخل catch، وبذلك تنتهي الجلسة عند رفض التوكن.
  const handleAdminError = (error) => {
    if (error.status === 401) {
      logoutAdmin();
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ adminToken, loginAdmin, logoutAdmin, handleAdminError }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}