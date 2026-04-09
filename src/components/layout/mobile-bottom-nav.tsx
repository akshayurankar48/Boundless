"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Image, Building2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Portfolio", href: "/portfolio", icon: Image },
  { label: "Studio", href: "/studio", icon: Building2 },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-default)] bg-[var(--bg-primary)]/95 supports-[backdrop-filter]:bg-[var(--bg-primary)]/80 supports-[backdrop-filter]:backdrop-blur-md md:hidden"
    >
      <div className="flex items-center justify-around py-2 safe-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 transition-all",
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)]"
              )}
            >
              <item.icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className={cn(
                  "transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {item.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <span className="h-1 w-1 rounded-full bg-[var(--accent-silver)]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
