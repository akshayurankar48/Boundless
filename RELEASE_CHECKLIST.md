# Release Checklist — BOUNDDLESS TATTOOO STUDIO

## Before Going Live

### Email Configuration
- [ ] **Update Resend `from` address** — Currently using sandbox `onboarding@resend.dev`. Once you verify your domain on [Resend](https://resend.com), update the `from` field in `src/app/api/contact/route.ts` to `BOUNDDLESS TATTOOO STUDIO <noreply@vanguardink.art>` (appears twice — notification + auto-reply)
- [ ] **Update studio email** — Currently set to `akshayurankar48@gmail.com` in `src/data/site-config.ts`. Change to production studio email when ready
- [ ] **Verify Resend API key** — Current key in `.env.local` is for dev. Replace with production key if needed

### Security
- [ ] **Activate Cloudflare Turnstile** — Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to `.env.local`, uncomment Turnstile script in `src/app/layout.tsx`, and uncomment verification in `src/app/api/contact/route.ts`

### Content
- [ ] **Replace placeholder images** — All portfolio images are from Unsplash. Replace with real tattoo work photos in `src/data/portfolio.ts`
- [ ] **Replace placeholder testimonials** — Update `src/data/testimonials.ts` with real client reviews
- [ ] **Update artist bio/photo** — Replace placeholder in `src/data/site-config.ts` and `src/components/artist/artist-content.tsx`
- [ ] **Update studio address/phone** — If not 218 Mercer St, update in `src/data/site-config.ts`
- [ ] **Update geo coordinates** — Verify lat/lng in `src/lib/metadata.ts` (currently approximate NYC coords)
- [ ] **Replace hero video** — `public/videos/hero-ambient.mp4` is placeholder. Replace with real studio footage
- [ ] **Update Instagram posts** — Replace static data in `src/data/instagram-posts.ts` with real posts
- [ ] **Update FAQ** — Review `src/data/faq.ts` for accuracy

### Domain & Hosting
- [ ] **Update metadataBase** — Currently `https://vanguardink.art` in `src/app/layout.tsx`. Update if using different domain
- [ ] **Set up DNS** — Point domain to Vercel (or hosting provider)
- [ ] **Add OG image** — Create/replace `public/images/og/default.jpg` (1200x630px)
- [ ] **Verify sitemap** — Check `/sitemap.xml` includes all pages after deployment

### Final Checks
- [ ] Run `npm run build` — must pass with 0 errors
- [ ] Test contact form end-to-end (submit, check email received)
- [ ] Test all pages on mobile
- [ ] Verify no console errors on all pages
- [ ] Check Lighthouse scores (target: 85+ performance)
