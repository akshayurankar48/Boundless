"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<"text" | "line" | "exit">("text");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const alreadyShown = sessionStorage.getItem("preloader-shown");
    if (alreadyShown) return;

    setIsVisible(true);
    document.body.style.overflow = "hidden";

    // Phase timing: text fade in (0.5s) -> line draw (0.3s) -> exit (0.6s)
    const lineTimer = setTimeout(() => setPhase("line"), 600);
    const exitTimer = setTimeout(() => setPhase("exit"), 1000);
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("preloader-shown", "true");
    }, 1800);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  const handleExitComplete = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Studio name */}
          <motion.span
            className="font-mono text-sm uppercase tracking-[0.35em] text-[var(--accent-silver,#B8B5AD)] md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" || phase === "line" ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            BOUNDDLESS TATTOOO STUDIO
          </motion.span>

          {/* Horizontal line */}
          <motion.div
            className="mt-4 h-px bg-[var(--accent-silver,#B8B5AD)]"
            initial={{ width: 0 }}
            animate={{
              width: phase === "line" || phase === "exit" ? 80 : 0,
              opacity: phase === "exit" ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
