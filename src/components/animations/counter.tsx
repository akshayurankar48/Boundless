"use client";

type CounterProps = {
  target: number | string;
  duration?: number;
  suffix?: string;
  className?: string;
};

function parseTarget(target: number | string): { num: number; suffix: string } {
  if (typeof target === "number") {
    return { num: target, suffix: "" };
  }
  const match = target.match(/^([\d,]+)(.*)/);
  if (match) {
    return {
      num: parseInt(match[1].replace(/,/g, ""), 10),
      suffix: match[2],
    };
  }
  return { num: 0, suffix: target };
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// Simple counter - shows value immediately, no animation
export function Counter({
  target,
  suffix: suffixProp,
  className,
}: CounterProps) {
  const { num, suffix: parsedSuffix } = parseTarget(target);
  const suffix = suffixProp ?? parsedSuffix;

  return (
    <span className={className}>
      {formatNumber(num)}
      {suffix}
    </span>
  );
}
