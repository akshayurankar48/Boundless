"use client";

import { type ReactNode } from "react";

type Direction = "left" | "right" | "bottom" | "top";

type ClipPathRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
};

// Simple wrapper - no animations
export function ClipPathReveal({
  children,
  className,
}: ClipPathRevealProps) {
  return <div className={className}>{children}</div>;
}
