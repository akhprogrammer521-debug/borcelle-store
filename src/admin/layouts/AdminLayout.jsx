import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { FiGrid, FiPackage, FiLayers, FiTag, FiShoppingBag, FiMapPin, FiMap, FiLogOut, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi } from '../api/resources';
import { clearAdminToken } from '../utils/auth';

const links = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/products', label: 'Products', icon: FiPackage },
  { to: '/admin/categories', label: 'Categories', icon: FiLayers },
  { to: '/admin/brands', label: 'Brands', icon: FiTag },
  { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { to: '/admin/cities', label: 'Cities', icon: FiMapPin },
  { to: '/admin/municipals', label: 'Municipals', icon: FiMap },
];

function SidebarContent({ onNavigate, onLogout, loggingOut, mobile = false }) {
  return <>
    <div className="ad:flex ad:h-24 ad:items-center ad:justify-between ad:border-b ad:border-slate-100 ad:px-7"><div><div className="ad:text-[27px] ad:font-bold ad:tracking-[-.055em] ad:text-rose-500">Borcelle<span className="ad:text-slate-900">.</span></div><div className="ad:mt-0.5 ad:text-[10px] ad:font-bold ad:uppercase ad:tracking-[.24em] ad:text-slate-400">Admin workspace</div></div>{mobile && <button type="button" aria-label="Close navigation" onClick={onNavigate} className="ad:rounded-xl ad:p-2 ad:text-slate-500 ad:hover:bg-slate-100"><FiX size={20} /></button>}</div>
    <div className="ad:px-4 ad:pt-7"><p className="ad:mb-3 ad:px-4 ad:text-[10px] ad:font-bold ad:uppercase ad:tracking-[.22em] ad:text-slate-400">Workspace</p></div>
    <nav aria-label="Admin navigation" className="ad:flex-1 ad:space-y-1 ad:overflow-y-auto ad:px-4 ad:pb-6">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={onNavigate} className={({ isActive }) => `ad:group ad:relative ad:flex ad:items-center ad:gap-3 ad:rounded-2xl ad:px-4 ad:py-3 ad:text-[13px] ad:font-semibold ad:transition-all ad:duration-200 ad:ease-out ad:hover:translate-x-1 ${isActive ? 'ad:bg-gradient-to-r ad:from-rose-50 ad:to-pink-50/70 ad:text-rose-600 ad:shadow-[inset_3px_0_0_#e65288]' : 'ad:text-slate-600 ad:hover:bg-slate-50 ad:hover:text-slate-900'}`}><Icon size={18} className="ad:shrink-0" /><span>{label}</span><FiChevronRight size={14} className="ad:ml-auto ad:opacity-0 ad:transition-opacity ad:group-hover:opacity-70" /></NavLink>)}</nav>
    <div className="ad:border-t ad:border-slate-100 ad:p-4"><button type="button" onClick={onLogout} disabled={loggingOut} className="ad:flex ad:w-full ad:items-center ad:gap-3 ad:rounded-2xl ad:px-4 ad:py-3 ad:text-[13px] ad:font-semibold ad:text-slate-600 ad:transition-all ad:hover:bg-rose-50 ad:hover:text-rose-600 ad:disabled:opacity-50"><FiLogOut size={18} />{loggingOut ? 'Signing out…' : 'Logout'}</button><p className="ad:mt-5 ad:mb-1 ad:px-4 ad:text-[10px] ad:tracking-wide ad:text-slate-400">BORCELLE · MANAGEMENT SUITE</p></div>
  </>;
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const section = links.find((link) => link.to === location.pathname)?.label || 'Admin';

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    let message = 'You have been signed out.';
    try {
      await adminApi.logout();
      toast.success('Signed out successfully');
    } catch (error) {
      message = `Signed out locally. Server logout failed: ${error.message}`;
      toast.error(message);
    } finally {
      clearAdminToken();
      navigate('/admin/login', { replace: true, state: { message } });
    }
  }

  return <div dir="ltr" className="admin-root ad:min-h-screen ad:bg-[#f7f7fb] ad:text-slate-800">
    <aside className="ad:fixed ad:inset-y-0 ad:left-0 ad:z-30 ad:hidden ad:w-72 ad:flex-col ad:border-r ad:border-slate-100 ad:bg-white ad:lg:flex"><SidebarContent onNavigate={() => {}} onLogout={logout} loggingOut={loggingOut} /></aside>
    <AnimatePresence>{menuOpen && <motion.button key="mobile-backdrop" type="button" aria-label="Close navigation" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }} className="ad:fixed ad:inset-0 ad:z-40 ad:bg-slate-950/45 ad:backdrop-blur-[2px] ad:lg:hidden" onClick={() => setMenuOpen(false)} />}{menuOpen && <motion.aside key="mobile-sidebar" initial={reducedMotion ? false : { x: '-100%' }} animate={{ x: 0 }} exit={reducedMotion ? undefined : { x: '-100%' }} transition={{ duration: 0.23, ease: 'easeOut' }} className="ad:fixed ad:inset-y-0 ad:left-0 ad:z-50 ad:flex ad:w-72 ad:flex-col ad:border-r ad:border-slate-100 ad:bg-white ad:shadow-2xl ad:lg:hidden"><SidebarContent mobile onNavigate={() => setMenuOpen(false)} onLogout={logout} loggingOut={loggingOut} /></motion.aside>}</AnimatePresence>
    <div className="ad:min-w-0 ad:lg:pl-72"><header className="ad:sticky ad:top-0 ad:z-20 ad:flex ad:h-[84px] ad:items-center ad:justify-between ad:border-b ad:border-slate-100 ad:bg-white/90 ad:px-5 ad:backdrop-blur-xl ad:sm:px-8 ad:xl:px-12"><div className="ad:flex ad:items-center ad:gap-4"><button type="button" aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="ad:rounded-xl ad:p-2 ad:text-slate-600 ad:hover:bg-slate-100 ad:lg:hidden"><FiMenu size={22} /></button><div><div className="ad:text-[10px] ad:font-bold ad:uppercase ad:tracking-[.2em] ad:text-rose-500">Workspace / {section}</div><h1 className="ad:mt-1 ad:mb-0 ad:text-xl ad:font-semibold ad:tracking-tight ad:text-slate-900 ad:sm:text-2xl">{section}</h1></div></div><div className="ad:flex ad:items-center ad:gap-3"><div className="ad:hidden ad:text-right ad:sm:block"><p className="ad:m-0 ad:text-xs ad:font-semibold ad:text-slate-800">Administrator</p><p className="ad:mt-0.5 ad:mb-0 ad:text-[11px] ad:text-slate-400">Store management</p></div><div className="ad:grid ad:h-11 ad:w-11 ad:place-items-center ad:rounded-2xl ad:bg-gradient-to-br ad:from-rose-100 ad:to-pink-50 ad:text-sm ad:font-bold ad:text-rose-600 ad:ring-1 ad:ring-rose-100" aria-label="Admin account">A</div></div></header><main className="ad:mx-auto ad:max-w-[1640px] ad:px-5 ad:py-7 ad:sm:px-8 ad:sm:py-9 ad:xl:px-12 ad:xl:py-11"><Outlet /></main></div>
  </div>;
}
