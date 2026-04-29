---
name: frontend-web-design
description: Use when designing or implementing the portfolio website UI, visual system, responsive layout, interaction direction, typography, motion, and screenshot-driven polish for a distinctive but maintainable frontend.
---

# Frontend Web Design

Use this skill for portfolio website design, visual direction, page layout, responsive behavior, and UI polish.

## Design Thesis

The portfolio should feel like a calm research/product editorial system: technically credible, readable, quietly distinctive, and easy to update for years.

Default dials:

- `DESIGN_VARIANCE`: 5/10
- `MOTION_INTENSITY`: 3/10
- `VISUAL_DENSITY`: 6/10

## Required Context

Before designing or implementing UI, read:

- `AGENTS.md`
- `docs/portfolio-blueprint.md`
- `docs/portfolio-references.md`
- available image assets under `images/`

## Layout Principles

- Start from content hierarchy before components.
- Make the first viewport communicate name, direction, representative work, and contact path.
- Prefer full-width sections, editorial lists, tables, and strong typography over generic card grids.
- Use cards only for repeated project summaries or genuinely framed content.
- Keep the design extensible for `/work`, `/work/[slug]`, `/writing`, `/about`, `/research-fit`, and `/archive`.
- Avoid visual systems that make future content additions difficult.

## Visual System Rules

- Use a small token set for background, text, muted text, border, accent, focus, spacing, and radius.
- Avoid one-note palettes. Do not let the site become only dark blue, purple, beige, or neon.
- Keep Korean and English mixed text readable. Favor a reliable sans-serif stack and use mono/tabular styling only for technical metadata.
- Use the profile image and project evidence as narrative anchors, not decorative clutter.
- Optimize original proof images before using them publicly.

## Interaction Rules

- Motion should pace attention, not compete with content.
- Prefer subtle section reveal, project hover, copy-email feedback, and anchor navigation states.
- Respect `prefers-reduced-motion`.
- Verify mobile and desktop layouts visually before handoff.

## QA Checklist

- No overlapping text or controls at 320px, 768px, and 1280px widths.
- Navigation and CTAs are keyboard reachable with visible focus.
- Images have stable dimensions and descriptive alt text when meaningful.
- Hero and project sections remain readable without relying on fragile animations.
- Public contact information is intentional.
