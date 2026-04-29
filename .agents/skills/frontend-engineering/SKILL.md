---
name: frontend-engineering
description: Use when building, refactoring, testing, or deploying the portfolio frontend with React, Vite, TypeScript, CSS/Tailwind, content data files, image optimization, performance, accessibility, and long-term maintainability.
---

# Frontend Engineering

Use this skill when implementing the portfolio website, choosing the frontend stack, organizing content data, optimizing assets, running checks, or preparing deployment.

## Stack Defaults

For this repository, prefer:

- Vite + React + TypeScript for the first production portfolio
- CSS variables, plain CSS, or Tailwind CSS depending on project setup
- Static hosting through Vercel, Netlify, or GitHub Pages

Consider Astro or Next.js later if Markdown/MDX content, writing, and case-study pages grow significantly.

## Architecture Rules

- Separate content data from UI components.
- Avoid hardcoding projects, awards, research-lab candidates, and writing entries directly inside visual components.
- Keep durable data fields for each project: name, slug, period, type, status, links, summary, problem, role, stack, context, result, learnings, public assets.
- Design for future routes: `/work`, `/work/[slug]`, `/writing`, `/about`, `/research-fit`, and `/archive`.
- Keep components small enough that future updates are not painful.

## Performance Rules

- Optimize images before public use.
- Use explicit image dimensions or aspect-ratio to avoid layout shift.
- Lazy-load images below the fold.
- Keep the initial JavaScript bundle modest; avoid heavy animation or 3D libraries unless they clearly improve the portfolio.
- Prefer CSS transform and opacity for animations.

## Quality Gates

Before considering frontend work done:

- run the project build command if available
- run lint/type-check/test commands if available
- inspect desktop and mobile layouts
- check browser console for errors
- verify links, email actions, and navigation
- verify public/private contact and evidence image choices

## Debugging Hints

- Flex child overflow: add `min-width: 0`.
- Grid column overflow: use `minmax(0, 1fr)`.
- Sticky not working: check ancestor `overflow`.
- Text ellipsis not working: check `overflow`, `white-space`, and `text-overflow`.
- Hydration mismatch in SSR frameworks: move browser-only values into client-only effects.

## Deployment Notes

- Prefer automated deployment from git.
- Keep environment-specific values out of source control.
- Do not publish sensitive proof images or phone numbers unless explicitly approved.
