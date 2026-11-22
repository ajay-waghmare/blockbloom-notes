# Block Bloom: measurement and gates spec (22 Nov - 21 Dec 2026)

Written 22 Nov 2026 by Claude, as a plan only. **Gemini** builds everything in sections 1 and 2.
**Ajay** fills the spend log, reads the screen, and makes every budget and gate decision.
Checked against: app repo `main` d0235e0 (read-only), notes repo branch `journal`,
`11-growth-roadmap-30-days.md` v1.1, `reports/growth-baseline-2026-11-21.txt`, `scripts/growth-baseline-pull.js`,
`scripts/growth-model-t1.js`, `prior-model-check.json`, `prior-levers.json`. Sources are listed in section 8.

Path names: "app repo" = `ajay-waghmare/BlockBloom`. "Notes repo" = `ajay-waghmare/blockbloom-notes`, branch
`journal`. All paths below are relative to the repo root. Gemini's laptop paths are not known; pass them as options.

---

## 0. Seven facts that change the plan (read first)

1. **The gate windows are not complete on the gate days.**
   - Gate A (Sun 29 Nov, data to Sat 28 Nov): the day-1 return of Day-7 installs (Sat 28 Nov) needs Sun 29 Nov data.
   - Gate B (Wed 9 Dec, data to Tue 8 Dec): the 7-day revenue of Day-12 and Day-13 installs ends on 9 and 10 Dec.
   - Day-22 rule (Sun 13 Dec, data to Sat 12 Dec): Day-16 and Day-17 installs end on 13 and 14 Dec.
   - GA4 needs about 12 hours after a day ends, and numbers can still move for 24-48 hours (source S5).
   - Fix (section 3.9): a **provisional** read on the gate day, with the missing days projected, and an **automatic
     confirmation** by the tool when the window completes. If the confirmation fails, the budget goes back.
2. **The model fails its own Gate B.** `growth-model-t1.js` labels its base case "both gates pass", but it prints
   day-7 return on spend of **22%** for the Day 10-13 installs (25% on AdMob basis, 23% with the bug fix in 6.1).
   Gate B needs 30%. So the expected path is the **committed** one (Rs13.6k), not the stretch (Rs18k).
3. **`ad_format` is already logged.** FACTS update 4 is half right. Banner and rewarded events already carry
   `ad_format` and `error_code` (`monetize/AdMobAdHost.kt:151-189`, `monetize/PersistentBannerManager.kt:55-97`).
   GA4 cannot show them yet because they are not registered as custom dimensions. Registering them (section 1.2)
   gives the failure breakdown in 24-48 hours, with no release. What is missing in code: **interstitials log nothing**
   (`AdMobAdHost.kt:207-230` load, `:322-345` show) and **free fallback rewards log nothing**
   (`viewmodel/GameViewModel.kt:1211-1227`).
4. **GA4 counts ad impressions twice.** The app logs its own event named `ad_impression` (`analytics/Analytics.kt:60`),
   the same name as the AdMob event GA4 collects automatically (S6). In the baseline, `publisherAdImpressions`
   (1,741) equals the `ad_impression` event count (1,741). Use `totalAdRevenue` for money. Never use
   `publisherAdImpressions` as an ad count.
5. **`activeUsers` over a date range counts distinct players, not active days.** The baseline's "Rs3.51 per active US
   player" is per player over 21 days. Revenue per active day needs daily rows summed (section 3.4).
6. **Country "(not set)" is 62 of 378 first opens (16%).** These are almost all "Direct", and the notes say this is
   Play's pre-launch test farm (`01-blockbloom/04-analytics-and-metrics.md`, trap 3). Each new release
   triggers another run. Keep them out of every cohort and rate, or day-1 return reads too low.
7. **The budget ladder breaks the roadmap's own rule.** Roadmap section 4 says "raise budgets by at most 30% at a
   time, every 3+ days". The ladder goes Rs300 -> Rs500 on Day 10 (+67%) and Rs500 -> Rs700 on Day 18 (+40%).
   Only Rs700 -> Rs900 (+29%) fits. Ajay decides (open question Q6).

---

## 1. Spec for Gemini: `tools/growth-kpi.js` (app repo)

### 1.1 What it is

- A new file `tools/growth-kpi.js` in the **app repo** (private). Copy the plumbing from the notes repo's
  `01-blockbloom/scripts/growth-baseline-pull.js`: the key lookup (`:14-20`), `req()` (`:27-35`), `token()` (`:36-43`),
  `ga()` (`:44-48`) and `step()` (`:57`).
- Node 16+, **zero dependencies**, **read-only**. Scopes allowed: `analytics.readonly`, `playdeveloperreporting`,
  `devstorage.read_only`, and (optional, section 1.4 R13) `admob.readonly`. No other scope. No write endpoint.
- Never print the key, the token, or a user id. Output is counts, rates and money only.
- Keep it under about 600 lines. One file. Constants at the top.

### 1.2 One-time setup (before the first full run)

| # | Step | Owner | Why |
|---|---|---|---|
| S-1 | GA4 Admin -> Data display -> Custom definitions -> Create custom dimension, **event scope**: `ad_format`, `error_code`, `skipped`, `product_id`, `placement`, `outcome`, `fatal` | Gemini (Ajay if Gemini has no console access) | The Data API rejects `customEvent:x` until `x` is registered (S1). 7 of 50 event slots (S3). |
| S-2 | Same page, **user scope**: `firebase_exp_<N>` (N = the E1 experiment id, the number at the end of the Firebase A/B "Experiment overview" URL, S7) | Gemini / Ajay | Needed for E1 arms in GA4 (`customUser:firebase_exp_<N>`). 1 of 25 user slots. UNVERIFIED that GA4 accepts this name (it starts with `firebase_`). If refused, read E1 only on the Firebase A/B results page. |
| S-3 | Link Google Ads to GA4/Firebase; import `first_open` (and later `tutorial_complete`) as conversions | Ajay (roadmap Day 1) | Gives `firstUserGoogleAdsCampaignName`, which is needed for paid cohorts. |
| S-4 | Note the **Google Ads account time zone** and the exact Tier-1 campaign name | Ajay | Spend days must match GA4 days (Q1, Q12). |
| S-5 | Confirm the GA4 property time zone. The 19 Oct journal says it was "United Kingdom" and asked for Asia/Kolkata. | Gemini reads it (R0) | Day boundaries. |

Data for a new custom dimension appears 24-48 hours after it is created (S3, S4). It is probably **not** filled for
older days (UNVERIFIED in an official page). So register on Day 1 (Sun 22 Nov).

### 1.3 Common rules (apply to every number)

- **Plan days.** `day(date) = (date - 2026-11-21)` in days. Day 1 = Sun 22 Nov, Day 30 = Mon 21 Dec.
- **Tiers.** Use `countryId` (ISO code), not `country`. Tier-1 = `US, GB, CA, AU, NZ, IE` (UK is `GB`).
  "unknown" = `countryId` empty or `(not set)`. "other" = everything else.
  Unknown is **excluded** from all cohorts, return rates and per-player figures; print its count once.
- **Debug builds.** Add to every GA4 request:
  `F_NODEBUG = {"notExpression":{"filter":{"fieldName":"appVersion","stringFilter":{"matchType":"CONTAINS","value":"debug"}}}}`
  (debug builds report to GA4: `04-analytics-and-metrics.md` trap 3). If the API rejects a filter on a dimension that
  is not requested, add `appVersion` to the dimensions and filter in code.
- **Currency.** Send `"currencyCode": "INR"` in every GA4 request (S2). GA4 then converts revenue. Print the
  property's own currency once (R0). No hard-coded exchange rate is needed for GA4 numbers.
- **AdMob basis.** `K` = AdMob earnings / GA4 ad revenue for the same days, all countries, same currency.
  Source order: R13 (AdMob API) if set up; else the weekly value Ajay reads (option `--admob-7d-inr`);
  else default `K = 1.15` (month-to-date $4.50 / $3.93 = 1.145). Print `K` and its source on every screen.
- **Day status.** In the GA4 property time zone, a day is:
  - `open` until it ends;
  - `provisional` (shown with `~`) for the first 48 hours after it ends (S5: daily data after ~12 h, may change for 24-48 h);
  - `final` after that.
  A missing GA4 row on a provisional or final day means **0**. A day that has not ended means **n/a**, never 0.
  (`growth-baseline-pull.js:83-86` skips zero-return cohorts; do not copy that, see 6.2.)
- **Thresholding.** If any response has `metadata.subjectToThresholding = true`, print `THRESHOLDED` next to that
  section (GA4 hides small rows when Google signals is on).
- **Self-check.** `--check` calls `GET https://analyticsdata.googleapis.com/v1beta/properties/555700046/metadata`
  and `POST .../properties/555700046:checkCompatibility` (S2b) for every request below. It prints any missing
  name (for example an unregistered custom dimension) and the fix. Normal runs skip a section whose names are
  missing, print `MISSING customEvent:ad_format (register it, 1.2 S-1)`, and carry on.

### 1.4 The requests (exact)

All GA4 calls: `POST https://analyticsdata.googleapis.com/v1beta/properties/555700046:runReport`.
Every body also gets `"currencyCode":"INR"`, `"limit":250000` (S2: the API max) and `F_NODEBUG` (joined with any other
filter through `{"andGroup":{"expressions":[...]}}`). `D` = report day (default: yesterday in the property time zone).
All names below are in the Data API schema (S1); `customEvent:`/`customUser:` names need 1.2 first.

**R0 - property facts (Admin API, read-only).**
`GET https://analyticsadmin.googleapis.com/v1beta/properties/555700046` -> `timeZone`, `currencyCode`.
`GET .../properties/555700046/customDimensions?pageSize=200` -> which of 1.2 exist.
`GET .../properties/555700046/googleAdsLinks` -> link present yes/no.
(The notes repo's `scripts/ga4-admin-rc-check.js` already calls the first two.)

**R1 - daily players, first opens, revenue by country (28 days).**
```json
{"dateRanges":[{"startDate":"D-27","endDate":"D"}],
 "dimensions":[{"name":"date"},{"name":"countryId"}],
 "metrics":[{"name":"activeUsers"},{"name":"newUsers"},{"name":"totalAdRevenue"},{"name":"purchaseRevenue"}]}
```
Gives: DAU (all, Tier-1, other), first opens per tier, ad revenue and purchases per tier per day.

**R2 - first opens by first-user channel and country (7 days).**
```json
{"dateRanges":[{"startDate":"D-6","endDate":"D"}],
 "dimensions":[{"name":"date"},{"name":"firstUserDefaultChannelGroup"},{"name":"countryId"}],
 "metrics":[{"name":"newUsers"}]}
```
Watch for issue I5: Tier-1 first opens should move from "Direct" to "Cross-network" once the Ads link works
(the baseline shows App-1 installs as "Cross-network").

**R3 - first opens and revenue by Google Ads campaign (14 days).**
```json
{"dateRanges":[{"startDate":"D-13","endDate":"D"}],
 "dimensions":[{"name":"date"},{"name":"firstUserGoogleAdsCampaignName"},{"name":"countryId"}],
 "metrics":[{"name":"newUsers"},{"name":"totalAdRevenue"}]}
```
`T1_CAMPAIGN` (constant) = the exact Tier-1 campaign name from Ajay (today `BlockBloom-Tier1-US-EU`, Q12).

**R4 - cohort return by tier (day 0-7).** Same shape as `growth-baseline-pull.js:73`, plus a country dimension.
Slicing a cohort report by country with a filter is a documented pattern (S2c). Batch 6 cohorts per request, as the
baseline does (`:70`). No `dateRanges` in a cohort request.
```json
{"dimensions":[{"name":"cohort"},{"name":"cohortNthDay"},{"name":"countryId"}],
 "metrics":[{"name":"cohortActiveUsers"},{"name":"cohortTotalUsers"}],
 "cohortSpec":{"cohorts":[{"name":"2026-11-26","dimension":"firstSessionDate",
                           "dateRange":{"startDate":"2026-11-26","endDate":"2026-11-26"}}],
               "cohortsRange":{"granularity":"DAILY","startOffset":0,"endOffset":7}}}
```
Cohorts: the 17 days before `D`. Cohort size = `cohortActiveUsers` at `cohortNthDay = 0` (always all members).
`cohortNthDay` comes back as "0000", "0001"... (`Number()` it, as the baseline does).

**R5 - cohort revenue (for return on spend), Tier-1 only, 21 days.**
```json
{"dateRanges":[{"startDate":"D-20","endDate":"D"}],
 "dimensions":[{"name":"firstSessionDate"},{"name":"date"},{"name":"firstUserGoogleAdsCampaignName"}],
 "metrics":[{"name":"activeUsers"},{"name":"totalAdRevenue"},{"name":"purchaseRevenue"}],
 "dimensionFilter":{"filter":{"fieldName":"countryId",
   "inListFilter":{"values":["US","GB","CA","AU","NZ","IE"]}}}}
```
`k = date - firstSessionDate` (days). Keep `0 <= k <= 6`. "Paid" rows = campaign equals `T1_CAMPAIGN`.
"Blended" = all rows (paid plus free Tier-1; it overstates return on spend). If `--check` says these dimensions are
not compatible, run it twice: once without the campaign dimension (blended) and once filtered on the campaign.
Cross-check: day-1 return from R5 (k = 1 users / k = 0 users) should be within 2 points of R4. Warn if not.

**R6 - ad health by format (7 days).**
```json
{"dateRanges":[{"startDate":"D-6","endDate":"D"}],
 "dimensions":[{"name":"eventName"},{"name":"customEvent:ad_format"},{"name":"countryId"}],
 "metrics":[{"name":"eventCount"},{"name":"totalUsers"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","inListFilter":{"values":
   ["ad_requested","ad_loaded","ad_failed_to_load","ad_impression","ad_reward","ad_reward_earned","interstitial_shown"]}}}}
```
`ad_format` values today: `banner`, `rewarded`, `rewarded_show` (a SHOW failure logged as a load failure,
`AdMobAdHost.kt:296-303`). From vc40: `interstitial`. Rows with `ad_format = (not set)` on `ad_impression` are the
automatic AdMob events (point 0.4).

**R7 - load failures by error code (7 days).**
```json
{"dateRanges":[{"startDate":"D-6","endDate":"D"}],
 "dimensions":[{"name":"customEvent:ad_format"},{"name":"customEvent:error_code"},{"name":"countryId"}],
 "metrics":[{"name":"eventCount"},{"name":"totalUsers"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","stringFilter":{"value":"ad_failed_to_load"}}}}
```
Code 3 = no fill (`AdRequest.ERROR_CODE_NO_FILL`). Print the top 5 rows.

**R8 - rewarded fallback grants (vc40 onward, 7 days).**
```json
{"dateRanges":[{"startDate":"D-6","endDate":"D"}],
 "dimensions":[{"name":"date"},{"name":"customEvent:placement"},{"name":"customEvent:outcome"}],
 "metrics":[{"name":"eventCount"},{"name":"totalUsers"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","stringFilter":{"value":"rewarded_offer"}}}}
```
Event contract that vc40 must log (Gemini writes both sides; if names differ, change the constants):
event `rewarded_offer`, param `placement` = `revive | double_coins | free_coins | lucky_chest | double_streak`
(the five callers of `runRewarded`, `GameViewModel.kt:1188, 1201, 1434, 1481, 1742`), param `outcome` =
`shown | no_fill | fallback_grant` (roadmap section 8). Before vc40 there is no event: print `n/a (vc40)`.

**R9 - purchases and offers (28 days).**
```json
{"dateRanges":[{"startDate":"D-27","endDate":"D"}],
 "dimensions":[{"name":"eventName"},{"name":"countryId"},{"name":"customEvent:product_id"}],
 "metrics":[{"name":"eventCount"},{"name":"totalUsers"},{"name":"purchaseRevenue"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","inListFilter":{"values":
   ["in_app_purchase","offer_shown","offer_tap"]}}}}
```
`in_app_purchase` is collected automatically for Google Play purchases (S6). `purchaseRevenue` includes it (S1).
The app logs no purchase event today (`monetize/PlayBillingHost.kt` has no analytics call). **Do not** add a
`purchase` event with `value` in vc40: Firebase warns of duplicates when both are logged (S6). Use
`offer_shown` / `offer_tap` with no value.

**R10 - E1 interstitial test by arm (from the experiment start).**
```json
{"dateRanges":[{"startDate":"E1_START","endDate":"D"}],
 "dimensions":[{"name":"date"},{"name":"customUser:firebase_exp_<N>"},{"name":"countryId"}],
 "metrics":[{"name":"activeUsers"},{"name":"newUsers"},{"name":"totalAdRevenue"}]}
```
Plus two small ones with the same arm dimension: `firstSessionDate` + `date` with `activeUsers` (return by arm,
new players since `E1_START` only), and `eventName = app_remove` with `totalUsers` (uninstalls by arm).
How arms appear: Firebase stamps the user property `firebase_exp_<N>` when a user activates the experiment. Its
value is the zero-based variant index; Firebase's own sample maps `"0"` to Baseline (S7). Users never in the test
show `(not set)`: drop them. In E1, Baseline must be `ads_interstitial_enabled = false` and Variant A `true`.
UNVERIFIED: whether the property is attached to `app_remove` events. If that row is all `(not set)`, say so.

**R11 - uninstalls by days since install (28 days).**
```json
{"dateRanges":[{"startDate":"D-27","endDate":"D"}],
 "dimensions":[{"name":"firstSessionDate"},{"name":"date"},{"name":"countryId"}],
 "metrics":[{"name":"totalUsers"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","stringFilter":{"value":"app_remove"}}}}
```
`app_remove` is Android-only and counts every removal; it differs from Play's uninstall counts (S6). GA4 has no
"days since install" dimension, so compute `k = date - firstSessionDate`. Buckets: day 0, day 1, days 2-3,
days 4-7, day 8+. Denominator = cohort size from R4.

**R12 - first-session funnel and crash proxy (for Gate A).**
```json
{"dateRanges":[{"startDate":"WINDOW_START","endDate":"D"}],
 "dimensions":[{"name":"firstSessionDate"},{"name":"eventName"},{"name":"appVersion"}],
 "metrics":[{"name":"totalUsers"}],
 "dimensionFilter":{"filter":{"fieldName":"eventName","inListFilter":{"values":
   ["first_open","tutorial_begin","tutorial_complete","first_clear","first_game_over","app_exception"]}}}}
```
Plus `activeUsers` by `appVersion` for the same range (crash proxy denominator).
`tutorial_complete` carries `skipped` (0/1, booleans are sent as 0/1: `Analytics.kt:121`) and `via` = `cards|play`
(`GameViewModel.kt:1765-1767`, `:1822-1824`).

**V1 / V2 - Play vitals (Play Developer Reporting API, read-only).** Reuse the notes repo's `scripts/play-vitals.js`.
Base: `https://playdeveloperreporting.googleapis.com/v1beta1/apps/com.aweagle.blockbloom/`.
- First `GET crashRateMetricSet` and `GET anrRateMetricSet` -> `freshnessInfo` (the latest DAILY end date).
- V1 `POST crashRateMetricSet:query`: DAILY, `timeZone {"id":"America/Los_Angeles"}` (the only one DAILY accepts, S8),
  `dimensions: ["versionCode"]`, `metrics: ["crashRate","userPerceivedCrashRate","distinctUsers"]`.
- V2 `POST anrRateMetricSet:query`: DAILY, no dimensions,
  `metrics: ["userPerceivedAnrRate28dUserWeighted","anrRate28dUserWeighted","distinctUsers"]` (names from S8).
- Zero rows means **no data** (below Play's threshold), not zero crashes (`04-analytics-and-metrics.md` trap 2).
  Print `NO DATA - read Crashlytics / Play Console`.

**R13 - AdMob earnings by country (optional, makes the "AdMob basis" exact).**
`POST https://admob.googleapis.com/v1/accounts/<pub-id>/networkReport:generate` with
`reportSpec.dimensions ["DATE","COUNTRY","FORMAT"]`, `metrics ["ESTIMATED_EARNINGS","AD_REQUESTS","IMPRESSIONS"]`,
`localizationSettings.currencyCode "INR"` (S9). The AdMob API does **not** accept service accounts; it needs an OAuth
desktop client and one consent by Ajay, then a stored refresh token (S9b, forum answer by the AdMob API team). Time
zone: the account's own or America/Los_Angeles only (S9). If not set up, use `K` (1.3).

### 1.5 Options and outputs

```
node tools/growth-kpi.js [--date YYYY-MM-DD] [--sa key.json] [--spend-dir DIR] [--notes DIR]
                         [--weekly] [--gate A|B|D22|STOP] [--admob-7d-inr N] [--exp N] [--check] [--json FILE] [--dry]
```
- `--spend-dir`: folder holding `spend-*.csv` (reads ALL months: `spend-2026-11.csv`, `spend-2026-12.csv`).
  Default `$BB_NOTES_DIR/01-blockbloom/growth`.
- `--notes`: notes repo root (default `$BB_NOTES_DIR`). Only `--weekly` and `--gate` write there.
- `--dry`: print every request body, call nothing. `--json`: dump the raw responses for debugging.
- Exit code: 0 = ok; 2 = setup error; **3 = a kill switch fired** (so Gemini cannot miss it).

### 1.6 The one screen (daily, at most 24 lines, plain ASCII)

Illustrative numbers, not real data:
```
BLOCK BLOOM KPI | Day 9 Mon 30 Nov | data to Sun 29 Nov (~ = provisional) | GA4 tz Asia/Kolkata | INR | K=1.15 (default)
SPEND    yday T1 Rs300 | other Rs0 | plan to date Rs2,800 of cap Rs13,600 (21%) | ladder today Rs300
INSTALLS T1 opened yday 9~ (Ads: 11 installs, 10 conv) | Rs33.3 per opened install, 3-day Rs31.0 | >Rs35 streak 0/3
         first opens yday: Direct 4 | Cross-network 9 | Organic Search 2 | T1 9 other 6 | unknown 3 (excluded)
PLAYERS  DAU 61~ (T1 24) | 7-day avg 58 (T1 22)
RETURN   D1 installs Days 5-7: all 23.1% n=52 [95%: 14-36] | T1 25.0% n=24 | D3 6% | D7 n/a
MONEY    revenue yday Rs71~ (ads Rs71, IAP Rs0) | per T1 active day Rs2.10 (7-day, AdMob basis) | other Rs0.22
ROAS-7   T1 cohorts (paid): D1 11% D2 9% D3 12% D4 10% D5 ~14%(proj) | pooled Days 1-4 11% | blended 13%
ADS      load ok 7d: banner 41% rewarded 72% inter n/a | top fail: banner code 3 (no fill) IN 212 | fallback n/a (vc40)
IAP      purchases 28d 0 (Rs0) | offer taps n/a (vc40)
E1 (exp 3) OFF: 31 DAU Rs0.90/day D1 21% | ON: 30 DAU Rs1.30/day (+44%) D1 20% | day 8 of 14
UNINST   installs Days 1-3: day0 24% day1 9% day2-3 5% day4-7 3% | within 7 days 41%
VITALS   vc40 crash-free: Play NO DATA, GA4 proxy >= 99.6% | ANR 28d 0.41% (to 27 Nov)
GATE A   crash OK | ANR OK | tutorial 81% OK | D1 23.1% OK (Day 7 provisional) | conv OK -> PASS (confirm Mon 30 Nov 16:00)
ALERTS   none
```
Rules for the screen: same line order every day; `~` marks provisional; `n/a` means "not measurable yet", never 0;
every percent has its `n` when n < 200; the ALERTS line lists every kill switch that fired (section 4.1).

### 1.7 The weekly report (`--weekly`, Saturdays)

Writes `<notes>/01-blockbloom/reports/growth-week-<YYYY-MM-DD>.md` (the Saturday date). Gate runs write
`gate-a-2026-11-29.md`, `gate-b-2026-12-09.md`, `gate-d22-2026-12-13.md` next to it. Gemini commits them on the
`journal` branch. Sections, in this order:

1. Headline: 3 lines (revenue a day, Tier-1 day-7 return on spend, the one thing that went wrong).
2. Targets table: rows from roadmap section 2 (revenue a day, daily players, downloads a day, day-1 return, Tier-1
   day-7 return on spend, ad spend so far); columns target / actual / OK-or-not.
3. Spend: per day, per campaign (from the spend log) and cumulative against the cap.
4. Installs and cost: per day: Play installs (Ads), conversions (Ads), opened installs (GA4 paid and blended),
   cost per Play install, cost per opened install.
5. Cohorts: one row per install day: Tier-1 size, other size, D1, D3, D7, 7-day revenue, spend, return on spend,
   status (open / provisional / final).
6. Revenue per active day by tier, per day, plus the 7-day value and `K`.
7. Ads health: load success by format, top 5 error codes, impressions per DAU (app-logged rows only), fallback
   grants by placement (vc40+).
8. Purchases and offers.
9. Experiments: E1 table (section 3.8); E2-E5 status lines.
10. Uninstalls by days since install, by tier.
11. Vitals: crash-free per release, ANR 28-day.
12. Next gate pre-read: which items pass today, which are provisional, what is still missing.
13. Data notes: time zones, currency, `K` source, missing custom dimensions, thresholding, days still provisional.
14. Decisions: empty list. Ajay fills it in the Saturday review (section 4.2); Gemini commits it.

### 1.8 Acceptance test for Gemini

1. `--dry` prints all requests; `--check` passes or names each missing custom dimension.
2. `--date 2026-11-21` reproduces the baseline within GA4 reprocessing noise: new users 18-21 Nov = 93 / 49 / 68 / 37,
   US ad revenue over 1-21 Nov about $2.19 (shown in INR), event counts as in the baseline's events table.
3. Day-1 return for the 4-20 Nov cohorts includes the zero-return cohorts: about 13% over about 334 installs, not 14.6%
   over 302 (prior check; unknown-country exclusion moves it further).
4. A spend log with a bad row (text in `spend_inr`) gives exit code 2 and names the line.
5. Exit code 3 when a fake row makes cost per opened install exceed Rs35 three days running.

---

## 2. The spend log: `01-blockbloom/growth/spend-2026-11.csv` (notes repo)

The file exists with the header only: `date,campaign,spend_inr,play_installs,conversions,notes`. From 1 Dec, start
`spend-2026-12.csv` with the same header. The tool reads both.

**What each column means**

| Column | What to type | Example |
|---|---|---|
| `date` | the Google Ads day, `YYYY-MM-DD` | `2026-11-22` |
| `campaign` | the exact campaign name, one row per campaign per day | `BlockBloom-Tier1-US-EU` |
| `spend_inr` | the "Cost" column, rupees, no "Rs", no commas | `398.52` |
| `play_installs` | the "Installs" column (the number behind "Rs19.71 per install") | `20` |
| `conversions` | the "Conversions" column | `16` |
| `notes` | short text, **no commas** (use `;`) | `budget 400 to 300 from today` |

Column names in the Google Ads screen are UNVERIFIED for this account's view. Use the columns that gave
"Rs19.71 per install" on 21 Nov.

**How Ajay fills it (1 minute, every morning)**

1. Google Ads -> Campaigns -> date range **Yesterday**.
2. For every campaign that spent money (and the Tier-1 campaign even at Rs0), add one line.
3. On the day a campaign changes, say so in `notes`: budget changed, countries changed, bidding goal changed
   (Day 12: "goal tutorial_complete"), paused (Day 1: "App-1 paused").
4. Save. Edit in the GitHub web editor on the `journal` branch, or tell Gemini the numbers and it commits them.
5. **Saturday re-sync (3 minutes):** set the date range to the last 7 days, segment by day
   (Segment -> Time -> Day, UNVERIFIED label), and fix any number that changed. Google Ads adds late conversions,
   and GA4 attribution credit can change for up to 12 days (S5).

Example lines (format only, made-up values):
```
date,campaign,spend_inr,play_installs,conversions,notes
2026-11-22,BlockBloom-Tier1-US-EU,400.00,20,0,Day 1; budget 400; US GB CA AU NZ IE only
2026-11-22,App-1,61.20,27,0,paused 22 Nov 11:00
```

**What the tool checks**

- Header exact; date valid; numbers valid; duplicate `date+campaign` -> last one wins, with a warning.
- Yesterday's Tier-1 line missing -> ALERT `spend log missing yesterday`.
- Any non-Tier-1 campaign with spend > 0 after Day 1 -> ALERT `App-1 still spending`.
- Plan spend to date = sum of `spend_inr` from 2026-11-22. At 90% of the cap -> warning; at 100% -> kill switch.
  Cap = Rs13,600; Rs18,000 only after Gate B passed.

**Privacy.** The notes repo is public (issue I8). Spend and revenue in this file and in the weekly reports become
public. Decide before the first commit (Q9).

---

## 3. Exact formulas

### 3.1 Notation

- `c` = an install day (GA4 `firstSessionDate`). `k` = days since install (0 = install day).
- `N_c` = Tier-1 opened installs on day `c`: paid = R5 rows with `T1_CAMPAIGN` at `k = 0`; blended = all Tier-1 rows.
- `A_c(k)` = players of cohort `c` active on day `c + k` (R4). Missing row on a non-open day = 0.
- `Rev_c(k)` = revenue in INR from cohort `c` on day `c + k` = `K x adRevenue + 0.85 x purchaseRevenue` (R5).
  The 0.85 is Play's 15% service fee (UNVERIFIED for this account). Purchases are 0 today.
- `S_c` = Tier-1 campaign spend on day `c` (spend log). `DAU_T1(d)` = Tier-1 `activeUsers` on day `d` (R1).
- Wilson 95% interval for `x` of `n`: `z = 1.96`, `p = x/n`,
  `centre = (p + z^2/(2n)) / (1 + z^2/n)`, `half = z x sqrt(p(1-p)/n + z^2/(4n^2)) / (1 + z^2/n)`.
  The gate rule uses `p`. The interval is printed so Ajay sees the noise.

### 3.2 Return rates

- `D1(window) = sum_c A_c(1) / sum_c A_c(0)` over the install days in the window. `D3` uses `A_c(3)`, `D7` uses `A_c(7)`.
- A cohort counts only when day `c + k` is provisional or final. Report all players and Tier-1 separately.

### 3.3 First-session rates

- Tutorial completion = users with `tutorial_complete` / users with `first_open`, for `firstSessionDate` in the window
  (R12). Count skips as complete (this matches the baseline's 62% = 235 / 378). Also print the skip share if
  `customEvent:skipped` is registered. (Q13: should a skip count?)
- First line clear = users with `first_clear` / users with `first_open` (baseline 50%).

### 3.4 Revenue per Tier-1 active day (AdMob basis, 7-day average)

`RPAD_T1 = K x sum_{d in 7 days} adRevenue_T1(d) / sum_{d in 7 days} DAU_T1(d)`.
Never divide a range's revenue by a range's `activeUsers`: that gives revenue per player, not per active day.
Purchases are excluded here (AdMob basis). Same formula for "other" and "all".

### 3.5 Cost and return on spend

- Cost per opened install `CPOI(window) = sum_c S_c / sum_c N_c` (paid `N_c`). Cost per Play install =
  `sum spend_inr / sum play_installs` from the spend log.
- **Day-7 return on spend per Tier-1 cohort** = `R7_c = sum_{k=0..6} Rev_c(k) / S_c` (install day plus 6 days, as in
  `growth-model-t1.js:61`). For a window: `R7(window) = sum_c sum_{k=0..6} Rev_c(k) / sum_c S_c` (pooled; small
  cohorts are not averaged as percentages).
- Use paid cohorts. If the Ads link gives no paid rows, use blended and mark it `BLENDED (upper bound)`. A gate that
  needs this number fails when only blended data exists (missing data means no spend increase).
- Projection for an open cohort with `m < 6` days in: `R7_c(projected) = sum_{k=0..m} Rev_c(k) / F(m)`, where
  `F(m) = sum over complete Tier-1 cohorts of the last 14 days of sum_{k=0..m} Rev / sum_{k=0..6} Rev`. Print `proj`.
  About 70% of a cohort's 7-day revenue comes on its install day (prior check), so `F(4)` and `F(5)` are near 1 and
  the projection is stable.

### 3.6 Gate A - Sun 29 Nov (Day 8), data to Sat 28 Nov

| # | Item | Formula | Source | Pass |
|---|---|---|---|---|
| A1 | vc40 crash-free | Crashlytics "crash-free users" for 1.16.0 (40) since Wed 25 Nov. Cross-checks: Play V1 `1 - sum(crashRate_d x distinctUsers_d) / sum(distinctUsers_d)` for versionCode 40; GA4 proxy `1 - users(app_exception, 1.16.0) / activeUsers(1.16.0)` (a lower bound: it may include caught errors) | Crashlytics console (Ajay, 30 s); V1; R12 | >= 99.5% |
| A2 | 28-day ANR | `userPerceivedAnrRate28dUserWeighted` on the latest day Play has (lags 2-3 days), whole app. Play's bad-behaviour line is 0.47% (S10) | V2 or Play Console | < 0.47% |
| A3 | Tutorial completion | 3.3 for installs of Days 5-7 on 1.16.0 | R12 | >= 80% |
| A4 | Day-1 return | 3.2 for installs of Days 5-7 (Thu 26 - Sat 28 Nov), all players, unknown excluded; Tier-1 printed too | R4 | >= 22% |
| A5 | Conversions per campaign | for every campaign with spend on Days 5-7: spend-log `conversions` > 0 **and** R3 shows that campaign name with `newUsers` > 0 | spend log + R3 | both > 0 |

Pass: all five. Then Rs500/day from Day 10 (Tue 1 Dec). Else stay Rs300 and fix first.
Timing: A4 needs Sun 29 Nov data for the Day-7 cohort. Read provisional on Sunday (Days 5-6), confirm Mon 30 Nov after
16:00 property time. The budget step is on Day 10, so the confirmed result decides.

### 3.7 Gate B - Wed 9 Dec (Day 18), data to Tue 8 Dec

| # | Item | Formula | Pass |
|---|---|---|---|
| B1 | vc41 crash-free | as A1 for 1.17.0 (41), since Wed 2 Dec | >= 99.5% |
| B2 | 28-day ANR | as A2 | < 0.47% |
| B3 | Day-1 return | 3.2, **Tier-1**, installs of Days 10-16 (all complete by Day 17). Also print vc41-only Days 14-16 (Q4) | >= 28% |
| B4 | Revenue per Tier-1 active day | 3.4 over Days 11-17 (2-8 Dec) | >= Rs3.00 |
| B5 | Tier-1 day-7 return on spend | 3.5, pooled, paid cohorts of Days 10-13 (1-4 Dec). Days 12-13 projected on Day 18 | >= 30% |
| B6 | Cost per opened install | 3.5 over Days 10-13 | <= Rs30 |

Pass: all six -> Rs700/day from Day 18 (Q6 on the step size). Fail but B5 >= 15% -> hold Rs500. B5 < 15% -> Rs300.
Timing: decide Wed 9 Dec **evening** (8 Dec data is ready about 12 h after the day ends). The tool re-runs Gate B
automatically on Fri 11 Dec (Day 20), when Days 12-13 are complete. If the confirmed B5 < 30%, go back to Rs500 on
Day 21; if < 15%, to Rs300.

### 3.8 E1 read - Sun 6 Dec (Day 15)

From R10, new players since the test start for return rates, all exposed players for revenue:
- Revenue per player-day per arm = `sum_d adRevenue(arm, d) / sum_d activeUsers(arm, d)`. Lift = ON / OFF - 1.
- D1, D3 per arm (3.2, by arm). Uninstall rate per arm = `app_remove` users / new users of that arm.
- Ship ON when: lift >= +30%, D1 and D3 each no more than 2 points lower, uninstall rate not higher (roadmap E1).
- Primary source: the Firebase A/B results page (it has its own statistics and goals: estimated ad revenue,
  retention, crash-free users, S7). GA4 adds the Tier-1 split and uninstalls.
- Realism: about 45 DAU and about 150 new players per arm in 14 days. The standard error of a D1 difference is then
  about 4.6 points, so "within 2 points" cannot be proven. In practice the rule reads "not clearly worse".

### 3.9 Stop-loss, the Day-22 cost rule, daily cost rules

- **Stop-loss.** `R7` pooled over the latest 4 complete paid Tier-1 cohorts installed on or after Day 14 (vc41 at 100%)
  is below 15% -> Rs300/day from the next morning; fix the product before spending more. First possible read:
  Day 18 (Gate B, B5). Then daily from Day 24 (Tue 15 Dec), when Days 14-17 are complete.
- **Day-22 rule (Sun 13 Dec).** Rs900/day only if all three hold: (1) Gate B passed and was confirmed on Day 20;
  (2) `R7` pooled over paid cohorts of Days 14-17 >= 30% (Days 16-17 projected on Day 22, confirmed on Day 24);
  (3) `CPOI` over Days 15-21 (the last 7 days, at the Rs700 level) <= Rs30. If the Day-24 confirmation fails,
  back to Rs700.
- **Daily cut (from Day 24).** Cost per opened install > Rs33 -> cut the budget by 30% the same day
  (Rs900 -> Rs630). Recommendation (Q8): use the 3-day pooled value. At a true Rs30 and about 30 installs a day, a
  single day reads above Rs33 about 1 day in 3 by chance alone (Poisson); a 3-day value about 1 in 5.
- **Kill switch.** Cost per opened install > Rs35 on 3 days in a row (one-day values) -> same-day cut (Q7: to Rs300
  or pause). At a true Rs30 this fires by chance less than 1% of the time.
- Every increase respects "at most +30%, every 3+ days" (roadmap section 4). The tool prints a warning when a planned
  step breaks it.

### 3.10 Worked example with the 21 Nov baseline numbers

1. **Revenue per active day.** Tier-1 ad revenue 1-21 Nov = US $2.1904 + UK $0.0032 = $2.1936, about Rs186.5 at
   Rs85 (the rate implied by the roadmap's "Rs3.51 per US player"). Tier-1 players = 53 + 3 = 56, so Rs3.33 per
   **player**. The model assumes 2.5 active days per player: 140 player-days -> **Rs1.33 per active day** (GA4),
   x 1.145 = **Rs1.52** (AdMob basis). B4 needs Rs3.00: about 2x. growth-kpi.js measures the real player-days.
2. **Day-1 return.** Cohorts of 18-20 Nov: 93 x 15% = 14, 49 x 18% = 9, 68 x 10% = 7 (rounded) -> 30 / 210 =
   **14.3%** (95%: 10.2-19.7%). Gate A needs 22%: fail today, even at the top of the interval.
   Noise at Gate A size: 13 of 60 = 21.7% (95%: 13.1-33.6%). One or two players move the verdict.
3. **Cost per opened install.** Rs500/day at Rs19.71 per Play install = 25.4 installs. At the model's 79% open rate,
   20 opened -> **Rs25.0**. B6 passes (<= Rs30).
4. **Day-7 return on spend of one cohort today.** Active days in the first 7 days, Tier-1 (x1.2), today's curve:
   `1 + 1.2 x (0.15 + 0.07 + 0.05 + 0.045 + 0.04 + 0.038) = 1.47`. Revenue per install = 1.47 x Rs1.40 = Rs2.06
   (GA4). 20 installs = Rs41.2 on Rs500 = **8.2%** (9.5% AdMob basis). Below the 15% stop-loss and far below 30%.
5. **What B5 needs.** With the vc41 curve (`D1 30% ... D6 10.5%`), Tier-1 x1.2 and the interstitial penalty x0.95,
   a Tier-1 install is active **2.13 days** in its first 7. 30% of Rs25 = Rs7.50, so it needs **Rs3.52 per active
   day** (Rs3.32 with Rs0.5 of purchases at 85%). At Rs30 per install: **Rs4.23**. So B4's Rs3.00 floor is weaker than
   B5: at exactly Rs3.00 a cohort returns 25.5%. B5 is the test that binds.
6. **Gate B on the model's own numbers.** Days 10-13: 80 opened installs, Rs2,000 spend, 7-day revenue Rs445 GA4 =
   Rs506 AdMob basis -> **25.3%: B5 fails**; B6 = Rs25 passes. 25% >= 15%, so hold Rs500 (not Rs300).
   With the install-day interstitial fix (6.1): 23%.
7. **Stop-loss.** Days 14-17: Rs2,000 spend, Rs280 revenue in 7 days -> 14% < 15% -> Rs300 from the next day.
8. **Day-22 rule.** If Gate B had passed: model Days 14-17 = 38% AdMob basis (passes); `CPOI` Days 15-21 =
   (3 x 500 + 4 x 700) / (3 x 20 + 4 x 26.1) = Rs4,300 / 164 = Rs26.2 (passes) -> Rs900. The model then prices
   Rs900 at **Rs32.4** per opened install (`growth-model-t1.js:24`), only Rs0.6 under the Rs33 cut line.

---

## 4. Routines

### 4.1 Daily 5-minute check (Ajay), every morning

Gemini runs `node tools/growth-kpi.js` by 09:30 IST, pastes the screen and a one-line summary into
`DAILY_ACTIVITY.md` (app repo) and the journal, and commits the spend log.

1. **1 min - spend log.** Add yesterday's lines (section 2).
2. **1 min - read the screen.** Only these lines: ALERTS, SPEND, INSTALLS (cost per opened install), VITALS, MONEY.
3. **2 min - act on any alert** (one row = one action, same day):

| Alert | Action | Who |
|---|---|---|
| Crash-free < 99% on any release | Halt the rollout | Gemini runs it, Ajay says go |
| A new ANR cluster | Halt the rollout | Gemini, Ajay says go |
| AdMob policy or invalid-traffic email | Pause the Tier-1 campaign; read the email | Ajay |
| Cost per opened install > Rs35, 3 days in a row | Cut the budget (Q7) | Ajay |
| From Day 24: cost per opened install > Rs33 (Q8: 1-day or 3-day) | Budget x 0.7 | Ajay |
| Plan spend reaches the cap | Pause the campaign | Ajay |
| `App-1 still spending` | Pause App-1 | Ajay |
| `spend log missing yesterday` | Fill it | Ajay |

4. **1 min - inbox.** Google Ads (disapproved ads, billing), AdMob, Play Console messages.
5. If you changed anything, write it in the spend log's `notes` for today.

Data rule for the morning: spend and cost use yesterday; revenue and return rates use the day before yesterday
(yesterday is still `~`).

### 4.2 Saturday 30-minute review template

Gemini runs `--weekly` before the review and commits the report. Ajay copies this block into section 14 of the report.

```
## Review - Sat <date> (week <n>, Days <a>-<b>)
0-5 min   Headline and ALERTS of the week: ...
5-12 min  Targets (roadmap section 2), mark each OK / NOT OK:
          revenue a day ... | daily players ... | downloads a day ... | day-1 return ... |
          Tier-1 day-7 return on spend ... | spend so far ... of cap ...
12-18 min Cohorts and money: last 4 complete Tier-1 cohorts R7 = ...% ; revenue per Tier-1 active day = Rs...
          Next gate: <A/B/D22> on <date>; items passing now: ... ; provisional: ... ; missing: ...
18-23 min Product: release <vcNN> at <x>% ; crash-free ...% ; ANR ...% ;
          E1 day <n>: lift ...% , D1 ON-OFF ... pts ; ads load ok: banner ...% rewarded ...% ; fallbacks ...
23-27 min Decisions (max 3), each with the number that justified it:
          1. Budget for the next 7 days: Rs.../day (ladder says Rs...; step size ok? +30% rule ok?)
          2. ...
          3. ...
          Prepay Google Ads for next week: Rs...
27-30 min Owners for next week (Ajay / Gemini), then Gemini commits this block.
```

---

## 5. What Gemini builds, in order

1. Day 1-2: 1.2 setup (with Ajay for S-3/S-4), then `tools/growth-kpi.js` with R0-R7, R11, R12, V1, V2, the spend
   log reader and the one screen. First real screen on Mon 23 Nov (roadmap Day 2 "First KPI report").
2. Day 2-3: R10 (E1 arms), the projection (3.5), `--gate`, `--weekly`.
3. vc40 code (with the release): `rewarded_offer` (R8 contract), interstitial events with `ad_format = interstitial`
   plus `interstitial_shown`, `offer_shown` / `offer_tap`, and rename the app's own `ad_impression` (Analytics.kt:60)
   to `ad_shown` so GA4 stops double counting. Note the rename in `DAILY_ACTIVITY.md`; the tool reads both names.
4. Optional: R13 (AdMob API) once Ajay gives the one OAuth consent (Q10).

---

## 6. Bugs found

### 6.1 `growth-model-t1.js` (notes repo, `01-blockbloom/scripts/`)

- **The cumulative-revenue bug is NOT here.** `rev` is declared per day inside the loop (`:53`) and pushed per day
  (`:65`). Check: days 1-7 sum to 405, the W1 line prints 404 (rounding). (The bug the earlier check found was in the
  week-1 model, `bb_week1_model.js:43`.)
- **Interstitial lift on install-day players.** `mult(d)` (`:41`) applies x1.6 to every player, including install day
  (`:58`, `n === 0`) and day 0 of the 90-day value (`:86-87`). The app shows no interstitial in the first 2 games
  (`GameViewModel.kt:1234`), so the first one comes in game 4-5. Effect (GA4 basis): Days 10-13 return on spend
  22% -> 20%; Days 14-17 34% -> 29%; Days 18-23 30% -> 25%; one Tier-1 install's 90-day value Rs20.3 -> about Rs18.9.
- **The base case contradicts its own gate.** `:72` prints "both gates pass", but `:83` prints 22% for Days 10-13,
  below Gate B's 30% (25% AdMob basis, 23% with the fix above). The stretch path (Rs18k spend, ~Rs7.6k revenue)
  is not the model's expected outcome; the committed path is.
- **Return on spend is on GA4 basis.** `:83` does not apply `x1.15`, while Gate B and roadmap section 2 use AdMob
  basis. AdMob-basis values: 12% / 17% / 25% / 38% / 34% for the five windows. Label the basis.
- **"AdMob est." includes purchases.** `:74`, `:78`, `:79` multiply total revenue, purchases from `:59` included, by
  1.15. Purchases are gross (no Play fee). Small today.
- **Budget steps.** `spendT1` (`:13-20`) changes spend on the same day (Google Ads delivers a change the next day) and
  its steps break the +30% rule (point 0.7).
- **Thin cost margin.** `cpiT1` (`:24`) gives Rs32.4 per opened install at Rs900 from Day 22: Rs0.6 under the Rs33 cut
  line. Any real cost above the model triggers the daily cut.
- **Timing mismatches (minor).** Retention R1 starts with Day-5 installs (`:33`), but the x1.3 revenue lift (`:41`) and
  purchases (`:59`) start on Day 6.
- **Unmeasured input.** `ARPDAU.t1 = 1.4` (`:35`) comes from "Rs3.51 per player over ~2.5 days"; the 2.5 days was never
  measured. growth-kpi.js 3.4 measures it; replace it at Gate A.

### 6.2 `growth-baseline-pull.js` (growth-kpi.js is based on it; do not copy these)

- `:79-86` weighted D1/D7 skip cohorts with no returners: 14.6% over 302, against about 13.2% over all 334.
- `:81-83` no day-completeness check: a cohort whose day 1 had not ended is counted as complete.
- `:63` labels revenue "USD"; the currency is the property's. Send `currencyCode` instead.
- `:64-65` `activeUsers` over 21 days = distinct players; this produced "Rs3.51 per player", which was then read as
  per active day (model `:35`).
- No filter for debug builds or country "(not set)".

### 6.3 App analytics (app repo, for vc40)

- `ad_impression` name collision (`analytics/Analytics.kt:60`; logged at `AdMobAdHost.kt:282-285` and
  `PersistentBannerManager.kt:78-81`): GA4's impression counts are inflated.
- A rewarded SHOW failure is logged as `ad_failed_to_load` with `ad_format = rewarded_show` (`AdMobAdHost.kt:296-303`).
  Exclude it from load success.
- Banner `ad_requested` is logged once per AdView (`PersistentBannerManager.kt:94-97`), but the SDK refreshes every
  120 s. So `loaded + failed` > `requested`. Load success = `loaded / (loaded + failed)`, never `loaded / requested`.
- Interstitials log nothing; fallback grants log nothing (point 0.3).

---

## 7. Open questions (for Ajay unless marked)

| # | Question | Recommendation |
|---|---|---|
| Q1 | What is the Google Ads account time zone? Is the GA4 property now Asia/Kolkata? | Both Asia/Kolkata |
| Q2 | Accept "provisional read + automatic confirmation" for Gate A, Gate B and Day 22? | Yes |
| Q3 | Gate A day-1 return: all players or Tier-1 only? | All for A (bigger n); Tier-1 for B (roadmap section 3) |
| Q4 | Gate B day-1 return: Days 10-16, or vc41-only Days 14-16? | Days 10-16; print both |
| Q5 | Return on spend on AdMob basis, purchases at 85%? | Yes |
| Q6 | The ladder breaks "+30% per step": Rs300 -> Rs500 (+67%), Rs500 -> Rs700 (+40%). Keep, or step Rs300 -> Rs390 -> Rs500 and Rs500 -> Rs650 -> Rs700? | Small steps |
| Q7 | Kill switch "> Rs35 for 3 days": cut to Rs300, or pause? | Cut to Rs300 |
| Q8 | Day-24 "> Rs33" cut: 1-day or 3-day value? | 3-day |
| Q9 | Notes repo is public: spend log and weekly reports become public. Make it private first (decision D7)? | Private |
| Q10 | AdMob API: give one OAuth consent so `K` is exact by country? | Yes, if Gemini can set the client up |
| Q11 | (Gemini, Day 1) Does GA4 accept `firebase_exp_<N>` as a user-scoped custom dimension? | Try; fall back to the Firebase A/B page |
| Q12 | Exact Tier-1 campaign name (now "BlockBloom-Tier1-US-EU", but the countries are no longer EU) | Rename once, before Day 2, and tell Gemini |
| Q13 | Tutorial completion: should a "Skip" count as complete? | Count it (keeps the 62% baseline comparable); show the skip share |

---

## 8. Sources

- S1 GA4 Data API schema (all dimension and metric names used; `customEvent:` / `customUser:` syntax; a request fails
  if the custom dimension is not registered; `purchaseRevenue` includes `in_app_purchase`; `conversions` is now
  `keyEvents`): https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
- S2 runReport (`currencyCode`, `keepEmptyRows`, 250,000-row cap):
  https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
- S2b getMetadata / checkCompatibility: https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties
- S2c Cohort reports, sliced by country with a dimension filter:
  https://developers.google.com/analytics/devguides/reporting/data/v1/advanced
- S3 Custom dimension limits (25 user, 50 event) and 24-48 h: https://support.google.com/analytics/answer/10075209
- S4 Event-scoped custom dimensions, 24-48 h: https://support.google.com/analytics/answer/14239696
- S5 GA4 data freshness (daily ~12 h; may change for 24-48 h; attribution up to 12 days):
  https://support.google.com/analytics/answer/11198161
- S6 Firebase automatically collected events (`ad_impression`, `ad_reward`, `app_remove`, `app_exception`,
  `in_app_purchase`, duplicates warning): https://support.google.com/firebase/answer/9234069
- S7 Firebase A/B Testing (`firebase_exp_<id>` user property, zero-based variant index, experiment id from the
  overview URL, 14 days for Remote Config, goal metrics): https://firebase.google.com/docs/ab-testing/abtest-config
- S8 Play Developer Reporting, ANR rate query (metrics, dimensions, DAILY = America/Los_Angeles):
  https://developers.google.com/play/developer/reporting/reference/rest/v1beta1/vitals.anrrate/query
- S9 AdMob API reports (`networkReport:generate`, `ESTIMATED_EARNINGS`, `COUNTRY`, currency, time zones):
  https://developers.google.com/admob/api/v1/reporting
- S9b AdMob API and service accounts (forum, AdMob API team): https://groups.google.com/g/google-admob-api-developer-forum/c/FupUkRnJ2TI
- S10 Android vitals ANR thresholds (user-perceived 0.47% overall, 8% per device): https://developer.android.com/google/play/vitals/anr
- Google Ads learning and budget changes (used in the prior check): https://support.google.com/google-ads/answer/14104492 ,
  https://support.google.com/google-ads/answer/7130502
