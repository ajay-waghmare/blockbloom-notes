# Current state (10 Oct 2026) and history

## Live on Google Play — verified by reading the tracks today

| Track | Release | Status |
|---|---|---|
| production | **1.11.0 (21) - 3D Visual Polish** | `inProgress`, **userFraction 0.2**, notes in 8 locales |
| production | 1.10.0 (20) - Six languages + share | `completed` (serves the other 80%) |
| alpha | 1.10.0 (19) - First-run rebuild | completed |
| internal | 1.11.0 (21) | draft; 1.10.0 (20) completed |
| beta | — | empty |

vc21 went to production at 20% on 10 Oct. Widening it is a console or `play-rollout.js` action,
your call, once Crashlytics stays quiet.

## Git state (all branches are on GitHub)

| Branch | Commit | What |
|---|---|---|
| `main` | `ee83031` | vc18 + staged-rollout support in play-rollout.js. **Behind the release branches.** |
| `release/vc19` | `8c639e9` | vc20 as shipped (vc19 + localisation + share + RC hourly). 21 commits ahead of main |
| `release/2026-10-09` | `76d2e75` | **vc21 as shipped**: cut from `release/vc19` (deliberate deviation), + 3D UI polish (7 Oct) + `pull-metrics.js` and auto-path release notes (10 Oct) |
| 18 `feature/*` + `chore/store-screenshots` | — | all merged into a release branch; worktrees `D:\DevTools\BlockBloom-*` (21 of them) can be recreated with `git worktree add` on demand |

### Uncommitted work on this laptop (copies saved in `scripts\`)

- `D:\DevTools\BlockBloom` (main): `tools/play-rollout.js` modified (env-var release notes,
  no default) and `tools/release-notes/vc20.json` + `vc21.json` untracked.
  `vc21.json` is also committed on the release branch; **`vc20.json` is nowhere else**.
- `D:\DevTools\BlockBloom-oct9` (release/2026-10-09): `tools/play-reviews.js` untracked.

Everything else: 21 worktrees checked on 10 Oct, all clean, nothing ahead of origin.

### The process debt

The release flow says: merge `release/vcNN` into `main` once it is in production. That has not
been done for vc20 or vc21, so `main` no longer equals what is on phones. This is the exact
failure the rule was written to prevent (vc15 was built from a feature branch and `main` was
never updated). It is blocked only on your decision about the "never merge into master" rule.

## Timeline

| Date | Build | What it was |
|---|---|---|
| 31 May 2026 | — | Game written (Compose, pure-Kotlin engine, fake ad/billing hosts) |
| 3 Jun | vc1 | Package renamed to `com.aweagle.blockbloom`, listing pushed via API, internal draft |
| 5 Jun | vc5 | Sound, generative music, resume-in-progress, juice. Closed test (alpha) |
| 6-7 Jun | vc6-9 | Achievements, lifelines + ledger/wallet, daily challenge, onboarding, settings, accessibility skin, 24 Adventure levels, local events. Built, never uploaded |
| 13 Jun | vc10 | Three review-found bugs fixed (level-detour save corruption etc.) |
| 21 Jun | — | **Production access granted** (12 testers / 14 days). vc5 then vc10 to production |
| 13 Jul | — | ASO listing rewrite: "No ads, no wifi, under 1 MB" |
| 13-20 Jul | vc11-13 | AdMob stack + UMP consent + billing seam (vc11 internal, test ids); vc12 growth build (in-app review, dev page link, `ADS_ENABLED` kill switch); vc13 = growth with ads OFF, to production |
| 26 Jul | vc14 | targetSdk 36 (AGP 8.13 / Gradle 8.13) — the annual gate, done 36 days before the deadline |
| 13-20 Sep | — | First real numbers (stats bucket): organic, global, 18 countries; **~68-75% uninstall rate** is the ceiling. ja-JP listing + captioned screenshots, then 10 more locales |
| 20 Sep | vc15 | Retention: streak shield, daily reminders, fair Shuffle. Production. **No analytics yet** |
| 24 Sep | vc16 | Firebase wired, analytics ON, ads+billing merged dark. **Burnt**: Play rejected billing 7.x at commit |
| 24 Sep | vc17 | Same with Play Billing 8 (plain artifact). Internal, then production |
| 25 Sep | vc18 | Force-update gate (dormant), scroll fixes, press feedback. Production 20% |
| 2 Oct | vc19 | First-run rebuild: land on a live board, coach marks, rating/share loops moved to reachable moments. Alpha only |
| 2-7 Oct | vc20 | vc19 + six languages + Language setting + share at game over + REMINDER_OPENED + RC hourly fetch. Production 20% on 4 Oct, 100% by 7 Oct |
| 7-10 Oct | vc21 | 3D candy blocks, recessed board, combo auras, arcade Play button, jewel tiles, complete in-app translations. **Production 20% on 10 Oct** |

## The three insights that shaped the last month

1. **Churn, not discovery, is the ceiling.** Store conversion has been a flat ~28% for four
   months; two thirds of installs uninstall. Every listing rewrite after July was wasted effort
   on the wrong lever.
2. **The growth loops were built but unreachable.** Rating prompt and share were gated behind
   milestones almost nobody hit (`level_complete` 0 users, `daily_challenge_done` 2). vc19/vc20
   attached them to early moments instead of building more. By 9 Oct `review_prompt` had reached
   25 users (from 0 in the app's whole life) and `share_result` had fired for the first time.
3. **Analytics must be verified on a device, not by reading the diff.** Two seams shipped as dead
   code until the built app was tested; `tutorial_complete` fired on Skip for months;
   `tutorial_begin` was a dead constant. `AnalyticsTest` now fails the build on unwired events.

## Decisions on record (do not re-litigate without a reason)

- **Ship the proven build, not the latest** (21 Jun): vc5 went to production over the newer vc10.
- **Never fake the 12 testers** (Jun): policy violation, detectable, account-ending.
- **Submit ad-free first, add ads as a later update** (20 Jun): no binary-vs-declaration mismatch
  during the one-time production gate.
- **Rename shelved** (13 Sep): the app had just started ranking for its own name.
- **Listing effort stopped** (20 Sep): conversion is normal; the problem is retention.
- **Local-only events, no backend** (Jun) → Firebase Remote Config added in vc16 as the seam.
- **Leaderboards skipped** (Jun): would add Play Games sign-in and a Data Safety entry.
- **Release branch flow** (2 Oct): `release/vcNN` cut from main, features merged into it, main
  merged at the end. vc21 was cut from `release/vc19` on your instruction, not from main.
- **Revenue direction** (4 Oct): few, non-intrusive ads; remove_ads + payouts to your own account.
  Proceeded knowing rewarded-only at this scale is $3-8/month; the point is lead time.
