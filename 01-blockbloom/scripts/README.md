# Scripts that lived only in temp folders

All Node, zero dependencies (built-in `https` + `crypto` for the RS256 service-account JWT),
Node 16+. Every one takes the service-account key **by path** (first argument or `PLAY_SA_FILE`).
`<sa>` below = `D:\Downloads\avid-airway-498216-e5-9f357c8e6b11.json`, `<pkg>` = `com.aweagle.blockbloom`.
Read-only scripts open a Play edit and discard it; committing scripts say so.

## Play tracks and releases (the three durable ones are in the repo under `tools\`)

| Script | Commits? | Usage |
|---|---|---|
| `play-rollout.MAIN-UNCOMMITTED.js` | yes | the `main` working-tree version: needs `PLAY_RELEASE_NOTES=<json>`; refuses to run without it |
| `play-rollout.RELEASE-BRANCH-76d2e75.js` | yes | the version committed on `release/2026-10-09`: auto-loads `tools/release-notes/vc<N>.json`, falls back to generic text (remove that fallback) |
| `release-notes\vc20.json`, `vc21.json` | — | 8 locales each; vc20.json exists only here and untracked on main |
| `play-locales.js <sa> <pkg>` | no | lists the store-listing locales; run before sending release notes |
| `play-track-clear.js` | yes | clears/deactivates a track release (used to retire stale alpha/internal builds) |
| `play-testers.js` | varies | reads/sets tester lists |

## Store listing text and images

| Script | Commits? | Usage |
|---|---|---|
| `play-listing.js <sa> <pkg>` | no | dump current listings |
| `play-listing-set.js <sa> <pkg> <lang> <listing.json> [--dry-run]` | yes | one locale; validates limits, refuses promo words in titles; dry-run = PUT + readback + delete edit |
| `play-listings-set-multi.js <sa> <pkg> bundle.json [--dry-run]` | yes | many locales in ONE edit/commit, in-edit read-back, retries 5xx |
| `play-listings-verify.js <sa> <pkg> bundle.json` | no | sha256 of live vs sent, in-process |
| `build-bundle.js <journal.jsonl> bundle.json [expected-locales-csv]` | — | assembles a bundle from a locale Workflow's journal |
| `play-images-pull.js` / `play-images-push.js <sa> <pkg> <lang> <ordered.json> [--dry-run]` | pull no / push yes | screenshots; push = deleteall, upload 2-8, commit |
| `render.ps1` + `captions.json` | — | captioned screenshot renders via .NET System.Drawing (Yu Gothic UI for ja) |
| `extract-strings.js`, `inv-strings.js` | — | i18n helpers used for the six-language work |
| `a11y.js`, `a11y-targets.js` | — | tap-target audit from a `uiautomator dump` |
| `shoot.sh` | — | emulator screenshot loop used for the store sets |

Reference dumps of what was live are in `..\reports\` (`live-listings.json` 2 Oct,
`fixed-listings.json` 24 Sep, `listings-oct.json`, `bundle.json`).

## Analytics and reports

| Script | Usage |
|---|---|
| `ga4.js <sa> 555700046 [days]` | GA4 headline funnel |
| `ga4-oct.js <sa>` | GA4 split by appVersion / deviceModel / country |
| `play-report.js <sa>` | fetch every month from the reports bucket, compute, write `report.json` (edit `MONTHS`; the active column is taken from the LAST month) |
| `play-stats-ls.js <sa> <prefix>`, `play-stats-get.js <sa> <object...>`, `gcs-list.js` | raw bucket access; CSVs are UTF-16LE |
| `play-vitals.js <sa> <pkg> [days]` | Android vitals; daily needs timeZone America/Los_Angeles; 0 rows = no data |
| `play-reviews.js`, `play-reviews.OCT9-UNCOMMITTED.js` | reviews with text, last ~7 days (second copy was dropped into the vc21 worktree, untracked) |
| `play-products.js`, `play-monetize-probe.js` | attempts to list IAP products; the legacy endpoint is 403 "migrate", the new path 404'd — unresolved |
| `play-insight.js`, `play-stats-probe.js` | early probes, kept for reference |
| `make-sheets.js`, `make-xlsx.js`, `build-xlsx.ps1` | report.json -> sheets.json -> .xlsx (dependency-free OOXML writer; `make-xlsx.permanent-copy.js` is the `D:\Scripts` copy) |

The committed `tools\pull-metrics.js` on the vc21 branch supersedes `ga4.js` + `ga4-oct.js` +
the vitals probe for the routine pull.

## Portfolio and environment

| Item | What |
|---|---|
| `_shared\aweagle-baseline.toml` | single source of truth for SDK/AGP/Gradle/Kotlin/JDK across all AW EagleCraft apps |
| `_shared\tools\sync-baseline.js [--check]` | stamp the baseline into every app / report drift |
| `_shared\tools\play-preflight.js` | portfolio compliance report (reads local build files only, not live tracks) |
| `Launch-BlockBloom.bat` | boots the `bloomtest` AVD with `-gpu host`, installs the debug APK, launches the app (edit the APK path) |
| `Pending.txt` | a June note; the privacy URL it mentions was fixed in v1.4 |
| `extract-conversation.js <session.jsonl> <out.md> [title]` | turns a Claude Code transcript into a readable Markdown log (prompts + replies only, secrets redacted). Used to produce `..\history\` |
