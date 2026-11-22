# Sources — everything used for the Block Bloom plans (to 22 Nov 2026)

Trust: **high** = official Google / Android documentation or our own data; **medium** = industry report with dated
data; **low** = vendor blog, secondary summary, or old data. "Opened" = when the page was read for the plan (22 Nov
2026 unless marked). Add every new source here with the same three facts (skill `01`, step 5).

## Our own data (high; always first)

| What | Where |
|---|---|
| Players, new players, revenue by day / country / channel | GA4 property 555700046 via `tools/growth-kpi.js` (app repo) or `scripts/growth-baseline-pull.js`; last baseline `reports/growth-baseline-2026-11-21.txt` |
| Installs, ratings (lag ~9 days) | Play GCS bucket `pubsite_prod_8701670281323658688` (same scripts) |
| Live store listing (read-only; discards the edit) | `scripts/play-listing.js <sa.json>` |
| Tracks, products, reviews | Play Developer API (`tools/play-status.js`, `scripts/play-products.js`, `tools/play-reviews.js`) |
| Remote Config (read raw, never filtered) | Firebase console / REST |
| Ad spend | Google Ads; the spend log `growth/spend-2026-11.csv` |
| Benchmarks and the independent model check | `plan-2026-11/evidence/benchmarks-2026-11-22.json`, `week1-model-check-2026-11-22.json` |

## Google Ads (high)

| Supports | URL |
|---|---|
| App campaign set-up; budget ≥ 50× target CPI (installs), 10× target CPA; Android learning ≥ 7 days; evaluate after 14 days | https://support.google.com/google-ads/answer/9176652 |
| Best practices: budget changes ≤ 20% every 2–3 days; cost per install inflated in the first days; 100 conversions before changing bids | https://support.google.com/google-ads/answer/14104492 |
| Bid strategy for App campaigns (target CPI field) | https://support.google.com/google-ads/answer/12073727 |
| Target CPA / ROAS volume needs (10+ conversions a day) | https://support.google.com/google-ads/answer/12171560 , https://support.google.com/google-ads/answer/6268637 |
| Ad scheduling is not compatible with App campaigns | https://support.google.com/google-ads/answer/2404244 |
| Automated rules, including ad group rules for App campaigns | https://support.google.com/google-ads/answer/2472779 |
| Manual (prepay) payments: ads stop when the balance is used | https://support.google.com/google-ads/answer/2393016 |
| Firebase and Google Ads together; linking | https://support.google.com/google-ads/answer/6397604 , https://support.google.com/firebase/answer/6383833 |
| Asset types for App campaigns | https://support.google.com/google-ads/answer/9948381 |
| Learning and budget changes (prior check) | https://support.google.com/google-ads/answer/7130502 |

## Google Play (high)

| Supports | URL |
|---|---|
| Metadata policy: title ≤ 30 characters; no emoji; no performance / ranking / price / promotion claims in title, icon, developer name; no spammy keywords | https://support.google.com/googleplay/android-developer/answer/9898842 ; announcement https://android-developers.googleblog.com/2021/04/updated-guidance-to-improve-your-app.html |
| Deceptive behaviour policy | https://support.google.com/googleplay/android-developer/answer/9888077 |
| Custom store listings | https://support.google.com/googleplay/android-developer/answer/9156429 |
| Promotional content (event cards): ≥ 4 days ahead, featuring 14+ days, ≤ 4 weeks, unique assets | https://support.google.com/googleplay/android-developer/answer/12932541 , …/answer/12932123 |
| In-app review API rules and quotas | https://developer.android.com/guide/playcore/in-app-review |
| Install referrer library (UTM links into GA4) | https://developer.android.com/google/play/installreferrer/library |
| Staged rollout through the API (tracks: inProgress, userFraction, halted) | https://developers.google.com/android-publisher/tracks |
| One-time products API | https://developers.google.com/android-publisher/api-ref/rest/v3/monetization.onetimeproducts |
| ANR thresholds (user-perceived 0.47%) and vitals | https://developer.android.com/google/play/vitals/anr , https://developer.android.com/games/optimize/vitals |
| ANR rate query (Reporting API) | https://developers.google.com/play/developer/reporting/reference/rest/v1beta1/vitals.anrrate/query |
| SDK requirements (search result only, not opened) | https://support.google.com/googleplay/android-developer/answer/10358880 |

## AdMob, Firebase, GA4 (high)

| Supports | URL |
|---|---|
| AdMob payments: $100 threshold, timing | https://support.google.com/admob/answer/2772208 , …/answer/2772140 |
| Mediation; bidding payments; adapter guides | https://support.google.com/admob/answer/13411971 , https://support.google.com/admob/answer/9360574 , https://developers.google.com/admob/android/mediation/applovin (…/liftoff-monetize, …/pangle, …/mintegral, …/meta) |
| SDK init, deprecation (GMA 23 sunset 30 Jun 2027), ad inspector, rewarded, consent (UMP) | https://developers.google.com/admob/android/optimize-initialization , …/deprecation , …/ad-inspector , …/rewarded , …/privacy |
| ANRs and mobile ads (2024) | https://developers.google.com/ads/blog/posts/2024/07/reduce-anrs-when-implementing-mobile-ads |
| AdMob reporting API | https://developers.google.com/admob/api/v1/reporting |
| FCM client set-up (auto-init) | https://firebase.google.com/docs/cloud-messaging/android/client |
| Firebase A/B testing; Remote Config conditions; DebugView | https://firebase.google.com/docs/ab-testing/abtest-config , https://firebase.google.com/docs/remote-config/condition-reference , https://firebase.google.com/docs/analytics/debugview |
| GA4 Data API schema, runReport, cohorts | https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema , …/rest/v1beta/properties/runReport , …/advanced |
| GA4 custom dimensions, data freshness, automatic events | https://support.google.com/analytics/answer/10075209 , …/answer/14239696 , …/answer/11198161 , https://support.google.com/firebase/answer/9234069 |

## Industry numbers (medium unless marked; see the evidence JSON for values and dates)

| Supports | URL |
|---|---|
| Android puzzle cost per install by country, Q3 2026 (US $4.81, UK $3.45 …); payer rate | https://www.appsflyer.com/?p=549948 |
| Retention benchmarks (D1 22% median, top quarter 30%+) | https://gamedevreports.substack.com/p/gameanalytics-mobile-and-pc-game , https://investgame.net/news/pdf/2026-01-20-mobile_retention_benchmarks_2026/ , https://gamedevreports.substack.com/p/adjust-gaming-app-insights-report |
| Ad prices (eCPM) by format and country; Q4 up, January down | https://blog.playio.co/mobile-game-ecpm-benchmarks-2026 , https://www.playwire.com/blog/admob-ecpm-benchmarks-what-publishers-should-expect , https://gamedevreports.substack.com/p/tenjin-ad-monetization-in-mobile , https://bidlogic.io/2026/04/24/breaking-down-the-q4-to-q1-ecpm-plunge/ |
| Revenue per active player (ad-funded casual) | https://blog.playio.co/arpdau-benchmarks-mobile-games , https://gamedevreports.substack.com/p/appsflyer-app-monetization-in-2026 |
| Interstitial uplift and retention effect (low) | https://mores.toponad.com/reports/TopOn%20Global%20Mobile%20Games%20Monetization%20Report%20_%202025%20H1.pdf , https://appodeal.com/success-stories/20-arpu-retention-strategies-3-successful-games/ |
| Festive-season and Black Friday prices | https://www.singular.net/festive-season-report-2026/ |
| India install prices (for contrast) | https://linkrunner.io/cost-per-install-benchmark , https://vmobify.com/blog/app-install-cost-india |
| Casual-game return on ad spend | https://liftoff.ai/?p=35032 |
| Google App campaigns guide (low, secondary) | https://www.rocketshiphq.com/google-app-campaigns-uac-complete-guide/ |
| Exchange rate ₹93.32 per US$ (19 Nov 2026) | https://theprint.in/economy/rupee-rallies-for-4th-session-to-close-9-paise-higher-at-93-32-against-us-dollar/3103570/ |

## Seasonality: Q5 (Christmas to early January)

| Supports | URL | Trust |
|---|---|---|
| Ad prices fall from Christmas Day to the 1st–2nd week of January ("up to 60%" is a vendor claim) | https://www.moloco.com/blog/what-is-q5-and-why-is-it-the-best-time-of-year-for-ua-dsp , https://moloco.com/blog/seasonality-trend-analysis-2024 | low–medium |
| Q5 strategies for user acquisition | https://unity.com/blog/q5-strategies-mobile-user-acquisition | medium |
| Game installs +7% on Christmas Day; installs and sessions peak on New Year's Day | https://www.adjust.com/blog/2025-holiday-app-trends/ | medium |
| Android game prices fall from mid-December; lowest cost per install in New Year's week (cites Liftoff) | https://blog.playio.co/q4-holiday-advertising-mobile-games | low–medium |

## Tools

| Supports | URL |
|---|---|
| Gemini CLI custom commands (TOML: `prompt` required, `description` optional, `{{args}}`, `@{file}`, `!{shell}`; project `.gemini/commands/` or global `~/.gemini/commands/`) | https://geminicli.com/docs/cli/custom-commands , https://cloud.google.com/blog/topics/developers-practitioners/gemini-cli-custom-slash-commands |
