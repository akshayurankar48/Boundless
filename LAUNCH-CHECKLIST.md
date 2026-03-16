# Launch Checklist

## Before Going Live — Owner Actions

| # | Action | File/Location | Status |
|---|--------|---------------|--------|
| 1 | **Review every page** — run `npm run dev`, check all 6 pages, test animations on desktop + mobile | `localhost:3000` | [ ] |
| 2 | **Replace placeholder content** — swap unsplash images with real tattoo photos, update bio, testimonials | `src/data/portfolio.ts`, `site-config.ts`, `testimonials.ts` | [ ] |
| 3 | **Hero video** — drop your studio video into public/videos/ (MP4 format, muted, <3MB ideal) | `public/videos/hero-ambient.mp4` (test file already present) | [ ] |
| 4 | **Studio name + domain** — replace "VANGUARD INK" with real name, update domain URL | `src/data/site-config.ts` → `name`, `src/app/layout.tsx` → `metadataBase` | [ ] |
| 5 | **Resend API key** — sign up at resend.com, get API key, add to env | `.env.local` → `RESEND_API_KEY=re_xxxxx` | [ ] |
| 6 | **Deploy to Vercel** — connect repo or run `npx vercel` | Vercel dashboard or CLI | [ ] |
| 7 | **OG image** — create a 1200x630 branded image for social sharing | `public/images/og/default.jpg` | [ ] |

## Content Requirements

| Content | Spec | Where to Put It |
|---------|------|-----------------|
| Tattoo photos | 30-50 images, min 800px wide, JPG/WebP | Replace URLs in `src/data/portfolio.ts` |
| Studio photos | 5-10 interior/atmosphere shots | Replace URLs in `src/components/studio/studio-content.tsx` |
| Artist portrait | 2-3 professional photos | Replace URL in `src/components/sections/artist-intro.tsx` and `artist-content.tsx` |
| Artist bio | 200-400 words | `src/data/site-config.ts` → `artist.bio` |
| Testimonials | 5-8 real client quotes | `src/data/testimonials.ts` |
| Studio info | Real address, phone, email, hours | `src/data/site-config.ts` → `studio` |
| FAQ answers | Update if needed | `src/data/faq.ts` |
| Hero video | 10-30s ambient footage, MP4, <3MB | `public/videos/hero-ambient.mp4` |
| Instagram posts | 6-8 real post images + URLs | `src/data/instagram-posts.ts` |

## After Deploy

- [ ] Connect custom domain in Vercel
- [ ] Verify SSL certificate
- [ ] Test contact form sends email
- [ ] Test OG images via [opengraph.xyz](https://opengraph.xyz)
- [ ] Check Google Search Console for sitemap indexing
- [ ] Set up Vercel Analytics
- [ ] Set up Vercel Speed Insights
