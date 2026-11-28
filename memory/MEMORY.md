# MEMORY INDEX — Persistent Memory Catalog

> **MANDATE:** This index and its domain files are the shared persistent brain across **all AI assistants and sessions** (Gemini, Claude, Codex, Antigravity). Whenever starting any task, read this index + relevant topic file(s) + latest daily journal FIRST. Whenever finishing any task, decision, or audit, update local + GitHub memory BEFORE concluding.

> **➡ NEXT (`2026-11-28 09:42 IST`, [`13-preflight-and-e1-audit.md`](../01-blockbloom/plan-2026-11/13-preflight-and-e1-audit.md)): `vc44` (`1.19.0`) LIVE at `20%` (`100%` crash-free / `0` ANRs in Crashlytics; Play Pre-launch `0` issues; keep `24–48h` watch -> `P1` `100%`). Done today: `Winter Bloom 2026` (`4831553379281356155`, `Dec 14–21 UTC`) SUBMITTED (`Not started`); `P3` `BlockBloom-Tier1-EN` verified `Presence` + `6` Tier-1 + `₹400/day` + `₹25` tCPI + `Paused`; `P12` `18%` Integrated GST verified live (`-₹563.12` on `₹3,128.42` spend -> Stage 0 needs `₹2,000` top-up on Dec 3, not `₹1,500`); `P2` Advertiser Verification questions inspected (`Dec 26` deadline). Next: Ajay completes `P2` Tasks 1 & 3 -> unlocks Task 2 ID doc upload, record `O-3` + Landscape gameplay video (`P4`/`P11`), rebuild 5-card Play Showcase.**

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
