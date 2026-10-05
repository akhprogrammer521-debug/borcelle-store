import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Modal({ title, children, onClose, footer, wide = false }) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    panelRef.current?.focus();
    return () => previous?.focus();
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === focusable[0] || document.activeElement === panelRef.current)) {
        event.preventDefault();
        focusable.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.17 }} className="ad:fixed ad:inset-0 ad:z-50 ad:flex ad:items-center ad:justify-center ad:bg-slate-950/55 ad:p-4 ad:backdrop-blur-[3px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.section ref={panelRef} tabIndex={-1} initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.99 }} transition={{ duration: 0.2, ease: 'easeOut' }} role="dialog" aria-modal="true" aria-label={title} className={`admin-panel ad:flex ad:max-h-[90vh] ad:w-full ad:flex-col ad:overflow-hidden ad:rounded-[26px] ad:border ad:border-white/70 ad:bg-white ad:shadow-2xl ad:outline-none ${wide ? 'ad:max-w-3xl' : 'ad:max-w-xl'}`}>
        <div className="ad:flex ad:items-center ad:justify-between ad:border-b ad:border-slate-100 ad:bg-gradient-to-r ad:from-rose-50/90 ad:to-white ad:px-6 ad:py-5">
          <h2 className="ad:m-0 ad:text-lg ad:font-semibold ad:text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="ad:rounded-lg ad:p-2 ad:text-slate-500 ad:hover:bg-slate-100"><FiX size={20} /></button>
        </div>
        <div className="ad:overflow-y-auto ad:px-6 ad:py-6">{children}</div>
        {footer && <div className="ad:flex ad:flex-wrap ad:justify-end ad:gap-2 ad:border-t ad:border-slate-100 ad:px-6 ad:py-4">{footer}</div>}
      </motion.section>
    </motion.div>
  );
}
