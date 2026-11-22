# Block Bloom: content pack (22 Nov 2026)

For Gemini (use the text exactly) and Ajay (copy, paste, post). Roadmap: `11-growth-roadmap-30-days.md` v1.1.
Written by Claude. Claude has no tasks in the plan. Nothing here was published.

> **Plan v2 (22 Nov evening).** Reddit post 3 moves to Mon 14 Dec (r/AndroidGaming, Winter Bloom launch) and post 4 to
> Sat 26 Dec (r/playmygame, Holiday Bloom). The Google Ads texts (§1) are used only in the bursts (`07-ad-bursts.md`).
> Section 3's honest listing text replaces the live en-US description on Mon 23 Nov (O-1). New texts — Holiday Bloom
> Play card and push, the creator email — are in `06-organic-tier1.md` §4–§5.

## 0. Read first: rules for every text below

1. **The old `marketing/MARKETING_PACK.md` in the app repo is now WRONG. Do not reuse it.** It says "no ads", "zero ads", "under 1 MB" and "daily leaderboard". Facts today:
   - The app has ads: banner, rewarded, and an interstitial test (`ads_interstitial_enabled`, Remote Config; GameViewModel.maybeInterstitialThen).
   - The release APK is 4.5 MB and the AAB is 8.9 MB (DAILY_ACTIVITY.md, 21 Nov).
   - I found no leaderboard code in `app/src/main/java`. README line 127 mentions one. Do not claim it.
2. **Claims we can make (checked in code or strings):** 8x8 grid; drag to place; line clears and combos; daily challenge (`notif_challenge_title`); daily streak with a shield after 7 days (`StreakRules.FREEZE_MIN_STREAK = 7`, string `shield_used`); skins (Classic, High Contrast, Candy Pop, Deep Ocean, Neon Night, Sunset, Galaxy: `cosmetics/Skins.kt`); Adventure mode (`string adventure`); Lucky Bloom Chest (`lucky_chest_*`, watch an ad to open); play without internet (store listing says 100% offline; GEMINI must confirm before any text goes live, see 0.4); `remove_ads` in-app purchase.
3. **Claims we must NOT make:** "no ads", "ad-free" (only for buyers of Remove Ads), "#1", "best", "top rated", price or discount text inside store art, "leaderboard", "under 1 MB", any rating number, any download number, any earnings claim.
4. **Gemini check before use (offline claim).** Put the phone in airplane mode. Play one full game, the daily challenge and a theme change. If any of them fails, change "offline" to "most of the game works offline" in every text below. Report the result in the notes journal.
5. **Store policy** (Google Play metadata policy, https://support.google.com/googleplay/android-developer/answer/9898842, opened 22 Nov): honest, no misleading claims, no unattributed testimonials, no repeated keywords, no ranking or price text in graphics, no emoji in the app title. Description rules: accurate, succinct. All drafts follow this.
6. **Placeholders:** `{STORE_URL}` = `https://play.google.com/store/apps/details?id=com.aweagle.blockbloom`. For Reddit, Shorts and the landing page use the UTM version in section 10.
7. **Voice:** calm, friendly, plain English (US spelling for US/CA; UK spelling variant given only where it matters).
8. **Who does what:** Gemini creates and checks files (character counts, localized notes, Remote Config JSON). Ajay records clips, pastes into Google Ads and Play Console, posts on Reddit and social, replies to reviews.

---

## 1. Google Ads app campaign texts

Campaign: `BlockBloom-Tier1-US-EU` (US, UK, CA, AU, NZ, IE). Limits: headline 30 characters, description 90 characters (Google Ads app campaign asset limits; UNVERIFIED in this session, the Ads UI shows a counter and rejects over-limit text).

### Headlines (5), counts checked by script

| # | Headline | Chars |
|---|---|---|
| H1 | Relaxing Block Puzzle Game | 26 |
| H2 | Play Offline, No Wi-Fi Needed | 29 |
| H3 | Chain Combos, Clear the Board | 29 |
| H4 | A New Daily Challenge Awaits | 28 |
| H5 | Free 8x8 Block Puzzle Fun | 25 |

### Descriptions (5)

| # | Description | Chars |
|---|---|---|
| D1 | Drag blocks, clear lines, chain combos. A calm puzzle you can play anywhere. | 76 |
| D2 | No timer, no rush. Fill rows and columns and watch the board bloom. | 67 |
| D3 | Keep your daily streak going with a fresh challenge every day. Free to play. | 76 |
| D4 | Unlock glowing themes and beat your best score. Plays without internet. | 71 |
| D5 | One finger is all you need. Easy to learn, hard to put down. Install free. | 74 |

Notes for Ajay: "Free to play" is true (ads and one purchase). Do not add "no ads". Do not add a price.
Order in the Ads UI: put H2 and H4 first. They are the most specific.

---

## 2. Video briefs

Shared rules (every video):
- Record on a real phone, not an emulator (the store `02-playing` screenshot looks empty because it was taken with blind taps; see `store/screenshots/README.md`). Use a nearly full, interesting board.
- Turn on Do Not Disturb. No notifications on screen. Battery full, time 12:00.
- Show the real game only. No fake numbers, no fake reviews, no "#1".
- No music from outside. The game has its own music (MusicEngine). Use it, or royalty-free audio from the editor.
- Text on screen: max 6 words per card, big, bottom third is unsafe (store UI covers it).
- End card (last 2 s): app icon, "Block Bloom", "Free on Google Play". No price, no rating.
- Safe zones: portrait keep text inside the middle 80% of height.
- Where the ad videos go: Google Ads asset upload needs YouTube links or video files (UNVERIFIED path; Ajay: Asset library, Add, Video, paste YouTube URL). Upload each video as Unlisted on YouTube first.
- Files named `bb-p1.mp4` ... `bb-p5.mp4`, `bb-l1.mp4` ... `bb-l5.mp4`. Gemini stores the shot list next to the clips.

### Portrait 9:16 (1080x1920), 15 to 30 s

**P1. The big combo (18 s)**
1. 0-2 s: full board, 3 pieces in the tray. Text: "Wait for the right piece".
2. 2-8 s: drag pieces slowly, one row nearly done, one column nearly done.
3. 8-12 s: place the piece that clears a row and a column together. Let the combo bar show.
4. 12-16 s: second clear right after. Text: "Chain it".
5. 16-18 s: end card.

**P2. Saved at the last move (20 s)**
1. 0-3 s: board almost full. Text: "One move left".
2. 3-10 s: hover a piece over two spots. Think pause.
3. 10-15 s: place it, big clear. Text: "Saved".
4. 15-20 s: end card.

**P3. Daily challenge and streak (22 s)**
1. 0-3 s: home screen with the Daily Challenge card. Text: "A new puzzle every day".
2. 3-14 s: play the challenge, quick cuts.
3. 14-19 s: show the streak counter going up. Text: "Keep your streak".
4. 19-22 s: end card.

**P4. No Wi-Fi (16 s)** (only after check 0.4 passes)
1. 0-3 s: pull down the quick settings, switch on airplane mode. Text: "No Wi-Fi?".
2. 3-6 s: open Block Bloom.
3. 6-14 s: play a clear. Text: "Still plays".
4. 14-16 s: end card.

**P5. Change the look (20 s)**
1. 0-3 s: normal board. Text: "Same game, new mood".
2. 3-12 s: open themes, switch Classic, Neon Night, Deep Ocean, Aurora Glass with 2 s each.
3. 12-17 s: play one clear in the last theme.
4. 17-20 s: end card.

### Landscape 16:9 (1920x1080), 15 to 30 s

Play on a phone held sideways is not possible if the game is portrait-only. **Gemini: check `AndroidManifest.xml` for `screenOrientation`.** If portrait-only, make landscape videos by placing the portrait recording in the center of a 1920x1080 canvas with a blurred copy of it behind, and put the text left and right of the phone. Do not stretch.

**L1. Combo + big text left (18 s).** Same recording as P1. Left text: "Chain combos". Right text: "Free on Google Play".
**L2. Saved at the last move (20 s).** P2 recording. Left: "One move left". Right: "Can you save it?".
**L3. Daily challenge (22 s).** P3 recording. Left: "New puzzle daily". Right: "Keep the streak".
**L4. Calm play (25 s).** One continuous, slow game with soft music and no cuts. Left text only at 0-3 s: "Relax. Place. Clear.". End card.
**L5. Themes (20 s).** P5 recording, theme name appears left as each one switches.

Gemini: also make the 10 images Ads needs from the existing `store/screenshots/en-US` set and `store/ads_assets` (1200x628, 1080x1920, 1200x1200 exist). Re-shoot `02-playing` first.

---

## 3. US/UK custom store listing

Play Console, Grow, Store presence, Custom store listings (Ajay; UI-only, UNVERIFIED click path; Play help: "Create custom store listings"). Target: US, UK, CA, AU for the Tier-1 campaign. Create one listing for the countries (US, CA, AU) and one US/UK-spelling copy if wanted. Texts below use neutral spelling that works in both ("color" appears once, see note).

**Short description (80 max)**

`Relaxing 8x8 block puzzle. Play offline, chain combos, beat the daily challenge.`

Count: 80 (script-checked; exactly at the limit).

**Full description (4,000 max), 1,444 characters (script-checked)**

```
Block Bloom is a calm block puzzle for the moments between everything else.

Drag colorful blocks onto an 8x8 board. Fill a full row or column and it blooms away. Clear several at once and your combo climbs. No timer. No pressure. Just you and the board.

PLAY ANYWHERE
Block Bloom plays without Wi-Fi or mobile data. On a plane, on the train, in a waiting room: open the app and play. (Ads and purchases need a connection.)

CHAIN COMBO CASCADES
One good piece can clear a row and a column together. Chain clears back to back and watch the combo bar fill. Line up the board, wait for the right piece, and enjoy the cascade.

A NEW CHALLENGE EVERY DAY
Every day has a fresh Daily Challenge board with its own goal. Come back each day to grow your streak. Reach a 7-day streak and you earn a streak shield that forgives one missed day.

TAKE IT AT YOUR PACE
- Classic mode for endless, relaxed play
- Adventure mode with levels to clear
- One-finger drag and drop
- Quick rounds, or a long evening of puzzles

MAKE IT YOURS
Switch the look of your board with unlockable themes: Classic, Neon Night, Deep Ocean, Sunset, Candy Pop and more.

FREE TO PLAY
Block Bloom is free. It shows ads, and you can watch an optional ad for bonus rewards such as a revive or double coins. Want it quieter? Remove Ads is a one-time purchase.

Download Block Bloom and start your streak today. Questions or ideas? Write to us at ajaywaghmare00a@gmail.com.
```

Notes:
- Gemini: "Aurora Glass" is a UI theme from the 1.15.0 release notes, not in the skin list in `Skins.kt` (skin names there: Classic, High Contrast, Candy Pop, Deep Ocean, Neon Night, Sunset, Galaxy Premium). The text names only skins that exist. Confirm "Classic mode" wording against the home screen string before upload.
- Contact email is the one in `store/listing.md`. Ajay: confirm you want it public.
- Only add "Galaxy" if it is purchasable for coins or gems; it is labeled Premium in strings.
- Do not paste review quotes or star counts.

---

## 4. Push texts

Sent through Firebase (FCM, `engagement/BloomMessagingService.kt`) for the festival and Winter Bloom. The streak reminder is a local notification (`engagement/WinBack.kt`, strings `notif_*`); its text change needs vc41 and Remote Config for the E5 test. Title max ~40 characters, body max ~90 so they do not get cut. Only players who allowed notifications get them. Never send more than 1 push a day. Send at the player's evening hour, not at night (Ajay: schedule at 17:00 to 19:00 local, UNVERIFIED best time; the data decides).

**Aurora Bloom Festival, start (Fri 27 Nov)**
- Title: `Aurora Bloom Festival is here`
- Body: `Coins x2 on every clear until 3 Dec. Come play a round.`
- Count: 29 / 55.
- Send only after `live_events` with the festival is live and checked in the app.

**Aurora Bloom Festival, last day (Thu 3 Dec)**
- Title: `Last day of the Aurora festival`
- Body: `Coins are still x2 today. One more round before it ends?`
- Count: 31 / 56.

**Winter Bloom start (Mon 14 Dec)**
- Title: `Winter Bloom has begun`
- Body: `A limited-time winter event is live until 21 Dec. Jump in.`
- Count: 22 / 58. Send only if vc42 content is live at 100%.

**Streak at risk (E5, A/B text in Remote Config)**
Existing live text for reference: title "Your N-day streak ends tonight", body "One quick round keeps it alive." (`notif_streak_title`, `notif_streak_text`).
- Variant A (calm): title `Your {N}-day streak ends tonight`, body `One quick round keeps it alive.` (same as now, the control).
- Variant B (specific, kind): title `{N} days in a row. Keep it going?`, body `A 1-minute puzzle saves your streak. No rush.`
- Count B: about 33 / 45.
- If `{N}` is 7 or more and the shield is available, do NOT use a streak-at-risk push (the player is protected; it would be pressure with no cause). Gemini: check `StreakRules.freezeAvailable`.
- Read: open rate, Day 24. No emoji in the title.

---

## 5. Reddit posts (4)

### Rules: read before posting (UNVERIFIED, must be checked by Ajay)

I could not open Reddit pages from this machine (the fetch tool is blocked for reddit.com, old.reddit.com and the mirrors I tried; search results did not include the three subreddits' rule pages). So the **exact rules of the three communities are UNVERIFIED**. What I could confirm, and what to do:

- Reddit's own help page for self-promotion (Reddiquette) returned 403, so the common "10% rule" is UNVERIFIED too.
- Ajay: before each post, open the subreddit, click "Rules" (desktop: right column; app: About tab), and read the full text. Tick the checklist below. If a rule says no, change the plan, do not argue with moderators.
- Source pages to open yourself: `https://www.reddit.com/r/AndroidGaming/about/rules`, `https://www.reddit.com/r/playmygame/about/rules` (also the wiki `https://www.reddit.com/r/playmygame/wiki/guidelines`; a partial copy I saw says moderators may remove posts that do not follow the rules and the spam filter may hold posts: check `/new` after posting), `https://www.reddit.com/r/IndieGaming/about/rules`.
- What the community type usually expects (general, not their rules): r/playmygame exists to share playable games for feedback; r/AndroidGaming and r/IndieGaming are bigger and stricter about promotion.

Checklist before each post:
1. Read the current rules. Is a developer post allowed? Is there a weekly promo thread instead? Is flair required? A title tag (like [Android])?
2. Account old enough, with normal activity (not only self-promo). If the account is new, comment helpfully in the sub for 1 to 2 weeks first.
3. Say plainly "I made this". Say it has ads and one purchase. Never hide it.
4. Do not ask for upvotes, installs, ratings or reviews. Ask only for feedback.
5. Post 1 per sub, never the same text in two subs on the same day.
6. Reply to every comment within a day. Never delete criticism. Never argue.
7. Never post a link to a different page than the store (no shortened links that hide the target).

The roadmap days: post 1 on Fri 27 Nov (Day 6), post 2 on Thu 3 Dec (Day 12), post 3 on Tue 8 Dec (Day 17), post 4 on Thu 17 Dec (Day 26). Order below matches. Swap a post to another sub if its rules forbid it.

### Post 1: r/playmygame (Fri 27 Nov)
Title: `[Android] Block Bloom: relaxing 8x8 block puzzle, I'd love feedback on the first 5 minutes`

Body:
```
Hi, I'm a solo developer. I made Block Bloom, a block puzzle where you drag pieces onto an 8x8 board and clear rows and columns.

What it has: combo chains, a daily challenge with a streak, a few themes, and it plays without internet. It is free. It has ads (banner, and optional rewarded ads for bonuses) and one purchase to remove them.

What I want to know:
1. Is the tutorial clear, or did you get stuck?
2. Does a combo feel rewarding?
3. Were the ads too much, too little, or fine?

Play Store: {STORE_URL_REDDIT}

Honest feedback is welcome, including the harsh kind. I will reply to every comment.
```

### Post 2: r/IndieGaming (Thu 3 Dec)
Title: `I made a calm block puzzle on my own. What would make you come back to it tomorrow?`

Body:
```
Solo dev here. Block Bloom is an 8x8 block puzzle with no timer. I tried to make it calm: soft music, glowing themes, no rush.

I know block puzzles are everywhere. My question is about the habit side: a daily challenge, a streak with a one-time shield after 7 days, and a festival event now and then. Does that bring you back, or does it feel like pressure?

It is free, with ads and an optional Remove Ads purchase. Link in the first comment if the rules allow it: {STORE_URL_REDDIT}

Happy to hear what you would change.
```
(If the sub forbids links in the post body, put the link in a comment. Check the rule.)

### Post 3: r/AndroidGaming (Tue 8 Dec)
Title: `Block Bloom: a relaxing block puzzle for Android that plays without Wi-Fi (dev here, looking for feedback)`

Body:
```
I'm the developer. Block Bloom is a free 8x8 block puzzle for Android. You drag pieces, clear rows and columns, and chain combos. It plays without internet, so it works on the train or on a plane.

There is a daily challenge, streaks, themes, and an Adventure mode. It shows ads and has a Remove Ads purchase. I'm not asking for installs or ratings. I want to know what feels wrong or boring.

{STORE_URL_REDDIT}

Specific questions: are the controls comfortable on your phone size, and does the board look clear on your screen?
```
(r/AndroidGaming: if developers must use a flair, a weekly thread, or a "Self-promotion" tag, follow it. This is the post most likely to be removed. If so, use the sub's promo thread instead.)

### Post 4: r/playmygame (Thu 17 Dec, update post)
Title: `[Android] Block Bloom update: I changed the tutorial and the daily loop after your feedback`

Body:
```
Two weeks ago I asked for feedback on Block Bloom here. Thank you. Here is what changed:

- {Change 1 from real feedback}
- {Change 2 from real feedback}
- Winter Bloom, a limited-time event, is live until 21 Dec.

What I still don't know: {one real open question}.

{STORE_URL_REDDIT}
```
Gemini: fill the braces only with changes that are really in vc40, vc41 or vc42 and really came from comments. Never invent feedback. If there was no feedback, do not make this post.

---

## 6. YouTube Shorts and Reels captions (7)

One per day for 7 days, from the same clips (section 2). Format: caption first line is the hook, then one line, then hashtags. Max 5 hashtags (fewer is better; YouTube treats the first 3 as the shown ones; UNVERIFIED current limit, YouTube documented a 60-hashtag cap before it ignores all, so 5 is safe). Put `{STORE_URL}` in the pinned comment and in the bio, not in the caption (links in captions are not clickable on Reels). Say "free, with ads".

| # | Clip | Caption |
|---|---|---|
| 1 | P1 combo | `One piece. Two clears. 😌` Block Bloom is a calm block puzzle, free on Google Play. #blockpuzzle #satisfying #androidgames #puzzlegame #relaxing |
| 2 | P2 last move | `Saved at the very last move.` Do you wait for the perfect piece? #blockpuzzle #puzzlegames #androidgames #brainteaser #gaming |
| 3 | P3 daily | `A new puzzle every day. How long is your streak?` Free to play, ads included, Remove Ads available. #dailychallenge #puzzlegame #androidgames #streak #casualgaming |
| 4 | P4 no Wi-Fi | `No Wi-Fi? Still plays.` Block Bloom works without internet. #offlinegames #androidgames #blockpuzzle #commute #freegames |
| 5 | P5 themes | `Same game, new mood.` Pick your favorite theme. #blockpuzzle #gamethemes #satisfying #androidgames #cozygames |
| 6 | Solo dev | `I made this alone, one evening at a time.` Block Bloom, a calm puzzle. What should I add next? #indiedev #gamedev #solodev #blockpuzzle #androidgames |
| 7 | Festival | `Aurora Bloom Festival: coins x2 until 3 Dec.` Come for the event, stay for the combos. #blockpuzzle #gamingevent #androidgames #puzzlegame #mobilegaming |

Rules: clip 7 only after the festival is live (27 Nov to 3 Dec). Do not use #1, #best, #viral. Do not use trending audio that carries copyright claims. The 7-clip week: Ajay records once on Sunday (Day 8, Day 15, Day 22 per roadmap) and schedules.
For a Winter Bloom week (14 to 21 Dec) replace clip 7 with: `Winter Bloom is live until 21 Dec. A cozy event for a calm game.` #blockpuzzle #winter #androidgames #puzzlegame #cozygames

---

## 7. Review reply templates (5)

Rules (Play Console, Ratings and reviews, Reply; Ajay does it by hand; replies are public; UNVERIFIED reply length limit: Play documents 350 characters for review replies, keep every reply under 350):
- Use the player's issue, not a copy-paste. Replace `{...}`.
- Never ask for a higher rating. Never offer anything for a change of rating.
- No email in a reply except the support one. No personal data.
- Reply within 48 hours to 1 to 3 star reviews.

**R1. 5-star**
`Thank you, {name}! That makes our day. If you have an idea for Block Bloom, we would love to hear it at ajaywaghmare00a@gmail.com. Enjoy the combos!`
(~150 chars)

**R2. Bug report**
`Sorry about that, and thank you for telling us. Could you write to ajaywaghmare00a@gmail.com with your phone model and Android version, and what happened just before? We will look into it right away.`
(~200)
After a fix: `We fixed this in version {x.y.z}. Please update, and tell us if it still happens.`

**R3. Ads complaint**
`Thanks for being honest. Block Bloom is free and the ads pay for it. Rewarded ads are optional, and Remove Ads in the shop removes banners and ads between games. We are also working to show fewer, better-timed ads.`
(~215) Do not promise "fewer ads" if the interstitial test (E1) wins; edit to match what shipped.

**R4. Difficulty**
`Thanks for the feedback. Some boards can feel tough. Hold a piece over a spot to preview the clear, and clear a line early to make space. We keep tuning the difficulty, and your note helps.`
(~190) Gemini: confirm the game has a placement preview (the `Line Anticipation Glow` in the 1.15.0 notes shows highlights when a line is about to complete); if not, delete the "hold a piece" sentence.

**R5. Feature request**
`Thank you for the idea, {name}! We have added it to our list. We read every suggestion, and your review helps us choose what to build next.`
(~140) Only write "we have added it" if you really do add it to the list (Gemini keeps `growth/feature-requests.md`).

---

## 8. Release-note drafts (English; Gemini localizes into the 13 locales)

Play limit: 500 characters per language (Play Console release notes limit; UNVERIFIED in this session, the 1.15.1 notes in `tools/release-notes/vc39.json` are ~400 characters per language). Format: JSON array like `vc39.json`: `[{"language":"en-US","text":"..."}]`, bullets with `•`. Gemini: keep the file format; include `en-GB` as a copy of `en-US` if that locale is a listing language; check the list of 13 locales in `vc39.json`.
List only what is in the build. If an item is cut, delete its bullet. Version numbers from the roadmap section 9.

**vc40 · 1.16.0**
```
• A friendlier start: a shorter tutorial that gets you to your first line clear faster.
• Rewarded bonuses now show only when the ad is ready, so no more waiting.
• Lucky Chest now shows a READY badge.
• Remove Ads offer in the shop and the pause menu, for a quieter game.
• Aurora Bloom Festival: coins x2 from 27 Nov to 3 Dec.
• Fixes and smoother play.
```
Count 356. Gemini: the festival bullet only if the build or `live_events` carries it.

**vc41 · 1.17.0**
```
• New Daily Challenge card on the home screen, with your streak ladder.
• Gentler reminders: at most one a day, only when your streak is at risk.
• More ads fill when you ask for a bonus, so fewer "ad not ready" moments.
• Stability and speed fixes.
Thank you for playing and for your feedback!
```
Count 295. Staged 10% to 50% to 100% (new SDKs). Do not write "mediation" or network names.

**vc42 · 1.18.0**
```
• Winter Bloom: a limited-time winter event, 14 to 21 Dec, with a special challenge and rewards.
• Adventure now sits next to Classic on the home screen.
• A starter pack in the shop, if it ships (delete if not).
• Smoother play and small fixes.
Happy holidays from Block Bloom!
```
Count 279.

---

## 9. Landing page copy (ajay-waghmare.github.io/blockbloom)

Gemini builds it (static page in the notes/site repo; keep the page under 100 KB, no tracking scripts besides the plain UTM link; link the privacy policy `store/privacy-policy.html`). Mobile first.

**Page title (browser tab):** `Block Bloom: a relaxing block puzzle for Android`
**Meta description (155 max):** `Block Bloom is a calm 8x8 block puzzle for Android. Chain combos, play offline, and keep your daily streak. Free on Google Play.`

**Hero**
- H1: `Block Bloom`
- Subhead: `A calm block puzzle you can play anywhere, even without Wi-Fi.`
- Button: `Get it on Google Play` (use the official Google Play badge image and link rules; Ajay checks the badge guidelines, UNVERIFIED link: https://play.google.com/intl/en_us/badges/).
- Under the button, small: `Free to play. Contains ads. Optional purchase to remove ads.`
- Phone image: store screenshot `03-home` or `01-aurora-home`.

**Section 1: How it plays**
- H2: `Drag. Clear. Bloom.`
- Text: `Place blocks on an 8x8 board. Fill a row or a column and it clears. Clear more than one at once and your combo grows. No timer, no rush.`
- Image: `02-combo-gameplay`.

**Section 2: Why people stay**
- H2: `A reason to come back every day`
- Three short cards:
  1. `Daily Challenge. A fresh board and a new goal each day.`
  2. `Streaks. Play on consecutive days. At 7 days you earn a shield that forgives one missed day.`
  3. `Events. Limited-time festivals with bonus coins.`
- Images: `05-daily-challenge`, `04-lucky-chest`.

**Section 3: Play your way**
- H2: `Take your time`
- Text: `Classic mode for relaxed endless play. Adventure mode with levels. Unlock themes to change the look of your board.`
- Image: `06-theme-customization`, `03-saga-adventure`.

**Section 4: Offline**
- H2: `No Wi-Fi? No problem.`
- Text: `Block Bloom plays without internet. On a plane, on a train, or anywhere the signal is weak. (Ads and purchases need a connection.)`
- Show only after check 0.4 passes.

**Section 5: Honest and small**
- H2: `Free, and clear about how`
- Text: `Block Bloom is free. It shows ads, and some bonuses are optional rewarded ads. If you prefer no ads, Remove Ads is a one-time purchase. Made by one developer. Feedback helps: ajaywaghmare00a@gmail.com.`

**Footer**
- `Privacy Policy` (link to the hosted `privacy-policy.html`), `Contact`, `© 2026 Block Bloom`.
- Final button: `Get it on Google Play`.

Rules: no review quotes, no star count, no download count, no "#1". Headline numbers only if they come from the live store page at the time. Add the Play badge as an image with alt text `Get it on Google Play`. Gemini adds `<meta name="viewport">`, a `<title>` and alt text for every image.

---

## 10. UTM links (Ajay and Gemini)

Plain Play link in the store listing and Ads. For free channels use Play's referrer so GA4/Firebase and Play both see the source:

- Reddit: `{STORE_URL}&referrer=utm_source%3Dreddit%26utm_medium%3Dsocial%26utm_campaign%3Dfeedback_nov26`
- Shorts/Reels bio: `{STORE_URL}&referrer=utm_source%3Dshorts%26utm_medium%3Dsocial%26utm_campaign%3Dclips_nov26`
- Landing page: `{STORE_URL}&referrer=utm_source%3Dlanding%26utm_medium%3Dweb%26utm_campaign%3Dsite_nov26`

Gemini: confirm the app reads the install referrer into GA4 (Firebase Analytics collects `campaign_details` from the referrer by default on Play installs; UNVERIFIED for this app; check in GA4 DebugView after one test install).

---

## 11. Open points for Ajay and Gemini

1. Reddit rules are UNVERIFIED (see section 5). Ajay reads them before each post.
2. Offline claim: Gemini runs check 0.4 first.
3. Landscape video: depends on the manifest orientation.
4. Contact email public: Ajay confirms.
5. Old `MARKETING_PACK.md` claims are false today: Gemini marks the file "SUPERSEDED, do not use" in its next commit.
