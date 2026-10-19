import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FiGrid,
  FiPackage,
  FiLayers,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";
import { AdminAuthService } from "../../services/admin/AdminAuthService";
import logo from "../../assets/logo/logo.png";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const { logoutAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const links = [
    { to: "/admin", label: "نظرة عامة", icon: FiGrid, end: true },
    { to: "/admin/products", label: "المنتجات", icon: FiPackage },
    { to: "/admin/categories", label: "الأصناف", icon: FiLayers },
    { to: "/admin/orders", label: "الطلبات", icon: FiShoppingBag },
    { to: "/admin/terms", label: "الشروط و الخصوصية", icon: MdOutlinePrivacyTip },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
    setError("");

    AdminAuthService.LogoutApi()
      .then(() => {
        logoutAdmin();
        navigate("/admin/login", { replace: true });
      })
      .catch((err) => {
        if (err.status === 401) {
          logoutAdmin();
          navigate("/admin/login", { replace: true });
        } else {
          setError(err.message);
        }
      })
      .finally(() => setIsLoggingOut(false));
  };

  return (
    <div className="admin-layout">
      {menuOpen && (
        <button
          className="admin-overlay"
          aria-label="إغلاق القائمة"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <img src={logo} alt="تمكين" />
          <div>
            <strong>Borcelle</strong>
            <small>لوحة الإدارة</small>
          </div>
          <button
            className="admin-icon-btn admin-mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <FiX />
          </button>
        </div>

        <nav>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-nav-link">
            <FiExternalLink /> زيارة المتجر
          </a>

          <button
            className="admin-nav-link"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <FiLogOut />
            {isLoggingOut ? "جارٍ الخروج..." : "تسجيل الخروج"}
          </button>

          {error && <p className="admin-error-text">{error}</p>}
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-inline">
            <button
              className="admin-icon-btn admin-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <FiMenu />
            </button>
            <div>
              <strong>إدارة متجر Borcelle</strong>
              <small>المنتجات، الأصناف والطلبات</small>
            </div>
          </div>

          <span className="admin-avatar">A</span>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}