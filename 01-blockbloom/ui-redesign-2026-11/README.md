# Block Bloom · premium UI/UX redesign (19 Nov 2026)

**Deliverable:** `BlockBloom-UI-UX-Redesign-2026-11-19.pdf` (35 pages, A4 landscape, 10.9 MB): audit of the 8 live screens
(v1.12.11) with every finding and fix, 12 principles, the new structure, 4 directions × 8 screens
(1 Aurora Glass · 2 Royal Bloom · 3 Neon Pulse · 4 Petal Pop), comparison, scorecard, recommendation,
phased Compose plan, KPIs / A/B tests, spec checklist. `out/shots/*.jpg` = the 32 screens as 2x images.

Rebuild (Node + Chrome; Python + Pillow for the JPEGs), from `src/`:
1. `node fonts.js` (once) · `python jpeg_shots.py` (once, current screenshots)
2. `node build.js shots`, then for each `../out/shots/*.html`: `node render.js shot <f> <f>.png 500 844 2`, then `python jpeg_phones.py`
3. `node build.js doc` · `node render.js pdf ../out/redesign.html ../BlockBloom-UI-UX-Redesign-2026-11-19.pdf`
Quick looks: `node build.js qa` (contact sheet per direction) · `node build.js pick aurora:home neon:game`.
