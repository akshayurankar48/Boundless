# PRD: Tattoo Studio Website

> **Version**: 2.0 (Post-Interview)
> **Date**: 2026-03-16
> **Status**: Approved — Ready for Implementation
> **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, GSAP
> **IDE**: Google Antigravity + Claude Code (Opus 4.6)
> **Timeline**: No rush — maximize quality
> **Deployment**: Vercel

---

## 0. Interview Decisions Summary

| Decision | Choice |
|----------|--------|
| **Project type** | Real tattoo studio website |
| **Artist setup** | Solo artist |
| **Studio branding** | Placeholder name for now (e.g. "VANGUARD INK") — real name swapped in later |
| **Tattoo specialty** | Black & gray realism |
| **Content status** | No content yet — build entirely with high-quality placeholder images/text |
| **Design direction** | Mix the best of all Stitch refs: Vanguard's cinematic drama + Studio 2026's gold luxury palette + Obsidian's mobile-native feel |
| **Accent color** | Warm silver (#B8B5AD) — monochromatic, editorial, artwork is the only visual focus |
| **Typography** | Mix: Playfair Display (serif headlines) + Inter (body) + Space Grotesk (nav/labels) |
| **Theme** | Dark only — no light mode toggle |
| **Domain** | None yet — build on Vercel preview URL, domain connected later |
| **Hero section** | Muted background video + GSAP-powered text timeline (logo → tagline types in → CTA slides up) |
| **Portfolio scroll** | Staggered parallax grid — each row/column at different scroll speeds, images revealed via clip-path |
| **Page transitions** | Curtain/wipe effect via Framer Motion (dark overlay sweeps across between routes) |
| **Custom cursor** | Yes — magnetic dot cursor on desktop, grows on interactive hover. Standard on mobile/touch. |
| **Animation level** | Tasteful & premium — smooth scroll reveals, elegant transitions, subtle hovers. Not a tech demo. |
| **Mobile experience** | App-like — bottom navigation bar, swipe gestures, mobile-specific gallery layouts |
| **Image strategy** | Speed first — compressed thumbnails in grid, full-res only in lightbox/detail view |
| **Contact form** | Essential only — name, email, tattoo idea, placement dropdown, submit |
| **Instagram** | Curated static grid (6-8 hand-picked posts) with "Follow" CTA. No API dependency. |
| **Special sections** | Clinical Standards / safety trust section (like Studio 2026's "Absolute Safety") |
| **Booking flow** | Single-page form (Phase 1). Multi-step wizard deferred to Phase 2. |
| **Hosting** | Vercel |

### Design Reference Sources (Stitch Export)
All 17 design references stored in `design-ref/stitch_home_the_manifesto/`:
- `home_the_manifesto_2026_edition` — Homepage with gold palette, bento featured works, clinical standards
- `vanguard_home_motion_edition` — Cinematic hero, portfolio section, philosophy, residency CTA
- `vanguard_the_collective_motion_edition` — Artists page with parallax hero, philosophy, precision/permanence details
- `artists_the_collective` — Multi-artist grid with booking status badges, "Join the Collective" CTA
- `artists_the_silver_collective` — Cool slate artists page with filtering tabs, collective status cards
- `booking_the_consult` — Multi-step booking wizard with body map, image upload, policy sidebar
- `vanguard_the_terminal_motion_edition` — Booking concierge (concept step), reference upload, portfolio below
- `collections_the_archive` — Portfolio grid with style filters (Blackwork, Realism, Fine Line, Japanese)
- `collections_the_archive_2026_edition` — "Masterworks Curated" portfolio with pagination
- `home_the_silver_era_mobile` — Mobile homepage: "The Obsidian Era", ethos section, featured gallery
- `vanguard_home_mobile_motion` — Mobile homepage: "The New Standard", private gallery, distinguished voices
- `vanguard_the_vault_mobile` — Mobile portfolio vault with search, series cards, bottom tab nav
- `vanguard_the_collective_mobile` — Mobile artists listing
- `vanguard_the_terminal_booking` — Desktop terminal-style booking
- `collections_the_silver_archive_mobile` — Mobile archive/portfolio
- `artists_the_silver_collective_mobile` — Mobile artist collective

---

## 1. Vision & Objectives

### Vision
Build an award-worthy tattoo studio website that feels like walking into a premium art gallery — dark, immersive, and unforgettable. Every pixel should serve the artwork. Every interaction should build trust.

### Primary Objectives
- **Showcase artwork** as the #1 priority — tattoo images drive 90%+ of client decisions
- **Convert visitors to inquiries** — clear CTAs, frictionless contact flow
- **Establish artist credibility** — personality, process, and professionalism
- **Deliver sub-2s load times** — even with image-heavy galleries
- **Score 90+ on Lighthouse** across all categories
- **Win design recognition** — Awwwards, CSS Design Awards caliber

### Success Metrics
| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| Mobile bounce rate | < 40% |
| Inquiry form conversion | > 5% of visitors |
| Portfolio engagement (scroll depth) | > 70% |

---

## 2. Competitive Analysis & Design Research

### Reference Websites (Award-Winning Tattoo & Portfolio Sites)
- **Bang Bang NYC** — clean grid, artist-first, booking integrated
- **Dr. Woo** — minimal, Instagram-native aesthetic, full-bleed imagery
- **Sacred Geometry Tattoo** — dark luxury, scroll storytelling
- **Sang Bleu** — editorial layout, typographic hierarchy
- **Award-winning creative portfolios** on Awwwards, Stitch, Webflow

### UX Patterns That Convert (Tattoo Industry)
1. **Full-bleed hero with portfolio teaser** — immediate visual impact
2. **Grid-to-lightbox gallery** — browse fast, inspect detail
3. **Before/after or healed shots** — builds trust in quality
4. **Simple inquiry form** — name, email, idea description, placement, reference images
5. **Process explainer** — reduces anxiety for first-timers (consultation → design → session → aftercare)
6. **Social proof strip** — Instagram feed, review quotes, client count
7. **Sticky CTA** — "Book a Consultation" always visible on mobile

### Visual Design Trends (2026 Creative Portfolios)
- Ultra-dark backgrounds (#0A0A0A, not pure black) with warm accent tones
- Large serif or display typography for headings
- Generous whitespace (or "darkspace") — let artwork breathe
- Subtle grain/noise texture overlays for depth
- Scroll-triggered reveals and parallax on images
- Magnetic cursor effects on hover
- Smooth page transitions (no hard navigations)
- Horizontal scroll sections for galleries
- Video backgrounds in hero (studio ambience)
- Bento grid layouts for portfolio showcases

---

## 3. Site Architecture & Page Structure

### Sitemap

```
/                          → Homepage
/studio                    → Studio environment, location, vibe
/artist                    → Solo artist profile, bio, philosophy
/portfolio                 → Full tattoo gallery with filtering
/portfolio/[slug]          → Individual tattoo detail page
/contact                   → Contact form + studio info
/booking                   → Consultation request flow (optional Phase 2)
```

### Homepage Sections (Scroll Order)

| # | Section | Purpose | Key Animation |
|---|---------|---------|---------------|
| 1 | **Hero** | Muted background video + GSAP text timeline (logo → tagline → CTA) | GSAP timeline sequence |
| 2 | **Featured Work** | 4-6 curated pieces in staggered parallax grid | GSAP clip-path reveals + parallax |
| 3 | **Artist Intro** | Large portrait, short bio, philosophy — personal connection | Framer `whileInView` fade-up |
| 4 | **Portfolio Carousel** | Horizontal scroll showcase of recent work | GSAP ScrollTrigger horizontal scrub |
| 5 | **Clinical Standards** | Safety trust section: autoclave, single-use, certified. Like Studio 2026's "Absolute Safety" | Framer staggered card reveal |
| 6 | **Process** | 4-step visual: Consult → Design → Ink → Heal | GSAP number counters + step reveal |
| 7 | **Testimonials** | Client quotes with subtle animations | Framer carousel with spring physics |
| 8 | **Studio** | Environment photos, atmosphere, location teaser | GSAP parallax image gallery |
| 9 | **Instagram** | Curated static grid (6-8 posts) with "Follow" CTA | Framer staggered grid reveal |
| 10 | **CTA Banner** | "Ready to Get Inked?" with contact link | GSAP text reveal |
| 11 | **Footer** | Links, social icons, studio hours, address | — |

### Page Details

#### Homepage (`/`)
- Full viewport hero with looping muted background video (artist tattooing, studio ambiance)
- Video poster image for instant display before video loads
- GSAP-powered text timeline: logo fades in → tagline types/reveals character-by-character → CTA button slides up with spring
- Scroll indicator animation (subtle bouncing chevron)
- All below-fold sections revealed via scroll-triggered GSAP animations
- Staggered parallax grid for featured work (different scroll speeds per image)
- Clinical Standards section with trust badges (autoclave, single-use, certified)
- Mobile: bottom navigation bar, sticky CTA, touch-optimized gallery

#### Studio Page (`/studio`)
- Parallax image gallery of studio interior
- Google Maps embed or custom styled map
- Studio hours, hygiene standards, atmosphere description
- Photo gallery of workspace, tools, environment

#### Artist Page (`/artist`)
- Large portrait photo with parallax
- Bio narrative — story, training, philosophy, specialties
- Style showcase (e.g., blackwork, fine line, neo-traditional)
- Timeline/milestones (optional)
- Link to full portfolio

#### Portfolio Page (`/portfolio`)
- Masonry or staggered grid layout
- Filter by style/category (tags: blackwork, color, fine line, geometric, etc.)
- Lightbox view with swipe navigation
- Lazy-loaded images with blur-up placeholders
- Infinite scroll or "Load More" with smooth animation

#### Portfolio Detail (`/portfolio/[slug]`)
- Full-screen image with zoom capability
- Tattoo metadata: style, placement, session time, date
- Artist's note / story behind the piece
- Related work carousel
- CTA: "Want something similar?"

#### Contact Page (`/contact`)
- **Essential inquiry form**: name, email, tattoo idea (textarea), placement area (dropdown), submit button
- No image upload, no date picker — minimal friction, maximum conversion
- Studio address with dark-themed Mapbox map
- Direct email and phone
- Social media links
- FAQ accordion (pain, pricing, aftercare, etc.)
- Success state: animated confirmation with "We'll be in touch within 24 hours"

---

## 4. Design System

### Color Palette

```
Background:
  --bg-primary:     #0A0A0A    (near-black)
  --bg-secondary:   #141414    (card surfaces)
  --bg-elevated:    #1A1A1A    (hover states, modals)

Text:
  --text-primary:   #F5F5F0    (warm white — headlines, primary content)
  --text-secondary: #A3A3A0    (muted descriptions)
  --text-tertiary:  #6B6B68    (labels, captions)

Accent (monochromatic warm silver):
  --accent:         #B8B5AD    (primary accent — warm silver)
  --accent-hover:   #D4D1C9    (hover/active state — lighter warm gray)
  --accent-muted:   #8A8880    (subtle accent — borders, dividers)

Functional:
  --success:        #4ADE80
  --error:          #F87171
  --border:         #262626
  --border-hover:   #3A3A3A

Philosophy: Fully monochromatic. The tattoo artwork is the ONLY color on the site.
No gold, no orange, no blue. Black → gray → warm white spectrum only.
```

### Typography

```
Headings:     "Playfair Display" or "Cormorant Garamond" (serif, editorial feel)
Body:         "Inter" or "Satoshi" (clean sans-serif, excellent readability)
Accent/Nav:   "Space Grotesk" or "JetBrains Mono" (modern, technical edge)

Scale (fluid, clamp-based):
  Display:    clamp(2.5rem, 5vw + 1rem, 5rem)     — hero headlines
  H1:         clamp(2rem, 4vw + 0.5rem, 3.5rem)    — page titles
  H2:         clamp(1.5rem, 3vw + 0.5rem, 2.5rem)  — section titles
  H3:         clamp(1.25rem, 2vw + 0.5rem, 1.75rem) — subsection
  Body:       clamp(1rem, 1.2vw + 0.5rem, 1.125rem) — paragraphs
  Small:      0.875rem                               — captions, labels
  Micro:      0.75rem                                — tags, badges
```

### Spacing System

```
Based on 4px grid:
  --space-1:   4px     (micro gaps)
  --space-2:   8px     (tight padding)
  --space-3:   12px    (compact spacing)
  --space-4:   16px    (base unit)
  --space-6:   24px    (component padding)
  --space-8:   32px    (section gaps)
  --space-12:  48px    (section padding)
  --space-16:  64px    (major section breaks)
  --space-24:  96px    (hero-level spacing)
  --space-32:  128px   (page section spacing)
```

### Responsive Grid

```
Container:    max-w-7xl (1280px), with px-4 mobile / px-8 desktop
Columns:      12-column grid (CSS Grid)
Breakpoints:  Tailwind defaults (sm:640, md:768, lg:1024, xl:1280, 2xl:1536)
Gallery grid: 2 col mobile → 2-3 col tablet → 3-4 col desktop
```

### Mobile-Specific Architecture (App-Like)

```
Mobile Navigation:
  - Bottom tab bar (fixed) with 4-5 tabs: Home, Portfolio, Studio, Artist, Contact
  - Hamburger menu REPLACED by bottom nav (like Obsidian & Vanguard Vault refs)
  - Active tab indicator with subtle animation
  - Safe area padding for notched devices

Mobile Gallery:
  - Swipe-enabled horizontal carousels (Framer Motion drag)
  - 2-column staggered grid (like Vanguard Vault ref)
  - Full-screen lightbox with pinch-to-zoom and swipe navigation
  - Pull-to-refresh feel on portfolio page

Mobile Hero:
  - Video autoplays (muted) on wifi, poster image on cellular/slow connection
  - Text scaled down, single CTA button
  - Swipe indicator instead of scroll indicator

Mobile Animations:
  - Reduced parallax intensity (0.2x vs 0.5x on desktop)
  - No magnetic cursor (touch devices)
  - Simpler page transitions (faster wipe, ~400ms)
  - Hardware-accelerated transforms only
```

### Component Library (shadcn/ui Base)

| Component | Usage |
|-----------|-------|
| Button | Primary (gold accent), Secondary (outline), Ghost |
| Dialog/Drawer | Lightbox, mobile menu |
| Sheet | Mobile navigation |
| Accordion | FAQ sections |
| Carousel | Testimonials, related work |
| Badge | Tattoo style tags |
| Input/Textarea | Contact form fields |
| Skeleton | Image loading states |
| Separator | Section dividers |
| Tooltip | UI hints |

### Visual Treatments
- **Grain overlay**: CSS noise filter at 3-5% opacity on backgrounds
- **Image treatment**: Slight desaturation on grid, full color on hover/focus
- **Border radius**: 0px for images (sharp, editorial), 8px for cards/buttons
- **Shadows**: Minimal — rely on elevation via background color shifts
- **Dividers**: Thin 1px lines using `--border` color, or gradient fade-outs

---

## 5. Animation Strategy

### Philosophy
Animations serve the artwork — never compete with it. Every animation should feel intentional, performant, and enhance storytelling. No animation for animation's sake.

### Framer Motion — UI Layer

| Use Case | Animation | Details |
|----------|-----------|---------|
| **Page transitions** | Curtain/wipe effect | Dark overlay sweeps across screen between routes via `AnimatePresence`. Theatrical but fast (~600ms). |
| Navigation | Staggered menu items | 50ms stagger on mobile bottom nav / slide-out menu |
| Hover states | Scale + brightness | Images: scale(1.03), buttons: subtle lift |
| Loading states | Skeleton pulse | Consistent loading patterns |
| Modal/lightbox | Spring-based enter/exit | `type: "spring", damping: 25` |
| Gallery filter | Layout animation | Smooth reflow when filtering categories |
| Card reveals | `whileInView` fade-up | Staggered card appearances (Clinical Standards, process steps) |
| Micro-interactions | Tap feedback, toggle states | Button press, form focus |
| **Shared layout** | `layoutId` on portfolio items | Portfolio grid image smoothly morphs to detail page hero when navigating |

### GSAP — Scroll & Storytelling Layer

| Use Case | Technique | Details | Priority |
|----------|-----------|---------|----------|
| **Hero video + text timeline** | GSAP timeline + SplitText | Video plays → logo fades → tagline reveals char-by-char → CTA slides up with spring | P0 — defines the site |
| **Staggered parallax grid** | ScrollTrigger + transform | Featured work / portfolio: each row scrolls at different speeds, images revealed via animated clip-path | P0 — core gallery |
| **Magnetic cursor** | GSAP quickTo + event listeners | Custom dot cursor, grows on hover, magnetically snaps to buttons/links. Desktop only. | P1 — polish |
| Hero background | Parallax + slow zoom | Video container moves at 0.5x scroll speed, subtle zoom on scroll | P0 |
| Section reveals | ScrollTrigger batch | Fade-up + translate as sections enter viewport | P0 |
| Horizontal scroll | ScrollTrigger pin + scrub | Homepage portfolio carousel scrolls horizontally | P1 |
| Image reveals | Clip-path wipe | Images revealed via animated clip-path as they scroll into view | P0 |
| Text animations | SplitText + stagger | Section heading reveals on scroll | P1 |
| Number counters | Tween countUp | Stats section: "500+ tattoos", "10 years experience" | P2 |
| Progress indicator | ScrollTrigger | Scroll progress bar on portfolio detail pages | P2 |

### Why Two Libraries

| Concern | Framer Motion | GSAP |
|---------|--------------|------|
| React integration | Native, declarative | Requires refs + useEffect |
| Scroll-driven | Basic `whileInView` | Advanced ScrollTrigger, pinning, scrub |
| Text splitting | Not built-in | SplitText plugin |
| Performance at scale | Good for UI | Superior for complex timelines |
| Page transitions | Built-in AnimatePresence | Possible but more manual |
| Horizontal scroll | Not ideal | Excellent with ScrollTrigger |

**Rule**: Framer Motion for component-level UI interactions. GSAP for scroll-based storytelling, complex timelines, and effects requiring fine-grained control.

### Performance Guardrails
- All animations respect `prefers-reduced-motion`
- No layout thrashing — use `transform` and `opacity` only
- GSAP animations killed on component unmount (cleanup refs)
- Debounce scroll handlers
- Use `will-change` sparingly and remove after animation completes
- Target 60fps — test on mid-range mobile devices

---

## 6. Technical Architecture

### Folder Structure

```
tattoo-studio/
├── public/
│   ├── fonts/                    # Self-hosted fonts (Playfair, Inter, etc.)
│   ├── images/
│   │   ├── hero/                 # Hero backgrounds, video poster
│   │   ├── studio/               # Studio environment photos
│   │   └── og/                   # Open Graph images
│   └── videos/
│       └── hero-ambient.mp4      # Hero background video
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx              # Homepage
│   │   ├── studio/
│   │   │   └── page.tsx
│   │   ├── artist/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx          # Gallery grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual piece
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── booking/              # Phase 2
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts      # Email inquiry handler (Resend)
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives
│   │   ├── layout/
│   │   │   ├── header.tsx        # Desktop navigation bar
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-bottom-nav.tsx  # App-like bottom tab bar (Home, Portfolio, Studio, Artist, Contact)
│   │   │   └── page-transition.tsx    # Framer Motion curtain/wipe wrapper
│   │   ├── hero/
│   │   │   ├── hero-section.tsx
│   │   │   ├── hero-headline.tsx # GSAP SplitText headline
│   │   │   └── hero-video.tsx    # Background video component
│   │   ├── portfolio/
│   │   │   ├── gallery-grid.tsx  # Masonry/staggered grid
│   │   │   ├── gallery-item.tsx  # Individual image card
│   │   │   ├── gallery-filter.tsx # Category filter bar
│   │   │   ├── gallery-lightbox.tsx
│   │   │   └── horizontal-scroll.tsx # GSAP horizontal scroll section
│   │   ├── artist/
│   │   │   ├── artist-intro.tsx
│   │   │   └── style-showcase.tsx
│   │   ├── sections/
│   │   │   ├── featured-work.tsx
│   │   │   ├── clinical-standards.tsx  # Safety trust section (autoclave, single-use, certified)
│   │   │   ├── process-steps.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── studio-preview.tsx
│   │   │   ├── instagram-grid.tsx      # Curated static grid (no API)
│   │   │   └── cta-banner.tsx
│   │   ├── contact/
│   │   │   ├── inquiry-form.tsx
│   │   │   ├── body-map-selector.tsx # Visual placement picker
│   │   │   └── image-upload.tsx
│   │   ├── animations/
│   │   │   ├── curtain-transition.tsx  # Framer Motion curtain/wipe page transition
│   │   │   ├── scroll-reveal.tsx      # Reusable scroll-triggered reveal
│   │   │   ├── text-reveal.tsx        # GSAP SplitText component
│   │   │   ├── parallax-image.tsx     # GSAP parallax wrapper
│   │   │   ├── clip-path-reveal.tsx   # GSAP clip-path image reveal
│   │   │   ├── magnetic-cursor.tsx    # Custom magnetic cursor (desktop only)
│   │   │   ├── staggered-grid.tsx     # GSAP parallax staggered grid
│   │   │   └── grain-overlay.tsx      # CSS noise texture
│   │   └── shared/
│   │       ├── section-heading.tsx
│   │       ├── image-with-loader.tsx # Blur-up progressive image
│   │       └── social-links.tsx
│   ├── lib/
│   │   ├── utils.ts              # cn() helper, general utils
│   │   ├── fonts.ts              # Next.js font configuration
│   │   ├── metadata.ts           # SEO metadata helpers
│   │   └── email.ts              # Email sending (Resend)
│   ├── hooks/
│   │   ├── use-gsap.ts           # GSAP initialization + cleanup
│   │   ├── use-scroll-trigger.ts # ScrollTrigger registration
│   │   ├── use-media-query.ts    # Responsive breakpoint hook
│   │   ├── use-reduced-motion.ts # Accessibility preference
│   │   └── use-intersection.ts   # Intersection Observer wrapper
│   ├── data/
│   │   ├── portfolio.ts          # Portfolio items (static data — placeholder for now)
│   │   ├── testimonials.ts       # Client testimonials
│   │   ├── process-steps.ts      # Booking process steps
│   │   ├── clinical-standards.ts # Safety/hygiene trust badges
│   │   ├── instagram-posts.ts    # Curated static Instagram grid data
│   │   └── site-config.ts        # Studio info, social links, hours
│   └── styles/
│       └── globals.css           # Tailwind directives, CSS variables, grain texture
├── .env.local                    # API keys, email config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

### Key Architectural Decisions

**Static-First, Progressively Enhanced**
- Portfolio data starts as static TypeScript files in `src/data/`
- Phase 2: migrate to headless CMS (Sanity/Contentful) with ISR
- Contact form is the only server-side endpoint initially
- Instagram grid is static data (no API, no caching needed)

**Image Architecture**
- Use Next.js `<Image>` with `sizes` prop for responsive loading
- Generate blur placeholders at build time (`plaiceholder` library)
- WebP/AVIF format with fallback via Next.js image optimization
- Gallery images served from Cloudinary or Imgix for on-the-fly transforms
- Sizes: thumbnail (400w), medium (800w), large (1200w), full (1920w)

**GSAP Registration**
- Register GSAP plugins (ScrollTrigger, SplitText) once in a provider component
- Custom `use-gsap` hook handles context creation and cleanup
- All GSAP animations wrapped in `useGSAP()` from `@gsap/react`
- Animations disabled when `prefers-reduced-motion: reduce`

**Email Handling**
- API route `/api/contact` receives form data
- Server-side validation with Zod
- Send via Resend API (or Nodemailer + SMTP)
- Rate limiting via Upstash Redis or in-memory store
- Auto-reply email to client with confirmation
- Notification email to artist with inquiry details

---

## 7. Performance & Quality Strategy

### Core Web Vitals

| Metric | Strategy |
|--------|----------|
| **LCP** | Preload hero image/video poster, use `priority` on above-fold images, optimize font loading with `font-display: swap` |
| **CLS** | Explicit `width`/`height` on all images, skeleton placeholders, reserve space for dynamic content |
| **INP** | Minimize JS on initial load, defer non-critical scripts, use `startTransition` for gallery filtering |

### Image Optimization
- **Format**: AVIF primary, WebP fallback, via Next.js image optimization or Cloudinary
- **Lazy loading**: Native `loading="lazy"` for below-fold, `priority` for hero
- **Blur-up**: Generate LQIP (Low Quality Image Placeholder) at build time
- **Responsive**: `srcset` with 400w, 800w, 1200w, 1920w breakpoints
- **Video**: Hero video compressed to < 2MB, poster image for instant display, `preload="metadata"`

### SEO Strategy
- Semantic HTML (proper heading hierarchy, landmarks)
- JSON-LD structured data (LocalBusiness, ImageGallery, Person)
- Dynamic `<meta>` per page via Next.js `generateMetadata`
- Open Graph images per page (auto-generated or custom)
- `sitemap.xml` and `robots.txt` via Next.js conventions
- Descriptive alt text on all portfolio images

### Accessibility (WCAG 2.2 AA)
- Color contrast ratios verified (gold on dark passes AA for large text)
- Focus indicators on all interactive elements
- Keyboard navigable lightbox and gallery
- `prefers-reduced-motion` respected — disable GSAP/Framer animations
- Form labels, error states, ARIA attributes
- Skip-to-content link
- Screen reader-friendly image descriptions

### Caching Strategy
```
Static pages:        ISR with 1 hour revalidation (or fully static)
Portfolio images:    CDN cached with immutable headers (Cloudinary/Vercel)
Instagram grid:      Static data, no caching needed
Fonts:               Self-hosted, immutable cache headers
CSS/JS:              Hashed filenames, long-term cache
```

---

## 8. AI-Assisted Development Workflow

### Antigravity + Claude Integration

**Planning Phase** (Antigravity Manager Surface)
- Use Gemini in plan mode for high-level task breakdown
- Claude Opus for deep architectural decisions and design system refinement

**Implementation Phase** (Claude Code via Antigravity)
- Claude Opus 4.6 for component implementation
- Parallel agents: one on layout, one on animations, one on API routes
- Skills from `.claude/` transferred to `.agent/skills/` for shared context

### AI Design Feedback Loops

| AI Capability | Application |
|---------------|-------------|
| **UX Critique** | Review each page layout against conversion best practices |
| **Accessibility Audit** | Automated WCAG analysis on every component |
| **Copy Optimization** | Refine headlines, CTAs, and microcopy for engagement |
| **Performance Review** | Analyze bundle size, image optimization, render patterns |
| **Code Review** | Automated review after each major component is built |
| **Animation Review** | Ensure animations serve UX, not just decoration |

### Recommended Claude Code Agents per Phase

| Phase | Agents |
|-------|--------|
| Architecture setup | `planner`, `architect` |
| Component building | `tdd-guide`, `code-reviewer` |
| Animation work | `code-reviewer`, `build-error-resolver` |
| Pre-launch | `security-reviewer`, `e2e-runner` |
| Documentation | `doc-updater` |

---

## 9. Recommended Tools & Services

| Category | Recommendation | Why |
|----------|---------------|-----|
| **Deployment** | Vercel | Native Next.js support, edge network, image optimization |
| **Email** | Resend | Modern API, React Email templates, generous free tier |
| **Image CDN** | Cloudinary | On-the-fly transforms, auto-format, generous free tier |
| **CMS** (Phase 2) | Sanity | Real-time editing, image pipeline, generous free plan |
| **Analytics** | Vercel Analytics + Plausible | Privacy-friendly, Core Web Vitals built-in |
| **Monitoring** | Vercel Speed Insights | Real-user performance monitoring |
| **Form Spam** | Cloudflare Turnstile | Invisible CAPTCHA, free, privacy-respecting |
| **Maps** | Mapbox | Styleable dark-theme maps that match the aesthetic |
| **Fonts** | Self-hosted via `next/font` | No external requests, optimal loading |
| **Icons** | Lucide React | Tree-shakeable, consistent, shadcn/ui default |
| **Rate Limiting** | Upstash Redis | Serverless-friendly, free tier sufficient |

---

## 10. Development Roadmap

### Phase 1: Foundation (Days 1-2)
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS v4, CSS variables, design tokens
- [ ] Install and configure shadcn/ui (dark theme)
- [ ] Set up font loading (Playfair Display, Inter, Space Grotesk)
- [ ] Create global styles (grain overlay, base typography, colors)
- [ ] Build root layout with metadata
- [ ] Set up GSAP with `@gsap/react` provider
- [ ] Create animation utility hooks (`use-gsap`, `use-reduced-motion`)
- [ ] Set up Framer Motion `AnimatePresence` page transition wrapper
- [ ] Create `site-config.ts` with studio data

### Phase 2: Layout Shell (Days 2-3)
- [ ] Build header/navigation (desktop + mobile)
- [ ] Build footer with social links and studio info
- [ ] Build mobile slide-out navigation with Framer Motion
- [ ] Build sticky mobile CTA bar
- [ ] Create `section-heading` shared component
- [ ] Create `scroll-reveal` animation wrapper
- [ ] Create `text-reveal` GSAP component
- [ ] Create `image-with-loader` progressive image component

### Phase 3: Homepage (Days 3-5)
- [ ] Hero section with video background + animated headline
- [ ] Featured work bento grid
- [ ] Artist introduction section
- [ ] Portfolio horizontal scroll carousel (GSAP)
- [ ] Process steps section (4-step visual flow)
- [ ] Testimonials carousel
- [ ] Studio preview section
- [ ] Instagram feed integration
- [ ] CTA banner section
- [ ] Connect all sections with scroll-triggered animations

### Phase 4: Portfolio System (Days 5-7)
- [ ] Define portfolio data structure and sample content
- [ ] Build masonry/staggered gallery grid
- [ ] Implement category filtering with Framer layout animations
- [ ] Build lightbox with swipe navigation
- [ ] Build individual portfolio detail page (`/portfolio/[slug]`)
- [ ] Implement image zoom functionality
- [ ] Related work carousel on detail pages
- [ ] Lazy loading + blur-up placeholders
- [ ] Parallax effects on gallery images

### Phase 5: Content Pages (Days 7-8)
- [ ] Studio page with parallax image gallery
- [ ] Artist page with bio, philosophy, style showcase
- [ ] Contact page layout and map integration
- [ ] FAQ accordion section

### Phase 6: Contact & Inquiry System (Days 8-9)
- [ ] Build inquiry form with Zod validation
- [ ] Body placement selector (dropdown or visual picker)
- [ ] Reference image upload component
- [ ] `/api/contact` route with Resend integration
- [ ] Rate limiting on contact endpoint
- [ ] Auto-reply email template
- [ ] Artist notification email template
- [ ] Cloudflare Turnstile integration
- [ ] Form success/error states with animations

### Phase 7: Polish & Animation (Days 9-10)
- [ ] Magnetic cursor effect
- [ ] Page transition refinement
- [ ] Scroll progress indicators
- [ ] Number counter animations (stats)
- [ ] Image reveal clip-path animations
- [ ] Hover state refinements across all interactive elements
- [ ] `prefers-reduced-motion` fallbacks for all animations
- [ ] Grain overlay fine-tuning
- [ ] Mobile animation performance testing

### Phase 8: Performance & SEO (Days 10-11)
- [ ] Image optimization audit (sizes, formats, lazy loading)
- [ ] Lighthouse performance audit and fixes
- [ ] JSON-LD structured data (LocalBusiness, Person)
- [ ] Open Graph images per page
- [ ] Sitemap and robots.txt
- [ ] Meta descriptions and titles for all pages
- [ ] Font loading optimization
- [ ] Bundle analysis and code splitting review

### Phase 9: Testing & QA (Days 11-12)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Accessibility audit (keyboard nav, screen reader, contrast)
- [ ] Form submission end-to-end testing
- [ ] Animation performance profiling (60fps verification)
- [ ] Broken link check
- [ ] 404 page design

### Phase 10: Launch (Day 12-13)
- [ ] Deploy to Vercel
- [ ] Custom domain configuration
- [ ] SSL verification
- [ ] Analytics setup (Vercel Analytics + Plausible)
- [ ] Speed Insights activation
- [ ] Final Lighthouse audit
- [ ] Social media preview testing (OG images)
- [ ] Monitoring and error tracking setup

---

## 11. Content Requirements

Content the studio owner needs to provide:

| Content | Details |
|---------|---------|
| **Tattoo photos** | 30-50 high-res images (min 1920px wide), categorized by style |
| **Studio photos** | 5-10 photos of workspace, equipment, entrance, ambiance |
| **Artist portrait** | 2-3 professional photos (headshot + at work) |
| **Artist bio** | 200-400 words: background, philosophy, specialties |
| **Testimonials** | 5-8 client quotes with first name and tattoo type |
| **Studio info** | Address, hours, phone, email, social media handles |
| **Process description** | How booking works, what to expect, aftercare basics |
| **FAQ answers** | 8-12 common questions about pricing, pain, healing, etc. |
| **Hero video** (optional) | 10-30 second ambient studio footage, 1080p minimum |

---

## 12. Future Enhancements (Phase 2+)

- **Headless CMS integration** (Sanity) for portfolio management
- **Online booking system** with calendar availability
- **Client portal** — view design mockups, approve, communicate
- **Aftercare guide** — interactive tattoo care instructions
- **Gift cards / merch shop** — Stripe integration
- **Multi-artist support** — if studio grows beyond solo artist
- **Blog / articles** — tattoo care tips, style guides, SEO content
- **3D body model** — interactive placement visualizer
- **AI style matcher** — upload reference, suggest similar portfolio pieces

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Image-heavy pages tank performance | High | Aggressive lazy loading, CDN, AVIF, blur placeholders |
| GSAP + Framer Motion conflicts | Medium | Clear separation of concerns, shared animation context |
| Hero video slow on mobile | Medium | Poster image fallback, video only on wifi/desktop |
| Instagram API rate limits | Low | Cache responses, fallback to static grid |
| Form spam | Medium | Cloudflare Turnstile + server-side rate limiting |
| Scope creep on animations | Medium | Animation budget per page, performance benchmarks |
| Content delays from client | High | Design with placeholder content, use unsplash tattoo images for dev |

---

*This PRD is the source of truth for the tattoo studio website project. All implementation decisions should reference this document.*
