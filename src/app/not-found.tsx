"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-silver)]"
        >
          404 Error
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-bold text-[var(--text-primary)] md:text-7xl"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto mt-6 max-w-md text-base text-[var(--text-secondary)]"
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[var(--accent-silver)] px-8 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)]"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent-silver)]"
          >
            View Portfolio
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
