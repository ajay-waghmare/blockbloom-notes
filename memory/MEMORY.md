# MEMORY INDEX — Persistent Memory Catalog

> **MANDATE:** This index and its domain files are the shared persistent brain across **all AI assistants and sessions** (Gemini, Claude, Codex, Antigravity). Whenever starting any task, read this index + relevant topic file(s) + latest daily journal FIRST. Whenever finishing any task, decision, or audit, update local + GitHub memory BEFORE concluding.

> **➡ NEXT (`2026-11-28 09:12 IST`, [`journal/2026-11-28.md`](../journal/2026-11-28.md)): `vc44` (`1.19.0`) LIVE at `20%` (`100%` crash-free / `0` ANRs in Crashlytics; Play Pre-launch `0` issues; keep `24–48h` watch -> `P1` `100%`). Done: `DAHcIhyhWnY` committed + `4` Canva PNGs exported; `54.84%` match rate (`42/42` misses = `TR M2101K6G 26` + `RU RMX3363 16`, `US/BR/ES 100%`) proved; `Winter Bloom 2026` SAVED AS DRAFT at Step 4 in Play Console (`winter-bloom-banner-16x9.png` applied cleanly). Next: Ajay picks Tagline + AI asset label to Submit `Winter Bloom`, then rebuild 5-card real-screenshot Play Showcase.**

> **➡ ALSO (27 Nov ~11:00 IST, from Claude): [`12-10k-month-plan.md`](../01-blockbloom/plan-2026-11/12-10k-month-plan.md) — ₹10k/month plan with the day-by-day **money ladder** (pre-flight by Thu 3 Dec → Stage 0 ₹400/day 4–10 Dec, cap ₹2,800 → gates); and [`06-work-like-claude.md`](../01-blockbloom/gemini-skills/06-work-like-claude.md) + `/bb-start /bb-humans /bb-release /bb-wrapup` — how to work like Claude.**

---

## 🗂️ Active Topic Memory Files

| Topic File | Scope / Domain | Status | Key Focus Areas |
| :--- | :--- | :---: | :--- |
| **[`topic_block_bloom.md`](topic_block_bloom.md)** | **Block Bloom: Block Puzzle Game** | 🟢 Live `20%` `vc44` | **`vc44` (`1.19.0`) LIVE at `20%` (`Nov 27 10:41 PM`)**, **`P7` `--source` cohort filters verified** (`BlockBloom-Tier1-EN` `72.7%` RoW leak, `D1 9.8%`), **`E-1` audit complete** (`vc45` queue); `Nov 27` AdMob `$0.46` / GA4 `₹43.68`, Crashlytics `100%`, `P5/P6/P7` done, `P1–P12` Dec 3 -> Stage 0 Dec 4; **Deadlines:** Ads Verif `Dec 26`, Play `16 KB` `Feb 1, 2027`. |
| **[`topic_arrow_bloom.md`](topic_arrow_bloom.md)** | **Arrow Bloom – Tap Logic Puzzle** | 🟡 Closed Testing | Package `com.aweagle.arrowbloom`, `vc4` live in Closed Alpha (`9/12` testers — needs `3` more for 14-day clock), store listing fixes, post-Production Firebase/AdMob plan. |
| **[`topic_console_audit_2026_11_25.md`](topic_console_audit_2026_11_25.md)** | **4-Platform + Website Live Audit (25 Nov)** | 🟢 Completed & Verified | All automated & Q1–Q4 fixes + GA4 `17` custom dimensions / `6` Key Events live; remaining `4` human-only tax/tester/Signals checks tracked cleanly. |
| **[`00-OPERATIONS-PLAYBOOK.md`](../00-OPERATIONS-PLAYBOOK.md)** | **Studio Console & Growth Playbook** | 🟢 Master SOP & PDF | Day-to-day manual + printable PDF ([`AW-EagleCraft-Operations-Playbook.pdf`](../01-blockbloom/AW-EagleCraft-Operations-Playbook.pdf)) covering all 6 platforms, guardrails, kill switches & scripts. |
| **[`topic_personal_life.md`](topic_personal_life.md)** | **Ajay — Life, Career & AI Operating System** | 🟢 Core Profile | Developer identity, Java/Spring Boot & AWS stack, enterprise healthcare projects (QiSpine), 8-step engineering protocol, career vision, 5 life pillars, AI thinking partner contract. |

---

## 🧭 Mandatory Memory & Handoff Rules (EVERY TASK — ALL AIs / ALL SESSIONS)

1. **Read Before Acting (Session Bootstrap):** Every new session or AI assistant must read `blockbloom-notes/memory/MEMORY.md`, the relevant `topic_*.md` file(s), latest `blockbloom-notes/journal/YYYY-MM-DD.md` (plus `arrowbloom-notes/journal/YYYY-MM-DD.md` for Arrow Bloom), and `BlockBloom/DAILY_ACTIVITY.md` before proposing changes or touching tools.
2. **Update Local + GitHub Memory After Every Task:** Before concluding ANY task, fix, audit, release, or strategy decision:
   - Update affected `blockbloom-notes/memory/*.md` topic file(s) and daily journal (`blockbloom-notes/journal/YYYY-MM-DD.md`), plus `arrowbloom-notes/` (`journal/` + `claude-memory/project_arrow_bloom.md`) for Arrow Bloom and `BlockBloom/DAILY_ACTIVITY.md` for Block Bloom.
   - Always write **clean UTF-8** (avoid raw PowerShell `Add-Content` with `$` interpolation or ANSI encoding).
   - Commit and push (`blockbloom-notes` -> `journal`, `arrowbloom-notes` -> `journal`, `BlockBloom` -> `main`, `ArrowBloom` -> active branch) and verify `git status` clean before replying.
3. **Multi-AI Continuity:** Always record exact IDs, versionCodes, metrics, blockers, open questions waiting on Ajay, and the next concrete action so any fresh AI session can pick up seamlessly from step 1.
4. **Dedicated Topic Files:** Spawn a new `topic_<name>.md` when a major initiative or cross-cutting audit warrants isolation; never merge unrelated domains into one giant file.
5. **Ground Truth & Token Hygiene:** Only log verified numbers from raw logs/APIs/console screens (no assumptions). Keep one focused conversation per major sprint and prefer `BlockBloom/tools/*.js` API scripts over browser subagents whenever an API covers the check.
