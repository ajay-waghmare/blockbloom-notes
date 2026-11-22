# Block Bloom — 30-day execution plan (22 Nov – 21 Dec 2026)

**Status: COMPLETE (22 Nov 2026).** Strategy and targets: `../11-growth-roadmap-30-days.md` (v1.1, Tier-1 first,
revenue first). This folder turns it into steps. Where the two differ (budget steps, push timing, the Gate B
expectation), **this folder wins**.

**Who does what (Ajay, 22 Nov):** **Gemini does all development and changes** — code, builds, releases, Remote
Config / Firebase changes, scripts, reports, `DAILY_ACTIVITY.md` and the notes journal. **Ajay** does accounts,
money, Google Ads, AdMob and the mediation-network accounts, Meta verification, Play Console UI-only items, clips,
posts, review replies, and every budget and gate decision.

## Files

| File | What |
|---|---|
| **01-day-by-day.md** | **Start here.** Every day, 22 Nov – 21 Dec: Ajay steps, Gemini steps, budget, "done when", Gate A (29 Nov) and Gate B (9 Dec) as decisions |
| 02-gemini-dev-specs.md | vc40 (V40-1…V40-11), vc41 (V41-01…V41-05), vc42 (V42-01…V42-04), vc43 hotfix rules; each with today's code, the change, Remote Config keys, events, acceptance tests, test steps, rollback, hours |
| 03-console-runbooks.md | C-01…C-25: Google Ads, Firebase (A/B test, Remote Config, push), Play Console, AdMob, GA4 — click by click |
| 04-measurement-and-gates.md | `tools/growth-kpi.js` spec (GA4 requests), the spend log, exact Gate A / Gate B / stop-loss formulas, the daily 5-minute check and the Saturday review |
| 05-content-pack.md | Ad headlines (all ≤ 30 characters) and descriptions, US/UK store listing, push texts, Reddit drafts, clip briefs, review replies, release notes, landing-page copy |
| evidence/ | Sourced benchmarks and the independent week-1 model check (22 Nov) |

Items marked **UNVERIFIED** in 02–04 are console labels, limits or versions that could not be confirmed from a
source; check them on screen before relying on them.

## Targets and money (committed path)

| | Day 7 · 28 Nov | Day 14 · 5 Dec | Day 21 · 12 Dec | Day 30 · 21 Dec |
|---|---|---|---|---|
| Revenue a day (AdMob basis) | ₹80 | ₹200 | ₹315 | ₹375 |
| Daily players | ~57 | ~80 | ~100 | ~135 |
| Tier-1 budget a day | ₹400 | ₹500 | ₹500 | ₹500 |

30-day ad spend ≈ ₹14k (stretch ≈ ₹17.5k only if Gate B passes). Tier-1 only: US, UK, CA, AU, NZ, IE.

## What the checks found on 22 Nov (all handled in the plan)

1. **Live events are invisible.** The home-screen strip is hard-coded to "Weekend Cascade +50% · 4h 12m"; deleting
   `live_events` changes nothing on screen until vc40 (V40-11). The every-day Weekend Cascade value in Remote Config
   is still deleted on Day 1 (it inflates coins).
2. **The Shop banner misleads buyers**: "70% OFF · Remove Ads + 200 Gems + 10 Spins" but it sells only `remove_ads`.
   Play policy and refund risk — fixed first in vc40 (V40-5).
3. **The rating prompt breaks Play's rules**: a custom star dialog sends only 4–5 stars to Play. vc40 uses the
   official in-app review API (V40-8).
4. **Push messages reach nobody** in v1.15.1 (Firebase Cloud Messaging auto-init is off). Fixed in vc40 (V40-3); the
   first push is Winter Bloom (14 Dec).
5. **Never delete `ads_interstitial_enabled`** in Remote Config: the code default is ON until vc40 (V40-6).
6. **Releases go straight to 100%.** vc40 adds staged rollout to `tools/play-rollout.js` and must keep the live
   release in the same track update (otherwise the live release can be dropped).
7. **No ad-mediation adapter exists.** vc41 adds AppLovin, Liftoff, Pangle, Mintegral and Meta (V41-01).
8. **Tier-1 install cost rises steeply with budget** (industry: ₹320–450 per opened install at scale against
   ~₹20–25 at today's budget), and Google advises ≤ 20% budget changes. Hence the small steps and the ₹30 cost rule.
9. **The daily streak is only claimed on app start**: a player who resumes the next day can lose it (fixed in V41-02).
10. Two unit tests on `main` cannot pass (interstitial defaults); vc40 makes the code match them.
11. The app's own `ad_impression` event has the same name as AdMob's automatic one; counts mix (rename proposed).
12. play-services-ads 23.x is deprecated since 17 Feb 2026 (sunset 30 Jun 2027): plan the Kotlin 2 / GMA 24
    migration for early 2027.

## Decisions Ajay owes (recommendation in brackets)

**By Sun 22 Nov (Day 1)**
1. Budget path: committed ≈ ₹14k, stretch ≈ ₹17.5k only through Gate B [committed].
2. Pause App-1; Tier-1 six countries only; rename the campaign `BlockBloom-Tier1-EN` [yes].
3. Interstitial test E1 from today, as a retention safety check [yes].
4. Delete the every-day Weekend Cascade in Remote Config [yes].
5. `blockbloom-notes` is a **public** repo: the spend log and weekly reports would be public [make it private,
   or keep the spend log out of git].

**By Mon 23 Nov evening (before vc40 is built)**
6. Shop banner: a plain honest "Remove Ads" [yes], or a real bundle product.
7. Remove the custom star-rating dialog; use the official review API [yes].
8. Notification ask: a "Remind me" button on the first game-over screen plus one more ask on day 2 [yes].
9. Register your phone as an AdMob test device and add a Play license tester (for Tuesday's tests) [do it].
10. Is managed publishing on in Play Console? Submit the 20% release Tue 20:00 or Wed 09:00 IST?
11. Going to 100%: crash-free ≥ 99.5% (roadmap) or zero new crashes (GEMINI.md Law 4)? With ~20 users at 20%, one
    crash reads as ~95% [zero new crash signatures and no ANR cluster].
12. Does the Data Safety form already declare the push-notification device identifier? (needed with V40-3)
13. Google Ads account time zone, and is the GA4 property on Asia/Kolkata?
14. Count a tutorial "Skip" as completed onboarding? [yes, reported separately]
15. Give the one-time AdMob consent so the KPI script can read exact AdMob revenue by country [yes].

**By Sat 28 Nov (before Gate A)**
16. Gate A day-1 return: provisional read on Sun 29 Nov, confirmed Mon 30 Nov when the 28 Nov installs are complete
    [yes].
17. Gate reads: provisional on the gate day, automatic confirmation 1–2 days later, budget rolled back if it fails [yes].

**By Sun 29 Nov (before vc41 is built)**
18. EEA / UK / Switzerland: only AdMob + AppLovin (the older adapters do not pass consent) [yes].
19. No Pangle bidding for US users until a newer adapter [yes].
20. Gate ads on the consent check (`canRequestAds()`) in vc41 — may lower fill in UK / IE / EEA [yes].
21. Referral inviter reward in vc41 or vc42 [vc42 unless ahead].
22. Reminders: "streak at risk" from streak 1 (gives new players a day-2 reminder) [yes]; drop the old 3-day
    win-back and daily-challenge reminders [yes; Remote Config can restore them].
23. Rename the app's `ad_impression` event to `ad_shown` [yes].

**By Mon 7 Dec (before vc42)**
24. Starter pack price and contents if the offer test passes [US $1.99: 100 gems + 1,000 coins + 3 of each power-up].
25. Is Arrow Bloom live in production in the Tier-1 countries? If not, its card stays off.
26. Winter Bloom ends after Mon 21 Dec; remove its Remote Config value on Tue 22 Dec [yes].

**Later**
27. Kotlin 2 / play-services-ads 24 migration by February 2027 [yes].
28. Review the interstitial that fires when a player quits mid-game, after E1 is read [January].
