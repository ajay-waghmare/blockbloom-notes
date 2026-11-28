# Block Bloom — ₹10,000 a month: the step-by-step plan, with the money ladder (27 Nov 2026 → Apr 2027)

> **Written:** Fri 27 Nov 2026, ~11:00 IST, by Claude. **Ajay:** *"prepare a good plan for making 10k month revenue out of Block Bloom, step-by-step"* · *"I am ready to spend money on ads initially, but the plan has to be foolproof"* · *"add which amount of investment is required, day by day."*
> **Money:** ₹ = rupees, AdMob basis. ₹10,000 a month = **₹333 a day** (≈ $3.6/day). *(If $10,000 a month was meant: that is ~₹9.3 lakh a month, ~600× today; no honest plan reaches it in 2027.)*
> **Models (reproducible):** [`scripts/revenue-10k-model.js`](../scripts/revenue-10k-model.js) (what ₹10k takes) and [`scripts/revenue-10k-plan-sim.js`](../scripts/revenue-10k-plan-sim.js) (Dec–Apr, six cases). Every input is labelled MEASURED or ASSUMED; Gemini replaces ASSUMED inputs with measured ones at each monthly review.
> **Executes:** Gemini (step owner). **Approves:** Ajay — every rupee and every Play step, one line each. **Reviews:** Claude, on request.
> **This replaces** the December ad choice in `10-claude-30day-plan.md` §2 (B / B-lite): Ajay will fund ads, so a small capped test starts **Fri 4 Dec** as the measurement itself.

---

## 0. The answer

| | |
|---|---|
| **Today** | ₹35–51/day (AdMob 14 days: $5.06; GA4 7 days: ₹311). **68% from one US device.** Without him: ~₹10–15/day. |
| **Target** | ₹333/day sustained, not dependent on one player |
| **When (if every gate passes on time)** | run-rate **≈ end of February 2027**; first full ₹10k+ month **March** (₹15k in the BASE case) |
| **Investment** | Ad budget **₹7,800 in December** (in two capped stages; **₹9,204** wallet cash incl. **18% GST**), then **₹150–300/day** only while the numbers pay. Total Dec–Apr ≈ ₹37.3k spend (**₹44k** incl. 18% GST), mostly recycled from revenue. **Peak cash out of pocket incl. 18% GST ≈ ₹8,438 (BASE), ₹10,455 (UPSIDE).** Commit it stage by stage. |
| **Worst case if the gates are followed** | stop after the first test: **₹2,800 spent (₹3,304 incl. GST), −₹1,058 (−₹554 ex-GST) by April**; stop after the second: **₹7,800 spent (₹9,204 incl. GST), −₹3,476 (−₹2,072 ex-GST) by April** |
| **Why it can work** | A Tier-1 install is worth **₹10 today** (180 days) and costs **~₹27**. If retention reaches day-1 30% / day-7 12% and ad revenue per player reaches ₹5.5+, the same install is worth **₹37–70** → ads pay for themselves and can be scaled. |
| **What it is not** | Not a promise. The two biggest uncertainties — retention lift and revenue per player — are exactly what the first ₹2,800 measures. No further money moves until they are measured. |

---

## 1. The economics (from `scripts/revenue-10k-model.js`)

₹333/day = Tier-1 players × revenue per Tier-1 player-day + rest-of-world players × ₹0.25 + purchases.

| Retention | Revenue per Tier-1 player-day | Purchases / month | Tier-1 players / day needed | Tier-1 installs / day | Value of one install (180 d) vs ₹27 cost | If all paid: spend / month → profit |
|---|---|---|---|---|---|---|
| **today** (D1 17%, D7 4%) | ₹3.5 (today) | 0 | 94 | 33 | ₹10 ✗ | ₹27k → **−₹17k** |
| today | ₹7.8 (2 interstitials + 1 rewarded) | 15 | 32 | 11 | ₹29 ≈ | ₹9.2k → +₹0.8k |
| **target** (D1 30%, D7 12%) | ₹5.5 (interstitials on, rewarded watched) | 0 | 58 | 9 | **₹37 ✓** | ₹7.0k → **+₹3.0k** |
| target | ₹5.5 | 15 | 44 | 7 | ₹49 ✓ | ₹5.3k → +₹4.7k |
| target | ₹7.8 | 15 | 31 | 5 | ₹70 ✓ | ₹3.7k → **+₹6.3k** |

**Read it like this:** with today's retention, buying ₹10k of revenue costs ₹20–27k. With target retention, the same revenue costs ₹4–7k. **Retention first, then revenue per player, then ad money** — in that order, measured at every step.

Inputs: US banner eCPM **$3.38 MEASURED** (AdMob, 705 impressions, 14 days); US interstitial / rewarded eCPM **ASSUMED $15 / $20** (the measured $66 / $88 rest on 8 and 11 impressions); rest-of-world ₹0.25 per player-day MEASURED; ₹27 per paid install ASSUMED (plan-v2 model; the November campaign leaked to wrong countries).

---

## 2. The investment calendar — day by day (next 5 weeks), then month by month

**Rules of the calendar:** prepay only, **no automatic top-ups**; the account never holds more than the current stage's cap (or 7 days of budget from January) — when the balance runs out, ads stop by themselves. **Every top-up = Ajay's one-line go** after Gemini posts the gate result.
**GST VERIFIED (28 Nov, P12):** Google Ads India Billing Summary (`684-480-0945`) deducts **18.00% Integrated GST** directly from Prepay (`-₹563.12` GST on `₹3,128.42` Nov spend -> `₹5,000` deposited minus `₹3,691.55` net cost = `₹1,308.45` left). Multiply every ad budget figure by **`1.18`** for actual wallet cash needed (`Stage 0` `₹2,800` spend = `₹3,304` cash -> **₹2,000** top-up on Dec 3).

| Date | Stage | Ad budget that day | Top-up by Ajay (incl. 18% GST; balance ₹1,308) | Cumulative ad spend | Only if |
|---|---|---|---|---|---|
| Fri 27 Nov – Wed 2 Dec | **Pre-flight** | ₹0 | — | ₹0 | — (§3 checklist; vc44 → 100%; Google Ads verification submitted) |
| **Thu 3 Dec** | Stage 0 go / no-go | ₹0 | **₹2,000** → balance ₹3,308 (covers ₹2,800 + ₹504 GST) | ₹0 | all 12 pre-flight items green |
| Fri 4 Dec | **Stage 0 — calibration** | ₹400 | — | ₹400 | — |
| Sat 5 Dec | Stage 0 | ₹400 | — | ₹800 | no kill switch fired |
| Sun 6 Dec | Stage 0 (+ E1 decision) | ₹400 | — | ₹1,200 | " |
| Mon 7 Dec | Stage 0 | ₹400 | — | ₹1,600 | " |
| Tue 8 Dec | Stage 0 | ₹400 | — | ₹2,000 | " |
| Wed 9 Dec | Stage 0 | ₹400 | — | ₹2,400 | " |
| Thu 10 Dec | Stage 0 (last day) | ₹400 | — | **₹2,800** | " |
| **Fri 11 Dec** | **Stage 0 read** (§4) | ₹0 | **₹5,900** (₹5,000 + ₹900 GST) if Stage 0 passed | ₹2,800 | Stage 0 pass marks |
| Sat 12 – Mon 21 Dec | **Stage 1 — Winter Bloom push** (10 days) | ₹500/day | — | ₹3,300 → **₹7,800** | Stage 0 passed |
| Tue 22 – Wed 23 Dec | read day-7 | ₹0 | — | ₹7,800 | — |
| **Wed 23 Dec** | **Stage 2 decision** (§4) | ₹0 | **₹9,086** (₹7,700 + ₹1,386 GST) only if Stage 2 passes | ₹7,800 | Stage 2 pass marks **and Google Ads verification complete** (else the account pauses on 26 Dec) |
| Thu 24 Dec – Sun 3 Jan | **Stage 2 — Holiday Bloom** (UPSIDE only, 11 days) | ₹700/day | — | → ₹15,500 | Stage 2 passed |
| **Mon 4 Jan →** | **Stage 3 — always-on** | **₹150/day** (BASE) | **₹1,239 every Monday** (₹1,050 + 18% GST) | +₹4,200 in Jan | Stage-3 entry gate (§4) |
| Feb | Stage 3 | ₹250/day | ₹2,065 every Monday (incl. 18% GST) | +₹7,000 | weekly scaling rule |
| Mar – Apr | Stage 3 | ₹300/day (cap ₹10,000 / month unless Ajay raises it) | ₹2,478 every Monday (incl. 18% GST) | +₹9,000 / month | weekly scaling rule |

**Money summary (ad spend · wallet cash incl. 18% GST)**

| | Stage 0 | + Stage 1 | + Stage 2 (UPSIDE) | Jan | Feb | Mar | Apr |
|---|---|---|---|---|---|---|---|
| Ad spend committed | ₹2,800 | ₹5,000 | ₹7,700 | ₹4,200 | ₹7,000 | ₹9,300 | ₹9,000 |
| Wallet cash (1.18× GST) | ₹3,304 | ₹5,900 | ₹9,086 | ₹4,956 | ₹8,260 | ₹10,974 | ₹10,620 |
| Committed only after | pre-flight | Stage 0 pass | Stage 2 pass | Stage-3 gate | weekly rule | weekly rule | weekly rule |

---

## 3. Pre-flight checklist — all green before the first top-up (Thu 3 Dec)

| # | Item | Owner | Proof |
|---|---|---|---|
| P1 | **vc44 at 100%** in production, crash-free ≥ 99.5%, ANR < 0.47%, no new signature — paid players must land on the build we measure | G → A | `play-status.js`, Crashlytics, vitals |
| P2 | **Google Ads advertiser verification submitted** (must be *complete* before 26 Dec) | A | Google Ads screen |
| P3 | Campaign: Android app installs, **6 Tier-1 countries, "Presence" targeting** (people in the country — the "presence or interest" setting leaked spend to FR/DE in November), **English**, target cost per install **₹25**, budget ₹400/day, ad group paused until the start rule | G → A | settings screenshot in journal |
| P4 | Creatives approved: ≥ 2 videos (portrait + landscape gameplay), 5 headlines, 5 descriptions — honest (no "no ads") | G → A | asset report |
| P5 | **Attribution:** GA4 ↔ Google Ads linked; `first_open` imported as the primary conversion; GA4 shows `google / cpc` as first-user source for campaign installs | G | GA4 screenshot |
| P6 | **AdMob ↔ GA4** linked so ad revenue per user is visible per campaign cohort (needed for return on spend) | G | GA4 revenue by first-user source |
| P7 | KPI tools on `release/vc44` run clean: `growth-kpi.js`, `ga4-new-user-devices.js`; a per-campaign cohort read (installs, day-1, day-7, revenue) works — if not, add a `--source` filter first | G | output in journal |
| P8 | **Prepay only, auto top-up off**; balance = stage cap | A | billing screen |
| P9 | **Kill-switch rules set:** Google Ads automated rule "pause campaign if cost per conversion > ₹45 (3 days)" + a daily phone alarm to read the 5-minute check | G → A | rule list |
| P10 | **E1 (interstitials)** decided or explicitly kept 50/50 for the test (it changes revenue per paid player) | G → A | Remote Config read-back |
| P11 | Store listing ready for paid traffic: store video (O-3) live; icon test applied only if significant; `Tier1-EN` listing honest | G → A | Play Console |
| P12 | Spend log + GST answer written in the journal | G | journal |

---

## 4. The gates — pass marks, what happens if they fail, kill switches

**Count humans only** (`ga4-new-user-devices.js`; vc44 does not report Test Lab devices). "Paid cohort" = installs whose first-user source is the campaign. Write `n` next to every rate.

| Gate (date) | Pass — all of | If it fails |
|---|---|---|
| **Stage 0 read (Fri 11 Dec)** — on the 4–9 Dec paid cohort | cost per opened install **≤ ₹35** · paid-cohort **day-1 return ≥ 22%** (n ≥ 40) · first-clear ≥ 70% · crash-free ≥ 99.5% · ≥ 80% of campaign installs visible in GA4 | cost too high → fix creatives / targeting, **one** ₹1,500 retest in January, or stop · day-1 15–22% → **no Stage 1**; product sprint (§6), retest in January · day-1 < 15% → stop paid until a retention release · attribution broken → stop until fixed |
| **Stage 2 decision (Wed 23 Dec)** — on the 12–15 Dec cohort (complete day 7) | paid-cohort **day-7 return on spend ≥ 40%** · **day-7 retention ≥ 10%** · cost per opened install ≤ ₹30 · day-1 ≥ 28% · Google Ads verification complete | no Stage 2; go to the Stage-3 gate on 4 Jan |
| **Stage-3 entry (Sun 3 Jan)** — all paid cohorts so far | day-7 return on spend **≥ 40%** **and** day-7 retention **≥ 10%** (together they mean a 180-day value ≥ ~1.2× the cost) | **no always-on spend** — the "NO RULES" case in §5 shows what keeping on costs (−₹7k by April). Product sprint, then a fresh ₹2,800 test |
| **Weekly scaling rule (every Monday, from 4 Jan)** — last full week's cohorts | day-7 return ≥ 40% → **+20%** budget next week (cap ₹10k/month) · 25–40% → hold · < 25% → **−30%** · < 15% two weeks running → **stop** | — |

**Kill switches — pause the same day, any stage:** crash-free < 99% · a new ANR cluster · any AdMob invalid-traffic or policy notice · Google Ads policy disapproval · cost per opened install > ₹45 (3-day average) · campaign installs missing from GA4 for 2 days · revenue per player falling while spend rises for 3 days.

**Gemini's 5-minute daily check (log one line in the journal):** yesterday's spend · installs · cost per opened install · day-1 return of the day-before cohort (n) · crash-free · balance left · any kill switch.

---

## 5. What can happen — every case, with the gates followed (from `scripts/revenue-10k-plan-sim.js`)

The whale (~₹30/day) is **excluded** everywhere — the plan must work without him; his revenue is extra.

| Case | Ad spend Dec–Apr (wallet cash incl. 18% GST) | Peak cash needed (incl. GST) | Profit by Apr ex-GST (after 18% GST) | ₹/day at end of Feb |
|---|---|---|---|---|
| **WORST** — Stage 0 fails, ads stop, product stalls | ₹2,800 (₹3,304) | ₹1,911 (**₹2,415**) | −₹554 (**−₹1,058**) | ₹11 |
| **STOP AFTER STAGE 1** — Stage 1 day-7 fails, ads stop | ₹7,800 (₹9,204) | ₹5,206 (**₹6,610**) | −₹2,072 (**−₹3,476**) | ₹25 |
| **SLOW WITH RULES** — retention only reaches "mid", no always-on spend | ₹7,800 (₹9,204) | ₹4,973 (**₹6,377**) | +₹1,456 (**+₹52**) | ₹54 |
| **BASE** — gates pass on time | ₹37,300 (₹44,014) | ₹5,784 (**₹8,438**) | +₹9,055 (**+₹2,341**, turns +ve Apr) | **₹325** ≈ ₹10k/month |
| **UPSIDE** — faster retention, Stage 2 runs | ₹56,700 (₹66,906) | ₹8,043 (**₹10,455**) | +₹25,122 (**+₹14,916**, turns +ve Mar) | ₹660 |
| *NO RULES — keep spending ₹150–200/day although retention only reaches "mid"* | *₹28,400 (₹33,512)* | *₹7,122 (**₹12,135**)* | ***−₹7,023 (−₹12,135)*** | *₹148* |

**BASE month by month (after 18% GST)**

| Month | Ad spend | Cash (1.18× GST) | Revenue | Profit (after GST) | Cumulative (after GST) | Tier-1 players / day (month end) | ₹ / day (month end) |
|---|---|---|---|---|---|---|---|
| Dec | ₹7,800 | ₹9,204 | ₹2,827 | −₹6,377 | −₹6,377 | 7 | 38 |
| Jan | ₹4,200 | ₹4,956 | ₹3,389 | −₹1,567 | −₹7,944 | 21 | 132 |
| Feb | ₹7,000 | ₹8,260 | ₹7,766 | −₹494 | −₹8,438 | 46 | **325** |
| Mar | ₹9,300 | ₹10,974 | ₹15,083 | +₹4,109 | −₹4,329 | 66 | 538 |
| Apr | ₹9,000 | ₹10,620 | ₹17,289 | +₹6,669 | **+₹2,341** | 76 | 608 |

**BASE assumes** (each one is checked by a gate before money depends on it): retention reaches D1 24% in January and D1 30% / D7 12% in February · revenue per Tier-1 player-day ₹5 from 7 Dec (interstitials on), ₹6 in Feb, ₹7 from March · purchases 4 / 8 / 12 a month in Jan / Feb / Mar+ · free Tier-1 installs 1–3 a day (Winter Bloom week 1.5) · cost per paid install ₹27 (+15% before Christmas, −20% after).

---

## 6. Product steps that make BASE true (Gemini builds; one-line go per Play step)

| When | Build / change | Moves | Pass mark (humans) |
|---|---|---|---|
| **Now → 3 Dec** | **vc44 → 100%** (hook fix, robots off, purchase telemetry, all strings translated) | measurement + day-1 | first-session card shown on ≥ 80% of first game overs; no Test Lab rows on 1.19.0 |
| **Sun 6 Dec** (Remote Config, no release) | **E1 decision**: interstitials for everyone only if revenue per user is up **and** day-1 is not down. Pacing: never before the first game over, every 3–4 games, ≥ 120 s apart | revenue per player | revenue per Tier-1 player-day ≥ ₹5 within 7 days |
| **vc45 — Fri 18 Dec slot** (small, only if Stage 0 shows the gap) | **Rewarded ads that players choose:** the US show rate of loaded rewarded ads is **11%** — make "double coins", "continue" and the Lucky Chest offers visible at the right moment (opt-in only, Law 5); log offer → watched per placement | revenue per player | rewarded shown / loaded ≥ 25% |
| Sat 19 Dec – Sun 3 Jan | **code freeze** | — | — |
| **vc46 — 5–16 Jan** | **Retention sprint:** reminder opt-in after the first game over, daily-challenge visibility, streak rewards, Adventure levels 1–10 pacing, a weekly mini-event | retention | D1 ≥ 28%, D7 ≥ 10% (n ≥ 100) |
| **vc47 — 19–30 Jan** | **16 KB migration** (AGP 9 + Kotlin 2 + GMA 24 + Billing 8; Play deadline 1 Feb) + mediation bidders (Mintegral, then Liftoff / Meta) | eCPM + compliance | `check-16kb` all aligned; match rate ≥ 75% |
| **vc48 — February** | **Purchases:** Remove Ads price test ($1.99 vs $2.99), starter pack (only if ≥ 5 human offer taps), gem-pack placement in the moments players run out | purchases | 8+ purchases / month |
| **March – April** | events every 2 weeks; Arrow Bloom cross-promotion | retention + installs | D7 ≥ 12% |

## 7. Free growth that runs alongside (Gemini prepares; Ajay posts / approves)
- **Ratings: 11 → 100 by February** — the in-app review prompt only at happy moments (new best, level win, day-7 streak).
- **Store:** store video (O-3), icon test winner when significant (+26% so far, not yet significant), screenshots refresh, honest `Tier1-EN` listing.
- **Play events every month** (Winter Bloom 14–21 Dec, Holiday Bloom 24 Dec – 3 Jan, January / February events) — submit cards 2 weeks ahead.
- **Creators / Reddit / Shorts** on the existing schedule (`content/`); one post per channel per rule window.

## 8. Who does what
- **Gemini:** runs every step above, the 5-minute daily check, the gate reports (with `n`), the builds and releases, the weekly model refresh (`revenue-10k-plan-sim.js` with measured inputs) — see `gemini-skills/06-work-like-claude.md` and the `/bb-*` commands.
- **Ajay:** every top-up, every Play step, every price; Google Ads verification; store video; posting.
- **Claude:** reviews on request.

## 9. Decisions for Ajay (one line each)
1. **Approve the money ladder** (Stage 0 ₹2,800 from 4 Dec; Stage 1 ₹5,000 only on the 11 Dec pass; Stage 2 and Stage 3 only on their gates; cap ₹10k/month).
2. **Publish vc44** (Managed Publishing) and give the 100% go when clean — Stage 0 cannot start before it.
3. **Start Google Ads advertiser verification today** (not started; deadline 26 Dec).
4. **Check one invoice for GST** (cash × 1.18 if it applies).
5. **E1 on 6 Dec** — interstitials for everyone if the rule in §6 holds.
