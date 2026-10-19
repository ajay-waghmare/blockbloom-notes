---
name: project-blockbloom-monetization
description: "Block Bloom revenue — LIVE since vc23 1.12.0 (18 Oct 2026): real AdMob rewarded-only ads, Play Billing on with no products yet (BillDesk KYC done, Play catalog pending), shop gem bundles, 15% fee tier, ASO listings; the history of how it got there and what is still open"
metadata:
  node_type: memory
  type: project
  originSessionId: f4795aa1-7942-4344-a6c4-e7b6487ba3f4
  modified: 2026-10-19
---

## State on 19 Oct 2026 (synced from the notes-repo journal; done from the personal laptop)

**Live:** vc23 / 1.12.0 at 100% on production since 19 Oct is the first revenue build.
- `ADS_ENABLED=true` with **real AdMob ids** (publisher `pub-1693732810683011`, payments profile
  `3947-8216-3189`; app id and the rewarded / interstitial / banner unit ids sit in `app/build.gradle.kts`).
- **"Minimum ads" policy, Ajay's directive:** rewarded video only and 100% opt-in — out-of-coins "+1 free
  lifeline", revive at game over, double coins, skin unlock. **Banner and interstitial are OFF** through
  `AdsRules.DEFAULT_BANNER/DEFAULT_INTERSTITIAL = false` and the Remote Config dials
  `ads_banner_enabled` / `ads_interstitial_enabled` (added on `release/2026-10-11`); switching one on is a
  console change, not a build. First real `ad_reward` events arrived 19 Oct.
- `app-ads.txt` (`google.com, pub-1693732810683011, DIRECT, f08c47fec0942fa0`) is live at
  `https://ajay-waghmare.github.io/app-ads.txt`; the Play listing's contact website points there
  (`tools/play-set-website.js`). This cleared AdMob's "Requires review" warning; crawler confirmation
  was still pending on 19 Oct.
- `BILLING_ENABLED=true`: `PlayBillingHost` connects and self-gates — **no products exist in Play Console
  yet.** BillDesk merchant application 2609205439: Personal, Bank and Business info cleared 12 Oct, Video
  KYC completed 15 Oct, waiting for Play's product-catalog activation. Until then the only "purchases"
  are the in-game gem bundles.
- **Shop bundles (gems → goods), all through `Wallet`:** vc23 shipped 500 coins/10 gems, 1,500/25,
  5 Hammers/15, 5 Shuffles/12, Mega 3+3+3/20 — the lifeline packs were ~50% WORSE than converting coins.
  **vc24 (`release/2026-10-20`, not uploaded) repriced them from one table, `monetize/ShopCatalog.kt`:**
  10 Hammers/10, 10 Shuffles/8, 5+5+5 pack/10 (75–87 coins per gem vs 60 for the best coin pack);
  `ShopCatalogTest` fails if a pack ever drops below the coin route. Gem→coin is `TxReason.GEM_EXCHANGE`
  and does not count as "coins earned". `OutOfCoinsDialog` opens from an unaffordable lifeline or the coin
  revive and routes to the shop or (only when `adsActive`) a rewarded ad; the shop returns to the running
  game (`previousScreen`). Catalogue in BillingHost.kt is still `remove_ads`, `gems_small/medium/large`.
- **Store:** all 13 listings rewritten with ASO copy (the "NO ADS / no in-app purchases" claims are
  gone), 5 store tags, third-party stores enabled, privacy policy §6 discloses AdMob + Billing.
  **15% service-fee tier enrolled 14 Oct** (account group AW EagleCraft).
- Also in vc23: flexible in-app updates with an `UpdateBanner` (Home + Settings) so monetised builds reach
  the ~100 players still on 1.10.0; `min_supported_version_code = 23` in Remote Config is the force lever,
  deliberately not pulled yet.

**Still open:** Play product catalog + per-country prices (₹49-style local prices, gems-first, see below);
AdMob crawler confirmation; Data Safety form must match the ads+billing SDKs (check in Play Console —
not recorded in the journal); measure rewarded eCPM/fill before touching the banner/interstitial dials.

## How it got here (kept for context)

4 Oct 2026 direction from Ajay: *"we have to add ads … but that too very few … like it [shouldn't be]
disturbing the game"*, plus payouts into his own bank account. The code existed since vc16 behind flags:
rewarded revive + skin unlock, interstitial every 3rd game, a banner under the tray (wired, found by the
10 Oct review), UMP consent, a correct `PlayBillingHost`. The blockers were account and policy work, not
code: BillDesk verification (stuck for a week on a corporate proxy — hotspot + incognito advice), no AdMob
account, and listings that promised no ads. All three were cleared between 11 and 18 Oct.

## The honest numbers (given 4 Oct; he chose to proceed for the lead time)
GA4 showed 5–7 DAU then (the 109 figure was installs, not DAU); by 19 Oct DAU is ~28–31 with ~240
lifetime players. Rewarded-only ads at that scale earn single-digit dollars a month; AdMob pays out
from **$100**, Play Billing from **$1**, monthly 15th–21st, keeping 15% of the first $1M/year.

## Recommendations that still stand
- Keep interstitial/banner OFF until a measured test says otherwise — the dial exists for exactly that.
- **Gems / Galaxy skin first, not `remove_ads`** — nobody pays to remove ads they chose to watch.
- **Local per-country prices** when the products are created (₹49 beats an auto-converted ₹89).

Related: [[project-blockbloom-release]], [[reference-blockbloom-analytics]],
[[feedback-blockbloom-release-process]], [[project-blockbloom-code-review-2026-10]].
