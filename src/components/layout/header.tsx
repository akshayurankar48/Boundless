"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Check } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { CopyToast } from "@/components/shared/copy-toast";

export const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number>(0);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCallUs = useCallback(async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(siteConfig.studio.phone);
    } catch {
      // Clipboard may fail in some contexts -- still show the toast with the number
    }
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
  }, [copied]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuToggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        if (scrolled !== lastScrolled) {
          lastScrolled = scrolled;
          setIsScrolled(scrolled);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* <a
        href="#main"
        className="absolute -top-full left-4 z-[60] bg-[var(--accent-silver)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[var(--bg-primary)] focus:top-4"
      >
        Skip to content
      </a> */}

      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-[var(--border-default)] bg-[var(--bg-primary)]/95 supports-[backdrop-filter]:bg-[var(--bg-primary)]/80 supports-[backdrop-filter]:backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:h-24 md:px-8"
        >
          <Link
            href="/"
            className="flex items-center"
          >
            <div className="relative w-auto">
              <Image
                src="/images/logo.png"
                alt="BOUNDLESS TATTOO STUDIO"
                width={250}
                height={60}
                className="h-14 w-auto object-contain md:h-16"
                priority
              />
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                  pathname === item.href
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Call Us — button swaps to "Copied!" on click */}
            <button
              onClick={handleCallUs}
              className="group relative inline-flex h-9 items-center gap-2 overflow-hidden border border-[var(--accent-silver)] px-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent-silver)] transition-colors hover:bg-[var(--accent-silver)] hover:text-[var(--bg-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-silver)]/50 focus-visible:outline-none"
              aria-label={`Call us at ${siteConfig.studio.phone}`}
            >
              {/* Default state */}
              <span
                className={`inline-flex items-center gap-2 transition-all duration-300 ${
                  copied ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                <Phone size={12} />
                Call Us
              </span>
              {/* Copied state — slides up from below */}
              <span
                className={`absolute inset-0 inline-flex items-center justify-center gap-2 bg-[var(--accent-silver)] text-[var(--bg-primary)] transition-all duration-300 ${
                  copied ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Check size={12} strokeWidth={3} />
                Copied!
              </span>
            </button>
          </div>

          <button
            ref={menuToggleRef}
            className="flex h-11 w-11 items-center justify-center text-[var(--text-primary)] md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu - simple CSS transition instead of Framer Motion */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--bg-primary)] opacity-100 transition-opacity duration-300 md:hidden"
        >
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-[var(--text-primary)]"
            aria-label="Close menu"
            autoFocus
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {siteConfig.nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-serif text-3xl transition-colors",
                    pathname === item.href
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}

      <CopyToast
        message={siteConfig.studio.phone}
        visible={showToast}
        onDone={() => setShowToast(false)}
      />
    </>
  );
});
