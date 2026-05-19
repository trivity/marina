# Marina Alta Electricidad — Website Design Spec
**Date:** 2026-05-18  
**Status:** Approved  

---

## 1. Project Overview

A modern, high-converting, SEO-focused website for **Marina Alta Electricidad** — a German-certified electrician operating in Denia, Jávea and the Costa Blanca region of Spain. The primary audience is German and English-speaking villa owners aged 30–70.

**Tagline:** "Estándar alemán. Calidad y puntualidad."  
**Brand colours:** Black (`#111111`) primary, Green (`#22c55e`) accent, White (`#ffffff`) base  
**Brand adjectives:** Punctual, Reliable, Safety-focused, Transparent, Multilingual (DE/EN/ES)

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR per locale = best SEO; modern DX |
| i18n | next-intl | App Router support, locale detection, plurals |
| Styling | Tailwind CSS v3 | Utility-first, fast iteration |
| Animations | Framer Motion | Spring physics, scroll-triggered reveals, stagger |
| Contact form | EmailJS | No backend needed; sends to gmail |
| Hosting | Vercel | Native Next.js platform, free tier, global CDN |
| Language routes | `/de`, `/en`, `/es` | next-intl middleware handles detection + redirect |

---

## 3. Multilingual Architecture

- **Default locale:** `es` (auto-detected from browser; falls back to `es`)  
- **Routes:** `marinaaltaelectricidad.com/es`, `/en`, `/de` (root `/` redirects to detected locale)  
- **Translation files:** `messages/es.json`, `messages/en.json`, `messages/de.json`  
- **Language switcher:** Persistent in nav — clicking switches locale and preserves current page path  
- **SEO:** Each locale gets its own `<html lang="">`, `<title>`, `<meta description>`, and `hreflang` alternate links  
- **Structured data:** `LocalBusiness` JSON-LD on every page (locale-aware name/description)

---

## 4. Pages

### 4.1 Home (`/`)
The highest-priority conversion page. Layout mirrors dc-may15 reference: white base with alternating dark sections.

**Section order:**
1. **Sticky Nav** — Logo · Home · Services · About · Contact · Phone number · "Get a Free Quote" CTA button · Language switcher (DE/EN/ES)
2. **Hero** — Split layout: text left, large floating lightbulb + video badge right
   - Badge: "Costa Blanca's German-Certified Electrician" (locale-aware)
   - Headline: "Your Home. Wired Right. First Time." (green accent on last line)
   - Subtext: 2-line description, multilingual
   - CTAs: "Get a Free Quote →" (black filled) + "Call Now" (outlined)
   - Trust row: ★ 5-Star Rated · ✓ DE Certified · ✓ DE/EN/ES · ✓ Always On Time
   - Right panel: Large SVG lightbulb with ambient green glow + "Watch / Lights on" video play badge (links to 3–5 sec looping hero video: bulb flickering → powering on)
3. **Services section** — Dark (`#111`) background
   - Label: "WHAT WE DO" · Title: "Services" · "View all →" link
   - 2×2 grid of dark cards + 1 full-width card (5 total), each with `↗` arrow
4. **Callout banner** — Near-black background, tagline headline left, phone CTA button right, green pulse dot badge
5. **Reviews** — Light gray (`#f9fafb`) background, 2-column card grid, star ratings, reviewer name + location. "View all on Google →" link
6. **Free Quote Form** — White background, 2-column grid inputs (name, phone, email, service dropdown), message textarea, full-width submit button. Powered by EmailJS → `marina.alta.electricidad@gmail.com`
7. **Footer** — Dark (`#111`), 3-column: logo+tagline · Navigation · Get in Touch. Language switcher row. Copyright.

### 4.2 About Us (`/about`)
Builds trust and humanises the brand.

**Section order:**
1. **Nav** (same sticky nav)
2. **Page hero** — Full-width dark section: "About Us" heading, 1-line sub
3. **Story section** — White background, 2-column: text left (origin story, German training, Costa Blanca move, mission), image/illustration right (electrical panel illustration or placeholder for real photo)
4. **Values strip** — 3 cards: Punctual · Transparent · Safety-First. Each with icon, title, 1-line description
5. **Credentials** — Dark section: certification details, years of experience counter (animated), languages spoken
6. **CTA** — "Ready to work together?" → contact button
7. **Footer**

### 4.3 Services (`/services`)
Detailed breakdown of each service.

**Section order:**
1. **Nav**
2. **Page hero** — "Our Services" heading
3. **Services list** — White background. Each service as a full-width expandable card:
   - New Electrical Installations
   - Fault Finding & Repair
   - Consumer Unit Upgrades
   - Smart Home & Automation
   - Electrical Certificates (Boletín Eléctrico)
   Each card: icon · title · 2–3 sentence description · what's included list · CTA link
4. **Why trust us** — Dark section, 3-column trust points
5. **CTA banner** — Green gradient, "Get a free quote" button
6. **Footer**

### 4.4 Contact (`/contact`)
Conversion-focused contact page.

**Section order:**
1. **Nav**
2. **Page hero** — "Get in Touch" heading, sub: "Free quotes. Fast response. German precision."
3. **Contact split** — 2 columns:
   - Left: Full EmailJS contact form (name, phone, email, service dropdown, message, submit)
   - Right: Contact details card (phone, email, address, map embed of Calle Morell 4 Denia), office hours, language note
4. **Footer**

---

## 5. Logo

**Style:** Geometric hexagon icon + wordmark  
**Icon:** Black hexagon, green "M" lettermark inside  
**Wordmark:** "MARINA ALTA" bold uppercase + "ELECTRICIDAD" small caps in green beneath  
**Variants needed:**
- Full colour (light backgrounds)
- Reversed (dark backgrounds — white hex + green M)
- Icon only (favicon, small contexts)

Generated as SVG. Favicon exported as 32×32 and 180×180 PNG.

---

## 6. Animation System (Framer Motion)

**Style:** Bold & Energetic — spring physics, staggered reveals, counter animations

| Element | Animation |
|---|---|
| Hero headline | Staggered word-by-word fade-up on mount |
| Hero image/bulb | Scale + fade in with spring (0.8→1.0), slight float loop |
| Stats counters | Count-up animation on scroll into view |
| Service cards | Stagger fade-up (50ms delay between cards) on scroll |
| Nav | Blur backdrop + border appear on scroll past hero |
| CTA buttons | Scale on hover (1.02), slight shadow lift |
| Page transitions | Fade + slide (100ms) between routes via layout animation |
| Section reveals | `whileInView` fade-up with `once: true` for all sections |

Hero video: 3–5 second looping MP4. Plays autoplay, muted, loop. Shows a lightbulb flickering → surging on. Hosted in `/public/video/hero-bulb.mp4`. Placeholder SVG shown until video loads.

---

## 7. SEO Strategy

- **Title pattern:** `{Page} | Marina Alta Electricidad — Electricista Denia`
- **Meta descriptions:** Unique per page per locale
- **Sitemap:** Auto-generated via `next-sitemap` (all 4 pages × 3 locales = 12 URLs)
- **robots.txt:** Allow all, point to sitemap
- **Structured data:** `LocalBusiness` JSON-LD on every page
  ```json
  {
    "@type": "LocalBusiness",
    "name": "Marina Alta Electricidad",
    "telephone": "+49 176 20634487",
    "email": "marina.alta.electricidad@gmail.com",
    "address": { "streetAddress": "Calle Morell 4", "addressLocality": "Denia", "postalCode": "03700", "addressCountry": "ES" }
  }
  ```
- **Image alt tags:** All images locale-aware
- **Core Web Vitals:** Tailwind purge + Next.js Image component + font `display:swap`

---

## 8. Project Structure

```
marina-alta-electricidad/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root layout with next-intl provider
│       ├── page.tsx            # Home
│       ├── about/page.tsx
│       ├── services/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── CalloutBanner.tsx
│   │   ├── Reviews.tsx
│   │   └── QuoteForm.tsx
│   ├── about/
│   │   ├── StorySection.tsx
│   │   └── ValuesStrip.tsx
│   ├── services/
│   │   └── ServiceCard.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── ContactDetails.tsx
│   └── ui/
│       ├── Logo.tsx
│       ├── AnimatedCounter.tsx
│       └── SectionLabel.tsx
├── messages/
│   ├── es.json
│   ├── en.json
│   └── de.json
├── public/
│   ├── video/hero-bulb.mp4
│   └── images/
├── i18n.ts
├── middleware.ts               # next-intl locale detection
├── next.config.ts
└── tailwind.config.ts
```

---

## 9. Contact Form (EmailJS)

- **Service:** EmailJS free tier
- **Template variables:** `{{from_name}}`, `{{phone}}`, `{{email}}`, `{{service}}`, `{{message}}`
- **To:** `marina.alta.electricidad@gmail.com`
- **Env vars:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- **UX:** Loading state on submit button, success toast, error toast

---

## 10. Deployment

- **Platform:** Vercel (free tier)
- **Build command:** `next build`
- **Output:** Static + SSR hybrid (SSG for content pages, no dynamic routes)
- **Environment variables:** Set in Vercel dashboard (EmailJS keys)
- **Domain:** To be configured by client (custom domain via Vercel DNS)
