---
name: reference-blockbloom-analytics
description: "How to pull Block Bloom's Play and GA4 numbers, plus the three measurement traps that have each produced a wrong conclusion"
metadata:
  node_type: memory
  type: reference
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-23T16:34:00.000Z
---

All read-only, Node 16, zero dependencies. One credential covers Play, GCS and GA4: the service
account JSON at `avid-airway-498216-e5-9f357c8e6b11.json` (it matches the
`avid-airway-*.json` entry already in Block Bloom's .gitignore). Pass it **by path**; never inline
the contents and never copy it into the repo.

## Where the readers are

- **GA4** — property **555700046**. `node tools/pull-metrics.js <sa.json>` for daily users, versions,
  top countries and gameplay event funnel.
- **Play installs, countries, languages, versions** — `play-report.js`, which reads the GCS bucket
  `pubsite_prod_8701670281323658688`. The CSVs are **UTF-16LE**. `MONTHS` is hardcoded in the
  script; note that `active` is taken from the LAST month listed, so putting a barely-started month
  last zeroes the active column for every row.
- **Tracks and uploaded bundles** — `tools/play-status.js` (in the repo). Opens an edit and
  discards it, so it commits nothing.
- **Android vitals** — `play-vitals.js`. Daily aggregation **requires** `timeZone
  America/Los_Angeles`; UTC is rejected with HTTP 400.
- **Reviews** — `play-reviews.js`, but it only returns reviews **with text** from the last ~7 days.
  Zero rows does NOT mean nobody rated.

## Three traps, each of which has already produced a wrong conclusion

1. **Play's bulk reports lag about nine days.** Play CSV export data lags roughly 7–9 days behind real-time.
   The console dashboard and GA4 are fresher than the export.
2. **Vitals `days-with-data=0` means NO DATA, not zero crashes.** Play needs a minimum install
   volume before it reports vitals at all. At this scale Crashlytics and GA4 `app_exception` are the only crash signals.
3. **GA4 is not the user base, and a spike must be split by `appVersion` before blaming it on
   testing.** Most early installs ran vc14/vc15, which had no analytics, so GA4 only sees vc16+.

## Baseline from the 28 Oct 2026 pull

- **Active Devices with app installed**: **139** (up +7 from previous pull; through 23 Oct 2026 Play export).
- **Monthly Installs / Uninstalls**:
  - Jul: 26 installs, 22 uninstalls, net +4, active 15
  - Aug: 93 installs, 65 uninstalls, net +28, active 46
  - Sep: 193 installs, 116 uninstalls, net +77, active 127
  - Oct (through 23 Oct): 143 installs, 152 uninstalls, net -9, active 139
- **Store Funnel (Play)**: 489 visitors, 131 acquisitions, conversion steady at **26.8%**.
- **GA4 Daily Traffic (1–28 Oct)**:
  - High sustained engagement throughout the week: 23 Oct (839m), 24 Oct (507m), 25 Oct (756m), 26 Oct (706m), 27 Oct (613m).
  - Averaging 30–40 min/day per active user.
  - 28 Oct (in progress): 16 active users, 2 new users, 18 sessions, 288 min engagement.
- **Top Countries (Active Devices)**: Brazil (13), US (11), India (11), South Korea (8), Japan (8), Indonesia (7), Turkey (4), Germany (4), UK (4), Ukraine (4), Belgium (4), Mexico (4).
- **App Version Migration**: vc24 (1.12.1) has taken over as the primary version with **83 active devices** in Play export and 70 active users / 256 sessions in GA4.
- **Gameplay & Retention Loops**:
  - 2,318 games started by 238 users (~9.7 games/user).
  - 1,461 lifelines used across 75 players.
  - Tutorial completion: 196 completions across 173 users (~93.0% completion rate).
  - Rating prompt fired for 105 users (190 events).
  - Rewarded ads watched: 18 events across 11 users.
  - Review: 5-star verified review from Tanmay Bagal on vc24 ("Very fun game with nice clean ui").
- **Stability**: Zero crash spikes; only 1 `app_exception` recorded in GA4 for the entire month. Vitals below Play privacy threshold.

**Still open: internal/emulator traffic is not excluded in GA4.** That is a Firebase console setting.

Related: [[project-blockbloom-release]], [[project-blockbloom-monetization]].
