# Organic growth in Tier-1 countries — plan v2 (22 Nov 2026)

**Ajay, 22 Nov:** "Ideally we should focus more on organic users gain, majorly in Tier-1 countries." Organic is now
the main engine; paid ads are short tests on top (`07-ad-bursts.md`).

**Owner: Gemini** — plans, prepares every text and image, changes the store listing through the Play API, replies to
reviews through the Play API (`tools/play-reviews.js` pattern), measures, and reports. **Ajay** does only what needs
his own hands or accounts: recording clips on his phone, posting from his own Reddit / YouTube / Instagram / TikTok
accounts, sending creator emails from his address, and Play Console screens the API cannot reach.
How Gemini researches and decides on its own: `../gemini-skills/README.md`.

## 1. The honest starting point (22 Nov)

- **Tier-1 free downloads are about 1 a day.** Before any ads (25 Oct – 14 Nov) the whole world brought ~4 new players
  a day; in the last 21 days GA4 shows 5 US players from organic search (`reports/growth-baseline-2026-11-21.txt`).
- **The store page converts few visitors:** 10 ratings, no promo video (Play API read, 22 Nov), and an en-US
  description that says *"nothing interrupts your game (optional reward videos only when you choose them)"* — untrue
  since banners are on and, from 22 Nov, interstitials for half the players (E1). Fix first (O-1).
- **"block puzzle" is one of Play's most crowded searches** and the big games own it. We win on long-tail words,
  Play's own event cards, people seeing real gameplay, players bringing players, and keeping players (Play ranks
  apps people keep and do not uninstall).

## 2. Targets (7-day averages; the model's inputs, `../scripts/growth-model-v2.js`)

| Week | Dates | Tier-1 free downloads a day | What drives it |
|---|---|---|---|
| 1 | 23–29 Nov | 2 | honest listing, store video, festival card (27 Nov), first clips |
| 2 | 30 Nov – 6 Dec | 3 | custom US/UK/CA/AU listing, icon test, Reddit #1–#2, daily clips |
| 3 | 7–13 Dec | 4 | vc41 share card + referral, creator emails, ratings from the new prompt |
| 4 | 14–20 Dec | 6 | Winter Bloom + Play card + first push, Reddit #3, burst halo |
| 5–6 | 21–31 Dec | 8 (5 on 22–23 Dec) | Holiday Bloom + Play card, new phones, New Year's week, Reddit #4 |

Also by 31 Dec: **40 ratings** (from 10) with an average ≥ 4.3; a reply to every review within 24 hours; 1 clip a day
on 3 platforms; 4 Reddit posts; 20 creators emailed. Week 1 also measures the real baseline: since 22 Nov GA4 can tell
paid from free installs (Google Ads link), so the week-1 number replaces the "about 1 a day" guess.

## 3. The levers, in order

| ID | Lever | Owner | When | Done when / measure |
|---|---|---|---|---|
| O-1 | **Honest listing + keywords.** Replace the en-US full and short description with CP §3 (honest about ads; keeps the long-tail words: relaxing, offline, 8x8, combo, daily challenge, no timer). Check all 13 locales for the same "nothing interrupts / no ads" claim and fix each. Title stays `Block Bloom: Block Puzzle Game` (30/30). | Gemini (Play API, like `tools/play-listings-set-multi.js`) | **Mon 23 Nov** | read-back (`scripts/play-listing.js`, read-only) shows no claim that ads are absent or never interrupt |
| O-2 | **Custom store listing** for US/UK/CA/AU (C-16, CP §3). | Ajay (Play UI-only) with Gemini's text | Tue 24 Nov | listing shows "Published" for the 4 countries |
| O-3 | **Store video:** a 30 s landscape gameplay video (CP §2) on YouTube (public or unlisted, ads off), added to the en-US listing. | Ajay uploads; Gemini sets it via the API | Thu 26 Nov | listing shows the video |
| O-4 | **Icon test E3** (C-17) on the default listing, all countries (more traffic than Tier-1 alone); screenshots E4 after it. Few visitors, so allow 3–4 weeks. | Ajay (UI) | Tue 24 Nov | Play shows a result, or "not enough data" by 20 Dec → keep the current icon |
| O-5 | **Ratings:** official in-app review prompt (V40-8) only after a good moment; replies to every review within 24 h (CP §7). Never ask friends or family, never trade ratings, never reward a rating. | Gemini (vc40, replies via API) | from Thu 26 Nov | 40 ratings by 31 Dec, average ≥ 4.3 |
| O-6 | **Play event cards** (C-19): Aurora Bloom Festival 27 Nov (check it is approved, Mon 23 Nov); **Winter Bloom 14–21 Dec submitted Sat 28 Nov** (15 days ahead, so it can be featured; Play needs 14+ days for featuring); **Holiday Bloom 24 Dec – 3 Jan submitted Wed 9 Dec** (new, §4). | Ajay submits (UI); Gemini writes text and images 2 days before | dates in the left column | each card "Approved"; the in-app event starts the same day |
| O-7 | **Short video, 1 a day** on YouTube Shorts, Instagram Reels and TikTok: real gameplay only, the best moment in the first second, 15–25 s, text on screen, scheduled for **06:30 IST** (US evening the day before). Store link with the `shorts` UTM (CP §10) in each bio. | Ajay records (1 h on Sundays) and posts; Gemini writes captions (CP §6) and tracks views → installs | daily from Wed 25 Nov | `utm_source=shorts` installs a week; views a clip |
| O-8 | **Reddit**, 4 posts (CP §5, rules checklist first): #1 r/playmygame Fri 27 Nov, #2 r/IndieGaming Thu 3 Dec, **#3 r/AndroidGaming Mon 14 Dec** (moved: Winter Bloom launch, Burst 1 day 3), **#4 r/playmygame Sat 26 Dec** (moved: Holiday Bloom, new phones). Reply to every comment within a day. | Ajay posts from his account; Gemini drafts and tracks | dates in the left column | `utm_source=reddit` installs a post |
| O-9 | **Creator emails:** 20 small creators (1k–50k followers) who show new mobile puzzle games, US/UK first: 10 on Sun 29 Nov, 10 on Sun 6 Dec, asking for a look around Winter Bloom (14 Dec). Free; no payment, no install promises. Template in §5. | Gemini finds and lists them; Ajay sends from his address | 29 Nov, 6 Dec | replies, posts, `utm_source=creator` installs |
| O-10 | **Players bring players:** score card image + referral link (V41-04, vc41); both players rewarded. | Gemini | vc41 at 100%, Sat 5 Dec | `first_open` with source `referral` a week |
| O-11 | **Keep players** (Play ranks what people keep): onboarding, rewarded readiness, push fix (vc40); daily loop and reminders (vc41); events (vc42). Already in `02-gemini-dev-specs.md`. | Gemini | vc40–vc42 | day-1 return 22% → 30% |
| O-12 | Optional: **Arrow Bloom → Block Bloom card** (the mirror of V42-04), only if Arrow Bloom has Tier-1 players. Landing page (CP §9) on GitHub Pages. | Gemini | after 14 Dec | installs with `utm_source=arrowbloom` / `landing` |

**Not allowed, ever** (Play policy; the app can be removed): paid or rewarded ratings, rating swaps, review farms,
incentivised installs, install exchanges, competitor names in the listing (for example "Block Blast"), keyword lists in
the description, "free", "best", "#1" or emoji in the title, screenshots or videos that are not real gameplay.

## 4. Holiday Bloom (new, config-only), Thu 24 Dec – Sun 3 Jan

- **Why:** Winter Bloom ends Mon 21 Dec; Christmas and New Year's week are the year's best days for new players and
  play time [Q3 in `07`]. A second event gives a second Play card and gives Burst 2 (if it runs) an event to land in.
- **In the game (Gemini):** a dated `live_events` value, 24 Dec 00:00 – 3 Jan 23:59 (C-10 pattern), published Mon
  21 Dec, using only what `live_events` already supports after vc42 (no new code): title "Holiday Bloom", coin boost
  ×2. If vc42's Winter Bloom theme can be reused by the event value, reuse it; if not, the plain coin boost is enough.
- **Play card (Ajay submits Wed 9 Dec; Gemini prepares):** tagline (≤ 80) `Holiday Bloom: double coins in every game
  until 3 January` (55); a new square image (Play needs a unique image per event); description of 3 short lines.
- **Push (Gemini, Thu 24 Dec, C-14):** "Holiday Bloom is here: double coins in every game until 3 Jan."

## 5. Creator email (Ajay sends; Gemini fills the brackets)

> Subject: A calm block puzzle for your "new mobile games" list?
>
> Hi [name], I'm Ajay, the solo developer of Block Bloom, a relaxing 8x8 block puzzle for Android (plays offline, no
> timer, a daily challenge). I liked your [video title]. On 14 Dec we start a Winter Bloom event, if it is useful
> for a video. Store link: [UTM link with utm_source=creator&utm_campaign=<name>]. It has ads and one optional purchase
> (remove ads). No obligation and no payment. Thanks for reading, Ajay

## 6. Measurement (Gemini; add to `tools/growth-kpi.js`, M-§1)

- **Tier-1 free downloads** = GA4 `first_open` in US/UK/CA/AU/NZ/IE whose first-user channel is not Google Ads
  ("Cross-network" / the campaign name), by day and 7-day average, against the §2 target.
- **By source:** `first_user_source` = reddit / shorts / creator / referral / landing / arrowbloom / (organic Play).
  The UTM links work only if the install referrer reaches GA4: check once with one test install (CP §10).
- **Store page:** Play Console → store performance / acquisition by country and traffic source (search, explore,
  third-party), weekly (UI; labels UNVERIFIED). Store-listing conversion per week for the US.
- **Ratings:** count and average by country, weekly (Play API reviews list for text; the console for counts).
- The daily screen gets one line: `T1 free yesterday N · 7-day avg X vs target Y · top source S`.

## 7. Weekly organic review (Saturday, inside M-§4.2; Gemini writes it, Ajay reads it)

1. Tier-1 free downloads: 7-day average vs target; which source moved.
2. The 3 best and the 3 worst clips: views, profile clicks, installs. Make more of the best kind.
3. Store page: visitors → installs (US). Did a listing change help? Keep or roll back.
4. Ratings: new count, average, every 1–2 star review answered?
5. One change for next week, written as a test: what, when, the number that proves it.
