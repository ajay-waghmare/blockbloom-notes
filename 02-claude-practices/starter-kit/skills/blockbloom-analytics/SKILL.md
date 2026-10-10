---
name: blockbloom-analytics
description: Pull and interpret Block Bloom's numbers from GA4, the Play reports bucket, the Play tracks and Android vitals, avoiding the three measurement traps that have each produced a wrong conclusion. Use for "analytics", "installs", "retention", "churn", "how is the app doing".
---

# Block Bloom analytics

Everything is read-only, Node, zero dependencies, credential by path (`<sa>` = the
`avid-airway-498216-e5-9f357c8e6b11.json` key; path in `reference_personal_laptop_environment.md`).
Read `reference_blockbloom_analytics.md` (memory) for the baselines.

## Pull
1. **GA4 (property 555700046):** `node tools/pull-metrics.js <sa>` — daily actives/new/sessions
   since 1 Oct, by appVersion, top countries, event funnel, vitals probe. For a different window
   use the `ga4.js <sa> 555700046 [days]` / `ga4-oct.js` copies from the handover scripts folder.
2. **Play installs/uninstalls/countries/languages:** `play-report.js <sa>` reads
   `gs://pubsite_prod_8701670281323658688` (CSV, UTF-16LE). Edit `MONTHS`; the `active` column is
   taken from the LAST month listed, so never put a barely-started month last.
3. **Tracks:** `node tools/play-status.js <sa> com.aweagle.blockbloom`.
4. **Vitals:** `play-vitals.js <sa> com.aweagle.blockbloom [days]`; daily aggregation requires
   `timeZone America/Los_Angeles`.
5. **Reviews:** `play-reviews.js` returns only reviews with text from ~7 days.

## Interpret — the traps
- **Play bulk reports lag ~9 days.** Read the last row date inside the CSV. A "month" may be
  25 days. The console dashboard is fresher than the export.
- **Vitals 0 rows = NO DATA** (below Play's privacy threshold), not zero crashes. Crashlytics and
  GA4 `app_exception` are the only crash signals.
- **Split any spike by `appVersion` before attributing it.** Debug builds (`*-debug`) are Ajay.
  `OnePlus8Pro` + country `(not set)` in matching counts is Google's test farm: subtract it.
  Internal/emulator traffic is not yet excluded in the Firebase console.
- Event semantics changed across versions: `tutorial_complete` fired on Skip before vc19;
  `tutorial_begin`, `REMINDER_OPENED`, `SHARE_RESULT`, `REVIEW_PROMPT` were dead constants
  before vc19/vc20. Compare funnels within a version, by USERS not events.
- Most of the early installed base ran vc14/vc15 with no analytics; GA4 sees vc16+ only.
- Attribute by timing: a lift that starts before a build reaches production is the store
  listing, not the app.

## Report
Lead with what changed versus the previous pull and why it matters (loops firing, funnel
percentages, daily shape), then Play installs/uninstalls/net/active, then churn by country, then
what cannot be answered yet (October `store_performance`, conversion). Numbers in a table, not
prose. State explicitly which figures are "devices with the app installed" versus "daily actives".
Update `reference_blockbloom_analytics.md` with the new baseline.
