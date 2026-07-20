# SamitiBook — explainer site

A standalone marketing / explainer page for **SamitiBook**, the books-and-dues
tool for the honorary treasurer of a small housing society (under 50 flats).

> **The society's books, minus the shoebox.** — subscription · pricing on discovery

This is **not** the product UI. It is a single, self-contained landing page that
makes the idea instantly clear to a non-technical Indian SMB owner and to an
investor skimming for 30 seconds.

## What's here

| File          | Purpose                                                             |
|---------------|--------------------------------------------------------------------|
| `index.html`  | All page content, in the required section order.                   |
| `styles.css`  | All styling. Palette built around the accent `#4338CA`.            |
| `app.js`      | Tiny vanilla JS: sticky nav, smooth scroll, animated collection-%  |
|               | counter, and a live "Remind → WhatsApp outbox" widget.             |
| `favicon.svg` | Inline ledger-book mark.                                            |

## Sections

1. Hero — name, tagline, the pain in one line, mock CTA + a live collection card.
2. The problem — the honorary treasurer, and why WhatsApp + a diary + memory breaks.
3. The insight — the wedge, stated sharply.
4. How it works — four numbered steps.
5. Features — six concrete features, each with a one-line benefit.
6. Product preview — a real-looking treasurer dashboard (CSS/HTML "screenshot").
7. Pricing — pricing on discovery, subscription basis, with the ROI line.
8. Who it's for + a 3-question FAQ.
9. Footer — "A KARYA studio build", contact `sreeni.nintendo@gmail.com`.

## Design

- **Metaphor:** a society accounts register. A faint ruled-paper motif and a red
  ledger-margin line run through the hero, insight band and pricing card.
- **Palette:** ink `#1A1A2E`, indigo accent `#4338CA`, warm paper `#FAF8F3`,
  indigo tint `#E7E3F5`, ledger green `#127A5A`, ledger red `#B4232A`.
- **Type:** system font stack throughout; personality comes from weight, tracking
  and tabular numerals on every rupee figure.
- Fully self-contained — no CDNs, no external fonts, images or scripts. Every
  asset is inline SVG. Renders correctly opened as a local file.

## Run it

Just open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8080
# then visit http://localhost:8080
```

Deploys to any static host (Netlify, Cloudflare Pages, GitHub Pages) unchanged.

---

A **KARYA** studio build · sreeni.nintendo@gmail.com
