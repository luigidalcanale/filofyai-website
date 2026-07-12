# FilofyAI Website

Static marketing site for filofyai.com. No build step, no dependencies — plain HTML/CSS/JS.

## Files

- `index.html` — main landing page (hero, who we help, process, testimonials, founder)
- `privacy.html` / `terms.html` — legal pages
- `styles.css` — all styling
- `script.js` — contact modal (injected on every page), form submission, scroll animations
- `vercel.json` — enables clean URLs (`/privacy`, `/terms`) when deployed on Vercel
- `assets/` — images (`luigi.jpg` founder photo)
- `assets/logos/` — brand logos for the scrolling tool marquee below the hero (sourced from Simple Icons CDN, Wikimedia Commons, and vendor favicons). Pure-CSS infinite scroll: the track holds two identical logo sets and slides left by 50%; pauses on hover; becomes a static wrapped row under `prefers-reduced-motion`. To add/remove a tool, edit **both** `.marquee-set` blocks in `index.html` (they must stay identical) and adjust `animation-duration` in `styles.css` (~3.5s per logo feels right).

## Before going live — 3 things

1. **Founder photo:** drop a square photo at `assets/luigi.jpg`. Until then a navy "LD" initials placeholder shows automatically.
2. **Activate the contact form:** the form emails submissions to `luigidalcanale@gmail.com` via [FormSubmit](https://formsubmit.co) (free, no account). After the **first** real submission, FormSubmit sends a one-time confirmation email to that address — click the link in it once and all future submissions flow through. Submit a test through the live site to trigger it.
3. **Legal review:** Privacy/Terms use Indiana / Monroe County as governing law and `luigidalcanale@gmail.com` as the contact email. Update in `privacy.html` / `terms.html` if either should change.

## Preview locally

```bash
cd Website
python3 -m http.server 8000
# open http://localhost:8000
```

(Note: FormSubmit ignores submissions from `localhost`, so test the form on the deployed site.)

## Deploy

Any static host works. Easiest options:

- **Vercel:** `npx vercel` from this folder, then point the filofyai.com domain at it. Clean URLs are already configured.
- **Netlify:** drag this folder into app.netlify.com/drop, enable "Pretty URLs" in Site settings → Build & deploy → Post processing.
