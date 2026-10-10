# Open items (10 Oct 2026)

Owner: **A** = Ajay (console/account/business), **C** = Claude once asked.

## Process and repo

- [ ] **A** Decide: merge `release/vc19` and `release/2026-10-09` into `main` (the documented
      flow) or keep `main` frozen (the never-merge-master rule). `main` does not match production.
- [ ] **A/C** Reconcile the two `play-rollout.js` designs when merging (auto-path by versionCode,
      no silent fallback).
- [ ] **A/C** Commit or drop `tools/release-notes/vc20.json` and `tools/play-reviews.js`
      (copies in `scripts\`).
- [ ] **A** Widen vc21 from 20% once Crashlytics is quiet (first `app_exception` seen 9 Oct).
- [ ] **C** Move the scratchpad scripts into a permanent folder in the repo or `D:\DevTools\play-tools`.

## Revenue (next release)

- [ ] **A** BillDesk bank-account verification (application 2609205439); retry off the corporate
      network; escalate with the id.
- [ ] **A** Enroll in Play's 15% service-fee tier.
- [ ] **A** Create the AdMob account + three ad units.
- [ ] **A** Choose gems-first or remove_ads-first.
- [ ] **C** Interstitial behind Remote Config; rewarded-only default; per-country prices.
- [ ] **C** Rewrite the 13 listings that promise no ads / no IAP; Data safety, privacy policy,
      "Contains ads" in the same release.
- [ ] **A** Create the Play Console products with the exact ids from `BillingHost.kt`.

## Product and quality

- [ ] **A** Exclude internal/emulator traffic in GA4 (Firebase console).
- [ ] **C** Recapture the weak `02-playing` store screenshot (only two blocks on the board) in all
      five localised sets.
- [ ] **A** Native-speaker review of pt-BR and tr-TR (about $20 on Fiverr).
- [ ] **C** `<plurals>` for count strings + a floor-guard unit test (tech debt, currently unreachable).
- [ ] **C** Accessibility: a few wide-but-short rows under 48 dp.
- [ ] **A?** Firebase In-App Messaging (about 30 minutes, one dependency, zero code): offered, never approved.
- [ ] **A** February 2027: the annual target-API bump is also the AGP 9 + Kotlin 2.x migration
      (unblocks ads 24+, Firebase BoM 34+, billing-ktx). Never wait for the Play warning email.

## Growth ideas on record, unbuilt (from the ranked plan of 13 Sep)

- Solvability-guaranteed generator with rescue-hand bias at high fill (partly done: traySolvable).
- Streak freeze token for 7+ day streaks (Duolingo evidence).
- Near-miss framing on game over; squash/stretch on placement.
- Do NOT build: leaderboards/tournaments, live-ops calendar, player-history difficulty adjustment,
  timed mode (all scale-gated or the "rigged" complaint).
