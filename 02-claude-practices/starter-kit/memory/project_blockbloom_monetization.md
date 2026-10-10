---
name: project-blockbloom-monetization
description: "Block Bloom vc21 revenue work — ads and IAP are already coded; the blockers are the AdMob account, a stuck BillDesk payments profile, and 13 store listings that promise no ads"
metadata:
  node_type: memory
  type: project
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-07T13:23:08.620Z
---

vc21 (`release/2026-10-09`, versionCode 21 / 1.11.0) is the **revenue release**. Ajay's direction,
stated 4 Oct 2026: *"we have to add ads … but that too very few … like it [shouldn't be] disturbing
the game"*, plus `remove_ads` and getting payouts into his own bank account.

## It is already built — this is config and policy work, not coding

Verified by reading the oct9 worktree on 4 Oct 2026:

| Surface | State |
|---|---|
| Rewarded — revive at game over | `reviveWithAd()` GameViewModel.kt:967, one per run, player-initiated |
| Rewarded — unlock a skin | `Unlock.RewardedAd` Skins.kt:111 |
| Interstitial | fires **every 3rd game** (`interstitialCountdown = 3`) — the ONLY surface that interrupts |
| Banner | **WIRED** (corrected by the 10 Oct 2026 code review): `AdBanner(...)` is mounted under the tray in GameScreen.kt, gated on `adsActive`. It shows the moment `ADS_ENABLED` flips on. For "few, non-intrusive" ads it must be removed or put behind a Remote Config key first |
| UMP / GDPR consent | wired, AdMobAdHost.kt:59-66; gates `initializeOnce()` on `canRequestAds()` |
| Play Billing | `PlayBillingHost.kt`, 240 lines — restore-on-reinstall, acknowledge, and consume-before-grant are all correct |

Catalogue already defined in BillingHost.kt:10-18 — `remove_ads`, `gems_small` 50/$0.99,
`gems_medium` 150/$2.49, `gems_large` 500/$6.99. The **Galaxy (Premium)** skin is `Unlock.Gems(50)`
(Skins.kt:123), so the $0.99 pack already has somewhere to go.

Master flags in app/build.gradle.kts: `ADS_ENABLED=false`, `BILLING_ENABLED=false`,
`ANALYTICS_ENABLED=true`. AdMob IDs are still Google's **official TEST values**.

## The honest numbers (given to Ajay 4 Oct; he chose to proceed)

GA4 shows **5–7 daily active users** — the 109 figure is devices with the app still installed, not
DAU. Rewarded-only ads at that scale earn roughly **$3–8 a month**. AdMob does not pay out until
**$100**; Play Billing pays from **$1**, monthly between the 15th and 21st, keeping **15%** of the
first $1M/year. The reason to do this now is **lead time** — AdMob approval, merchant verification
and the policy disclosures all take weeks — not the revenue.

## Blockers, in order

1. **🔴 BillDesk merchant verification is STUCK — Ajay's action, blocks everything.** Since
   1 Jan 2026 every new Indian merchant account must verify with BillDesk (IndiaIdeas.com Ltd).
   Application ID **2609205439**. He cleared Personal Info after ~10 attempts, then stuck on
   **Bank Account Verification** with *"We are facing connectivity issue. Please try again."*
   Advice given: retry on a **phone hotspot** (he is on the QiSpine work machine and corporate
   proxies routinely break third-party KYC/banking XHRs), VPN off, incognito; find the real failing
   POST in DevTools → Network rather than refilling the form. Escalation is
   onboarding@billdesk.com plus Play Console → Help → Contact support, quoting the Application ID.
   Broken BillDesk onboarding is widely reported and is not specific to his account. **No product
   can be created or sold until this clears.** Never pay anyone to "expedite" it.
2. **The AdMob account does not exist.** The build still carries test IDs. Approval takes days.
3. **13 store listings promise no ads and no in-app purchases** — one listing's first words are
   "NO ADS". They must be rewritten via the API, and the Data Safety form, privacy policy and
   "Contains ads" declaration updated, **before** any monetised rollout. Shipping against them is a
   policy violation, not just bad copy.

## Recommendation given, not yet acted on

- **Rewarded only. Interstitial OFF but behind Remote Config, not deleted.** Remote Config is
  fetched hourly from `BlockBloomApp` and the update gate already reads it, so a new key is cheap.
  Correction (10 Oct 2026 review): the LiveOps reader `FirebaseEventConfig` is **never instantiated** —
  the game runs the calendar-driven `LocalEventConfig`, so `live_events` is fetched and ignored.
  A dial turns a one-way product decision into something measurable against the 63% churn.
- **Lead with gems / the Galaxy skin, not `remove_ads`.** Remove Ads is unsellable when the only
  ads are opt-in rewarded — nobody pays to remove ads they chose to watch. Gems need no ads to
  exist, so they are decoupled from AdMob's lead time, and $0.99 suits BR/IN/TR/ID traffic better
  than $1.99.
- **Set local per-country prices.** ₹49 converts far better than the ₹89 an auto-converted $0.99
  becomes; same in Brazil and Turkey.

**Nothing has been coded yet.** Ajay has not chosen gems-first vs remove_ads-first, and per
[[feedback-ask-before-code-changes]] no repo edits should start until he does.

Related: [[project-blockbloom-release]], [[reference-blockbloom-analytics]],
[[feedback-blockbloom-release-process]].
