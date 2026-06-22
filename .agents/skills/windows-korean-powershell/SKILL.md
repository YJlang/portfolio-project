---
name: windows-korean-powershell
description: Use when Codex works in this portfolio on Windows PowerShell and needs reliable Korean text handling, UTF-8/CP949 mojibake diagnosis, JSON/Markdown Korean validation, console output interpretation, or Korean file/path handling.
---

# Windows Korean PowerShell

Use this skill when PowerShell output shows garbled Korean, when editing Korean Markdown/JSON/HTML, or when commands involve Korean filenames.

## Core Rules

- Treat PowerShell console mojibake as a display problem first. Do not assume the source file is corrupted.
- Verify Korean text with Node.js or file reads that preserve UTF-8 before rewriting content.
- Prefer `node -e` for JSON/UTF-8 roundtrip checks because this repository already uses Node/Vite.
- Keep file edits in UTF-8 and use `apply_patch` for manual edits.
- Avoid using broken terminal output as the only source of truth for Korean text.

## Reliable Checks

Use these checks before deciding text is corrupted:

```powershell
node -e "const p=require('./content/profile.json'); console.log(p.person.name.ko);"
node -e "const fs=require('fs'); const s=fs.readFileSync('README.md','utf8'); console.log(s.slice(0,120));"
node -e "JSON.parse(require('fs').readFileSync('content/projects.json','utf8')); console.log('json ok')"
```

If `Get-Content` looks garbled but Node prints Korean correctly, the file is probably fine.

## PowerShell Encoding Notes

- Windows PowerShell and terminals may display UTF-8 Korean incorrectly depending on code page and font.
- `chcp 65001` can help interactive display, but do not rely on it as a permanent project fix.
- Prefer commands that avoid lossy transcoding.
- Do not pipe Korean text through legacy tools unless needed.

## Korean File Paths

This portfolio includes Korean filenames such as `images/프로필사진.png`.

- Use `rg --files` or Node `fs.readdirSync()` to confirm exact paths.
- When passing paths to PowerShell commands, use `-LiteralPath` if a path contains spaces, brackets, or unusual characters.
- For React imports, write the real UTF-8 filename in source, then verify with `npm run build`.

## Mojibake Diagnosis

Common symptom:

- `윤준하` appears as `?ㅼ???` or similar in PowerShell output.
- Korean paragraphs appear as long unreadable mixed symbols.

Diagnosis workflow:

1. Parse/read the file with Node using UTF-8.
2. Inspect only the relevant value rather than dumping the whole file.
3. If Node output is correct, continue working without rewriting the file.
4. If Node output is also broken, recover from git history, source docs, or known user-provided text before editing.

## Validation Before Final

After Korean-heavy edits, run:

```powershell
node -e "JSON.parse(require('fs').readFileSync('content/profile.json','utf8')); JSON.parse(require('fs').readFileSync('content/projects.json','utf8')); console.log('json ok')"
npm run build
```

Also check a few Korean strings directly:

```powershell
node -e "const p=require('./content/projects.json'); console.log(p[0].summary);"
```
