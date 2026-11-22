# Console runbooks - Block Bloom, 22 Nov to 21 Dec 2026

Written 22 Nov 2026. Day 1 = Sun 22 Nov. Day n = (21 + n) Nov, so Day 8 = Sun 29 Nov, Day 10 = Tue 1 Dec, Day 13 = Fri 4 Dec, Day 18 = Wed 9 Dec, Day 30 = Mon 21 Dec.

> **Plan v2 (22 Nov evening) — read first.** Day numbers in this file are v1's (Day 1 = Sun 22 Nov). The steps are still
> right; the schedule is `01-day-by-day.md` v2 (Day 1 = Mon 23 Nov). Changes:
> - **C-03:** the Tier-1 campaign is paused on Mon 23 Nov and runs only in 7-day bursts (`07-ad-bursts.md`): ₹500 a
>   day for Burst 1 (12–18 Dec), ₹1,000 for Burst 2 (25–31 Dec, only if Burst 1 passes).
> - **C-04:** no weekly prepay. Pay only before a burst (Burst 1: ₹3,500 minus the balance, on Wed 9 Dec).
> - **C-05:** no edits during a burst; settings change only while the campaign is paused, before the burst.
> - **C-08** (in-app action bidding): not used; a 7-day burst cannot reach 10 conversions a day.
> - **C-18** (price test E2): dropped until there are buyers.
> - **C-19:** Winter Bloom card submitted Sat 28 Nov (15 days ahead, so it can be featured); a new Holiday Bloom card
>   (24 Dec – 3 Jan) submitted Wed 9 Dec (`06` §4).
> - Gemini may do the console clicks on Ajay's go; payments stay Ajay's.

Rules for all tasks:
- Owner AJAY = a human-only console (Google Ads money, AdMob payments, Play UI-only items).
- Owner GEMINI = Firebase / Remote Config / Play API / GA4 settings. Gemini uses the console, or the Firebase REST API or Admin SDK, or `firebase` CLI. Use repo-relative paths only.
- A console menu name can change. "UNVERIFIED" means I could not confirm the exact click path or number. Look at the screen, do the same action, and report the real path to Ajay.
- Never paste a secret into chat or a file.
- After every change that touches Remote Config or Google Ads: write one line in DAILY_ACTIVITY.md (date, what, old value, new value).

Source key (used below):
- [S1] https://support.google.com/google-ads/answer/9176652 (App campaign setup and budget advice)
- [S2] https://support.google.com/google-ads/answer/14104492 (App campaign best practices)
- [S3] https://support.google.com/google-ads/answer/12073727 (bid strategy for App campaigns)
- [S4] https://support.google.com/google-ads/answer/6397604 (Firebase and Google Ads together)
- [S5] https://support.google.com/firebase/answer/6383833 (link Google Ads to Firebase)
- [S6] https://support.google.com/google-ads/answer/9948381 (asset types for App campaigns)
- [S7] https://firebase.google.com/docs/ab-testing/abtest-config (Remote Config A/B test)
- [S8] https://firebase.google.com/docs/remote-config/condition-reference (RC conditions)
- [S9] https://support.google.com/googleplay/android-developer/answer/9156429 (custom store listings)
- [S10] https://support.google.com/googleplay/android-developer/answer/12932541 (promotional content)
- [S11] https://developer.android.com/games/optimize/vitals (Android vitals thresholds)
- [S12] https://support.google.com/admob/answer/2772208 (AdMob payments)
- [S13] https://support.google.com/admob/answer/13411971 (what is AdMob mediation)
- [S14] https://support.google.com/google-ads/answer/2393016 (manual / prepay payments)

---------------------------------------------------------------------

## Task index

| ID | Task | Owner | Plan day |
|---|---|---|---|
| C-01 | Link Google Ads with Firebase / GA4 and import conversions | Ajay (Ads side) + Gemini (GA4 side) | Day 1 |
| C-02 | Pause App-1 | Ajay | Day 1 |
| C-03 | Restrict Tier-1 campaign to 6 countries, set tCPI and Rs400/day | Ajay | Day 1 |
| C-04 | Weekly prepay of Google Ads funds | Ajay | Day 1, then every Sunday |
| C-05 | Budget-change rule (how to raise or cut budget) | Ajay | every change (Day 5, 10, 18, 22) |
| C-06 | Read cost per install per campaign | Ajay (Gemini builds the report) | daily |
| C-07 | Creative assets: specs and upload | Ajay | Day 3-5 |
| C-08 | Switch Tier-1 bidding to in-app action (tutorial_complete) | Ajay | Day 13 (not before Day 9) |
| C-09 | Remote Config: delete `live_events` | Gemini | Day 1 |
| C-10 | Remote Config: dated `live_events` for Aurora Bloom Festival | Gemini | Day 4-5 (before 27 Nov 00:00) |
| C-11 | Remote Config: dated `live_events` for Winter Bloom | Gemini | Day 21 (Sat 12 Dec) |
| C-12 | Firebase A/B test E1 (interstitial ON vs OFF) | Gemini | create Day 1; read Day 15 |
| C-13 | Roll out or stop E1 | Gemini (Ajay decides) | Day 15 (Sun 6 Dec) |
| C-14 | FCM push campaign | Gemini | only after vc40 fix; Day 23 (Mon 14 Dec) |
| C-15 | Play staged rollout and halt (vc40, vc41, vc42) | Gemini runs script; Ajay can halt in console | Day 4, 11, 19 |
| C-16 | Play custom store listing US/UK/CA/AU | Ajay | Day 3 (Tue 24 Nov) |
| C-17 | Play store listing experiments E3 (icon) and E4 (screenshots) | Ajay | E3 Day 3; E4 Day 14 |
| C-18 | Play price experiment E2 for `remove_ads` | Ajay | Day 3; read Day 24+ |
| C-19 | Play promotional content: check 27 Nov event; submit Winter Bloom | Ajay | check Day 1; submit by Day 10 |
| C-20 | Android vitals ANR check | Gemini reads; Ajay confirms gates | Day 8 (Gate A), Day 18 (Gate B) |
| C-21 | AdMob blocking controls review | Ajay | Day 2 |
| C-22 | app-ads.txt check | Gemini | Day 2 |
| C-23 | AdMob mediation groups per format (after vc41) | Ajay | Day 11-12 |
| C-24 | AdMob payment threshold and payout timing (India) | Ajay | Day 2 (read), 21 Dec (payout) |
| C-25 | GA4: key events, DebugView, links | Gemini | Day 1 |

Order on Day 1 (Sun 22 Nov): C-25, C-01, C-09, C-12, C-02, C-03, C-04. Reason: GA4 key events must exist before Google Ads can import them.

---------------------------------------------------------------------

## C-25  GA4: key events, DebugView, linking
Owner: Gemini. Day 1.

Goal: first_open and tutorial_complete are key events. Google Ads, AdMob and BigQuery (if used) are linked to the same GA4 property.

Steps:
1. Open Firebase console > project `block-bloom-31b39` > Project settings (gear) > Integrations. Check that the cards "Google Analytics", "AdMob" and "Google Ads" show "Manage" or "Linked". Source [S4], [S5]. UNVERIFIED: exact card names.
2. Open https://analytics.google.com, select the property that belongs to this Firebase project. Admin (gear, bottom left) > Data display > Events. UNVERIFIED: in older versions the path is Configure > Events.
3. Find `first_open` and `tutorial_complete` in the list. Switch "Mark as key event" ON for both. If an event is not in the list yet, it has no data in the last 28 days: wait, or create it by playing a debug build (step 6).
4. Admin > Product links. Check "Google Ads links" (step C-01) and "AdMob links". AdMob must be linked so `ad_impression` revenue shows in GA4 and in Firebase A/B tests (needed by C-12).
5. Admin > Data collection and modification > Data retention: set event data retention to 14 months (the maximum) if it is on 2 months. UNVERIFIED path.
6. DebugView check: on a debug build (`applicationIdSuffix=.debug`) run `adb shell setprop debug.firebase.analytics.app com.aweagle.blockbloom.debug`, then open the app and play. In GA4: Admin > Data display > DebugView (or Firebase console > Analytics > DebugView). Check that you see `first_open`, `tutorial_begin`, `tutorial_complete`, `ad_requested`, `ad_loaded`.
7. In Gemini's own words in DAILY_ACTIVITY.md: list which key events are ON.

Expected result: both events carry the "key event" flag. DebugView shows live events with parameters.
Verify: Admin > Data display > Key events lists first_open and tutorial_complete. In Google Ads (C-01) these two events appear when you click Import.
Gotchas:
- Do not mark `ad_impression` or `ad_*` events as key events. Only two key events are needed.
- Key events are counted from the day they are marked. Old data is not changed.
- The DebugView test must be on the debug app id, not the production id.
Source: [S4] (key events and import), Firebase docs https://firebase.google.com/docs/analytics/debugview (not opened; UNVERIFIED).

---------------------------------------------------------------------

## C-01  Link Google Ads with Firebase / GA4 and import conversions
Owner: Ajay for the Google Ads screens; Gemini for GA4 (C-25). Day 1.
Why: Tier-1 installs show as "Direct" in GA4 (issue I5). The link lets Google Ads see first_open and tutorial_complete and lets GA4 name the campaign.

Steps:
1. Check that the person who clicks has these roles: Admin on the Google Ads account, and Editor (or higher) on the GA4 property. [S4]
2. Firebase console > Project settings > Integrations > Google Ads card > "Link". Choose the Google Ads customer account that runs BlockBloom-Tier1-US-EU. Turn ON "Enable personalized advertising" if asked (this allows remarketing; Ajay decides, it can stay ON). Click "Link". Source [S5]. UNVERIFIED: button text.
3. Google Ads > Goals (left menu) > Conversions > Summary. Click "+ Create conversion action" > "Import" > "Google Analytics 4 properties" > "App" > Continue. Select `first_open` and `tutorial_complete`. Click "Import and continue" > Done. Source [S4]. UNVERIFIED: the exact labels (Google moves these menus often).
4. In the same Goals page, set each action's "Action optimization": `first_open` = Primary action, `tutorial_complete` = Secondary action for now (it moves to Primary in C-08). UNVERIFIED label.
5. Open the BlockBloom-Tier1 campaign > Settings > "Conversion goals" (or "Goals"). Under App campaign for installs, the option "Installs" can use "first open (Firebase)" instead of Play installs. Choose first_open as the counted install event. A Google codelab says you can change the install count to first open from GA4F: https://codelabs.developers.google.com/codelabs/ga4f-adwords-conversions . UNVERIFIED: whether this option still exists in the new campaign UI. If it does not, keep Play installs and use the first_open conversion column for reporting only.
6. Wait 24 to 48 hours. Conversion columns start empty at first.

Expected result: Goals > Conversions lists two GA4 App conversions with status "Recording conversions" or "Inactive" (Inactive until the first conversion arrives). In GA4 (Reports > Acquisition > Traffic acquisition) installs from Google Ads show source "google / cpc" instead of "(direct)".
Verify on Day 3: in GA4, filter first_open by "Session campaign" or "First user campaign": Tier-1 campaign has more than 0 users. In Google Ads, column "Conversions" per campaign is above 0.
Gotchas:
- If you ever unlink Google Ads from Firebase, events marked as remarketing conversions become unmarked. [S4]
- Link only one Google Ads account that actually runs the campaigns. A wrong link shows zero data and no error.
- Counting rule: "cost per opened install" = campaign cost / first_open conversions. Do not use Play installs for the Rs30 rule (Play counted 173 installs on 17 Nov vs 29 first_opens).
- Existing campaign gets no history for the new conversions. Learning starts again for the conversion goal. This is why C-01, C-02, C-03 are all done on Day 1 together, so there is one learning reset.

---------------------------------------------------------------------

## C-02  Pause App-1
Owner: Ajay. Day 1.

Steps:
1. Google Ads > Campaigns. Find "App-1" (global, Rs200/day).
2. Click the green dot (status) in the row > "Pause". UNVERIFIED: dot or "Edit > Pause" in the new UI.
3. Do not delete it. Keep the history.

Expected result: status "Paused". Spend today after the pause stops.
Verify: Campaigns table, column "Cost" for App-1 shows no new cost the next day.
Gotchas:
- Pausing App-1 removes India installs (Rs2.28 per Play install). That is intended: India earns Rs0.17 per player against Rs3.51 for US.
- Do not pause during a payment hold; check C-04 first so the Tier-1 campaign keeps its funds.
- Do not edit App-1 budget or location before pausing (any edit resets learning).

---------------------------------------------------------------------

## C-03  Restrict Tier-1 campaign to US, UK, CA, AU, NZ, IE; target cost per install; Rs400/day
Owner: Ajay. Day 1. Campaign: BlockBloom-Tier1-US-EU.

Steps:
1. Google Ads > Campaigns > click the campaign name > left menu "Settings".
2. Locations: click "Locations" > "Enter another location" > "Advanced search" or type each name. Include exactly: United States, United Kingdom, Canada, Australia, New Zealand, Ireland. Remove every other country (the EU countries now there are cheaper and earn 45-80% less than US).
3. Under "Location options", choose "Presence: People in or regularly in your targeted locations" (not "interest"). UNVERIFIED: App campaigns may hide this option; if hidden, skip.
4. Languages: English only. UNVERIFIED: App campaigns may take the language from assets.
5. Budget and bidding: set "Budget" = Rs400 per day. Set "Target cost per install" (tCPI) = Rs25. Reason: observed Rs19.71 per Play install, plus about 25% room. If the campaign shows "Limited by budget" or very low spend after 2 days, do NOT raise the tCPI above Rs30 (the cost rule). Source [S3]: tCPI = "Set a target cost per install (optional)" tick box.
6. Do steps 2, 5 in one save. Save. Write the old and new values in DAILY_ACTIVITY.md.

Expected result: Settings shows 6 locations, budget Rs400, tCPI Rs25. Budget cut from Rs500 to Rs400 is -20% (inside Google's 20% advice).
Verify (Day 2-3): Locations report (Campaign > Insights and reports > "Locations" or Reports > Predefined > Geographic): all spend is in the 6 countries. Cost today is near Rs400 or lower.
Gotchas:
- Google advice: daily budget at least 50 x target CPI and enough for 100 installs a day [S1]. Rs400 / Rs25 = 16 x, so Google will show a warning and spend can be uneven. This is accepted by the plan. Do not "fix" the warning by raising the budget outside the ladder.
- Benchmarks say Tier-1 cost per opened install at scale is Rs322-449. Expect Google to under-spend against a Rs25 target. That is fine: under-spend saves money. Do not chase spend.
- Android learning phase takes at least 7 days [S1]. Do not judge before Day 8.
- UNVERIFIED: whether tCPI field still exists in the new App campaign UI for a campaign created earlier. If the field is missing, leave bidding on "Maximize conversions" and keep the Rs400 budget.

---------------------------------------------------------------------

## C-04  Weekly prepay
Owner: Ajay. Day 1, then every Sunday (Day 8, 15, 22, 29).

Facts: the account is prepay (manual payments). Ads stop when the balance is used up. Card payment clears almost at once. Bank / net banking can take 1 to 7 days. [S14] and prior-benchmarks.json. UNVERIFIED: the minimum payment for this account (the screen shows it).

Steps:
1. Google Ads > Tools (wrench) > Billing > Summary. UNVERIFIED: in 2026 this may be "Billing" in the left menu.
2. Read "Account balance" or "Remaining funds".
3. Compute the amount: planned budget for the next 7 days + 10% buffer - current balance. Example for Day 1: Rs400 x 4 (Days 1-4) + Rs300 x 3 (Days 5-7) = Rs2,100; plus 10% = Rs2,310; round to Rs2,500 minus current balance.
4. Click "Make a payment" (or "Add funds"), choose the card, enter the amount, confirm. Use a card, not net banking, so the money arrives the same day.
5. Save the payment ID in the notes repo spend log (amount, date; no card number).

Expected result: balance shows the new amount within minutes (card).
Verify: Billing > Transactions lists the payment with status "Paid" or "Processed".
Gotchas:
- Google can spend up to 2 x the daily budget on one day, but not more than 30.4 x daily budget in a month. Keep the buffer.
- The plan cap is Rs13.6k in total (Rs18k max). Add each payment to a running total; stop when you reach the cap and ask Ajay.
- If the balance reaches zero, campaigns stop and learning can reset. Check the balance every morning for the first week.
- Card payments may have a limit per transaction; bank payment is the fallback but it is slow. Pay before Saturday.

---------------------------------------------------------------------

## C-05  Budget-change rule
Owner: Ajay. Applies to every budget or tCPI change.

Rule (use this exact text):
1. Change the daily budget by at most +20% at a time, and at most once every 3 days. Do not change the tCPI or bid in the same 3 days.
2. Plan owner (Ajay) may allow +30% once; then wait 3 days. Google's own advice is 20% [S1]; 30% is an accepted risk, not a Google rule.
3. A cut of more than 20% is also a drastic change. Same wait.
4. Never raise the budget on a day when the 7-day cost per opened install is above Rs30 (cost rule) or the day-7 return is below 15% (stop-loss).

Why (plain words): Google's learning system needs stable settings. Big changes reset learning and raise cost per install for days. Google says: "Try not to make drastic changes ... changing the budget by more than 20%". [S1] Google also says changes before 100 conversions can disrupt learning. [S1]

What this means for the plan ladder (check each step):
| Day | Change | Size | Allowed? |
|---|---|---|---|
| 1 | Rs500 to Rs400 | -20% | Yes (edge) |
| 5 | Rs400 to Rs300 | -25% | Breach. Use Rs320 (-20%). Cost of waiting: Rs20/day. |
| 10 | Rs300 to Rs500 | +67% | Breach. Safe path: Rs360 (Day 10), Rs430 (Day 13), Rs500 (Day 16). Fast path: accept one breach on Day 10. Ajay decides. Gate A (Day 8) is the only check in the plan. |
| 18 | Rs500 to Rs700 | +40% | Breach of 30%. Safe path: Rs600 Day 18, Rs700 Day 21. |
| 22 | Rs700 to Rs900 | +29% | Allowed only under the "+30% once" permission, Day 22 after Day 18's step is 4 days old. |

I recommend the safe path where it costs less than 3 days. Ajay's call.

Steps for one change:
1. Google Ads > Campaigns > campaign > Settings > Budget > edit amount > Save.
2. Write date, old, new in DAILY_ACTIVITY.md and set a reminder for +3 days.

Verify: Settings shows the new amount; the change history (Tools > Change history) shows one change for that day.
Gotchas: two edits in one day count as two changes. Check Tools > Change history before every edit.

---------------------------------------------------------------------

## C-06  Read cost per install per campaign
Owner: Ajay (Gemini builds `tools/growth-kpi.js` view in the repo). Daily from Day 2.

Steps:
1. Google Ads > Campaigns. Set the date range (top right) to "Last 7 days" (or custom).
2. Columns > Modify columns > add: Cost, Installs, Avg. cost/install (Cost / installs), Conversions, Cost / conv. Add the two imported conversions as separate columns: Conversions by conversion action > first_open, tutorial_complete. UNVERIFIED: names. Save the column set as "BB-daily".
3. Segment > Time > Day to see each day.
4. Read these three numbers each morning for the Tier-1 campaign: (a) Cost, (b) first_open conversions, (c) tutorial_complete conversions.
5. Compute cost per opened install = (a) / (b). Compare with Rs30 (stop-increase line) and Rs19.71 (Day 0 reference). Copy to the spend log.

Expected result: one row per campaign. Expect Play-install cost much lower than cost per first_open.
Verify: Cost sum in Google Ads matches the total of C-04 payments minus remaining balance within 5%.
Gotchas:
- "Installs" in Google Ads come from Play and count installs that never open. First_open is from Firebase. Use first_open for the Rs30 rule.
- Data for the last 2 days is incomplete (conversions arrive late). Judge the 7-day window, and wait until Day 8.
- Benchmark warning (AppsFlyer Q3 2026): Tier-1 puzzle cost per opened install is Rs322-449 at scale. If you see Rs100+ in the first week, it is normal for Tier-1; the stop rule is Rs30 at Rs500 and above, so the campaign is likely to fail the cost rule. Report to Ajay on Day 8.

---------------------------------------------------------------------

## C-07  Creative assets: specs
Owner: Ajay (records clips; Gemini can produce edits and text). Day 3-5.
Source for all numbers: [S6]. The page was partly garbled in my search; mark UNVERIFIED where noted. Check the page once before upload.

Text:
- Headlines: max 30 characters each. Give at least 2, up to 5. Use all 5.
- Descriptions: max 90 characters each. Give at least 1, up to 5. Use all 5.
- No emoji, no all-caps shouting, no price claims, no "#1" claims.
- Text must match the Play listing (rules: no false claims about reward or earning).

Images (ratio, minimum, recommended):
- 1:1: 200x200 minimum, 1200x1200 recommended
- 1.91:1: 600x314 minimum, 1200x628 recommended
- 4:5: 320x400 minimum, 1200x1500 recommended
- File size: 5 MB maximum (stated on the engagement page; UNVERIFIED for install campaigns)
- Show real gameplay. Put no text in the image except the logo. UNVERIFIED for install campaigns.

Video:
- Hosted on YouTube (upload as Unlisted or Public; the link goes in the campaign). [S6]
- Ratios: 16:9 landscape, 9:16 vertical, 1:1 square. Length: 10 to 60 seconds recommended. One to 20 videos. Recommended mix: 3 landscape, 7 vertical (UNVERIFIED: the table was garbled).
- A third party says 15 to 30 seconds works best. This is not a Google rule. Make 15 and 30 second cuts.
- Keep important content in the centre. The top 10% and bottom 25% may be covered by the ad's app name and button. Source: https://services.google.com/fh/files/misc/creative_best_practices_checklist.pdf
- If you upload no video, Google makes one from your images and text. That video is weak; upload your own.
- Footage: the first 3 seconds must show a block placement with a line clear. Do not show ads or fake reward screens.

Steps to upload:
1. Google Ads > Campaigns > campaign > Ad groups or Assets (left menu) > Assets > "+" > upload images, add video URL, add headlines and descriptions. UNVERIFIED: menu is "Assets" in new UI.
2. Save. Status shows "Under review" for up to 1 business day.
3. After 7-14 days read "Asset performance" (Best / Good / Low). Replace "Low" assets. Do it once a week, not daily.

Expected result: 5 headlines, 5 descriptions, at least 3 images (one per ratio), at least 2 videos.
Verify: Assets table shows all assets "Eligible".
Gotchas:
- Asset changes can reset learning if you remove many assets at once. Add new assets first, remove "Low" ones after a week, one at a time.
- Do not use Google's or Play's logos.

---------------------------------------------------------------------

## C-08  Switch bidding to in-app action (tutorial_complete)
Owner: Ajay. Plan Day 13 (Fri 4 Dec). Not before Day 9 (Mon 30 Nov), and only after Gate A.

When it is allowed (all must be true):
1. At least 10 users a day complete tutorial_complete from this campaign, for 3 days in a row (Google needs 10+ users per day for an in-app-action tCPA campaign [S2], prior-benchmarks.json).
2. Daily budget is at least 10 x the target cost per action. tutorial_complete is 62% of first opens, so the cost per action is about cost per first_open / 0.62. Example: Rs40 per opened install gives Rs65 per action; budget needed Rs650. If the budget is lower, do not switch.
3. The last budget change is at least 3 days old (C-05). Day 10 raise to Rs500 means Day 13 is the first valid day.
4. C-01 conversions show a count above 0 per campaign.
5. tROAS is NOT possible: it needs 10+ conversions a day from purchases, and there are zero purchases [S2].

Steps:
1. Google Ads > Campaigns > campaign > Settings > Bidding (or "Campaign goal"). Click "Change bid strategy" (or "Change optimization goal"). UNVERIFIED: wording. Google may require a NEW campaign to change the goal type from "Installs" to "In-app actions". If the option is missing, create a copy: Campaigns > "+" > App promotion > same app, same countries, same assets; budget the same; pause the old one on the same day. Copying restarts learning (7 days).
2. Choose "In-app actions". Select tutorial_complete only. Google advises one action; two actions make a blended target. [S3]
3. Target cost per action: start at the observed cost per tutorial_complete from the last 7 days, rounded up by 10%. Do not use bid limits (not recommended for tCPA) [S3].
4. Save. Make no other change for 3 days. Do not change tCPA by more than 20% later.

Expected result: Settings shows "Bid strategy: Target CPA / In-app actions: tutorial_complete". Spend continues. First 7 days = learning; cost per install can rise.
Verify: after 7 days compare day-1 return of installs in this window with the earlier cohort (Gate B needs day-1 return >= 28%).
Gotchas:
- Changing the goal restarts learning. Check budget paid (C-04).
- Players who complete the tutorial retain better, so cost per install rises but quality should rise. Judge on Gate B numbers, not on cost per install alone.
- Do not run both an install campaign and an action campaign in the same countries at the same time for more than a few days; they bid in the same auctions.

---------------------------------------------------------------------

## C-09  Remote Config: delete `live_events`
Owner: Gemini. Day 1.

Why delete and not publish `[]`:
- Today `live_events` holds one entry "weekend_cascade" (+50% coins) with no condition. It runs EVERY day and replaces the app's calendar events (prior-levers.json, FirebaseEventConfig.kt:38-42).
- `[]` is a valid empty list. The app then shows NO events at all, also no weekend (x1.5 Sat/Sun) and no Wednesday daily double (FirebaseEventConfig.kt:53-56 comment; Events.kt:46-70).
- A deleted or blank parameter returns null. The app then runs the local calendar events as designed.
- Before the delete, Gemini opens `events/FirebaseEventConfig.kt` and `events/Events.kt` and checks the line that handles a blank or missing value (prior note: parseOrNull returns null for blank).

Steps:
1. Firebase console > Remote Config > Parameters tab. Find `live_events`.
2. Copy the current value into DAILY_ACTIVITY.md (backup).
3. Row menu (three dots) > Delete. (UNVERIFIED label; may be a trash icon.)
4. Click "Publish changes" and confirm. The page shows version 6.
5. Do NOT touch `ads_interstitial_enabled`, `ads_interstitial_interval`, `ads_banner_enabled`, `min_supported_version_code`.

Expected result: Parameters table has 4 parameters. Template version = previous + 1.
Verify: on a debug build, force fetch (restart app), open Home. The "Weekend Cascade" card is gone on a weekday; on Sat/Sun the local "weekend_coins" x1.5 shows. Or call the REST API: GET https://firebaseremoteconfig.googleapis.com/v1/projects/block-bloom-31b39/remoteConfig (with a token) and check there is no live_events key.
Gotchas:
- Players lose the always-on +50% coins on weekdays. This is intended (issue I1). Tell Ajay in the daily note.
- Players already holding an old fetched value keep it until the next fetch (the app also has a realtime listener, so a publish applies within seconds on running sessions: prior-levers.json BlockBloomApp.kt:72-80).

---------------------------------------------------------------------

## C-10  Remote Config: dated live_events for Aurora Bloom Festival (27 Nov - 3 Dec)
Owner: Gemini. Day 4-5. Publish by Thu 26 Nov (Day 5) before 27 Nov 00:00 UTC. Remove after 3 Dec (C-10 step 8).

Design: ONE parameter `live_events` with a conditional value. Outside the dates the parameter has no value, so the app runs the calendar events.

Event JSON (festival: coins x2, Aurora Bloom Festival):

```json
[{"id":"aurora_bloom_festival","title":"Aurora Bloom Festival","description":"Double coins until 3 Dec","kind":"COIN_BOOST","multiplier":2.0,"endsInDays":0}]
```

Field rules (prior-levers.json, FirebaseEventConfig.kt:57-80, Events.kt:7):
- `id` and `title` are required. A missing one drops the whole payload and the calendar events run.
- `kind` is COIN_BOOST or DAILY_DOUBLE. Any other kind is skipped silently. If every entry has an unknown kind, the result is an empty list = no events.
- `multiplier` is a float (default 1.0). `endsInDays` is only display text (a fixed number, not a countdown). Keep it 0 and put the end date in the `description`.
- A valid payload REPLACES the calendar events. So 28 Nov (Sat) x1.5 and Wed 2 Dec daily-double are hidden for the whole festival. COIN_BOOST x2.0 beats x1.5 anyway. To keep the Wednesday daily double, use this two-entry JSON instead (Ajay decides; default is the one-entry JSON above):

```json
[{"id":"aurora_bloom_festival","title":"Aurora Bloom Festival","description":"Double coins until 3 Dec","kind":"COIN_BOOST","multiplier":2.0,"endsInDays":0},{"id":"aurora_daily_double","title":"Aurora Daily Bonus","description":"Double daily reward until 3 Dec","kind":"DAILY_DOUBLE","multiplier":2.0,"endsInDays":0}]
```
(Check Events.kt that DAILY_DOUBLE with these field names is read as written.)

Steps:
1. Firebase console > Remote Config > Conditions tab (or the "Add new > Condition" link in a parameter row). UNVERIFIED path.
2. Create condition name `aurora_festival`. Add a rule of type "Date/Time". Set: after (or equal) 27 Nov 2026 00:00 and before 4 Dec 2026 00:00, time zone UTC. If the console only lets you write the expression, use:
   `device.dateTime >= dateTime('2026-11-27T00:00:00', 'UTC') && device.dateTime < dateTime('2026-12-04T00:00:00', 'UTC')`
   UNVERIFIED: the exact function syntax. The reference page [S8] lists the element `device.dateTime`, ISO format, optional time zone. It says GMT when no time zone is given. UNVERIFIED: whether operators `>=` and `<` are accepted (page lists `<=` and `>` in one place). If the console rejects it, use `>` with 2026-11-26T23:59:59 and `<=` with 2026-12-03T23:59:59.
3. Remote Config > Parameters > "Add parameter": key `live_events`, type String (the app reads it as a string; the old one was a string with JSON).
4. Click "Add value" > "Add value for condition" > select `aurora_festival` > paste the JSON.
5. Leave the "Default value" empty: choose "No value" or "Use in-app default" (UNVERIFIED label). Do NOT type `[]` or any text as the default.
6. Click "Publish changes".
7. Check: Home screen on a debug build with the device clock set inside the dates shows the card. (Set the device date to 28 Nov; reset it after.) Check outside the dates: no card.
8. Cleanup on Fri 4 Dec (Day 14): open Remote Config, delete the condition value for `aurora_festival` (or delete the parameter), Publish. Do not forget; the condition ends the event for new fetches, but a clear template is safer.

Expected result: players who fetch inside 27 Nov 00:00 UTC - 4 Dec 00:00 UTC see "Aurora Bloom Festival". Others see the calendar events.
Verify: REST API GET shows `conditionalValues.aurora_festival` and no `defaultValue` for `live_events`. RC "History" tab lists the publish.
Gotchas:
- `device.dateTime` is based on the time of the last fetch [S8], so the start and end can lag until the next fetch (the app's minimum fetch interval; prior note says about 1 h). The realtime listener does not fire at a date change, only on a publish.
- UTC midnight is 7 pm 26 Nov in New York and 4 pm in Los Angeles. It is 10:30 am 27 Nov in India. Fine for a coin boost.
- The Play promotional content card is separate (C-19). Dates must match: 27 Nov to 3 Dec.
- This is also the moment to consider vc40: it ships on Thu 26 Nov. Old versions read the same parameter with the same rules, so no version gate is needed.
- Never use the old `endsInDays` as a timer.

---------------------------------------------------------------------

## C-11  Remote Config: dated live_events for Winter Bloom (14-21 Dec)
Owner: Gemini. Day 21 (Sat 12 Dec) after vc42 is at 100% (Fri 11 Dec). The Play promotional card is C-19.

Steps: same as C-10. Use condition `winter_bloom` with the dates 14 Dec 2026 00:00 UTC to 22 Dec 2026 00:00 UTC (event ends after 21 Dec). Add a second conditional value on the SAME `live_events` parameter (do not make a new parameter). Conditions are checked top to bottom; the dates do not overlap with Aurora (ends 4 Dec), so order does not matter.

Draft JSON (Gemini must align `id`, `kind` and `multiplier` with what vc42 actually implements; read `events/Events.kt` and the vc42 branch first):

```json
[{"id":"winter_bloom","title":"Winter Bloom","description":"Winter coin bonus until 21 Dec","kind":"COIN_BOOST","multiplier":2.0,"endsInDays":0}]
```

Expected result, verify and gotchas: as C-10. Extra gotchas:
- If vc42 adds new event kinds, an old app version that does not know the kind skips that entry silently; if it is the only entry, those players see NO events (not the calendar events). So keep `kind` as COIN_BOOST or DAILY_DOUBLE, or add a second entry of a known kind.
- Cleanup: delete the `winter_bloom` value on Tue 22 Dec (Day 31, after the plan window). Put a reminder in the notes.

---------------------------------------------------------------------

## C-12  Firebase A/B test E1: ads_interstitial_enabled ON vs OFF
Owner: Gemini. Create on Day 1 (Sun 22 Nov). Read Day 15 (Sun 6 Dec).

READ THIS FIRST (WARNING):
- The CODE default of `ads_interstitial_enabled` is ON (AdsConfig.kt:28). Only the live Remote Config value `false` keeps it OFF.
- NEVER delete the key `ads_interstitial_enabled`. Never change its type. Never publish it empty. Deleting it switches interstitials ON for every player on the next fetch.
- Do not edit this parameter in the normal RC editor while the experiment runs. All changes go through the experiment.
- Before you start, confirm that the published default is `false`. After you stop or finish the experiment, check again that the default is `false` (unless Ajay decided to roll out ON).

Known risks Ajay must accept (from my read of the code and plan):
1. Sample size: about 100 daily players, 25 of them in the US. Firebase will show "no clear leader" for weeks. The test is a safety check on retention, not a proof.
2. Code mix: vc40 (150 s gap between interstitials, interstitial events) reaches players Day 5-6. Before that, ON players on 1.15.1 get no time gap. Variants will mix old and new code. The plan starts on Day 1 on purpose. A cleaner option: start on Day 5 and add a condition "App version >= 40". Ajay decides before Gemini starts.
3. Interstitials have no analytics events in 1.15.1 (prior-levers.json). Revenue per user relies on the AdMob link (ad_impression events).

Steps:
1. Check the SDK is new enough: Remote Config A/B tests need Android SDK 21.1.1+ (Firebase BoM 30.3.0+). [S7] Gemini reads `app/build.gradle.kts` for the BoM version. If it is older, stop and report.
2. Firebase console > left menu "Run" (or "DevOps & Engagement") > A/B Testing > "Create experiment" > "Remote Config". [S7] UNVERIFIED: left menu group name.
3. Basics: Name = `E1 interstitial on vs off`. Description = "SPIQ growth plan E1: 50/50, read Day 15". Target app = com.aweagle.blockbloom (Android).
4. Targeting: leave conditions empty (all users) UNLESS Ajay chose the version condition above. Exposure = 100% of targeted users. Activation event = none. UNVERIFIED: whether Firebase allows no activation event; if it asks, use `first_open` is wrong (fires once); pick `tutorial_begin` only if all players reach it; otherwise leave empty.
5. Goals: Primary metric = ad revenue per user. Names to look for: "Estimated ad revenue" or "Total revenue" (UNVERIFIED exact name; Firebase lists metrics such as retention, purchase revenue, estimated total revenue, crash-free users, daily engagement). Choose the one that includes AdMob revenue. [S7]
6. Add guardrail metrics: "Retention (2-3 days)", "Retention (4-7 days)", "Retention (1 day)" if offered (UNVERIFIED label), "Crash-free users", "Daily user engagement". Also add the event `uninstall` is not available; use "App removes" if listed (UNVERIFIED).
7. Variants:
   - Baseline: keep the parameter `ads_interstitial_enabled`, value = (current value) `false`. Weight 50%.
   - Variant A: set `ads_interstitial_enabled` = `true`. Weight 50%. Weights cannot be changed after the start. [S7]
   - Do not change `ads_interstitial_interval` (stays 4). If the console lets you add `ads_interstitial_interval` to the variants, do not.
8. Review > "Start experiment". Confirm.
9. Write the experiment start time, version, and old values in DAILY_ACTIVITY.md.

Expected result: A/B Testing lists "E1" as "Running". Both variants get about equal user counts after 1-2 days.
Verify:
- Day 2: A/B Testing > E1 > "Overview" shows users in each variant, roughly equal.
- On a debug build: Remote Config "Experiments" in the console has "Debug a test device"; add one device with its Installation ID (from logcat, or `FirebaseInstallations.getInstance().id`; Gemini adds a debug log line if needed) and force it into Variant A to see an interstitial after game 3. UNVERIFIED: flow label.
Reading (Day 15, Sun 6 Dec):
1. Firebase console > A/B Testing > E1 > "Overview" and "Improvement overview".
2. Read per variant: ad revenue per user, retention day 1 and 2-3, crash-free users, user count.
3. The plan's success rule (roadmap E1): revenue per player +30% or more AND day-1 and day-3 return within 2 points AND uninstalls not up.
4. Firebase shows "probability to beat baseline" or a "leader" label. With this sample size, it will probably be "inconclusive". Then use the plan rule on the raw numbers and write that the sample is small. Do not stop before Day 15, and do not stop early because one day looks good.
Duration: Firebase has no fixed run length. [S7] results say no recommended duration. Plan = 14 days (Day 1 to Day 15). UNVERIFIED: Firebase's own advice (it usually says at least 14 days / enough conversions).
Gotchas:
- If a player's device never fetches, they are not in the experiment.
- Do not edit the parameter in the normal editor while E1 runs. Publishing other parameters is fine (unrelated keys).
- Users who got Variant A keep it until the experiment stops.
- Never run a second experiment on the same parameter.

---------------------------------------------------------------------

## C-13  Roll out the winner (or stop) E1
Owner: Gemini executes; Ajay decides. Day 15 (Sun 6 Dec).

Case 1: Variant A (interstitials ON) wins by the plan rule.
1. A/B Testing > E1 > "Roll out" (button "Roll out variant" / "Roll out Variant A") on the Overview page. UNVERIFIED label. The console writes `ads_interstitial_enabled = true` as the published value (it may add a condition).
2. Open Remote Config afterward and confirm: key exists; value `true`; type Boolean; no stray condition that targets only some users unless planned.
3. Keep `ads_interstitial_interval` = 4. Consider an RC condition to keep ON only for Tier-1 countries (US, GB, CA, AU, NZ, IE) and OFF elsewhere: add condition `country in [...]` with value `true`; default value stays `false`. Ajay decides; the roadmap does not say.

Case 2: Baseline (OFF) wins, or the result is unclear.
1. A/B Testing > E1 > "Stop experiment" (or "Roll out Baseline").
2. Open Remote Config and check `ads_interstitial_enabled` is still `false` and still exists. This is the dangerous moment: if the parameter was removed or edited, interstitials can go ON for everyone.

Verify: on a debug build after the next fetch, play 6 games: Case 1 shows an interstitial on game exits as per the code rules (none in the first 2 games, skipped after a rewarded view, every 4th game); Case 2 shows none.
Gotchas:
- After the experiment ends the experiment's variant values stop; only the published parameter value remains. So the published value must be what Ajay wants.
- Record the decision in DAILY_ACTIVITY.md and in the notes repo journal.

---------------------------------------------------------------------

## C-14  FCM push campaign to opted-in players
Owner: Gemini. Day 23 (Mon 14 Dec) for the Winter Bloom start. Only after vc40 (FCM fix) is at 100%.

PRECONDITION (hard):
- v1.15.1 has FCM auto-init OFF (AndroidManifest.xml:87-89) and nothing turns it on, so a console push reaches nobody (prior-levers.json). vc40 must ship `FirebaseMessaging.getInstance().isAutoInitEnabled = true` (or an equivalent).
- Do not send before at least 70% of daily players are on vc40 (Play Console > Statistics > Installs by app version, or GA4 by app version). A push to nobody still counts as "sent" in the console.
- Players on Android 13+ get the push only if they accepted the notification permission (one-time ask after the first game; GameViewModel.kt:841-843). That is what "opted-in" means here. The console has no clean "opted in" filter. GA4 event `notification_permission` has a `granted` parameter (prior-levers.json); a GA4 audience on `granted = true` can be used (UNVERIFIED that the audience builder accepts this parameter without registering a custom definition).

Steps:
1. First do a test send. Firebase console > Messaging (or "Engage" > Messaging) > "New campaign" > "Notifications". [Treefort article summary; official doc https://firebase.google.com/docs/cloud-messaging/send/firebase-console] UNVERIFIED menu names.
2. Notification text: title = "Winter Bloom is here", body = "Play now for the winter coin bonus." (plain English; add the 5 other app languages only if vc42 has strings; the console can send one text per language by "Add localized text" UNVERIFIED).
3. Target: select "App" = com.aweagle.blockbloom. Add condition: "App version >= 40" (or the vc42 string), and the GA4 audience of players with notification_permission granted if available. Add "Country" only if Ajay wants Tier-1 only.
4. Scheduling: first test: "Send test message" with your own device's FCM registration token (log it in a debug build). Then the real send: "Scheduled" for Mon 14 Dec at 18:00 in "recipient's local time zone" if the console offers it (UNVERIFIED), otherwise at 18:00 UTC.
5. Additional options: Android notification channel = `news` (BloomMessagingService.kt:86 says the channel is "news"); Expires = 1 day.
6. Review > Publish. After the fanout starts, it cannot be cancelled (Firebase doc).

Expected result: the campaign table shows "Sent" with "Sent" and "Opened" counts; Opened is more than 0 within a few hours.
Verify: GA4 event `reminder_opened`? That event is for local win-back reminders; for FCM look at GA4 `notification_open` (automatic) and the console's "Opened" metric. UNVERIFIED which event name the app logs; Gemini checks BloomMessagingService.kt.
Gotchas:
- The foreground app silently returns if the permission is missing (BloomMessagingService.kt:43-45).
- One push per week per player maximum. Players uninstall after spam (41% already uninstall).
- Do not push before Day 8 to test the new fix on real players; test with your own device.

---------------------------------------------------------------------

## C-15  Play staged rollout and halt
Owner: Gemini runs the script; Ajay owns the "halt" button. Releases: vc40 (Day 4 Wed 25 Nov 20%, Day 5 100%), vc41 (Day 11 Wed 2 Dec 10%, Day 12 50%, Day 14 Sat 5 Dec 100%), vc42 (Day 20 Thu 10 Dec 20%, Day 21 Fri 11 Dec 100%). Check the dates in the roadmap; the plan says vc42 20% on Thu 10 Dec.

What the script can do (I read `tools/play-rollout.js`, read-only):
- It takes a staged fraction as argument 7 (`USER_FRACTION`, line 28). With a fraction it forces `status = inProgress` and `userFraction` (lines 137).
- Default track is `alpha` (line 22). For the real release you must pass `production`.
- Default status is `completed` at 100% when no fraction is given.
- Release notes are read from `tools/release-notes/vc<N>.json` (each text <= 500 chars). No file = the script stops before any edit.
- It does NOT support "halted" or "resume". Halting is done in the console (below) or with a small API call: `status: "halted"` in the same track PUT (Gemini may add this later; Ajay did not ask for a repo change now).
- The script's console messages say "FULL rollout" even for a fraction (cosmetic, lines 123, 153).
- It sends the track with ONLY the one release in `releases`. Memory note: a PUT with only a draft DROPS the live release. For an `inProgress` release this may also drop the previous completed release (vc39 at 100%). UNVERIFIED for inProgress. TEST: after the first staged commit, open Play Console > Release > Production and check that the screen shows the current vc39/vc40 release at 100% AND the new staged release. If vc39 is missing, stop and fix (then add the previous release object to the PUT body).

Commands (Gemini, from the repo root; credentials via env PLAY_SA_FILE; never print it):
```
# vc40 20% on production
node tools/play-rollout.js 40 com.aweagle.blockbloom production "1.16.0" inProgress 0.2
# vc40 to 100% after 24 h clean
node tools/play-rollout.js 40 com.aweagle.blockbloom production "1.16.0" completed
# vc41 staged: 10% then 50% then 100%
node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0" inProgress 0.1
node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0" inProgress 0.5
node tools/play-rollout.js 41 com.aweagle.blockbloom production "1.17.0" completed
```
(Check that the release name argument matches the name used in the upload so the release is not duplicated: `play-upload.js` takes the same argument 4.)

Fraction rules: a value greater than 0 and less than 1, e.g. 0.2 = 20%. Play also accepts raising the fraction later; do it by running the script again with the higher fraction. UNVERIFIED: lowering the fraction is not allowed (halt instead).

Console path to check or halt (Ajay):
1. Play Console > select Block Bloom > left menu "Test and release" > "Production" > "Releases" (or Release > Production > Releases). UNVERIFIED label.
2. The staged release shows "Rolling out: 20%".
3. Click the release > "Halt rollout" (UNVERIFIED label: "Halt rollout" / "Resume rollout"). Halt keeps current users on the new version; new users get the previous version.
4. Halt rules (use them): crash-free users on the new version below 99.5%, or an ANR cluster in Android vitals, or Crashlytics shows a new crash in over 1% of sessions.
5. A halt is not a rollback. Players who have vc40 keep it. To go back, ship a new versionCode with the fix. The emergency brake that also works for old players is Remote Config `min_supported_version_code` (do not raise it unless needed).

Expected result: Production track shows a staged rollout at the chosen fraction, and the other users stay on the previous release.
Verify: Statistics > Installs by app version shows the new version rising slowly. Crashlytics "Version" filter shows the new version.
Gotchas:
- With about 100 daily players, 20% = about 20 players a day. Crash-free and ANR percentages are noisy. Use counts (any ANR = look at it) and wait the full 24 h. Retention cannot be read at this size. (prior-levers.json)
- A new SDK release (vc41 mediation) uses 10% then 50% then 100%.
- Play needs the app's release to pass review first. The rollout fraction applies after review. Do not promise a Wednesday start; review can take longer.

---------------------------------------------------------------------

## C-16  Play custom store listing for US / UK / CA / AU
Owner: Ajay. Day 3 (Tue 24 Nov).

Steps:
1. Play Console > Block Bloom > Grow users > Store presence > Custom store listings (UI path from [S9]; older: Store presence > Custom store listings).
2. Click "Create custom store listing".
3. Name (internal only): `Tier1-EN`. Targeting: choose "Countries" and tick United States, United Kingdom, Canada, Australia. Optionally add New Zealand and Ireland, since the ads target those too (a country can be in only one custom listing). [S9]
4. Add content in English only: short description (80 characters), full description, screenshots and feature graphic, and the best-looking gameplay frames. Use the best two screenshots first. Keep the claims true.
5. Save. Click "Publish" (or "Send for review").
6. In Google Ads, ads link to your default Play page. To send ad clicks to the custom listing, use the listing's URL: in Custom store listings, copy the "URL" and use it as the link for ads, or choose "URL" targeting. App campaigns for installs link to the Play listing by app id; custom listings by country apply automatically to Play traffic from those countries. UNVERIFIED how App campaigns use it; the country-based listing works without any ad change.

Expected result: Play shows the new listing to players in those countries within about 1-7 days after approval.
Verify: Play Console > Grow users > Store presence > Custom store listings shows status "Published" and a name; open the Play page from a VPN in the US to see it (optional; skip if not available).
Gotchas:
- Limit is 50 listings. [S9]
- You need a published default listing first (already true).
- Each country can be in only one custom listing. [S9]
- Store listing experiments (C-17) can run on the custom listing; the roadmap says E3 runs on the US/UK listing.

---------------------------------------------------------------------

## C-17  Play store listing experiments E3 (icon) and E4 (screenshots)
Owner: Ajay. E3 Day 3 (Tue 24 Nov), read about Day 14. E4 start Day 14 (Sat 5 Dec), read about Day 25.

Steps (E3):
1. Play Console > Grow users > Store presence > Store listing experiments > "Create experiment". UNVERIFIED path. Source overview: https://play.google.com/console/about/customstorelistings/
2. Choose the listing: the custom listing `Tier1-EN` from C-16 (the roadmap says US/UK listing) or the main listing. Type: "Graphics" experiment (icon).
3. Name `E3 icon`. Variants: current icon (control) vs neon, crown, zen (the app repo's `store/` folder holds the three icons; Gemini gives the files at 512x512 PNG).
4. Audience share: 50% for variants (the rest sees the current icon). Metric: "First-time installers" and "Retained installers (day 1)". Start.
5. Read after 7 days or more. Play shows a confidence interval at 90%. Decide only when it says a variant is better with 90% confidence; otherwise keep the current icon.
Steps (E4): same with the first two screenshots.

Gotchas:
- Traffic is tiny. With about 20 installs a day from Tier-1, 90% confidence may never arrive in 14 days. If it does not, Ajay may stop and keep the current assets; do not wait for a result.
- Only one graphics experiment at a time per listing; do not start E4 before E3 ends. UNVERIFIED: Play limit, usually "one default-graphics experiment per app" and up to 5 localized.
- A new icon experiment hits the whole country audience, not only ad clicks.
- After a winner: "Apply" in the experiment page, then publish.

---------------------------------------------------------------------

## C-18  Play price experiment E2 for `remove_ads` in Tier-1 countries
Owner: Ajay. Start Day 3 (Tue 24 Nov); read Day 24+ (Mon 14 Dec or later).

Targets from the roadmap: US $2.99, UK £2.49, CA $3.99, AU $4.49. Control = the current price.

Steps (UNVERIFIED path; the feature was announced as "price experiments" at Google I/O 2023: https://android-developers.googleblog.com/2023/11/power-your-growth-on-google-play.html):
1. Play Console > Monetize with Play > Products > In-app products > select `remove_ads`. UNVERIFIED: or Monetize > Price experiments.
2. Create a price experiment. Select product `remove_ads`. Countries: US, GB, CA, AU. Variant = the new local price; control = current price.
3. Choose the share of users in the experiment (50%) and the goal "Revenue per user" (not number of sales).
4. Start. Do not change the product price manually during the test.
Read: Play shows revenue per user and a confidence range. Read on Day 24+ because purchases are rare (zero in November). With 25 Tier-1 daily players this may stay "no result".
Gotchas:
- `remove_ads` buyers never see interstitials. The offer will matter only after E1 turns interstitials on.
- Play shows the same price in each country; check tax-inclusive prices for the UK, CA, AU.
- If the experiment feature is missing for the product, set the plan's prices directly in the product's "Prices" tab for the 4 countries (this is a price change, not a test). Ajay decides.

---------------------------------------------------------------------

## C-19  Play promotional content (27 Nov event; Winter Bloom)
Owner: Ajay. Check 27 Nov event on Day 1 (Sun 22 Nov). Submit Winter Bloom by Day 10 (Tue 1 Dec).

Rules from Google [S10]:
- Path: Play Console > Grow users > Store presence > Promotional content > "Create event". UNVERIFIED: in the new Play Console the label is "Promotional content" under "Grow users".
- Submit at least 4 days before the start (approval can take up to 4 days; quality review is usually under 24 hours). Google also says the start must be more than 24 hours ahead.
- Earliest submission is 60 days before the event. Maximum length 4 weeks. Featuring needs 14+ days notice.
- Tagline: 80 characters maximum. A square image is required. A video is optional and must be a public YouTube video with monetisation off. Each image, tagline and description must be unique to the event.
- The event must apply to all users.

Check for the 27 Nov event (Day 1):
1. Open Promotional content > Events list. Find the event scheduled in DAILY_ACTIVITY.md on 20 Nov.
2. Check: status is "Approved" or "In review", start date = Fri 27 Nov (must match C-10 start), end date = Thu 3 Dec, title "Aurora Bloom Festival" (must match the in-app card text), and the deep link goes to the app (default).
3. If status is "Needs changes" or "Rejected": edit and resubmit the same day (the start is in 5 days, which is already the minimum). If it will not be approved in time, Ajay must say so in the notes and the festival still runs in-app.
4. If it was not created, create it now with the same rules and accept that the card may appear late.

Winter Bloom (submit by Day 10):
1. "Create event". Internal name `Winter Bloom 2026`. Type: "Major update" or "Special event" (UNVERIFIED names; pick the one that says new content or event).
2. Start Mon 14 Dec 2026, end Mon 21 Dec 2026 (Google max is 4 weeks, so fine).
3. Tagline (max 80 characters): `Winter Bloom: new snow blocks and bonus coins` (45 characters). Description: 3 short lines. Square image 1:1 (Ajay or Gemini creates; Gemini lists the pixel size shown in the form).
4. Submit by Tue 1 Dec (Day 10) so there are 13 days before the start and room for one rejection round. Do not request featuring (needs 14 days and the game is too small for it).

Expected result: event appears in the list as "Scheduled" with the right dates.
Verify: open the event after 24 hours; status "Approved". On the start day the Play listing shows the event card (Play Store > Block Bloom page).
Gotchas:
- Content that fails the rules appears only on the app's details page [S10]. Do not claim "free coins" in a misleading way.
- The in-app event (C-10/C-11) must start the same day as the card.

---------------------------------------------------------------------

## C-20  Android vitals: ANR check
Owner: Gemini reads (Play Console has no ANR API in the current scripts; Ajay or Gemini opens the console). Day 8 (Gate A), Day 18 (Gate B), and daily after each staged rollout.

Steps:
1. Play Console > Block Bloom > Quality > Android vitals > Overview (UI path: Monitor and improve > Android vitals; UNVERIFIED label).
2. Click "User-perceived ANR rate". Set the date range to 28 days. Read "overall rate" and "per phone model" values.
3. Thresholds [S11]: overall user-perceived ANR rate bad-behaviour threshold = 0.47%; per phone model = 8%; user-perceived crash rate = 1.09% overall. Gate A and B need 28-day ANR below 0.47%.
4. Filter "App version" to vc40 and vc41 to read each release alone.
5. Open "ANRs" > clusters. Look for stack traces with `AdMobAdHost`, `UMP`, `MobileAds.initialize` or `requestConsentInfoUpdate` (Incident #001 pattern). If a cluster appears, halt the rollout (C-15).
6. Write the number in DAILY_ACTIVITY.md.

Expected result: rate below 0.47%. Prior state: 0.85% on 19 Nov from 1 device in 60; the 28-day number should fall below 0.47% from about 23 Nov if there is no repeat (prior-levers.json).
Verify: the console's red banner "Bad behavior threshold exceeded" is absent.
Gotchas:
- Tiny user counts: one ANR on one device can move the rate by a lot. Use the count of affected users beside the percentage.
- Vitals data is 1-2 days late.
- Google uses the last 28 days to judge store visibility but may act sooner after a spike. [S11]
- Crashlytics (Firebase > Crashlytics) gives faster crash data for the gate; ANRs are on Play only (Crashlytics also shows ANRs on Android 11+; UNVERIFIED).

---------------------------------------------------------------------

## C-21  AdMob: blocking controls review
Owner: Ajay. Day 2 (Mon 23 Nov).

Steps:
1. AdMob (https://admob.google.com) > left menu "Blocking controls" > pick the app Block Bloom. UNVERIFIED label: in 2026 it is "Privacy & messaging"? No: "Blocking controls" has been a left menu item; check the screen.
2. Check the three tabs: "General categories", "Advertiser URLs", "Ad networks" and "Sensitive categories" (UNVERIFIED tab names).
3. Block categories that do not fit a family-friendly puzzle (for example Dating, Gambling and Casino, Alcohol, Religion, Politics, Get-rich-quick). Do not block more than 10 categories, because each block lowers fill and eCPM (the app has only about 67% match rate).
4. Check the "Ad review center" for ads flagged by players (UNVERIFIED if present).
5. Record the list of blocked categories in the notes repo.
6. Leave "Ad filtering" for bidding sources on (if you later add Meta in C-23). If you turn it off, the blocking controls are also off. Source: https://support.google.com/admob/answer/10931097 (UNVERIFIED which page text).

Expected result: category blocks listed. eCPM may fall 0-5%; watch the weekly eCPM (rewarded $26.93, banner $2.50 as the base line).
Verify: AdMob > Blocking controls shows the same list on both Android ad units (banner, interstitial, rewarded).
Gotchas:
- Do not use "Sensitive categories" to block more than needed; each block reduces competition.
- Block the same list on every ad unit of the app.
- Under age rating: Block Bloom is general audience; do not set "child-directed" settings here without Ajay's decision (it changes fill a lot).

---------------------------------------------------------------------

## C-22  app-ads.txt check
Owner: Gemini. Day 2 (Mon 23 Nov), then again after C-23.

Facts: the file lives on `ajay-waghmare.github.io` (prior-levers.json, vc40_items). The developer website URL in the Play listing must point to the domain root that serves it.

Steps:
1. Open the app's developer website field in Play Console (Grow users > Store presence > Store settings > Store listing contact details > Website) and note the domain.
2. In a browser or `curl -s https://<domain>/app-ads.txt` check that the file loads as plain text with no redirect to HTML.
3. Check that it contains the AdMob line: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` where the pub id is the AdMob publisher ID (AdMob > Settings > Account information). Do not paste the ID into any public file or chat; compare it by eye. `f08c47fec0942fa0` is Google's public certification ID.
4. In AdMob > Apps > Block Bloom > "app-ads.txt" column / tab, check that the status is "Verified" (or "Crawled and verified"). UNVERIFIED label. A "Not found" status means the website URL is wrong or the file is missing.
5. After the Meta / AppLovin adapter work in vc41, the file also needs each partner's lines (each partner's dashboard gives a list: copy and append). Gemini creates a commit on the `ajay-waghmare.github.io` repo only when Ajay asks.

Expected result: status "Verified" in AdMob; file served from the domain root.
Verify: AdMob shows the app with a green check on app-ads.txt. UNVERIFIED label.
Gotchas:
- AdMob crawls the root domain of the developer website from Play. A subpath (`/blockbloom/app-ads.txt`) is not crawled. A GitHub Pages "user site" domain root works; a "project site" does not. Check this.
- Missing partner lines cost revenue (Playwire summary in prior-benchmarks.json). Source: https://support.google.com/admob/answer/9363762 (not opened; UNVERIFIED).

---------------------------------------------------------------------

## C-23  AdMob mediation groups per format (after vc41)
Owner: Ajay (accounts, tax, payment for networks) with Gemini (ad unit IDs and test). Day 11-12 (Wed 2 - Thu 3 Dec), AFTER vc41 reaches 50% at least. Not before: the adapter must be in the app, or the group does nothing.

Why: the build today has no mediation adapter (issue I3); Meta Audience Network needs the adapter dependency in the app (prior-benchmarks.json, source https://developers.google.com/admob/android/mediation/meta).

Steps (do one format at a time: banner, then interstitial, then rewarded):
1. Ajay opens the partner account (Meta Monetization Manager, AppLovin, etc.), accepts the terms, adds payment and tax details there, and creates one placement per format. Copy the placement IDs to the repo-relative config that Gemini names (never into chat).
2. AdMob > left menu "Mediation" > "Create mediation group". [S13] (steps confirmed by the BidMachine integration guide: Mediation tab > Create Mediation Group.)
3. Pick the ad format (Banner / Interstitial / Rewarded) and platform Android. Continue.
4. Name it `BB-banner-all` (and `-interstitial-`, `-rewarded-`). Select locations: all countries (first group). Status = Enabled.
5. Add ad units: select the Block Bloom ad unit of that format.
6. Add ad sources: "Add ad source" > pick Meta Audience Network (bidding), AppLovin (bidding), AdMob Network (kept as default). Bidding sources need no price. For waterfall sources type an eCPM floor at 50-70% of the observed eCPM. UNVERIFIED which partners Ajay approves.
7. Save. Repeat for the next format.
8. Gemini tests with the Ad Inspector on a debug build: shows each network adapter status "Ready". The AdMob init log prints adapter names (AdMobAdHost.kt:132).

Expected result: 3 enabled groups. After 3-7 days the Mediation report shows each network's requests, match rate and eCPM.
Verify: AdMob > Mediation > Mediation reports: add the dimension "Ad source"; requests are above 0 for the new network. The match rate should rise above 67%.
Gotchas:
- A mediation group needs the adapter in the released app. Request logs show 0 if the app version is old; wait for adoption of vc41 (or staged rollout).
- Mediation groups do not cascade into each other; unmatched requests go to the default group. [S13]
- A group paused by accident hides revenue; check "Enabled".
- Blocking controls (C-21) may lower Meta fill. Keep Ad filtering on for bidding sources (C-21).
- Meta: add Meta to the EU / US-state ad partner list in the consent form (UMP) before enabling, or you lose revenue and risk policy issues (prior-benchmarks.json).
- Watch crash-free and ANR for 24 h: new SDKs have caused Incident #001-type ANRs.

---------------------------------------------------------------------

## C-24  AdMob payment threshold and payout timing (Indian account)
Owner: Ajay. Read on Day 2; check balance monthly.

Facts [S12] (https://support.google.com/admob/answer/2772208):
- The payment threshold is $100 for a USD account. UNVERIFIED for an Indian account: AdMob also lists thresholds by reporting currency, and I found no INR number. The Payments page shows the exact number.
- Earnings for the last month are finalised on the 3rd of the next month.
- Payment is issued around the 21st if the balance on the 20th is above the threshold and there are no holds.
- For wire transfer, Google says to allow about 10 days (support page https://support.google.com/admob/answer/2772140).
- Payment methods depend on the payment address. UNVERIFIED which methods an India address gets; a third-party guide says wire transfer in USD, converted to INR by the bank (https://www.xflowpay.com/blog/get-paid-from-adsense-in-india; this is for AdSense, not AdMob).
- Tax info: AdMob says tax information is submitted on the Payments page (Manage settings). [https://support.google.com/admob/answer/14135099] Not everyone must provide it. UNVERIFIED for an India-based publisher (PAN or W-8BEN). Play Console documents a PAN for Indian withholding tax; that page is for Play, not AdMob.

What this means: November AdMob earnings are about $5-10. At about $1/day the $100 threshold is about 3 months away (prior-benchmarks.json). No cash arrives in the plan window. The 21 Dec payout will probably be Rs0 because the balance is under $100.

Steps:
1. AdMob > Payments (left menu) > "Payment information" or "Payments info". Read: the threshold amount, "Current balance", next payment date, payment method, and payee name.
2. Click "Manage settings" > "Payment method" > check a bank account or wire details are filled. Click "Tax info" > check status "Submitted". UNVERIFIED names.
3. If the tax info is missing, fill it now. A hold can stop a payment later even above the threshold.
4. Write the threshold, balance, and next payout date in the notes repo.
5. Optional: if the screen allows "Payment threshold" choice (higher numbers like $250, $500), do NOT raise it; keep the lowest one.

Expected result: Payments page shows the threshold, balance and "tax info submitted".
Verify: after the threshold is reached, a payment row appears around the 21st, with status "Issued"; the bank credit arrives in about 10 days by wire.
Gotchas:
- Earnings can be reduced for invalid traffic after the fact. GA4 revenue is the floor; AdMob is about 1.15 x GA4 (prior-benchmarks.json).
- USD to INR is converted by the bank (Rs93.32/USD on 19 Nov); the bank may charge a fee.
- Never click your own ads. Use test device IDs.

---------------------------------------------------------------------

## UNVERIFIED list (summary)

1. Exact menu names in Google Ads (Goals > Conversions, Assets, Billing, Locations options), Firebase (A/B Testing group name, Experiments, Roll out button), Play Console (Test and release, Monetize with Play), AdMob (Blocking controls tabs, Payments).
2. Remote Config date condition: whether `>=` and `<` are accepted with `dateTime(...)`, and whether the default time zone is GMT or the device zone. I used an explicit UTC zone in every rule. Test on a debug build.
3. Remote Config "No value / Use in-app default" label for the default value of a conditional parameter.
4. Whether Google Ads still lets a campaign count `first_open` as the install event and still has a tCPI box on an existing App campaign; whether changing the goal to in-app action needs a new campaign.
5. Asset specs: video count/mix, 5 MB limit and the "no text in images" rule for install campaigns (they come from the engagement-campaign page). Text limits (30/90), image ratios and sizes, YouTube hosting and 10-60 s length are from Google pages.
6. Firebase A/B: exact metric names (ad revenue per user, retention windows), whether no activation event is allowed, and Firebase's own advice on test length. Plan duration of 14 days is the roadmap's, not Google's.
7. Play: whether Play drops the previous completed release when `play-rollout.js` sends only an `inProgress` release (test first; see C-15), whether you can lower a staged fraction (assume no), labels "Halt rollout / Resume rollout".
8. Play price experiment path and limits; store listing experiment limits (one graphics experiment at a time).
9. FCM: the console path for the composer, local-time delivery, "opted in" audience (GA4 audience on `granted`), and the analytics event for opened pushes.
10. AdMob: INR payment threshold, payment methods and tax documents for an India address; the "Verified" label for app-ads.txt; the Ad filtering page text.
11. Google Ads minimum prepay amount (the screen shows it; the only number I found is from 2009).
12. Budget rule: Google's advice is 20% every 2-3 days. The request said "+30% every 3 days". I wrote 20% as the rule and 30% as an accepted risk. Three steps in the plan ladder (Day 5, 10, 18) break it; see C-05.
