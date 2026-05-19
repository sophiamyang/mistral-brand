# Mistral Output Patterns

Choose the pattern that matches the requested deliverable.

## Slide Decks

- Use `assets/template.html`.
- Ratio: 16:9.
- Structure: cover, optional agenda, sections, content, diagrams/data, closing.
- Validate with `scripts/validate_mistral_artifact.mjs`.
- Export PDF or thumbnails from the HTML source when browser rendering is available.

## PDFs And One-Pagers

- Use HTML/CSS as the source of truth unless the user provides a specific PDF toolchain.
- Common sizes: Letter, A4, or 16:9 PDF deck.
- Preserve generous margins and a visible grid or block structure.
- Use a strong title area, 2-4 modular content regions, and a restrained footer with logo/contact.
- For multi-page PDFs, repeat the footer/anchor mark and keep section numbers consistent.
- For code-heavy PDFs, split overview and code/runbook content across pages. Syntax-highlight code blocks rather than using flat monochrome text.

## Thumbnails

- Use `assets/content-template.html`.
- Common sizes:
  - YouTube/video: 1280 x 720.
  - Social/link preview: 1200 x 630.
  - Square post: 1080 x 1080.
- Use 3-7 words as the dominant message.
- Make the Mistral cue visible at small sizes: rainbow bars, orange M, or black top band.
- Avoid paragraphs, tiny labels, and low-contrast logos.

## Social Cards

- Use square or 4:5 formats when the channel is unspecified.
- Pair one short claim with one diagram/icon/visual motif.
- Use beige canvas, black text, and one rainbow accent stack or block.
- Keep logo placement quiet but visible.

## Report Covers

- Use a large title, subtitle/date, and a black band or full-width rainbow bar system.
- Use the full Mistral logo where the cover is the first contact with the brand.
- Prefer open space over decorative clutter.

## Diagrams

- Use Mistral square geometry, black linework, beige fills, and 1-2 rainbow colors.
- Use arrows and modular blocks for flows.
- Keep labels short; move explanation into nearby notes or following slides/pages.

## Lightweight Web Pages

- Use only when the user asks for a page, microsite, or HTML artifact.
- Do not create a marketing landing page unless requested.
- Keep it dense, useful, and brand-forward.
- Reuse the deck/card visual system rather than inventing a new website style.
- Highlight code examples with brand colors and enough contrast for screenshots and print.
