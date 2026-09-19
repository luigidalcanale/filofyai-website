# FilofyAI Website

Static marketing site for filofyai.com. No build step, no dependencies — plain HTML/CSS/JS.

## Files

- `index.html` — main landing page (hero + proof band, tool marquee, How I Help, For Business, process, testimonials, founder, closing CTA)
- `privacy.html` / `terms.html` — legal pages
- `styles.css` — all styling
- `script.js` — contact modal (injected on every page), form submission, mobile nav, scroll reveals, the How-I-Help highlight cycle, and both dot canvases
- `vercel.json` — enables clean URLs (`/privacy`, `/terms`) when deployed on Vercel
- `assets/` — images (`luigi.jpg` founder photo)
- `assets/logos/` — brand logos for the scrolling tool marquee below the hero (sourced from Simple Icons CDN, Wikimedia Commons, and vendor favicons). Pure-CSS infinite scroll: the track holds two identical logo sets and slides left by 50%; pauses on hover; becomes a static wrapped row under `prefers-reduced-motion`. To add/remove a tool, edit **both** `.marquee-set` blocks in `index.html` (they must stay identical) and adjust `animation-duration` in `styles.css` (~3.5s per logo feels right).

## Motion

Everything animated respects `prefers-reduced-motion` — under it the marquee becomes a static wrapped row, reveals show instantly, the highlight cycle is off, and both canvases fall back to a static frame.

- **Highlight cycle** (`How I Help`): one card at a time gets a soft navy bloom that fades in, holds ~1.3s, and fades out. Order comes from `data-spotlight-order` on each card, currently `middle → right → left` across the top row, then the same across the bottom. Renumber those attributes to change the path. It pauses when the section scrolls off, when the tab is hidden, and while the pointer is inside the grid so hover always wins.
- **Hero dots**: `script.js` replaces the CSS dot pattern with a canvas (`.hero.dots-live`) whose dots warm toward navy and swell near the cursor. The render loop stops as soon as the field settles and wakes on pointer movement.
- **Dot globe** (closing CTA): a Fibonacci sphere of points that spins slowly and leans toward the cursor anywhere on the page. Only renders while the section is on screen.

To slow or speed the highlight, edit `HOLD_MS` / `GAP_MS` in `script.js`. Navs that should collapse into a hamburger need the `nav-collapsible` class — the legal pages deliberately omit it so their single button stays inline.

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
