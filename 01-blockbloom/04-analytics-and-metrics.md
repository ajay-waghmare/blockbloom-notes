# Analytics and metrics

## Sources and how to pull them

All scripts: Node, zero dependencies, read-only, credential by path. Copies in `scripts\`;
`pull-metrics.js` is committed in the repo on the vc21 branch.

| Source | Script | Notes |
|---|---|---|
| GA4 (Firebase Analytics), property 555700046 | `tools\pull-metrics.js [sa.json]` (daily, by version, by country, events, vitals in one run); `scripts\ga4.js <sa> 555700046 [days]`; `scripts\ga4-oct.js` (appVersion / deviceModel / country splits) | Only vc16+ report; most of the early installed base ran vc14/vc15 with no analytics |
| Play bulk reports, bucket `pubsite_prod_8701670281323658688` | `scripts\play-report.js <sa>` (all months -> report.json), `play-stats-ls.js`, `play-stats-get.js`, `gcs-list.js` | CSVs are **UTF-16LE**; `MONTHS` is hardcoded; the `active` column comes from the LAST month listed |
| Play tracks | `tools\play-status.js <sa> <pkg>` | opens and discards an edit, commits nothing |
| Android vitals (Play Developer Reporting API) | `scripts\play-vitals.js <sa> <pkg> [days]` | daily queries need `timeZone America/Los_Angeles`; UTC is HTTP 400 |
| Reviews | `scripts\play-reviews.js` | only reviews with text, last ~7 days; zero rows does not mean no ratings |
| Store listing locales | `scripts\play-locales.js` | run before sending release notes |
| Workbook | `make-sheets.js` (report.json -> sheets.json) then `make-xlsx.js` (dependency-free OOXML writer) | Excel COM is dead on the work laptop; WPS opens the file |

Access notes: the service account has no GCP IAM role, so enabling any Google API is a console
click (done for Play Developer Reporting on 20 Sep 2026). Play never exposes installer identity.
Traffic sources all report as "Other" below Play's threshold.

## The three traps (each produced a wrong conclusion once)

1. **Play bulk reports lag about nine days.** "September = 156 installs" was 25 days of data.
   Check the last row date inside the CSV, not the file's modified time.
2. **Vitals `days-with-data=0` means NO DATA, not zero crashes.** Install volume is below Play's
   reporting threshold. Crashlytics is the only crash signal at this scale.
3. **Split any GA4 spike by `appVersion` before blaming testing.** The 2-3 Oct lift was called an
   emulator artefact; `1.10.0-debug` contributed 1 active / 0 new. Both the release and `.debug`
   builds are registered in google-services.json, so debug does report. `OnePlus8Pro` with
   country `(not set)` in matching counts is Google's pre-launch test farm: subtract it.
   Also: `tutorial_complete` fired on Skip until vc19, `tutorial_begin` was dead until vc19, so
   do not compare those series across versions.

Still open: exclude internal/emulator traffic in GA4 (Firebase console setting, your action).

## Latest numbers (pulled 9 Oct 2026)

GA4, 28 days, against the 4 Oct pull:

```
active users   133  (was 79)     new users   132  (was 76)
sessions       319  (was 137)    engagement  2,729 min (was 1,039)  -> 8.6 min/session
```

Daily actives stepped up, not spiked: late September 3-7/day; from 2 Oct sustained 15-26/day.
The install lift began 2-3 Oct, **before** vc20 reached production on 4 Oct, so attribute the
acquisition lift to the localised listings/screenshots clearing review, and the funnel and
engagement gains to the app changes.

Growth loops firing for the first time ever: `review_prompt` 41 events / 25 users (was 0);
`share_result` 4 / 2 (was 0). First `app_exception`: 1 event / 1 user.

Funnel (users): game_start 106 -> first_clear 51 (48%, was 37%) -> game_over 44 (42%, was 29%);
level_complete 4 (was 1); daily_challenge_done 12 (was 5); lifeline_used 23 (was 7); app_remove 55.

By app version, 1 Oct onward: 1.10.0 = 73 active / 61 new / 166 sessions; 1.9.0 = 42 / 34 / 76;
debug builds 1 active each (Ajay).

Play (September complete; October through 4 Oct only):

```
Sep 2026   installs 193   uninstalls 116   net +77   active devices at end 127
Oct 1-4    installs  34   uninstalls  40   net  -6   active devices at end 134
Store, Sep: 531 visitors -> 151 installs = 28.4% conversion (flat for 4 months)
```

Churn by country (Jul-Oct): IN 153%, ID 92%, TR 75%, BR 71%, DE 70%, JP 63%, KR 61%, US 59%,
ES 55%, GB 42%, MY 25%. Languages with volume: en_US, en_GB, pt_BR, ko_KR, es_US, es_ES, tr_TR,
ja_JP, de_DE; `es_ES` churns least (36%).

What to look for next: October `store_performance` (does conversion move with the new listings),
vc21 crash signal in Crashlytics, and whether the 15-26/day baseline holds.

## Baselines worth keeping

- Installs by month, Jun-Sep 2026: 14 -> 26 -> 93 -> 193. Active devices at end of Sep: 127.
- 13 Sep: the app ranked for its own name for the first time ("block bloom" position 6-11),
  after crossing the public "100+" bucket with no release in between.
- 20 Sep workbook `reports\BlockBloom-players-2026-09-20.xlsx` and `report-2026-09-20.baseline.json`
  are the pre-vc15 baseline.
