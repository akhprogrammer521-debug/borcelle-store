import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiLock, FiMail } from "react-icons/fi";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";
import { AdminAuthService } from "../../services/admin/AdminAuthService";
import logo from "../../assets/logo/logo.png";

export default function Login() {
  const { adminToken, loginAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (adminToken) return <Navigate to="/admin" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    AdminAuthService.LoginApi({ email, password })
      .then((data) => {
        if (!data?.data?.token) {
          throw new Error("لم يُرجع السيرفر توكن تسجيل الدخول");
        }

        loginAdmin(data.data.token);
        navigate("/admin", { replace: true });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="admin-login">
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img src={logo} alt="تمكين" className="admin-login-logo" />
        <h2>مرحبًا بك مجددًا</h2>
        <p className="admin-muted">سجّل الدخول لإدارة متجر تمكين</p>

        <form onSubmit={handleSubmit}>
          <label className="form-label"><FiMail /> البريد الإلكتروني</label>
          <input
            className="form-control mb-3"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="form-label"><FiLock /> كلمة المرور</label>
          <input
            className="form-control mb-3"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <div className="admin-alert">{error}</div>}

          <button className="admin-btn admin-btn-primary w-100" disabled={loading}>
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}