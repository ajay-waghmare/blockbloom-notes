---
name: feedback-blockbloom-daily-journal
description: "Ajay (11 Oct 2026): day-to-day Block Bloom work and changes are recorded in a NOTES repo (D:\\abc\\Handover, journal/YYYY-MM-DD.md), kept separate from the app code and pushed to GitHub by him"
metadata:
  type: feedback
---

On 11 Oct 2026, asked whether the code-review findings and handover should go to GitHub, Ajay
said: "Not as part of code but daily works and changes happening has to keep note of that. Will
store those stuff in GitHub." So I removed the docs branch I had staged in the BlockBloom code
repo and made `D:\abc\Handover` a git repo of its own (branch `journal`), with `journal/` holding
one Markdown file per working day plus the handover docs, scripts and reports.

**Why:** he wants a running record of what changed and why, readable without digging through
the app repo or chat history, and he is moving laptops.

**How to apply:**
- At the end of every Block Bloom session, write or extend `journal/<today>.md` from
  `journal/TEMPLATE.md`: live track state first, then what changed (where + why), numbers only if
  they change a decision, decisions made/open, the next step. Commit it on the `journal` branch;
  do not push to or merge `main` — Ajay does that ([[feedback-never-merge-master]]).
- Findings, reviews and analytics pulls go into this repo (`01-blockbloom/`), not into the app
  repo's `docs/` unless he asks.
- Never add to the repo: conversation logs, the scratchpad archive, the secrets manifest, personal
  memory, QI Spine material. `.gitignore` encodes this; keep it that way.
- Memory still gets its topic-file update as before; the journal is in addition, not instead.

Related: [[project-blockbloom-handover-2026-10]], [[feedback-persist-work-to-memory]].
