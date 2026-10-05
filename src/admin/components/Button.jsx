const variants = {
  primary: 'ad:border ad:border-rose-500 ad:bg-gradient-to-r ad:from-rose-500 ad:to-pink-500 ad:text-white ad:shadow-[0_12px_24px_-14px_rgba(225,29,99,.8)] ad:hover:from-rose-600 ad:hover:to-pink-600',
  secondary: 'ad:border ad:border-slate-200 ad:bg-white ad:text-slate-700 ad:shadow-sm ad:hover:border-rose-200 ad:hover:bg-rose-50/50',
  danger: 'ad:border ad:border-red-200 ad:bg-red-50 ad:text-red-700 ad:hover:bg-red-100',
  ghost: 'ad:border ad:border-transparent ad:bg-transparent ad:text-slate-600 ad:hover:bg-slate-100',
};

export default function Button({ children, variant = 'secondary', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`ad:inline-flex ad:items-center ad:justify-center ad:gap-2 ad:rounded-xl ad:px-4 ad:py-2.5 ad:text-sm ad:font-semibold ad:transition-all ad:duration-200 ad:hover:-translate-y-0.5 ad:focus-visible:outline-2 ad:focus-visible:outline-offset-2 ad:focus-visible:outline-rose-500 ad:disabled:translate-y-0 ad:disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
