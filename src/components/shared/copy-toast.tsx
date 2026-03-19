"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

type CopyToastProps = {
  message: string;
  visible: boolean;
  onDone: () => void;
};

export function CopyToast({ message, visible, onDone }: CopyToastProps) {
  const [show, setShow] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!visible) {
      setShow(false);
      return;
    }
    setShow(true);
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 3000);
    const cleanupTimer = setTimeout(() => {
      onDoneRef.current();
    }, 3300);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, [visible]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ease-out ${
        show
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 border border-[var(--accent-silver)]/20 bg-[var(--bg-secondary)]/95 px-6 py-3.5 backdrop-blur-lg">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-silver)] transition-transform duration-500 ${
            show ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: show ? "150ms" : "0ms" }}
        >
          <Check size={12} strokeWidth={3} className="text-[var(--bg-primary)]" />
        </span>
        <div className="flex flex-col">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-primary)]">
            Number copied
          </p>
          <p className="font-mono text-[10px] tracking-wider text-[var(--accent-silver)]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
