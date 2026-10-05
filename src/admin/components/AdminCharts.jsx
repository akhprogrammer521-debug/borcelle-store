import { useReducedMotion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const colors = ['#e65288', '#f08db0', '#a75b84', '#f5bfd3', '#8d95ad', '#cf829f'];
const tooltipStyle = { border: '1px solid #f4dce5', borderRadius: 14, boxShadow: '0 12px 35px -22px rgba(58,36,54,.4)', fontSize: 12 };

function ChartShell({ eyebrow, title, note, children }) {
  return <section className="admin-panel ad:min-w-0 ad:overflow-hidden ad:rounded-[26px] ad:border ad:border-slate-100 ad:bg-white ad:p-5 ad:sm:p-7"><div className="ad:mb-6"><p className="ad:mb-1 ad:text-[11px] ad:font-semibold ad:uppercase ad:tracking-[.2em] ad:text-rose-500">{eyebrow}</p><h3 className="ad:m-0 ad:text-lg ad:font-semibold ad:text-slate-900 ad:sm:text-xl">{title}</h3><p className="ad:mt-2 ad:mb-0 ad:text-xs ad:leading-5 ad:text-slate-500">{note}</p></div>{children}</section>;
}

function DataUnavailable({ reason }) {
  return <div className="admin-grid-glow ad:flex ad:h-[250px] ad:flex-col ad:items-center ad:justify-center ad:rounded-2xl ad:border ad:border-dashed ad:border-slate-200 ad:p-6 ad:text-center"><span className="ad:mb-4 ad:grid ad:h-12 ad:w-12 ad:place-items-center ad:rounded-2xl ad:bg-rose-50 ad:text-rose-400"><FiBarChart2 size={22} /></span><p className="ad:m-0 ad:text-sm ad:font-semibold ad:text-slate-800">Data unavailable</p><p className="ad:mt-2 ad:mb-0 ad:max-w-xs ad:text-xs ad:leading-5 ad:text-slate-500">{reason}</p></div>;
}

export function OrdersStatusChart({ data, error }) {
  const reducedMotion = useReducedMotion();
  return <ChartShell eyebrow="Order mix" title="Status distribution" note="Based on orders on the loaded first page with a status.">{data ? <><div className="ad:h-[250px] ad:w-full"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.rows} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={62} outerRadius={88} paddingAngle={3} isAnimationActive={!reducedMotion} stroke="#fff" strokeWidth={3}>{data.rows.map((row, index) => <Cell key={row.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} formatter={(value) => [value, 'Orders']} /></PieChart></ResponsiveContainer></div><div className="ad:mt-2 ad:flex ad:flex-wrap ad:gap-x-4 ad:gap-y-2">{data.rows.map((row, index) => <span key={row.name} className="ad:flex ad:items-center ad:gap-2 ad:text-xs ad:text-slate-600"><span className="ad:h-2 ad:w-2 ad:rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />{row.name} <strong className="ad:text-slate-900">{row.value}</strong></span>)}</div><p className="ad:mt-4 ad:mb-0 ad:text-[11px] ad:text-slate-400">{data.represented} of {data.available} loaded orders represented</p></> : <DataUnavailable reason={error ? 'The orders endpoint could not be loaded.' : 'No usable order status values were returned.'} />}</ChartShell>;
}

export function ProductsCategoryChart({ data, error }) {
  const reducedMotion = useReducedMotion();
  return <ChartShell eyebrow="Catalog mix" title="Products by category" note="Based on products and category names on the loaded first pages.">{data ? <div className="ad:w-full" style={{ height: Math.max(250, data.length * 46) }}><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 0 }}><CartesianGrid stroke="#f1edf1" horizontal={false} /><XAxis type="number" allowDecimals={false} tick={{ fill: '#97a0af', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="name" width={104} tick={{ fill: '#5b6473', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 14)}…` : value} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [value, 'Products']} /><Bar dataKey="value" fill="#e65288" radius={[0, 7, 7, 0]} maxBarSize={19} isAnimationActive={!reducedMotion} /></BarChart></ResponsiveContainer></div> : <DataUnavailable reason={error ? 'Product or category data could not be loaded.' : 'Products could not be matched safely to the loaded categories.'} />}</ChartShell>;
}
