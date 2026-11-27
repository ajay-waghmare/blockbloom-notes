# Play Promotional Content Card — Holiday Bloom (Dec 24, 2026 – Jan 3, 2027)

> **Lever:** `O-6` (`06-organic-tier1.md` §4) · **Target Submission Date:** **Wednesday, Dec 9, 2026** (`15 days` before Dec 24 start so Play Store featuring eligibility remains intact!)  
> **Event Window:** **Thu, Dec 24, 2026 (00:00 Local/UTC)** to **Sun, Jan 3, 2027 (23:59)**  
> **Paired Config:** Config-only Firebase Remote Config `live_events` condition `holiday_bloom_2026` (no new app release required; publish **Mon, Dec 21** when Winter Bloom ends)

---

## Play Console Form Fields (Copy-Paste Ready)

* **Event name (internal only):** `Holiday Bloom 2026`
* **Event type:** `Special event` / `Major update` *(time-limited in-game event)*
* **Countries / Audience:** `All countries and territories` / `Everyone (New & returning users)`
* **Start date:** `Dec 24, 2026`
* **End date:** `Jan 3, 2027`
* **Tagline (max 80 chars — verified 55 chars):**
  ```
  Holiday Bloom: double coins in every game until 3 January
  ```
* **Description (3 concise lines, zero misleading claims):**
  ```
  Celebrate Holiday Bloom from December 24 to January 3 with double coin rewards on every run.
  Relax with a calm 8x8 block puzzle across Classic, Adventure levels, and Daily Challenges.
  Open Block Bloom during holiday week to claim 2x coins and keep your streak alive.
  ```
* **Unique Event Artwork Assets (Zero overlaid text per Google Play rules):**
  * **1:1 Square Image (`1080x1080`, `2.36 MB`):** `blockbloom-notes/01-blockbloom/plan-2026-11/content/holiday-bloom-square-1x1.png`
  * **16:9 Featured Banner (`1920x1080`, `3.37 MB`):** `blockbloom-notes/01-blockbloom/plan-2026-11/content/holiday-bloom-banner-16x9.png`

---

## Paired Firebase Remote Config Payload (Publish Mon Dec 21 after Winter Bloom Ends)
* **Condition `holiday_bloom_2026` (Device time):**
  `device.dateTime > dateTime('2026-12-23T23:59:59') && device.dateTime <= dateTime('2027-01-03T23:59:59')`
* **Parameter `live_events` Conditional JSON (`COIN_BOOST`, `2.0x`):**
  ```json
  [{"id":"holiday_bloom_2026","title":"Holiday Bloom","description":"Double coins in every game until Jan 3!","kind":"COIN_BOOST","multiplier":2.0,"endsInDays":0,"startDate":"2026-12-24","endDate":"2027-01-03","theme":"winter"}]
  ```
* **Paired FCM Push (Thu Dec 24, 17:00–19:00 local):**
  * Title: `Holiday Bloom is here`
  * Body: `Double coins in every game until 3 Jan.`
