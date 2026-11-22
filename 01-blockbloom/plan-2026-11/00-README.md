# Block Bloom — 30-day execution plan (22 Nov – 21 Dec 2026)

**Status: IN PROGRESS (saved 22 Nov 2026).** Parts are added here as they are finished.

Strategy and targets: `../11-growth-roadmap-30-days.md` (v1.1: Tier-1 first, revenue first).
This folder turns it into steps. **Gemini does all development and changes** (code, builds, releases, Remote
Config / Firebase changes, scripts, reports). **Ajay** does accounts, money, Google Ads, AdMob and network accounts,
Meta verification, Play Console UI-only items, clips, posts, review replies and every budget / gate decision.

| File | What | Status |
|---|---|---|
| 01-day-by-day.md | Every day, 22 Nov – 21 Dec: Ajay steps, Gemini steps, budget, done-when | coming |
| 02-gemini-dev-specs.md | vc40, vc41, vc42, vc43 specs | coming |
| 03-console-runbooks.md | Google Ads, Firebase, Play Console, AdMob, GA4 click-by-click (C-01..C-25) | draft (UNVERIFIED items marked) |
| 04-measurement-and-gates.md | KPI script spec (tools/growth-kpi.js), spend log, Gate A / Gate B formulas, daily + Saturday routines | draft |
| 05-content-pack.md | Ad texts, US/UK listing, push texts, Reddit drafts, clip briefs, review replies, release notes | draft (not yet verified) |
| evidence/ | Benchmarks (sourced) and the independent week-1 model check, 22 Nov | done |

## Corrections found on 22 Nov (they apply to every part)
1. Push messages reach nobody in v1.15.1: Firebase Cloud Messaging auto-init is off. vc40 fixes it before any push.
2. Never delete `ads_interstitial_enabled` in Remote Config: the code default is ON. vc40 makes the default OFF.
3. `tools/play-rollout.js` always rolls out at 100%. vc40 adds a staged-rollout option.
4. Tier-1 install cost rises steeply with budget (industry: ₹320–450 per opened install at scale vs ~₹20–25 at
   today's small budget). Keep the cost rule: no budget increase above ₹30 per opened install.
5. Most ad-load failures are probably banner refresh no-fills, not a retry loop; vc40 logs the ad format on failures.
