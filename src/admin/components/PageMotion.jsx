import { motion, useReducedMotion } from 'framer-motion';

export default function PageMotion({ children, className = '' }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }}>{children}</motion.div>;
}
