import type { ElementType } from "react";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
}: TextRevealProps) {
  // Simple render — no opacity animation, no hydration issues, instant visibility
  return (
    <Tag className={className}>
      {text}
    </Tag>
  );
}
