"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type CurtainTransitionProps = {
  children: React.ReactNode;
};

export function CurtainTransition({ children }: CurtainTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>

        {/* Curtain overlay — slides in on exit, slides out on enter */}
        <motion.div
          className="fixed inset-0 z-50 bg-[var(--bg-primary)] backdrop-blur-[4px]"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ scaleX: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          style={{ transformOrigin: "right" }}
        />

        {/* Second curtain layer for depth */}
        <motion.div
          className="fixed inset-0 z-40 bg-[var(--bg-secondary)] backdrop-blur-[4px]"
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            scaleX: 1,
            transition: { duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ transformOrigin: "right" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
