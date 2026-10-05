import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from 'react-router';
import { FiArrowRight, FiLayers, FiPackage, FiRefreshCw, FiShoppingBag, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi, ADMIN_RESOURCES, parseListResponse } from '../api/resources';
import { ordersByStatus, productsByCategory } from '../utils/chartData';
import { LoadingState } from '../components/States';
import Button from '../components/Button';
import PageMotion from '../components/PageMotion';

const resources = [
  { key: 'products', label: 'Products', icon: FiPackage, path: '/admin/products' },
  { key: 'orders', label: 'Orders', icon: FiShoppingBag, path: '/admin/orders' },
  { key: 'categories', label: 'Categories', icon: FiLayers, path: '/admin/categories' },
  { key: 'brands', label: 'Brands', icon: FiTag, path: '/admin/brands' },
];
const OrdersStatusChart = lazy(() => import('../components/AdminCharts').then((module) => ({ default: module.OrdersStatusChart })));
const ProductsCategoryChart = lazy(() => import('../components/AdminCharts').then((module) => ({ default: module.ProductsCategoryChart })));

function StatCard({ resource, result, index }) {
  const reducedMotion = useReducedMotion();
  const Icon = resource.icon;
  const total = result?.data?.total;
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={reducedMotion ? undefined : { y: -4 }} transition={{ duration: 0.25, delay: index * 0.045 }} className="admin-card-lift admin-panel ad:relative ad:overflow-hidden ad:rounded-[24px] ad:border ad:border-slate-100 ad:bg-white ad:p-5 ad:sm:p-6"><div className="ad:absolute ad:-right-9 ad:-top-11 ad:h-32 ad:w-32 ad:rounded-full ad:bg-rose-50/80" /><div className="ad:relative ad:flex ad:items-start ad:justify-between"><span className="ad:grid ad:h-12 ad:w-12 ad:place-items-center ad:rounded-2xl ad:bg-gradient-to-br ad:from-rose-50 ad:to-pink-100 ad:text-rose-500"><Icon size={22} /></span><NavLink to={resource.path} aria-label={`View ${resource.label}`} className="ad:grid ad:h-8 ad:w-8 ad:place-items-center ad:rounded-full ad:text-slate-400 ad:transition-colors ad:hover:bg-rose-50 ad:hover:text-rose-600"><FiArrowRight size={17} /></NavLink></div><p className="ad:relative ad:mt-7 ad:mb-1 ad:text-sm ad:font-medium ad:text-slate-500">{resource.label}</p><motion.p initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.26, delay: 0.12 + index * 0.045 }} className="ad:relative ad:mb-0 ad:text-[34px] ad:font-semibold ad:leading-tight ad:tracking-tight ad:text-slate-900">{total ?? 'Unavailable'}</motion.p><p className="ad:relative ad:mt-2 ad:mb-0 ad:text-[11px] ad:text-slate-400">{result?.error ? 'Could not load count' : total === null || total === undefined ? 'Total not provided by API' : 'From API pagination total'}</p>{result?.error && <p title={result.error.message} className="ad:relative ad:mt-2 ad:mb-0 ad:truncate ad:text-[11px] ad:text-red-500">{result.error.message}</p>}</motion.div>;
}

export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [revision, setRevision] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(resources.map(async ({ key }) => {
      const endpoint = `${ADMIN_RESOURCES[key].endpoint}?page=1`;
      try {
        const response = await adminApi.list(key, 1, controller.signal);
        return [key, { data: parseListResponse(response, endpoint) }];
      } catch (error) {
        return [key, { error }];
      }
    })).then((entries) => {
      if (controller.signal.aborted) return;
      setResults(Object.fromEntries(entries));
      if (entries.some(([, result]) => result.error && result.error.name !== 'AbortError')) toast.error('Some dashboard data could not be loaded', { id: 'admin-dashboard-load' });
    });
    return () => controller.abort();
  }, [revision]);

  const orders = results?.orders?.data?.items || [];
  const products = results?.products?.data?.items || [];
  const categories = results?.categories?.data?.items || [];
  const statusData = ordersByStatus(orders);
  const categoryData = productsByCategory(products, categories);
  const datedOrders = orders.filter((order) => order.created_at && !Number.isNaN(Date.parse(order.created_at)));
  const recentOrders = [...datedOrders].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)).slice(0, 5);

  return <PageMotion className="ad:space-y-7 ad:sm:space-y-8">
    <section className="admin-hero ad:rounded-[30px] ad:border ad:border-white/80 ad:px-6 ad:py-9 ad:shadow-[0_22px_60px_-42px_rgba(192,79,122,.45)] ad:sm:px-9 ad:sm:py-11 ad:xl:px-12"><div className="ad:relative ad:flex ad:flex-wrap ad:items-end ad:justify-between ad:gap-6"><div className="ad:max-w-2xl"><span className="ad:inline-flex ad:rounded-full ad:border ad:border-white/90 ad:bg-white/60 ad:px-3 ad:py-1.5 ad:text-[10px] ad:font-bold ad:uppercase ad:tracking-[.2em] ad:text-rose-700">Operational overview</span><h2 className="ad:mt-5 ad:mb-3 ad:text-3xl ad:font-semibold ad:leading-tight ad:tracking-tight ad:text-[#312838] ad:sm:text-4xl ad:xl:text-[42px]">A clearer view of your store.</h2><p className="ad:mb-0 ad:max-w-xl ad:text-sm ad:leading-7 ad:text-slate-600 ad:sm:text-base">Manage your catalog and orders with the data available from the admin API.</p></div><Button onClick={() => { setResults(null); setRevision((value) => value + 1); }} className="ad:relative ad:border-white/70 ad:bg-white/70"><FiRefreshCw size={16} />Refresh overview</Button></div></section>
    {!results ? <LoadingState label="Loading your overview…" /> : <>
      <section aria-label="Store counts" className="ad:grid ad:gap-4 ad:sm:grid-cols-2 ad:xl:grid-cols-4">{resources.map((resource, index) => <StatCard key={resource.key} resource={resource} result={results[resource.key]} index={index} />)}</section>
      <Suspense fallback={<LoadingState label="Preparing charts…" />}><motion.div initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.27, delay: 0.12 }} className="ad:grid ad:items-start ad:gap-5 ad:xl:grid-cols-2"><OrdersStatusChart data={statusData} error={results.orders?.error} /><ProductsCategoryChart data={categoryData} error={results.products?.error || results.categories?.error} /></motion.div></Suspense>
      <section className="admin-panel ad:overflow-hidden ad:rounded-[26px] ad:border ad:border-slate-100 ad:bg-white"><div className="ad:flex ad:flex-wrap ad:items-center ad:justify-between ad:gap-3 ad:border-b ad:border-slate-100 ad:px-6 ad:py-5 ad:sm:px-7"><div><p className="ad:mb-1 ad:text-[11px] ad:font-bold ad:uppercase ad:tracking-[.18em] ad:text-rose-500">Activity</p><h3 className="ad:m-0 ad:text-lg ad:font-semibold ad:text-slate-900">Recent orders</h3></div><NavLink to="/admin/orders" className="ad:inline-flex ad:items-center ad:gap-2 ad:text-sm ad:font-semibold ad:text-rose-600 ad:hover:text-rose-700">View orders <FiArrowRight size={16} /></NavLink></div><div className="ad:px-6 ad:py-2 ad:sm:px-7">{results.orders?.error ? <p role="alert" className="ad:my-7 ad:text-sm ad:text-red-600">{results.orders.error.message}</p> : recentOrders.length ? <div className="ad:divide-y ad:divide-slate-100">{recentOrders.map((order) => <div key={order.id} className="ad:flex ad:flex-wrap ad:items-center ad:justify-between ad:gap-3 ad:py-4 ad:text-sm"><div className="ad:flex ad:items-center ad:gap-3"><span className="ad:grid ad:h-10 ad:w-10 ad:place-items-center ad:rounded-xl ad:bg-rose-50 ad:text-rose-500"><FiShoppingBag size={18} /></span><span className="ad:font-semibold ad:text-slate-800">Order #{order.id}</span></div><span className="ad:text-xs ad:text-slate-500">{new Date(order.created_at).toLocaleDateString()}</span><span className="ad:rounded-full ad:bg-slate-100 ad:px-3 ad:py-1 ad:text-xs ad:font-medium ad:text-slate-600">{order.status || 'Status unavailable'}</span></div>)}</div> : <p className="ad:my-7 ad:text-sm ad:text-slate-500">{orders.length ? 'Unavailable: order creation dates were not provided.' : 'No orders found.'}</p>}</div><p className="ad:m-0 ad:border-t ad:border-slate-100 ad:px-6 ad:py-3 ad:text-[11px] ad:text-slate-400 ad:sm:px-7">Based on dated orders from the loaded first page.</p></section>
    </>}
  </PageMotion>;
}
