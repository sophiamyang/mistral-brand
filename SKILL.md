---
name: mistral-brand
description: Generate Mistral AI branded materials including slide decks, PDFs, thumbnails, social cards, one-pagers, diagrams, and HTML content using official Mistral brand assets, colors, typography, and extracted Mistral presentation patterns. Use when asked to create, redesign, convert, polish, export, or validate content in the Mistral AI visual system.
---

# Mistral Brand

Use this skill to create Mistral AI branded materials: slide decks, PDFs, thumbnails, social images, one-pagers, diagrams, report covers, and lightweight web/HTML content.

## Workflow

1. Clarify the content goal, audience, source material, output format, size, and delivery channel if missing.
2. Read `references/brand.md` before making visual decisions.
3. Read `references/outputs.md` to choose the right format pattern.
4. For slide decks, read `references/layouts.md` and start from `assets/template.html`.
5. For thumbnails, cards, covers, and one-off content, start from `assets/content-template.html`.
6. Use official logo assets from `assets/mistral-brand-assets/`.
7. Keep slide decks visually close to the extracted layout patterns in `references/layouts.md`.
8. Run `node scripts/validate_mistral_artifact.mjs path/to/file.html` on HTML artifacts and fix issues before delivery.

## Output Rules

- Build the actual artifact, not a landing page or explanation page.
- Prefer standalone HTML with inline CSS/JS when no existing framework is specified; it is easiest to inspect, export, and reuse.
- Use Arial as the font family.
- Use Mistral beige as the default canvas, black or black-tinted text, and rainbow bars/blocks as accents.
- Use square geometry, grid lines, pixel/M-mark accents, and modular blocks.
- Avoid generic SaaS gradients, glassmorphism, oversized rounded cards, drop-shadow-heavy cards, and purple/blue theme drift.
- Make every slide/page/card fit within its intended canvas with no unintended scrolling.
- Include a cover, agenda/section logic when helpful, content slides, and a thank-you/closing slide for complete decks.
- For static visual assets, design at the final pixel size or a clean multiple of it.
- For PDF outputs, create a printable HTML source first, then export to PDF when browser rendering tools are available.
- For technical artifacts, syntax-highlight code blocks. Use dark code panels with Mistral palette accents for commands, flags, strings, keys, and punctuation.

## Assets

- Slide deck starter HTML: `assets/template.html`
- General content starter HTML: `assets/content-template.html`
- Official brand assets: `assets/mistral-brand-assets/`

Use the full logo on covers and closers. Use the M icon or boxed M as a small footer/anchor mark on dense content slides.

## Exporting

For HTML artifacts, try:

```bash
node scripts/export_html_artifact.mjs path/to/artifact.html --out exports --pdf --png --selector .slide
```

The exporter requires Playwright. If it is unavailable, deliver the HTML source and explain that PDF/PNG export needs a browser rendering runtime.

## Quality Bar

Before finalizing:

- Check slide density and split overloaded slides.
- Confirm the palette matches `references/brand.md`.
- Confirm the artifact follows the relevant pattern in `references/outputs.md`.
- For decks, confirm layouts match one of the patterns in `references/layouts.md`.
- Validate HTML artifacts with the script.
- If browser tools are available, visually inspect at desktop and mobile-sized viewports.
