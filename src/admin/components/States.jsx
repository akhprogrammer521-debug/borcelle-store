import { FiAlertCircle, FiInbox, FiRefreshCw } from 'react-icons/fi';
import Button from './Button';

export function LoadingState({ label = 'Loading data…' }) {
  return <div role="status" className="admin-panel ad:rounded-[24px] ad:border ad:border-slate-100 ad:bg-white ad:p-7"><div className="ad:mb-5 ad:flex ad:items-center ad:gap-3"><span className="ad:grid ad:h-9 ad:w-9 ad:place-items-center ad:rounded-xl ad:bg-rose-50 ad:text-rose-500"><FiRefreshCw className="ad:animate-spin" size={20} /></span><span className="ad:text-sm ad:font-medium ad:text-slate-600">{label}</span></div><div className="ad:space-y-3">{[0, 1, 2, 3].map((item) => <div key={item} className="admin-skeleton ad:h-10 ad:rounded-xl" />)}</div></div>;
}

export function TableSkeleton({ columns = 5 }) {
  return <div role="status" aria-label="Loading records" className="admin-panel ad:overflow-hidden ad:rounded-[24px] ad:border ad:border-slate-100 ad:bg-white"><div className="ad:flex ad:items-center ad:justify-between ad:border-b ad:border-slate-100 ad:px-6 ad:py-5"><div className="admin-skeleton ad:h-5 ad:w-40 ad:rounded-full" /><div className="admin-skeleton ad:h-9 ad:w-44 ad:rounded-xl" /></div><div className="ad:space-y-1 ad:p-3">{Array.from({ length: 6 }, (_, row) => <div key={row} className="ad:flex ad:gap-4 ad:rounded-xl ad:px-4 ad:py-4">{Array.from({ length: columns }, (_, cell) => <div key={cell} className={`admin-skeleton ad:h-4 ad:flex-1 ad:rounded-full ${cell === 0 ? 'ad:max-w-12' : ''}`} />)}</div>)}</div></div>;
}

export function EmptyState({ title = 'No records found', message }) {
  return <div className="ad:flex ad:flex-col ad:items-center ad:justify-center ad:px-6 ad:py-16 ad:text-center"><span className="ad:mb-4 ad:grid ad:h-14 ad:w-14 ad:place-items-center ad:rounded-2xl ad:bg-rose-50 ad:text-rose-400"><FiInbox size={25} /></span><p className="ad:m-0 ad:text-base ad:font-semibold ad:text-slate-800">{title}</p>{message && <p className="ad:mt-2 ad:mb-0 ad:max-w-sm ad:text-sm ad:text-slate-500">{message}</p>}</div>;
}

export function ErrorState({ error, onRetry }) {
  return <div role="alert" className="ad:rounded-[24px] ad:border ad:border-red-100 ad:bg-gradient-to-r ad:from-red-50 ad:to-white ad:p-6 ad:shadow-sm"><div className="ad:flex ad:items-start ad:gap-4"><span className="ad:grid ad:h-10 ad:w-10 ad:shrink-0 ad:place-items-center ad:rounded-xl ad:bg-red-100 ad:text-red-600"><FiAlertCircle size={20} /></span><div><p className="ad:m-0 ad:font-semibold ad:text-slate-900">Could not load data</p><p className="ad:mt-2 ad:mb-4 ad:break-words ad:text-sm ad:text-red-700">{error?.message}</p>{onRetry && <Button onClick={onRetry}><FiRefreshCw size={15} />Try again</Button>}</div></div></div>;
}
