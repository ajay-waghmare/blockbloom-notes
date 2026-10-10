---
name: reference-blockbloom-analytics
description: "How to pull Block Bloom's Play and GA4 numbers, plus the three measurement traps that have each produced a wrong conclusion"
metadata:
  node_type: memory
  type: reference
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-07T13:23:32.984Z
---

All read-only, Node 16, zero dependencies. One credential covers Play, GCS and GA4: the service
account JSON at `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json` (it matches the
`avid-airway-*.json` entry already in Block Bloom's .gitignore). Pass it **by path**; never inline
the contents and never copy it into the repo.

## Where the readers are

- **GA4** — property **555700046**. `ga4.js <sa.json> 555700046 [days]` for the headline funnel;
  `ga4-oct.js` adds `appVersion` / `deviceModel` / `country` breakdowns.
- **Play installs, countries, languages, versions** — `play-report.js`, which reads the GCS bucket
  `pubsite_prod_8701670281323658688`. The CSVs are **UTF-16LE**. `MONTHS` is hardcoded in the
  script; note that `active` is taken from the LAST month listed, so putting a barely-started month
  last zeroes the active column for every row.
- **Tracks and uploaded bundles** — `tools/play-status.js` (in the repo). Opens an edit and
  discards it, so it commits nothing.
- **Android vitals** — `play-vitals.js`. Daily aggregation **requires** `timeZone
  America/Los_Angeles`; UTC is rejected with HTTP 400.
- **Store-listing locales** — `play-locales.js`. Run this before sending release notes.
- **Reviews** — `play-reviews.js`, but it only returns reviews **with text** from the last ~7 days.
  Zero rows does NOT mean nobody rated.

Scripts other than `play-status.js` / `play-upload.js` / `play-rollout.js` live in the session
scratchpad, not the repo — rewrite or move them if they're needed long-term.

## Three traps, each of which has already produced a wrong conclusion

1. **Play's bulk reports lag about nine days.** On 7 Oct the newest files were `_202609_*` and the
   last row inside them was **25 Sep**, even though the file object had been refreshed on 3 Oct. So
   "September = 156 installs" is 25 days, not 30, and there is no October export at all yet. The
   Play Console web dashboard is fresher than this export.
2. **Vitals `days-with-data=0` means NO DATA, not zero crashes.** Play needs a minimum install
   volume before it reports vitals at all. At this scale Crashlytics is the only crash signal. This
   has been misread as "clean" before.
3. **GA4 is not the user base, and a spike must be split by `appVersion` before blaming it on
   testing.** Most of the installed base ran vc14/vc15, which ship no analytics, so GA4 only sees
   vc16+. When the 2–3 Oct spike appeared I blamed my own `pm clear` screenshot loop; splitting by
   version showed `1.10.0-debug` contributed **1 active / 0 new**, so the spike was real traffic.
   Both `com.aweagle.blockbloom` and `...blockbloom.debug` are registered in google-services.json,
   so the debug build does report — it just wasn't the cause. `OnePlus8Pro` appearing with country
   `(not set)` in matching 8/8 counts is most likely Google's pre-launch test farm.

## Baseline from the 4 Oct 2026 pull

Installs Jun→Sep: **14 → 26 → 93 → 156** (September being 25 days). Active at end of Sep: **109**.
Store funnel: visitors 107 → 282 → 460 with conversion flat at ~**28%** for three months — all the
growth is discovery, not the listing. **Churn ~63%**, worst in IN (116%), ID (89%), DE (78%).
About **36% of installs come from non-English device languages** (pt_BR, ko_KR, ja_JP, tr_TR,
de_DE, es) — the after-the-fact justification for vc20's localisation. Rating **5.0** on very few
ratings. In-app funnel: 59 users start a game, 22 ever clear a line, 17 ever reach game over, 1
ever completes a level.

October 1–4 in GA4: 27 new real users on vc18, roughly 7/day against September's ~6/day — flat,
with no visible lift yet from the new listings and screenshots, which were still in review.

**Still open: internal/emulator traffic is not excluded in GA4.** That is a Firebase console
setting and Ajay's action.

Related: [[project-blockbloom-release]], [[project-blockbloom-monetization]].
