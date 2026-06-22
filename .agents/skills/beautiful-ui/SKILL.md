---
name: beautiful-ui
description: Use when implementing semantic, accessible, responsive, and typographically sound UI for the portfolio, including landmarks, headings, navigation, forms, tables, media, focus states, and mobile behavior.
---

# Beautiful UI

Use this skill when building or reviewing markup, accessibility, responsive layout, typography, navigation, media, forms, or structured content.

## Semantic Defaults

- Use `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<nav>`, and `<footer>` where they clarify structure.
- Maintain a single clear `<h1>` per page and a logical heading hierarchy.
- Use lists, tables, figures, and captions when the content is actually a list, table, or figure.
- Do not use generic `<div>` structures where native HTML communicates meaning.

## Accessibility Defaults

- Every interactive element must be reachable and operable by keyboard.
- Use visible focus styles.
- Use descriptive link text. Avoid ambiguous repeated links like "click here".
- Provide alt text for meaningful images; use empty alt for purely decorative images.
- Do not communicate status by color alone.
- Respect `prefers-reduced-motion`.
- Keep contrast suitable for normal reading in both body text and small metadata.

## Responsive Defaults

- Design mobile-first.
- Test at 320px, 768px, and 1280px.
- Avoid horizontal overflow.
- Prefer CSS Grid for page-level two-dimensional layouts.
- Use Flexbox for one-dimensional alignment.
- Use `minmax(0, 1fr)` for grid tracks that must shrink safely.
- Use `min-width: 0` on flex/grid children when text can overflow.
- Prefer `min-height: 100dvh` over fixed `100vh` for viewport-height sections.

## Typography Defaults

- Keep line length comfortable for Korean and English mixed prose.
- Use strong hierarchy through size, weight, spacing, and contrast.
- Do not scale font size directly with viewport width.
- Use tabular numerals or mono styling only where scanning metadata or numbers matters.

## Media Defaults

- Give images explicit width/height or aspect-ratio.
- Lazy-load below-the-fold images.
- Keep original evidence images available, but use optimized web versions for public UI.

## Review Checklist

- Landmarks are present.
- Heading hierarchy is logical.
- Links and buttons are distinct and keyboard accessible.
- Text does not overflow containers.
- Responsive layout has no accidental horizontal scroll.
- Contact and proof sections do not expose private information unintentionally.
