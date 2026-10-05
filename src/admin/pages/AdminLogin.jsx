import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { FiArrowRight, FiLock, FiMail, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../api/resources';
import { getAdminToken, setAdminToken } from '../utils/auth';
import Button from '../components/Button';
import PageMotion from '../components/PageMotion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  if (getAdminToken()) return <Navigate to="/admin" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await adminApi.login(email, password);
      const token = response?.data?.token;
      if (typeof token !== 'string' || !token) throw new Error('POST /admin/login: response did not contain data.token.');
      setAdminToken(token);
      toast.success('Welcome to Borcelle Admin');
      const from = location.state?.from?.pathname;
      navigate(from?.startsWith('/admin/') && from !== '/admin/login' ? from : '/admin', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return <div dir="ltr" className="admin-root ad:grid ad:min-h-screen ad:bg-[#f7f7fb] ad:lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)]">
    <div className="admin-hero ad:relative ad:hidden ad:min-h-screen ad:flex-col ad:justify-between ad:p-12 ad:lg:flex ad:xl:p-16"><div className="ad:text-[30px] ad:font-bold ad:tracking-[-.055em] ad:text-rose-600">Borcelle<span className="ad:text-slate-900">.</span></div><div className="ad:max-w-xl"><span className="ad:inline-flex ad:items-center ad:gap-2 ad:rounded-full ad:border ad:border-white/80 ad:bg-white/60 ad:px-4 ad:py-2 ad:text-[11px] ad:font-bold ad:uppercase ad:tracking-[.18em] ad:text-rose-700 ad:shadow-sm"><FiShield size={14} />Admin workspace</span><h1 className="ad:mt-7 ad:mb-5 ad:text-5xl ad:font-semibold ad:leading-[1.1] ad:tracking-tight ad:text-[#302837] ad:xl:text-6xl">Your store,<br /><span className="ad:text-rose-600">beautifully in hand.</span></h1><p className="ad:max-w-md ad:text-base ad:leading-7 ad:text-slate-600">A calm place to manage the catalog, orders, and locations that keep Borcelle moving.</p></div><p className="ad:mb-0 ad:text-xs ad:font-medium ad:tracking-wide ad:text-slate-500">BORCELLE · ADMINISTRATION</p></div>
    <div className="ad:flex ad:min-h-screen ad:items-center ad:justify-center ad:px-5 ad:py-12 ad:sm:px-10 ad:lg:px-14"><PageMotion className="ad:w-full ad:max-w-[440px]"><div className="ad:mb-10 ad:lg:hidden"><div className="ad:text-3xl ad:font-bold ad:tracking-tight ad:text-rose-500">Borcelle<span className="ad:text-slate-900">.</span></div><p className="ad:mt-1 ad:text-xs ad:font-bold ad:uppercase ad:tracking-[.2em] ad:text-slate-400">Admin workspace</p></div><span className="ad:mb-4 ad:inline-block ad:rounded-full ad:bg-rose-50 ad:px-3 ad:py-1.5 ad:text-[11px] ad:font-bold ad:uppercase ad:tracking-[.14em] ad:text-rose-600">Secure access</span><h2 className="ad:mb-2 ad:text-3xl ad:font-semibold ad:tracking-tight ad:text-slate-900 ad:sm:text-4xl">Welcome back</h2><p className="ad:mb-8 ad:text-sm ad:leading-6 ad:text-slate-500">Sign in to continue to your admin workspace.</p>
      <div className="admin-panel ad:rounded-[28px] ad:border ad:border-slate-100 ad:bg-white ad:p-6 ad:sm:p-8">{location.state?.message && <p role="status" className="ad:mb-5 ad:rounded-xl ad:bg-slate-50 ad:p-3 ad:text-sm ad:text-slate-600">{location.state.message}</p>}{error && <p role="alert" className="ad:mb-5 ad:rounded-xl ad:bg-red-50 ad:p-3 ad:text-sm ad:text-red-700">{error}</p>}<form onSubmit={submit} className="ad:space-y-5"><label className="ad:block"><span className="ad:mb-2 ad:block ad:text-sm ad:font-semibold ad:text-slate-700">Email address</span><span className="ad:flex ad:items-center ad:gap-3 ad:rounded-xl ad:border ad:border-slate-200 ad:bg-white ad:px-4 ad:transition-colors ad:focus-within:border-rose-400 ad:focus-within:ring-2 ad:focus-within:ring-rose-100"><FiMail className="ad:shrink-0 ad:text-slate-400" /><input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@example.com" className="ad:w-full ad:border-0 ad:bg-transparent ad:py-3 ad:text-sm ad:outline-none" /></span></label><label className="ad:block"><span className="ad:mb-2 ad:block ad:text-sm ad:font-semibold ad:text-slate-700">Password</span><span className="ad:flex ad:items-center ad:gap-3 ad:rounded-xl ad:border ad:border-slate-200 ad:bg-white ad:px-4 ad:transition-colors ad:focus-within:border-rose-400 ad:focus-within:ring-2 ad:focus-within:ring-rose-100"><FiLock className="ad:shrink-0 ad:text-slate-400" /><input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="ad:w-full ad:border-0 ad:bg-transparent ad:py-3 ad:text-sm ad:outline-none" /></span></label><Button type="submit" variant="primary" disabled={loading} className="ad:mt-1 ad:w-full ad:py-3">{loading ? 'Signing in…' : <>Sign in <FiArrowRight size={17} /></>}</Button></form></div><p className="ad:mt-7 ad:text-center ad:text-xs ad:text-slate-400">Borcelle administration · Authorized access only</p></PageMotion></div>
  </div>;
}
