# Tattoo Studio Website

BOUNDDLESS TATTOOO STUDIO -- a high-end tattoo studio portfolio site for black & gray realism.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Framer Motion (UI animations, page transitions, carousel), GSAP + ScrollTrigger (scroll storytelling, parallax, clip-path reveals, text splitting, magnetic cursor)
- **Validation**: Zod (form validation)
- **Email**: Resend (API key needed in `.env.local` as `RESEND_API_KEY`)

## Project Structure

```
src/
  app/
    layout.tsx           # Root layout (fonts, metadata, providers)
    page.tsx             # Home page
    globals.css          # CSS variables, theme, global styles
    portfolio/           # Portfolio gallery page
    artist/              # Artist bio page
    studio/              # Studio info page
    contact/             # Contact / booking page
    api/                 # API routes (contact form, etc.)
    not-found.tsx        # 404 page
    robots.ts            # Robots.txt generation
    sitemap.ts           # Sitemap generation
  components/
    animations/          # Scroll reveal, curtain transition, preloader, magnetic cursor
    artist/              # Artist section components
    contact/             # Contact form components
    hero/                # Hero section with GSAP timeline
    layout/              # Header, footer, navigation
    portfolio/           # Portfolio grid/gallery components
    sections/            # Homepage sections (about, process, testimonials, etc.)
    shared/              # Shared/reusable components
    studio/              # Studio info components
    ui/                  # shadcn/ui primitives
    providers.tsx        # Client providers (preloader, magnetic cursor)
  data/                  # Static data files (portfolio, testimonials, FAQ, site config)
  hooks/                 # Custom hooks (use-gsap, use-reduced-motion, use-media-query)
  lib/                   # Utilities (metadata, utils, validations)
  styles/                # Additional style files
  assets/                # Static assets
```

## Design System

- **Theme**: Dark only, monochromatic
- **Accent**: Warm silver (`#B8B5AD`) -- stored as `--accent-silver` CSS variable
- **Fonts**:
  - Playfair Display (`--font-playfair`) -- headings
  - Inter (`--font-inter`) -- body text
  - Space Grotesk (`--font-space-grotesk`) -- mono/nav/labels
- **All CSS variables** defined in `src/app/globals.css`

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # ESLint
```

## Key Patterns

- **Animation split**: Framer Motion for UI interactions (hover, enter/exit, page transitions), GSAP for scroll-driven effects (parallax, timelines, clip-path)
- **GSAP cleanup**: All GSAP usage wraps in `gsap.context()` for proper cleanup
- **Reduced motion**: `useReducedMotion()` hook checked throughout -- animations skip entirely when user prefers reduced motion
- **Preloader**: Session-based splash screen (sessionStorage key `preloader-shown`), only plays on first visit
- **Data layer**: Static TypeScript files in `src/data/` (no CMS yet)
- **Mobile**: App-like bottom nav, reduced parallax on mobile
- **Import alias**: `@/*` maps to `src/*`
- **shadcn/ui**: Components in `src/components/ui/` -- add new ones via `npx shadcn@latest add <component>`

## Content

- All content is placeholder -- real images, bio, and testimonials need to be swapped in `src/data/`
- Hero video: `public/videos/hero-ambient.mp4` (also `.mov` variant)
- Portfolio: 12 items defined in `src/data/portfolio.ts`
- Site config (name, address, social links): `src/data/site-config.ts`

## Important Notes

- Do NOT override user's design choices (especially colors)
- Accent color is warm silver (`#B8B5AD`), NOT gold -- this was explicitly decided
- Quality over speed -- no rushing
- Path alias `@/` for all imports, never relative paths outside the same directory
