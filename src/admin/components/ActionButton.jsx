import { FiEdit2, FiEye, FiLoader, FiTrash2 } from 'react-icons/fi';

const styles = {
  view: 'ad:border-slate-200 ad:bg-white ad:text-slate-600 ad:hover:border-slate-300 ad:hover:bg-slate-50 ad:hover:text-slate-900',
  edit: 'ad:border-rose-200 ad:bg-rose-50/80 ad:text-rose-600 ad:hover:border-rose-300 ad:hover:bg-rose-100 ad:hover:text-rose-700',
  delete: 'ad:border-red-100 ad:bg-red-50/70 ad:text-red-600 ad:hover:border-red-200 ad:hover:bg-red-100/80 ad:hover:text-red-700',
};
const icons = { view: FiEye, edit: FiEdit2, delete: FiTrash2 };

export default function ActionButton({ action, label, onClick, disabled = false, loading = false }) {
  const Icon = icons[action];
  return <button type="button" title={label} aria-label={label} aria-busy={loading || undefined} onClick={onClick} disabled={disabled || loading} className={`ad:inline-flex ad:h-10 ad:w-10 ad:shrink-0 ad:items-center ad:justify-center ad:rounded-xl ad:border ad:shadow-[0_3px_9px_-6px_rgba(38,43,65,.35)] ad:transition-[transform,background-color,border-color,color,box-shadow,opacity] ad:duration-200 ad:ease-out ad:hover:scale-[1.04] ad:hover:shadow-[0_8px_16px_-10px_rgba(38,43,65,.4)] ad:active:scale-[.98] ad:disabled:scale-100 ad:disabled:cursor-not-allowed ad:disabled:opacity-45 ad:disabled:shadow-none ${styles[action]}`}>
    {loading ? <FiLoader size={16} className="ad:animate-spin" /> : <Icon size={16} />}
  </button>;
}
