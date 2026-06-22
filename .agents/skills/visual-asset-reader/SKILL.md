---
name: visual-asset-reader
description: Use when Codex needs to inspect, describe, OCR, compare, or extract portfolio-relevant information from images, screenshots, certificates, grade screenshots, profile photos, UI mockups, diagrams, or visual evidence files.
---

# Visual Asset Reader

Use this skill for portfolio evidence images, screenshots, UI references, certificates, grade captures, diagrams, and photos.

## Default Workflow

1. Identify the image path with `rg --files` or the user-provided path.
2. Use `view_image` for local images when visual inspection is enough.
3. If text extraction matters, read visually first and mark uncertain text instead of inventing it.
4. If OCR tooling is needed, choose a local or cloud OCR approach based on privacy and accuracy.
5. Summarize only the portfolio-relevant facts: title, date, organization, award/result, visible proof value, and public/privacy risk.

## Portfolio Evidence Checklist

For proof assets, extract:

- What the asset proves.
- Whether the person name is visible.
- Date or period.
- Issuer or organization.
- Any sensitive information that should be hidden before public deployment.
- Whether the image needs cropping, compression, or redaction.

## OCR Tool Choice

- Use direct visual reading for a few images or screenshots.
- Use Tesseract for clean printed English text.
- Use PaddleOCR or EasyOCR for Korean/CJK or mixed-language images.
- Use a vision-capable model for layout understanding, handwritten notes, UI screenshots, receipts, charts, or when semantics matter more than raw text.
- Do not send sensitive documents to cloud OCR without explicit approval.

## Uncertainty Rules

- Mark unreadable text as `[판독 불가]`.
- Do not infer grades, award names, dates, or issuer names from blurry images unless clearly visible.
- Keep OCR output as unverified until checked against the image.

## UI Screenshot Review

When reviewing portfolio screenshots or references:

- Check hierarchy, readability, spacing, alignment, overflow, and mobile behavior.
- Note whether the screenshot supports the desired identity: AIX, CX, HCI, UX/UI, backend, and product engineering.
- Prefer actionable findings over broad taste comments.

## Output Pattern

For evidence images:

```md
### Image
- File:
- Visible text:
- Portfolio use:
- Public risk:
- Recommended action:
```

For UI screenshots:

```md
### Visual Review
- What works:
- Issues:
- Improvements:
- Follow-up checks:
```
