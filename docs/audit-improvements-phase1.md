# Audit Improvements — Phase 1

## Summary
First batch of improvements from the comprehensive site audit. Focused on P0 (critical) and P1 (high priority) fixes across performance, accessibility, and UX.

## Changes Made

### P0 — Critical (Done)

1. **Video preload fix** (`hero-section.tsx`)
   - Changed `preload="none"` to `preload="metadata"` — video metadata + first frames now download immediately, reducing playback delay by 1-3s

2. **Deleted unused .mov file** (`public/videos/hero-ambient.mov`)
   - Removed 5.5MB file that served no web purpose
   - Removed from service worker precache list

3. **Mobile menu accessibility** (`header.tsx`)
   - Added close button (X) at top-right of mobile menu overlay
   - Added Escape key handler to close menu
   - Added `role="dialog"`, `aria-modal="true"`, `aria-controls` attributes
   - Focus auto-moves to close button when menu opens
   - Focus returns to hamburger toggle when menu closes
   - Body scroll locked when menu is open

### P1 — High Priority (Done)

4. **Hero static import** (`page.tsx`)
   - Changed HeroSection from `dynamic()` to static import — eliminates waterfall for above-the-fold content, faster first paint

5. **Reduced motion: disable video** (`hero-section.tsx`)
   - Users with `prefers-reduced-motion` now see the poster/fallback image instead of autoplay video — prevents vestibular distress

6. **Gallery filter URL sync** (`portfolio-content.tsx`)
   - Active category now syncs to URL: `/portfolio?category=blackwork`
   - Users can share/bookmark filtered views
   - Browser back/forward works with filter state
   - Added live region announcing filter results to screen readers

7. **Gallery filter ARIA** (`gallery-filter.tsx`)
   - Added `role="tablist"` / `role="tab"` semantic structure
   - Added `aria-selected` for active filter state
   - Added `aria-controls` linking to gallery grid panel

8. **Social links accessibility** (`social-links.tsx`)
   - Added "(opens in new window)" to aria-labels for external links

9. **Testimonials carousel announcements** (`testimonials.tsx`)
   - Added `aria-live="polite"` region announcing current slide position on changes

### P2 — Medium Priority (Done)

10. **Image error fallback** (`gallery-item.tsx`)
    - Error placeholder now shows item title alongside "Image unavailable"

11. **Service worker upgrade** (`sw.js`)
    - Images now use stale-while-revalidate (serve cached, update in background)
    - Fonts/videos/static chunks remain cache-first (immutable)
    - Bumped cache version to v2

12. **CSP hardening** (`next.config.ts`)
    - Removed `'unsafe-eval'` from script-src (not needed by modern React/Next.js)
    - Removed `.mov` from static asset cache pattern

13. **Error boundary** (`error.tsx`)
    - Added root-level error boundary with "Try Again" and "Go Home" actions
    - Styled to match site design system

## Files Changed
- `src/components/hero/hero-section.tsx`
- `src/components/layout/header.tsx`
- `src/app/page.tsx`
- `src/components/portfolio/portfolio-content.tsx`
- `src/components/portfolio/gallery-filter.tsx`
- `src/components/portfolio/gallery-item.tsx`
- `src/components/shared/social-links.tsx`
- `src/components/sections/testimonials.tsx`
- `public/sw.js`
- `next.config.ts`
- `src/app/error.tsx` (new)

## Files Deleted
- `public/videos/hero-ambient.mov` (5.5MB saved)

## Expected Impact
- **LCP**: ~0.5-1s improvement from video preload + static hero import
- **Accessibility**: Score increase from ~85 to ~95+ (mobile menu, filters, ARIA)
- **Bundle**: 5.5MB repo size reduction
- **Security**: Tighter CSP (removed unsafe-eval)
- **UX**: Shareable portfolio filter URLs, proper mobile menu close behavior
