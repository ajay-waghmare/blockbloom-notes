# Block Bloom — 30-day execution plan (22 Nov – 21 Dec 2026)

**Status: IN PROGRESS (saved 22 Nov 2026).** Parts are added here as they are finished.

Strategy and targets: `../11-growth-roadmap-30-days.md` (v1.1: Tier-1 first, revenue first).
This folder turns it into steps. **Gemini does all development and changes** (code, builds, releases, Remote
Config / Firebase changes, scripts, reports). **Ajay** does accounts, money, Google Ads, AdMob and network accounts,
Meta verification, Play Console UI-only items, clips, posts, review replies and every budget / gate decision.

| File | What | Status |
|---|---|---|
| 01-day-by-day.md | Every day, 22 Nov – 21 Dec: Ajay steps, Gemini steps, budget, done-when, Gate A / Gate B decisions | done (spec IDs V40/V41/V42 final once 02 lands) |
| 02-gemini-dev-specs.md | vc40 (11 items, ~24 h + release) done; vc41 / vc42 / vc43 coming | part 1 done |
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
5. Most ad-load failures are probably banner refresh no-fills; banner and rewarded already log `ad_format` (register it as a GA4 custom dimension); interstitials log nothing until vc40.
6. The home-screen event strip is hard-coded ("Weekend Cascade +50% · 4h 12m"): live events are invisible until vc40 (V40-11).
7. The Shop banner advertises "70% OFF · Remove Ads + 200 Gems + 10 Spins" but sells only `remove_ads` — Play policy risk, fixed first in vc40 (V40-5).
8. The rating prompt is a custom star dialog that sends only 4–5 stars to Play — against Play's review rules; vc40 uses the official in-app review API (V40-8).
9. Two unit tests on `main` cannot pass (interstitial defaults); vc40 makes the code match them (V40-6).
