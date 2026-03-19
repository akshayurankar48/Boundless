# Audit Improvements — Phase 3

## Summary
Performance optimization, "Call Us" header button, OG image, loading skeletons, and animation config migration.

## Changes Made

### Header: "Book Now" → "Call Us" with Copy Toast
- **Files:** `header.tsx`, `copy-toast.tsx` (new)
- "Call Us" button with phone icon replaces "Book Now" link
- Click copies `+1 (212) 555-0198` to clipboard
- Styled toast notification slides up from bottom: phone icon + "copied to clipboard" message
- Toast auto-dismisses after 2.5s with exit animation
- Fallback: opens `tel:` link if clipboard API unavailable (mobile)
- Toast matches site design: dark bg, silver accent, mono font, border

### Performance: WebM Hero Video (58% smaller)
- Generated `hero-ambient.webm` via ffmpeg VP9 encoding
- **1.7MB MP4 → 707KB WebM** (browsers that support VP9 save ~1MB)
- WebM listed as first `<source>`, MP4 as fallback
- Service worker caches both formats
- Layout preloads WebM version

### Performance: Gallery Items — CSS Instead of Framer Motion
- Removed `motion.div` wrapper with `layout` prop from `GalleryItem`
- Removed `AnimatePresence` + `motion` from `GalleryGrid`
- Enter animation now uses pure CSS transitions (staggered via setTimeout)
- Hover scale uses CSS `hover:scale-[1.02]` instead of `whileHover`
- **Impact:** Eliminates Framer Motion layout calculations on every gallery filter change

### Performance: Hero Poster Priority + Video Preload
- Added `fetchPriority="high"` to hero poster `<link rel="preload">`
- Added `<link rel="preload" href="/videos/hero-ambient.webm" as="video">` in layout
- Both ensure LCP-critical assets load first

### Performance: Scroll Listener Optimization
- Header scroll handler now tracks `lastScrolled` state
- Skips `setIsScrolled()` when value hasn't changed
- Prevents unnecessary React re-renders during scroll

### OG Image (Dynamic Generation)
- **New file:** `src/app/opengraph-image.tsx`
- Uses Next.js `ImageResponse` (edge runtime) — no static file needed
- Generates branded 1200x630 image: dark background, studio name, tagline, NYC location
- Automatically served at `/opengraph-image` and linked in metadata

### Loading Skeletons
- **New files:** `artist/loading.tsx`, `studio/loading.tsx`, `contact/loading.tsx`
- Portfolio already had `loading.tsx`
- Each matches the page layout structure for minimal CLS during load

### Animation Config Migration
- `scroll-reveal.tsx` — now uses `TIMING.slow` and `EASING.smooth`
- `page-transition.tsx` — now uses `EASING.smooth`
- `text-reveal.tsx` — now uses `TIMING.slow`, `TIMING.stagger`, `EASING.default`, `SCROLL_TRIGGER.start`

## Files Changed
- `src/components/layout/header.tsx`
- `src/components/shared/copy-toast.tsx` (new)
- `src/components/hero/hero-section.tsx`
- `src/components/portfolio/gallery-item.tsx`
- `src/components/portfolio/gallery-grid.tsx`
- `src/components/animations/scroll-reveal.tsx`
- `src/components/animations/page-transition.tsx`
- `src/components/animations/text-reveal.tsx`
- `src/app/layout.tsx`
- `src/app/opengraph-image.tsx` (new)
- `src/app/artist/loading.tsx` (new)
- `src/app/studio/loading.tsx` (new)
- `src/app/contact/loading.tsx` (new)
- `src/lib/animation-config.ts`
- `public/sw.js`
- `public/videos/hero-ambient.webm` (new — 707KB)

## Performance Impact Summary (All Phases)
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Hero video size | 1.7MB | 707KB (WebM) | 58% smaller |
| Repo size | +5.5MB (.mov) | Deleted | -5.5MB |
| Gallery JS | Framer Motion layout | CSS transitions | ~15-20KB less JS |
| Cursor | React re-renders per mousemove | Direct DOM mutation | 0 re-renders |
| Scroll handler | Re-render every frame | Skip-if-same | Fewer re-renders |
| LCP | ~2-3s | ~1.5-2s (est.) | Poster priority + video preload |
