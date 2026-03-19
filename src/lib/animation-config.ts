// Centralized animation timing constants
// Used across GSAP and Framer Motion components for consistency

export const TIMING = {
  /** Fast micro-interactions (hover, focus) */
  fast: 0.2,
  /** Standard transitions (fade, slide) */
  normal: 0.4,
  /** Slower reveals (scroll animations, page transitions) */
  slow: 0.7,
  /** Stagger delay between sequential items */
  stagger: 0.08,
  /** Autoplay interval for carousels (ms) */
  autoplay: 5000,
  /** Preloader total duration */
  preloader: 1.8,
} as const;

export const EASING = {
  /** Standard ease for most animations */
  default: "power3.out",
  /** Smooth cubic bezier for CSS/Framer Motion */
  smooth: [0.25, 0.1, 0.25, 1] as const,
  /** Bouncy spring for playful elements */
  bounce: "back.out(1.7)",
} as const;

export const SCROLL_TRIGGER = {
  /** Default start position for scroll reveals */
  start: "top 85%",
  /** Earlier trigger for hero/ATF content */
  earlyStart: "top 95%",
} as const;
