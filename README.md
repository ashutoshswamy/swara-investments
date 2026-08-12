# Swara Investments

Marketing landing page for **Swara Investments**, a Mumbai-based investment firm offering portfolio management, wealth advisory, mutual fund & insurance distribution, and equity research.

Live site: [swarainvestments.in](https://swarainvestments.in)

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + [@gsap/react](https://gsap.com/resources/React) for scroll reveals and carousel animation
- TypeScript

## Project Structure

```
app/
  layout.tsx        # metadata, fonts, JSON-LD
  page.tsx           # assembles landing page sections
  robots.ts           # robots.txt
  sitemap.ts          # sitemap.xml
components/
  landing/            # page sections (hero, about, services, contact, footer, ...)
  ui/                  # shared UI primitives (buttons, etc.)
  testimonial-carousel.tsx
hooks/
  use-reveal.ts        # IntersectionObserver-based scroll-reveal hook
public/
  scenery/             # source imagery used across sections
```

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                 |
