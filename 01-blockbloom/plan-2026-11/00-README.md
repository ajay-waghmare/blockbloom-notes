# Block Bloom — execution plan v2 (Mon 23 Nov – Thu 31 Dec 2026)

**Status: v2, 22 Nov 2026 (evening) — organic first in Tier-1, paid ads only in 7-day bursts.** v1 (Sun 22 Nov – Mon
21 Dec, ≈ ₹14k of every-day ads) is replaced: its own model lost ~₹7.4k by Day 30. v1 is in git history at `721fdb8`.
Strategy background: `../11-growth-roadmap-30-days.md` (v1.1). Its money and budget sections are replaced by this
folder; where the two differ, **this folder wins**.

**Who owns what (Ajay, 22 Nov: "All the things have to be owned by Gemini"):**
- **Gemini** owns the plan and everything in it: code, builds, releases, Remote Config / Firebase, Play API (listing,
  review replies), Google Ads clicks on Ajay's go, the KPI tool, reports, the notes journal, research, and updates to
  this plan. How Gemini researches and decides on its own: `../gemini-skills/README.md`.
- **Ajay** makes every payment and approval (releases to 100%, each burst, the gates), posts from his own accounts,
  records clips, sends creator emails, and does the Play Console screens the API cannot reach.
- **Claude** guides when asked (reviews Gemini's weekly strategy note). No tasks.

## Files

| File | What |
|---|---|
| **01-day-by-day.md** | **Start here.** The daily target table (39 days), every day's steps for Gemini and Ajay, the checks |
| **06-organic-tier1.md** | The main engine: levers O-1…O-12 (honest listing, custom listing, store video, ratings, Play event cards, daily clips, Reddit, creators, referral), targets, Holiday Bloom, measurement |
| **07-ad-bursts.md** | The ad money answer (₹3,500 committed, ₹10,500 at most to 31 Dec), why bursts, burst rules, set-up, measurement, the Burst 2 decision |
| **08-dollar-a-day-plan.md** | **Nov 26 Amendment:** Mathematical `$1.00/day` (`₹93/day`) gap diagnosis + phased roadmap (`Phase 1` measurement/O-3/O-6 -> `Phase 2` `vc42` daily loop + E1/interstitial/mediation/IAP pacing -> `Phase 3` retention-gated Burst 1) |
| 02-gemini-dev-specs.md | vc40 (V40-1…V40-11), vc41 (V41-01…05), vc42 (V42-01…04), vc43 hotfix rules — unchanged by v2 |
| 03-console-runbooks.md | C-01…C-25 click by click (v2 notes at the top) |
| 04-measurement-and-gates.md | `tools/growth-kpi.js` spec, spend log, formulas, routines (v2 notes at the top) |
| 05-content-pack.md | Ad texts, US/UK store listing, push, Reddit drafts, clip captions, review replies, release notes, UTM links |
| `../gemini-skills/` | Gemini's research and strategy skills, the decision rules, every source used so far |
| `../scripts/growth-model-v2.js` | The v2 model (daily targets, profit, burst returns) |
| evidence/ | Sourced benchmarks and the independent week-1 model check (22 Nov) |

Items marked **UNVERIFIED** are console labels, limits or versions that could not be confirmed from a source; check
them on screen before relying on them.

## Targets and money (committed path; model `../scripts/growth-model-v2.js`)

| | Day 7 · Sun 29 Nov | Day 14 · Sun 6 Dec | Day 21 · Sun 13 Dec | Day 30 · Tue 22 Dec | Day 39 · Thu 31 Dec |
|---|---|---|---|---|---|
| Tier-1 free downloads a day (7-day avg) | 3 | 4 | 5 | 5 | 8 |
| Daily players | ~36 | ~36 | ~62 | ~61 | ~64 |
| Revenue a day (AdMob basis) | ₹45 | ₹66 | ₹192 | ₹185 | ₹160 |
| Ad spend so far | ₹0 | ₹0 | ₹1,000 | ₹3,500 | ₹3,500 |
| **Profit so far** | **+₹247** | **+₹597** | **+₹391** | **+₹50** | **+₹1,560** |

To 31 Dec: ₹3,500 of ads (Burst 1, 12–18 Dec), ~₹5.1k revenue, **+₹1.6k profit**; by 20 Feb, +₹9.5k. Burst 2 (₹7,000,
25–31 Dec) only if Burst 1 earns back ≥ 40% of its cost in 7 days. If the interstitial test loses, profit to 31 Dec is
about ₹0 (+₹5.3k by 20 Feb). Revenue falls ~20% after Christmas: ad prices drop, ours too.

## What the checks found (22 Nov; all handled in the plan)

1. **Every-day Tier-1 ads lose money at today's numbers:** ₹100 of ads returns ~₹64 within 3 months even after all
   fixes (v1 model) — hence plan v2.
2. **The live store listing says "nothing interrupts your game (optional reward videos only)"**, untrue with banners
   and, since 22 Nov, interstitials for half the players. Gemini fixes it on Mon 23 Nov (O-1).
3. **The Shop banner misled buyers** ("70% OFF · Remove Ads + 200 Gems + 10 Spins", selling only `remove_ads`): fixed
   on `release/vc40` on 22 Nov (V40-5).
4. **The rating prompt breaks Play's rules** (custom star dialog sending only 4–5 stars to Play): vc40 uses the official
   review API (V40-8).
5. **Push messages reach nobody** in v1.15.1 (Firebase Cloud Messaging auto-init off): fixed in vc40 (V40-3). First
   push: Winter Bloom, 14 Dec.
6. **Live events were invisible:** the home strip is hard-coded until vc40 (V40-11). The every-day Weekend Cascade was
   deleted on 22 Nov.
7. **Never delete `ads_interstitial_enabled`** in Remote Config: the code default is ON in vc39 (OFF from vc40, V40-6).
8. **Releases went straight to 100%.** vc40 adds staged rollout to `tools/play-rollout.js` and must keep the live
   release in the same track update.
9. **No ad-mediation adapter exists.** vc41 adds AppLovin, Liftoff, Pangle, Mintegral and Meta (V41-01).
10. **The daily streak is only claimed on app start** (fixed in V41-02).
11. The app's own `ad_impression` event has the same name as AdMob's automatic one (rename proposed).
12. play-services-ads 23.x is deprecated since 17 Feb 2026 (sunset 30 Jun 2027): Kotlin 2 / GMA 24 migration early
    2027.
13. **Tier-1 free downloads are ~1 a day and the store page has 10 ratings and no video** — the organic plan starts
    from almost zero (`06` §1).

## Decisions Ajay owes (recommendation in brackets)

Done on 22 Nov: interstitial test E1 started; every-day Weekend Cascade deleted; App-1 paused; Tier-1 campaign limited
to 6 countries; honest Shop banner (V40-5).

**By Mon 23 Nov (Day 1)**
1. Plan v2: organic first; ads only in 7-day bursts; ₹3,500 committed, ₹10,500 at most to 31 Dec [yes].
2. Pause `BlockBloom-Tier1-EN` today; no top-up; both campaigns kept, not removed [yes].
3. `blockbloom-notes` is a **public** repo: the spend log, revenue and this plan are visible to anyone [make it
   private].
4. Price test E2 for `remove_ads` dropped until there are buyers to read (≥ 20 purchases a month) [yes].
5. Gemini may do console clicks (Google Ads, Play, Firebase) on Ajay's go; payments stay Ajay's [yes].

**By Mon 23 Nov evening (before the vc40 internal build)**
6. Remove the custom star-rating dialog; use the official review API [yes].
7. Notification ask: a "Remind me" button on the first game-over screen plus one more ask on day 2 [yes].
8. Register your phone as an AdMob test device and add a Play license tester [do it].
9. Is managed publishing on in Play Console? Submit the 20% release Tue 20:00 or Wed 09:00 IST?
10. Going to 100%: zero new crash signatures and no ANR cluster (GEMINI.md Law 4) rather than a crash-free % that one
    crash moves at ~20 users [zero new signatures].
11. Does the Data Safety form already declare the push-notification device identifier? (needed with V40-3)
12. Google Ads account time zone, and the GA4 property time zone (the burst on/off times assume IST).
13. Count a tutorial "Skip" as completed onboarding? [yes, reported separately]
14. Give the one-time AdMob consent so the KPI tool can read exact AdMob revenue by country [yes].

**By Sat 28 Nov**
15. Submit the Winter Bloom Play card on Sat 28 Nov, 15 days ahead, so it can be featured [yes].
16. Holiday Bloom, 24 Dec – 3 Jan: config-only event (coins ×2) with a Play card submitted Wed 9 Dec [yes].
17. Reddit #3 moves to Mon 14 Dec (Winter Bloom launch) and #4 to Sat 26 Dec (Holiday Bloom) [yes].

**By Sun 29 Nov (before vc41 is built)**
18. EEA / UK / Switzerland: only AdMob + AppLovin (the older adapters do not pass consent) [yes].
19. No Pangle bidding for US users until a newer adapter [yes].
20. Gate ads on the consent check (`canRequestAds()`) in vc41 — may lower fill in UK / IE / EEA [yes].
21. Referral inviter reward in vc41 or vc42 [vc42 unless ahead].
22. Reminders: "streak at risk" from streak 1 [yes]; drop the old 3-day win-back and daily-challenge reminders [yes].
23. Rename the app's `ad_impression` event to `ad_shown` [yes].

**By Mon 7 Dec (before vc42)**
24. Starter pack price and contents if the offer test passes [US $1.99: 100 gems + 1,000 coins + 3 of each power-up].
25. Is Arrow Bloom live in production in the Tier-1 countries? (V42-04 and O-12)
26. Winter Bloom ends after Mon 21 Dec; remove its Remote Config value on Tue 22 Dec [yes].

**Bursts**
27. Thu 10 Dec: Burst 1 runs 12–18 Dec, or moves to 25–31 Dec (`07` burst-ready check).
28. Wed 23 Dec: Burst 2 yes or no (`07`: day-7 return ≥ 40%).

**Later**
29. Kotlin 2 / play-services-ads 24 migration by February 2027 [yes].
30. Review the interstitial that fires when a player quits mid-game, after E1 is read [January].
