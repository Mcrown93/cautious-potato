import { motion } from 'framer-motion';

/**
 * A simple skeleton used during route-level lazy loading. It roughly
 * approximates the layout of a typical page without revealing any content.
 * Using motion allows us to provide a reduced‐motion alternative on user
 * preference. The skeleton covers the viewport height to avoid layout
 * shifts when the real page loads. If you need per-page skeletons you can
 * extend this component or pass your own fallback to Suspense.
 */
export default function RouteSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-700 dark:text-slate-300">
      <motion.div
        className="w-10 h-10 rounded-full bg-slate-700/20 dark:bg-slate-600/20 mb-4"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-64 h-4 rounded bg-slate-700/20 dark:bg-slate-600/20 mb-2"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-48 h-4 rounded bg-slate-700/20 dark:bg-slate-600/20"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}