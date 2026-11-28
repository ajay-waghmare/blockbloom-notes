# MEMORY INDEX — Persistent Memory Catalog

> **MANDATE:** This index and its domain files are the shared persistent brain across **all AI assistants and sessions** (Gemini, Claude, Codex, Antigravity). Whenever starting any task, read this index + relevant topic file(s) + latest daily journal FIRST. Whenever finishing any task, decision, or audit, update local + GitHub memory BEFORE concluding.

> **➡ NEXT (`2026-11-28 23:23 IST`, [`12-10k-month-plan.md`](../01-blockbloom/plan-2026-11/12-10k-month-plan.md)): **`vc45 (1.19.1)` (`release/vc45`) UPLOADED & STAGED ON PLAY (`internal` `100%`, `production` `20%` retaining `vc44` `1.19.0` `completed`!)** — `0` `.so` libs (`100%` 16 KB + pre-NDK r28 clean), `15.02` MB (`−6.66 MB`), `+50%%` fixed! Publish `vc45` in Managed Publishing (if held) + verify 0 Play 16 KB warnings -> watch -> `100%` (`P1`) -> merge `release/vc45` → `main`. Earlier today: `Winter Bloom 2026` SUBMITTED; `P3` + `P12` `18%` GST synced (Dec 3 top-up = `₹2,000`); `O-9` expanded; 5-card `1080×1920` Play Showcase built in `content/play-showcase/`. Open human items: `P2` Ads Verif (`Dec 26`), `P4` static swap + `P9` `CPA > ₹45` rule, `O-3`/Landscape video, `vc45` `100%` (`P1`) -> Dec 3 `₹2,000` top-up.**

> **➡ ALSO (27 Nov ~11:00 IST, from Claude): [`12-10k-month-plan.md`](../01-blockbloom/plan-2026-11/12-10k-month-plan.md) — ₹10k/month plan with the day-by-day **money ladder** (pre-flight by Thu 3 Dec → Stage 0 ₹400/day 4–10 Dec, cap ₹2,800 → gates); and [`06-work-like-claude.md`](../01-blockbloom/gemini-skills/06-work-like-claude.md) + `/bb-start /bb-humans /bb-release /bb-wrapup` — how to work like Claude.**

---

## 🗂️ Active Topic Memory Files

| Topic File | Scope / Domain | Status | Key Focus Areas |
| :--- | :--- | :---: | :--- |
| **[`topic_block_bloom.md`](topic_block_bloom.md)** | **Block Bloom: Block Puzzle Game** | 🟢 `vc44` `100%` / `vc45` `20%` | **`vc45` (`1.19.1`) staged `internal` `100%` + `production` `20%` (`0` `.so` libs = 16 KB clean, `−6.66 MB`)**, **`vc44` (`1.19.0`) `completed` (`80%`, `100%` Crashlytics)**, `18%` GST plan/sim synced, 5-card Play Showcase + `Winter Bloom` ready; `P1–P12` Dec 3 -> Stage 0 Dec 4; **Deadline:** Ads Verif `Dec 26`. |
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
