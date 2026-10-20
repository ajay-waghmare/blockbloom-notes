---
name: feedback-notes-github-every-change
description: "STANDING (20 Oct 2026, Ajay): MANDATORY — every decision and every change on his personal apps (Arrow Bloom, Block Bloom) is written to the app's notes repo on GitHub and pushed in the same session, with the code branch"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-20T06:59:25.695Z
---

Ajay, 20 Oct 2026: "It is mandatory to update the notes in Github for every decision and changes" — said
while moving Arrow Bloom work to his personal laptop ("Next setup things will be continue in personel laptop").

**Rule:** after each decision or change, in the same session, before ending the turn:
1. Add it to the notes repo journal (`journal/YYYY-MM-DD.md`, branch `journal`): Arrow Bloom →
   `arrowbloom-notes` (D:\abc\ArrowBloom-notes); Block Bloom → `blockbloom-notes` (D:\abc\Handover).
2. Update the doc it affects (runbook, checklist, handover, copyright), and the memory file.
3. Commit, push, and verify (`git rev-list --left-right --count HEAD...@{u}` = 0 0, `git status` clean).
4. Push the code branch too. Never merge to main (Ajay merges).

**Why:** the personal laptop is now primary for Arrow Bloom; GitHub notes are the only bridge between the two
laptops and between Claude sessions. Anything not pushed is invisible to the other side.
**How to apply:** treat "notes pushed" as part of done; a reply that reports a change while notes are unpushed is
incomplete. On this work laptop, `git pull` both repos before touching Arrow Bloom: the personal laptop may have
moved on. Related: [[feedback-blockbloom-daily-journal]], [[project-arrow-bloom]], [[feedback-never-merge-master]].
