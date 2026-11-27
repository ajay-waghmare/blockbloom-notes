# Block Bloom — `Gemini Task` (handoff from Claude, Fri 27 Nov 2026, 09:25 IST)

> **Gemini: start here.** Then read [`memory/MEMORY.md`](../../memory/MEMORY.md) → [`memory/topic_block_bloom.md`](../../memory/topic_block_bloom.md) → [`journal/2026-11-27.md`](../../journal/2026-11-27.md) → the plan [`10-claude-30day-plan.md`](10-claude-30day-plan.md).
> **Ajay asked (27 Nov):** "Gemini should get this done ASAP" — everything next and pending is below, in order.
> **Rules:** `GEMINI.md` Laws 1–6. **Every Play step and all money only on Ajay's one-line go.** **Count humans only** (§5). After every step: journal + `memory/topic_block_bloom.md` + `BlockBloom/DAILY_ACTIVITY.md` (on the release branch) + push, `git status` clean.

---

## 0. Where things are (verified 27 Nov, 09:20 IST)

| Item | State |
|---|---|
| **Production** | `vc41` (1.17.0) `completed`, serving 100% · `vc42` (1.18.0) staged 20% `inProgress`, **held in Managed Publishing — do not publish it** |
| **Internal** | `vc42` (1.18.0) `completed` 100% |
| **`release/vc43`** | `78a4d11` — Home UI fix (CONTI… / DAILY CHAL… / squashed pip / card heights) + Home translations + 33 tests. Gate green. **Not uploaded.** Fallback only. |
| **`release/vc44`** | **`e7fdb82`** — everything in vc43 **plus**: the first-session-hook fix, Test Lab robots switched off (analytics + real ads), purchase telemetry, the last 41 English-only strings × 6 languages, Home fits on 16:9 phones, KPI emulator filter, `tools/ga4-new-user-devices.js`. **238/238 tests**, signed R8 bundle OK, lintVital 0, 16 KB unchanged, R8 keeps the 5 mediation adapters + `WinBackReceiver`. **Not uploaded.** |
| **Plan** | [`10-claude-30day-plan.md`](10-claude-30day-plan.md) — profit by date, options, calendar, gates, §1b robots correction |
| **Robots** | GA4 23–27 Nov: **37 first_open = 17 humans + 20 robots / no-country**; **1 Tier-1 human** (US). All 3 `purchase_result` events and 3 of 5 offer taps in 20–27 Nov were the `Pixel 6` lab robot. |
| **Bug found** | The V40-2 first-session hook (card after the first game over) **never showed to any new player since vc40** — fixed in vc44 |

---

## 1. TODAY — Fri 27 Nov (ASAP)

### G-1 · Pull the browser-only data and push it to `journal/2026-11-27.md` (section "Gemini data pulls")
1. **AdMob, last 14 days:** impressions, eCPM, match rate by **format** (banner / interstitial / rewarded) × **country** (US, GB, CA, AU, BR, IN, TR, rest).
2. **Firebase A/B `BlockBloom Android E1`:** interim revenue per user and day-1 return per variant, with sample sizes.
3. **Play Console, last 28 days:** store-listing visitors → installers for the default en-US listing and the `Tier1-EN` custom listing; ratings count + average; the icon test interim.
4. **Play pre-launch report:** the device models it used (to confirm the robot list in §5).
5. **Google Ads:** advertiser-verification status and the account balance.
- **Done when:** the numbers (with dates and sample sizes) are in the journal and pushed.

### G-2 · Ship **vc44** (recommended) — each numbered step on Ajay's one-line go
**Why vc44, not vc43:** vc44 contains all of vc43 and also (a) restores the first-session hook, a direct day-1 lever, and (b) stops Test Lab robots from reporting — without it, every number at the 10 Dec gate is polluted. Shipping vc43 first costs a whole release cycle (3–4 days) and keeps the robots in the data. vc43 stays as the fallback branch. **Ajay decides (§4 #1).**

| # | Step | Command / action | Done when |
|---|---|---|---|
| 1 | Build + gate on your laptop | `git fetch && git checkout release/vc44` (`e7fdb82`); `gradlew :app:testReleaseUnitTest :app:bundleRelease :app:lintVitalRelease` | 238/238 tests, lintVital 0, signed AAB `versionCode 44` / `1.19.0` |
| 2 | Size + R8 checks | `node tools/check-16kb.js` (point it at the vc44 AAB); mapping keeps the 5 adapters + `WinBackReceiver` | 5 OK / 26 third-party 4 KB (unchanged) |
| 3 | **[go]** Internal | `node tools/play-upload.js <vc44.aab> com.aweagle.blockbloom internal "1.19.0 (44)"` | internal shows vc44 |
| 4 | **Ajay phone test** (checklist G-2a) | install from the internal track | Ajay says OK |
| 5 | **[go]** Production 20% | `node tools/play-rollout.js 44 --track=production --name="1.19.0 (44)" --fraction=0.2 --dry-run`, then the same without `--dry-run` (notes from `tools/release-notes/vc44.json`) | dry-run clean |
| 6 | Read-back | `node tools/play-status.js` | **production = vc41 `completed` + vc44 `inProgress` 20%** (vc42 replaced) |
| 7 | **Ajay publishes** | Play Console → Managed Publishing → Publish changes | live at 20% |
| 8 | Watch 24–48 h (Law 4 Gate 4) | Crashlytics + Play vitals for 1.19.0; GA4 | crash-free ≥ 99.5%, ANR < 0.47%, no new signature; **`first_session_hook` > 0** for new humans; no `sdk_gphone*` rows on 1.19.0 |
| 9 | **[go]** 100% | `node tools/play-rollout.js 44 --track=production --name="1.19.0 (44)" --complete` | target **Tue 1 – Thu 3 Dec** |
| 10 | **Ajay merges** | `release/vc44` → `main` (brings vc42 + vc43 + vc44) | main = production |

**Rollback:** a new crash/ANR signature or a policy notice → `node tools/play-rollout.js 44 --track=production --halt` the same day; vc41 keeps serving. Fix forward on `release/vc45`.

**G-2a · Phone checklist for Ajay (≈ 10 min, on the internal build):**
1. Home: the full-width **CONTINUE / PLAY** bar; restart → "Start a new game?" → Keep playing keeps the run.
2. The **Adventure** strip opens Level N; the **Daily** card starts the challenge; both cards are the same height.
3. **Lucky Chest** card opens its dialog; the countdown reads in your language.
4. **Settings → Language → Deutsch / 日本語**: Home, the pause menu and the game-over screens are translated (no English left).
5. **Fresh install** (or clear app data), play one game to game over → **the first-session card appears** (it never did on vc40–vc43).
6. Bottom nav: all four tabs.

### G-3 · Console + store actions (Ajay acts; Gemini prepares and checks)
- **Google Ads advertiser verification — start today.** Hard deadline **26 Dec**; up to 7 business days; no Burst 1 money before it is complete.
- **O-3 store video (15–30 s, landscape):** Ajay records; Gemini attaches it to the en-US listing via the API.
- **Winter Bloom Play card — submit by Sat 28 Nov** (`content/winter-bloom-play-card.md`).
- **Mintegral:** on the approval email, add Mintegral bidding to the 3 mediation groups (C-23).
- **Tax:** India tax in Google Ads; AdMob India / W-8BEN.

---

## 2. Next two weeks — calendar (plan §4, with today's changes)

| Date | Owner | Task | Done when |
|---|---|---|---|
| Sat 28 Nov | A + G | Winter Bloom card submitted; vc44 watch (G-2 #8) | submitted; vitals clean |
| Sun 29 Nov | A | Creator outreach batch 1 (O-9) | sent |
| **Mon 30 Nov** | G | **Check A, humans only:** `node tools/growth-kpi.js` **from `release/vc44`** (emulator filter) + `node tools/ga4-new-user-devices.js --start <7 days ago>` → human first-clear %, human day-1 return per cohort **with n**, Tier-1 humans | numbers in the journal |
| Tue 1 – Thu 3 Dec | A + G | vc44 → 100% (G-2 #9); Ajay merges to main | production 100% |
| Wed 2 Dec | G | E1 interim + Mintegral status | in journal |
| Thu 3 Dec | A + G | Reddit #2 (`r/IndieGaming`); **weekly review**: revenue/day, whale share, human D1, human first clear | review pushed |
| **Sun 6 Dec** | G → A | **E1 decision:** interstitials to 100% only if revenue per user is up **and** day-1 return is not down | RC changed or not |
| **Mon 7 Dec** | G → A | **Starter-pack gate, humans only:** ≥ 5 unique human offer taps (today: 0 new humans, 1 returning human). Likely "not yet" → no SKU | decided on human data |
| Tue 8 Dec | G → A | Burst assets (2 portrait + 1 landscape Winter Bloom videos, 5 headlines) | approved |
| Wed 9 Dec | A | Holiday Bloom Play card; Google Ads settings (paused); money only after verification + go | done |
| **Thu 10 Dec** | G → A | **Burst-ready gate (plan §3):** vc44 at 100%, crash-free ≥ 99.5%, ANR < 0.47%; **≥ 40 real new users on vc44**: tutorial ≥ 80%, day-1 ≥ 22%; ads load ≥ 60%; E1 applied; verification complete | B / B-lite / move to 25 Dec |
| Fri 11 – Fri 18 Dec | A + G | Burst 1 (or B-lite) with daily 5-min checks and the kill switch (plan §4) | logged daily |
| Fri 18 Dec | G | vc45 hotfix slot only; **code freeze Sat 19 Dec – Sun 3 Jan** | frozen |
| Wed 23 Dec | G → A | Burst 2 decision (≥ 40% day-7 return **and** ≤ ₹30 per opened install **and** day-1 ≥ 28%) | decided |
| **Sun 27 Dec** | G + C → A | 30-day review vs plan §2 and §6 | review pushed |

---

## 3. Engineering backlog for Gemini (after vc44 is at 100%)

| ID | Task | Rule |
|---|---|---|
| **E-1** | **Interstitial pacing audit** — `GameViewModel` interstitial path (`rewardedWatchedInRun` vs `rewardedWatchedThisRun`, Adventure level transitions, `ads_interstitial_interval` / `min_gap_s` responsiveness). Report first (code lines + GA4: loaded vs shown per user, humans only). | No behaviour change without evidence; RC dials stay fail-closed; a fix goes into vc45 (18 Dec slot) or January |
| **E-2** | **Starter pack (V42-03)** — only if the 7 Dec human-only gate passes: SKU code behind an RC flag, Play product via `play-create-product.js` after Ajay approves the price, unit tests (offer eligibility, purchase restore) | Humans only; Ajay decides money |
| **E-3** | **16 KB migration** — AGP 9 + Kotlin 2.x + GMA 24+ + Billing 8+: branch Mon 4 Jan → internal 15 Jan → production by 25 Jan; `check-16kb` must show every `.so` aligned | Play deadline **1 Feb 2027** |
| **E-4** | **Merge hygiene** — release branches merge to `main` only at 100% (Ajay). While vc44 is staged, keep `DAILY_ACTIVITY.md` edits on `release/vc44` (or merge main into it) so the final merge has no conflicts | — |
| **E-5** | **KPI tools** — until vc44 is merged, run `growth-kpi.js` and `ga4-new-user-devices.js` from `release/vc44` (main does not have the emulator filter yet) | — |

**Every release** (Law 4): `:app:testReleaseUnitTest`, `:app:bundleRelease` (R8), `:app:lintVitalRelease`, `check-16kb`, R8 keep check; `AllStringsTranslatedTest` now fails on any new English-only string — add the 6 translations with the string.

---

## 4. Decisions Ajay owes (one line each)
1. **Ship vc44 directly** (recommended) — or vc43 first.
2. **Start Google Ads advertiser verification today.**
3. **10 Dec day-1 pass mark:** ≥ 22% on ≥ 40 real new users (recommended) — or 25% on ≥ 60 (unlikely to be reachable by 10 Dec).
4. **Burst size at the gate:** B (₹3,500) or B-lite (₹1,500).
5. **Starter pack:** only on ≥ 5 human taps (7 Dec).
6. **E1:** end early or wait for 6 Dec.

---

## 5. Counting humans (Law 1) — read before any number
- **Robots:** Google Play pre-launch / Firebase Test Lab devices: `sdk_gphone*` emulators (any country), and US lab phones (`Pixel 6`, `OnePlus8Pro`, `IN2025`) that open the app and never clear a line; rows without a country.
- **Tools:** `growth-kpi.js` (on `release/vc44`) drops the emulators; `ga4-new-user-devices.js` labels every new device `human` / `EMULATOR` / `LAB?` / `NO-GEO`. Gates use the `human` rows.
- **From vc44 on**, the app itself sends no analytics and requests no real ads on Test Lab devices (`TestLab.kt`), so 1.19.0+ numbers are human by construction; older versions in the same window still contain robots.
- **Never** quote a first-session %, a Tier-1 day-1 %, an offer or a purchase number from 20–27 Nov without saying "robots included".

---

## 6. What Claude did on 27 Nov (for context)
- `release/vc43` `78a4d11`: Home UI fix + 33 JUnit tests (216 green).
- [`10-claude-30day-plan.md`](10-claude-30day-plan.md): honest 30-day plan (Track A) + §1b correction.
- Law-1 audit (GA4 by device): robots in the numbers; the first-session hook never fired since vc40.
- `release/vc44` `34fee0d` + `e7fdb82`: the fixes in §0 (238 green) + the device-audit tool.
- Journal: [`journal/2026-11-27.md`](../../journal/2026-11-27.md) (sections "Claude Task, Track A" and "Track B").
