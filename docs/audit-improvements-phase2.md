# Audit Improvements — Phase 2

## Summary
Second batch of improvements focusing on visual polish, UX enhancements, and code quality.

## Changes Made

### 1. TextReveal Animation (was a no-op, now functional)
- **File:** `src/components/animations/text-reveal.tsx`
- Split text into individual words, each animated with GSAP on scroll
- Words fade in + translate up with stagger (0.08s per word)
- Triggered when element enters viewport (top 85%)
- Respects `prefers-reduced-motion` (renders instantly)
- Used on Artist and Studio hero headings

### 2. Page Transitions
- **New file:** `src/components/animations/page-transition.tsx`
- **Updated:** `src/components/providers.tsx`
- Subtle fade + slide-up (8px) on route changes
- Uses Framer Motion `key={pathname}` for automatic transitions
- Skipped entirely for reduced-motion users
- Duration: 0.3s with smooth cubic-bezier easing

### 3. Portfolio Detail — Prev/Next + Breadcrumb
- **Files:** `src/components/portfolio/portfolio-detail.tsx`, `src/app/portfolio/[slug]/page.tsx`
- Added breadcrumb navigation: Portfolio > Category > Title
- Category in breadcrumb links to filtered portfolio view (`?category=`)
- Added Previous/Next piece navigation at bottom of detail page
- Arrows with hover translate animation matching site style
- Removed old "Back to Portfolio" link (replaced by breadcrumb)

### 4. Form Error Auto-Scroll
- **File:** `src/components/contact/inquiry-form.tsx`
- On validation failure, page scrolls to the first invalid field
- Field is focused after scroll completes
- Uses `scrollIntoView({ behavior: "smooth", block: "center" })`

### 5. Animation Timing Config
- **New file:** `src/lib/animation-config.ts`
- Centralized timing constants: `TIMING.fast`, `TIMING.normal`, `TIMING.slow`, `TIMING.stagger`
- Centralized easing curves: `EASING.default`, `EASING.smooth`, `EASING.bounce`
- Centralized scroll trigger positions: `SCROLL_TRIGGER.start`, `SCROLL_TRIGGER.earlyStart`
- Available for new components to import — existing components can be migrated incrementally

## Files Changed
- `src/components/animations/text-reveal.tsx` (rewritten)
- `src/components/animations/page-transition.tsx` (new)
- `src/components/providers.tsx`
- `src/components/portfolio/portfolio-detail.tsx`
- `src/app/portfolio/[slug]/page.tsx`
- `src/components/contact/inquiry-form.tsx`
- `src/lib/animation-config.ts` (new)

## Remaining Items (Phase 3)
- WebM video generation (requires ffmpeg tooling)
- OG image creation (requires design asset)
- Framer Motion bundle audit (larger effort, lower ROI)
