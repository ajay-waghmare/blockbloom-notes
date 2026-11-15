# Revenue plan (ads + in-app purchases)

Direction you set on 4 Oct 2026: "we have ads in app but very few, not disturbing the game",
plus `remove_ads` and payouts into your own bank account. The release that carries it is the
next one after vc21.

## It is already built — the remaining work is configuration and policy

| Surface | State in the code |
|---|---|
| Rewarded: revive at game over | `GameViewModel.reviveWithAd()`, one per run, player-initiated |
| Rewarded: unlock a skin | `Unlock.RewardedAd` in Skins.kt |
| Interstitial | every 3rd game via `maybeInterstitialThen()` (`interstitialCountdown = 3`); the only surface that interrupts |
| Banner | **Wired, not off** (found in the 10 Oct code review): `AdBanner` is mounted under the tray in GameScreen, gated on `adsActive`. It shows the moment `ADS_ENABLED` flips on; remove it or gate it before the ads release |
| Consent | UMP gathered before `initializeOnce()`, gated on `canRequestAds()` |
| Billing | `PlayBillingHost.kt` (Billing 8): restore on reinstall, acknowledge, consume-before-grant, prices come from Play |
| Catalogue | `remove_ads`; `gems_small` 50, `gems_medium` 150, `gems_large` 500 (BillingHost.kt). Galaxy skin costs 50 gems |
| Kill switches | `ADS_ENABLED`, `BILLING_ENABLED` in build.gradle.kts, both false; AdMob ids are Google test values |

Google's own runbook for the switch is `docs\GO_LIVE_REVENUE.md` (the four id paste points,
the same-commit rule, the console forms) and `docs\PLAY_CONSOLE_ADS_DECLARATIONS.md`.

## The honest numbers (you chose to proceed knowing them)

GA4 shows 15-26 daily actives since October; the 127-134 figure is devices with the app
installed. Rewarded-only ads at this scale earn roughly $3-8 a month. AdMob pays out at $100;
Play Billing pays from $1, monthly between the 15th and 21st, keeping 15% of the first $1M/year
(enroll in the 15% tier before any revenue; it needs an account group + accepting terms). The
reason to do this now is lead time: AdMob approval, merchant verification and the policy
disclosures each take weeks.

## Blockers, in order

1. **BillDesk merchant verification is stuck (your action; blocks every purchase).** Since
   1 Jan 2026 every new Indian merchant must verify with BillDesk (IndiaIdeas.com). Application
   id 2609205439. Personal Info cleared after ~10 attempts, then Bank Account Verification shows
   "We are facing connectivity issue. Please try again." Most likely the corporate network/proxy
   on the work machine blocking third-party KYC calls. Retry from the personal laptop or a phone
   hotspot, VPN off, incognito; if it still fails, open DevTools -> Network and find the failing
   POST rather than refilling the form. Escalate to onboarding@billdesk.com and Play Console ->
   Help -> Contact support quoting the application id. Check the payments-profile name
   ("DATTATRY") against your PAN; name mismatch is the usual rejection. Never pay anyone to
   "expedite" it. Do not paste PAN, DOB or bank details into a chat.
2. **The AdMob account does not exist.** apps.admob.com -> register the app -> three ad units ->
   paste the four ids into build.gradle.kts. Approval takes days; real ads serve sparsely at first.
3. **13 store listings promise no ads / no in-app purchases** (one opens with "NO ADS").
   Rewrite via `play-listings-set-multi.js`, update Data safety, privacy policy and the
   "Contains ads" declaration **before** any monetised rollout. Shipping against them is a policy
   violation, not just stale copy.
4. The `app-ads.txt` nag from AdMob needs a developer website on the listing; not a launch blocker.

## Live State (as of 15 Nov 2026)

- Production AdMob IDs (`ca-app-pub-1693732810683011`) are **LIVE in production `v1.12.3`** (`ADS_ENABLED = true`).
- Live AdMob earnings to date: **$0.98 USD** ($0.96 in past 7 days, 12 impressions across 382 requests, match rate 27.75%).
- **Smart Ad Suppression implemented:** Forced interstitials are suppressed on "Play Again" if the player watched a rewarded video (revive / coin doubling) in that game.
- **2x Daily Streak Rewarded Ad built:** Opt-in doubling of daily streak coins in `DailyRewardDialog`.
- **Firebase Remote Config Dials:**
  - `ads_banner_enabled` (default `false`)
  - `ads_interstitial_enabled` (default `false`)
  - `ads_interstitial_interval` (default `4` games buffer)

## Recommendations & Next Monetization Steps

1. **AdMob Mediation:** Set up mediation in the AdMob console to lift the 27.75% match rate towards 80%+.
2. **Turn on Interstitials in Firebase Console:** Set `ads_interstitial_enabled = true` in Remote Config to start the controlled test.
3. **BillDesk Merchant KYC:** Complete Indian merchant verification to unlock Google Play Billing (IAP gem packs).
