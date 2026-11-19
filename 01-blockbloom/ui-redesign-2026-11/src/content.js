// The words of the document: audit findings, principles, direction notes, scorecard, plan, KPIs, spec checklist.
// Severity: H = high (hurts play or money now), M = medium, L = low (polish).
const AUDIT = [
  { n: 1, id: "home", verdict: "Everything is on the screen and nothing leads: the first decision is hard.", title: "Home", img: "01.png", w: 229, h: 800, cols: 1, items: [
    ["H", "Eleven blocks compete on one screen (Continue, New Game, three modes, Daily, Chest, three tiles, event, Remove Ads). Nothing says what to do first.", "One hero action (Continue / Play), the mode as a small segmented control, the rest as compact secondary tiles."],
    ["H", "Adventure, Shop and Achievements are tiles near the bottom of a scroll. There is no persistent navigation.", "A bottom navigation bar (Home · Adventure · Shop · Trophies) with badges for rewards waiting."],
    ["M", "“New Game” sits right under “Continue” at the same size: one wrong tap ends a run.", "A secondary icon button, with a confirm step when a run is in progress."],
    ["M", "The mode row (three large cards plus a description line) takes about a fifth of the screen for a choice most players make once.", "Segmented control; show the best score per mode."],
    ["M", "“Weekend Cascade · Ends today”: no time left, no call to action.", "A live countdown (4h 12m) and the ×1.5 shown on coin rewards while it runs."],
    ["M", "The chest takes a full-width row to say “READY!”.", "A compact tile that glows when ready and shows a timer when not."],
    ["L", "An unlabelled star icon top right; currency pills have no “+” to buy more.", "Remove or label the star; add “+” to the pills (opens the Shop tab)."],
    ["L", "Emoji icons (🌱 ⭐ 🔥) next to line icons; the logo art is small and static.", "One icon family; an animated hero board that respects Reduce motion."],
    ["L", "“Remove Ads” floats as a text link at the very bottom.", "Move it to the Shop (featured) and Settings."],
  ] },
  { n: 2, id: "game", verdict: "The board works; the frame around it costs space, attention and trust.", title: "Gameplay", img: "02.png", w: 1080, h: 2448, cols: 1, items: [
    ["H", "A shopping banner ad sits right under the piece tray: accidental taps, a cheap look, and an ad next to game controls is a Play policy risk.", "No banner during play. Monetise at natural breaks (rewarded continue, chest), or keep the banner above the HUD with clear separation."],
    ["H", "Lifelines show only an icon and a price (40 / 75 / 60): no name, no owned count, no disabled state.", "Name + owned badge (“Free” while owned) + price, and a disabled style when coins are short."],
    ["H", "Tray pieces are drawn at about a quarter of a board cell and float far below the board; an empty slot looks like a bug.", "Three fixed slots, pieces at about 65% of a cell, a dashed socket for the piece being placed, a “No space” state for pieces that cannot fit."],
    ["M", "“Drag a block to the grid — or tap a block, then tap the grid” stays on screen all game.", "Show it in the first two games (onboarding), then hide it."],
    ["M", "Seven items crowd the top bar, and the home button leaves the run in one tap.", "A pause button (resume, restart, sound, music, home with confirm); keep score, best, mode and the event bonus."],
    ["M", "No placement preview and no hint of which lines will clear.", "A ghost piece under the finger and a glowing bar on the rows or columns that will clear, with the points."],
    ["L", "Empty cells are close to the board colour; colour alone tells blocks apart.", "An inner bevel on empty cells; optional colour-blind patterns."],
    ["L", "No combo feedback while playing.", "A combo meter under the score (“Combo ×3 · +60 next clear”)."],
  ] },
  { n: 3, id: "settings", verdict: "Complete for audio, thin for everything else players look for.", title: "Settings", img: "03.png", w: 540, h: 1879, cols: 1, items: [
    ["M", "Unselected music moods show a crossed-out note: it reads as “muted” or “broken”.", "Mood cards with a play button to preview, a tick on the selected one, a lock and price when locked."],
    ["M", "Help & About rows end in a dot instead of a chevron; Language shows no current value.", "Chevrons, and the current value on the right (“English”)."],
    ["M", "Settings players expect are missing: restore purchases, cloud save, reminder time, colour-blind mode, reduce motion (already supported in code), left-handed layout, haptics strength.", "Add them in clear groups: Sound · Music mood · Gameplay & accessibility · Notifications · Account · Help."],
    ["L", "One long list where every row has the same weight.", "Section headers and grouped cards."],
    ["L", "The version line is tiny and alone at the bottom.", "Keep it in the header; add Support / Contact."],
  ] },
  { n: 4, id: "daily", verdict: "A calendar where the challenge should be.", title: "Daily challenge", img: "04.png", w: 1080, h: 2400, cols: 1, items: [
    ["H", "The screen opens on an empty calendar (“No challenges completed this month yet”): today's challenge, reward and timer are not here.", "Today's challenge first: goal, reward, time left, your best attempt, Play."],
    ["M", "Days have no states.", "Completed (bloom mark), missed (dot), today (ring), future (dimmed), with a legend."],
    ["M", "Nothing rewards coming back through the month.", "A month streak track with milestone rewards at 3, 7, 15 and 25 days."],
    ["L", "The forward arrow browses empty future months.", "Disable it past the current month."],
  ] },
  { n: 5, id: "chest", verdict: "A good moment, with one path and mixed signals.", title: "Lucky Bloom Chest", img: "05.png", w: 1080, h: 2400, cols: 1, items: [
    ["M", "Home calls it a “Mystery Booster Chest”; the dialog lists the exact rewards.", "One story: show “possible rewards”, or reveal them after opening."],
    ["M", "Watching an ad is the only way to open it, and the video length is not said.", "Add a free timer path (“or open free in 3h 59m”); say “about 30 seconds”."],
    ["L", "“Close” is plain text far below the button.", "An × in the corner and a quiet “Not now”."],
    ["L", "Opening is not celebrated.", "Chest burst, rewards fly to the counters, a light haptic."],
  ] },
  { n: 6, id: "adventure", verdict: "A grid of padlocks where a journey should be.", title: "Adventure", img: "06.png", w: 1080, h: 2400, cols: 1, items: [
    ["H", "A flat 4 × 6 grid of padlocks: no journey, no destination, nothing to look forward to.", "A path through named regions (Petal Meadow, Crystal Lagoon, Sunset Ridge) with level nodes."],
    ["M", "A level tile shows no goal, moves or reward.", "A level card: goal, moves, reward, stars, Play."],
    ["M", "Progress is only “0 / 24 cleared”.", "A region progress bar and total stars (14 / 72)."],
    ["L", "23 identical locked tiles feel like a wall.", "Show the next levels on the path, and a milestone chest every 8 levels."],
  ] },
  { n: 7, id: "shop", verdict: "Everything for sale in one list, with broken labels.", title: "Shop", img: "07.png", w: 540, h: 3002, cols: 2, items: [
    ["H", "Badges wrap letter by letter (“BEST VALU E”, “BES T VAL UE”): visibly broken.", "Fixed-width ribbons that never wrap, with short labels."],
    ["H", "One long list mixes themes, power-ups, coin packs, gems and Remove Ads; the best offers sit below the fold.", "Tabs (Featured · Themes · Boosts · Gems) with a featured offer on top."],
    ["M", "Themes, the main cosmetic sale, get small thumbnails in a list.", "Two-column theme cards with a larger preview and clear states (Active, Use, price, Free with ad)."],
    ["M", "Coin, gem and rupee prices all look the same.", "A distinct style per currency; show the bonus on bigger packs."],
    ["L", "“Free Coins Gift” shows no daily limit or cooldown.", "“2 of 5 left today”."],
    ["L", "No “Restore purchases”.", "Add it to the Shop footer and Settings."],
  ] },
  { n: 8, id: "trophies", verdict: "Progress is tracked; rewards are not celebrated.", title: "Achievements", img: "08.png", w: 540, h: 2016, cols: 1, items: [
    ["H", "The title wraps (“Achieveme / nts”) because of the currency pills.", "A shorter title (“Trophies”) and a header that flexes; test with German and the other locales."],
    ["M", "Completed items only show a tick: there is no claim moment.", "A Claim button with the reward, and “Claim all” at the top."],
    ["M", "Items in progress show a padlock although they are not locked.", "Tier medals (bronze, silver, gold) with progress; padlocks only for hidden ones."],
    ["L", "No summary or grouping.", "A summary ring (3 of 11) and filters (All · In progress · Completed)."],
  ] },
];

const GLOBAL = [
  ["Mixed icon styles", "Emoji, filled and line icons side by side make the app look assembled rather than designed."],
  ["Low-contrast secondary text", "Lilac text on purple falls below WCAG AA (4.5:1) at small sizes."],
  ["No shared component set", "Four card styles and three button shapes across eight screens."],
  ["Text that breaks", "“BEST VALU E”, “Achieveme nts”: fixed widths will break further in German, Arabic and the CJK locales."],
  ["Colour-only meaning", "Six block colours with no shape cue; about 1 in 12 men is colour-blind."],
  ["Small touch targets", "Several top-bar icons are under 48 dp."],
];

const PRINCIPLES = [
  ["One primary action", "Every screen has one obvious next step; everything else is visibly secondary."],
  ["Persistent navigation", "A bottom bar for Home · Adventure · Shop · Trophies, with badges for rewards waiting."],
  ["Design tokens", "One source for colour, type, radius, elevation and motion. Each direction in this document is one token set."],
  ["Type scale", "Display 40 / 32 / 24 · Title 18 · Body 15 · Caption 12. Numbers use tabular figures so scores do not jump."],
  ["Contrast & colour", "Text at least 4.5:1. Never colour alone: colour-blind patterns as an option."],
  ["One icon family", "Line icons 24 dp, 2 px stroke; illustrated art only for currencies and rewards."],
  ["Motion", "150–300 ms, ease-out. Line-clear burst, combo shake, coins fly to the counter. Reduce motion turns it down."],
  ["Haptics & sound", "Light tick on place, medium on clear, strong on combo ×3+. Intensity setting; sounds follow the music mood."],
  ["Accessibility", "48 dp targets, text scaling to 130%, TalkBack labels, left-handed tray option."],
  ["13 languages", "Arabic mirrors right-to-left; leave 30% room for longer text; never a fixed-width label; CJK fallback fonts."],
  ["Fair monetisation", "Rewarded ads opt-in and labelled with their length; no ads next to controls; interstitials only at natural breaks, capped; restore purchases."],
  ["Performance", "60 fps on low-end phones: no live blur below Android 12, block art pre-rendered once per colour and size."],
];

const SHARED = {
  home: "One primary action (Continue), modes as a segmented control, Daily and Chest as tiles, a live event countdown, bottom navigation with badges.",
  game: "Pause instead of Home, ghost piece and line-clear bar, three fixed tray slots with a “No space” state, labelled lifelines with owned counts; no banner near the tray.",
  settings: "Grouped sections, mood cards with preview and lock price, accessibility toggles, cloud save and restore purchases, chevrons with current values.",
  daily: "Today's challenge first (goal, reward, timer, best attempt), a month streak track with milestone rewards, calendar states with a legend.",
  chest: "A clear “free with a short video” path plus a free timer path, labelled rewards, close in the corner.",
  adventure: "A path through named regions, stars per level, a milestone chest, and a level card with goal, moves and reward.",
  shop: "Tabs, a featured offer with its saving, theme cards with previews and clear states, ribbons that never wrap, free coins with a daily limit.",
  trophies: "A summary with Claim all, claimable items first with a Claim button, tier medals, progress with numbers, no padlocks on items in progress.",
};

const DIRECTIONS = {
  aurora: {
    title: "Aurora Glass", line: "Today's plum and teal, lit from within.",
    concept: "The evolution of the current look. Players keep the colours they know; the app gains depth: glass panels, an aurora sky, glossy jelly blocks with a soft glow, and a teal call to action that is already the brand colour.",
    mood: ["Calm", "Luminous", "Modern"], best: "The new default. Lowest migration risk: the icon, store art and Classic skin already match.",
    effort: "Low–medium", fonts: ["Fredoka", "Outfit"],
    palette: [["Night plum", "#1B1038"], ["Deep", "#100826"], ["Violet", "#7C5CFF"], ["Teal", "#2DE2CE"], ["Pink", "#FF5C8A"], ["Gold", "#FFC44D"]],
    notes: {
      home: "A tilted live board in a glass hero; teal Continue; a floating glass dock.",
      game: "Jelly-gloss blocks with a soft glow; a teal line-clear bar; glass lifeline chips.",
      settings: "Glass cards on the aurora sky; teal toggles; mood cards that preview.",
      daily: "A violet-to-teal hero card; bloom marks on completed days.",
      chest: "Golden rays behind the chest; a teal “Watch to open” with the ad icon.",
      adventure: "A dotted light path; violet nodes; the current level in teal with a halo.",
      shop: "A sunset-gradient featured offer; theme swatches on dark glass.",
      trophies: "A progress ring and gold trophy; the claimable row outlined in teal.",
    },
  },
  royal: {
    title: "Royal Bloom", line: "A royal garden: jewels, gold and ornament.",
    concept: "A luxury puzzle look. Faceted jewel blocks feel valuable, double gold frames say premium, and the garden crest ties back to the name. Strong as a paid theme or a season reward.",
    mood: ["Luxurious", "Classic", "Rewarding"], best: "A premium full-UI theme or season pass; players who spend.",
    effort: "Medium (ornament assets)", fonts: ["Cinzel", "Manrope"],
    palette: [["Emerald night", "#0E2A22"], ["Velvet plum", "#3B1140"], ["Gold", "#F2CF72"], ["Ruby", "#E8336E"], ["Sapphire", "#3B8CF6"], ["Amethyst", "#8E5CF7"]],
    notes: {
      home: "A gold crest and wordmark, a framed jewel board with plaques, medallion modes, a velvet event ribbon.",
      game: "Faceted jewel blocks set in gold; gold-coin lifelines; a plum velvet tray.",
      settings: "Lacquered panels with double gold borders; Cinzel headings.",
      daily: "“Today's decree”; gold-coin days on dark velvet.",
      chest: "An ornate double frame; a gold metallic call to action.",
      adventure: "Gold-coin level nodes on a dotted gold trail; a ruby current level.",
      shop: "A plum-and-gold offer card; gold price buttons.",
      trophies: "Gold-framed rows with the medals as the hero.",
    },
  },
  neon: {
    title: "Neon Pulse", line: "Arcade energy: light on black.",
    concept: "Competitive and fast. A HUD language with stat tiles, a difficulty heat bar and a missions panel; neon-tube blocks; a synthwave floor. It matches the Pulse music mood and Hard mode, and it pops in YouTube Shorts.",
    mood: ["Electric", "Competitive", "Fast"], best: "Hard mode, the Pulse mood, timed modes and younger players; short-video creatives.",
    effort: "Medium (glow budget on low-end phones)", fonts: ["Orbitron", "Chakra Petch"],
    palette: [["Void", "#05060F"], ["Cyan", "#00F0FF"], ["Magenta", "#FF2BD6"], ["Lime", "#B6FF00"], ["Yellow", "#FFE600"], ["Violet", "#A259FF"]],
    notes: {
      home: "HUD stat tiles, a difficulty heat bar, a missions panel and a synthwave floor.",
      game: "Neon-tube blocks on a dark grid; a digital score; a lime clear bar.",
      settings: "Cyan HUD panels; uppercase labels with wide tracking.",
      daily: "Lime day markers; a magenta-to-cyan Play button.",
      chest: "A magenta frame with cyan rays; a gradient call to action.",
      adventure: "A circuit-style dashed path; lime square nodes; a magenta current level.",
      shop: "A neon gradient offer; glowing price chips.",
      trophies: "A cyan progress ring; HUD rows.",
    },
  },
  clay: {
    title: "Petal Pop", line: "Soft 3D clay in daylight.",
    concept: "Bright, tactile and friendly. A light theme for players who find dark interfaces heavy; puffy candy blocks you want to squeeze; big chunky buttons. The strongest contrast for store screenshots and ads.",
    mood: ["Cheerful", "Tactile", "Cozy"], best: "A broad casual audience, daytime play, a light-mode option, and user-acquisition creatives.",
    effort: "Medium (a light theme on every screen)", fonts: ["Baloo 2", "Nunito"],
    palette: [["Lavender mist", "#F5EEFF"], ["Peach", "#FFF7EF"], ["Ink", "#2C2254"], ["Teal", "#14B8A6"], ["Violet", "#7C5CFF"], ["Candy pink", "#FF6B9A"]],
    notes: {
      home: "A clay logo with floating candy blocks; a big tactile Continue; a raised nav bubble.",
      game: "Puffy clay blocks in soft wells; chunky round lifelines; an amber clear bar.",
      settings: "White clay cards on a pastel sky; friendly rounded type.",
      daily: "A lavender-to-pink hero; plum completed days.",
      chest: "A white clay dialog with sunny rays.",
      adventure: "A thick white road; the current level as an amber button.",
      shop: "A candy-gradient offer; clay theme cards.",
      trophies: "A lilac hero with the trophy; soft progress bars.",
    },
  },
};

const SCORE = {
  criteria: ["Premium feel", "Readability & accessibility", "Brand continuity", "Build effort (5 = least)", "Low-end performance", "Sells as a shop theme", "Store & video appeal"],
  aurora: [4, 4, 5, 5, 4, 2, 4], royal: [5, 3, 2, 3, 4, 5, 4], neon: [4, 3, 3, 3, 3, 4, 5], clay: [4, 5, 3, 3, 4, 4, 5],
};

const PLAN = [
  { p: "P0", name: "Quick wins", when: "Next release · 1–2 days", items: ["Fix the Shop ribbons and the Achievements title wrap", "Chevrons and current values in Settings", "Names and owned counts on lifelines; disabled when coins are short", "Hide the gameplay hint after two games", "No banner next to the tray during play", "Pause menu instead of the Home button", "Event countdown; one story for the chest (“possible rewards”)"] },
  { p: "P1", name: "Core structure", when: "1–2 releases", items: ["New Home: one Continue, segmented modes, Daily and Chest tiles", "Bottom navigation with badges", "Gameplay HUD: combo meter, ghost piece, line-clear bar, tray slot states", "Daily challenge hero, calendar states, month streak track", "Chest free timer path"] },
  { p: "P2", name: "Depth", when: "2 releases", items: ["Adventure path map with regions and milestone chests", "Shop tabs, featured offer, theme cards, restore purchases", "Trophies claim flow, tiers, summary and filters", "Accessibility toggles: colour-blind patterns, left-handed tray, haptics strength"] },
  { p: "P3", name: "Visual system", when: "2–3 releases", items: ["Design tokens + BlockStyle renderer in Compose", "Aurora Glass as the default UI", "Royal Bloom, Neon Pulse and Petal Pop as full-UI shop themes", "Motion and haptics pass; RTL and long-text pass for all 13 locales"] },
];

const COMPOSE = [
  ["BloomTokens", "A data class of colours, type, shapes, elevations and motion, provided through a CompositionLocal. One instance per direction."],
  ["BlockStyle", "A sealed interface with Jelly (Aurora), Gem (Royal), NeonTube (Neon) and Clay (Petal Pop); each draws on Canvas and is cached as an ImageBitmap per colour and size."],
  ["Components", "CurrencyPill · PrimaryCta · ModeSegmented · FeatureTile · EventStrip · BloomBottomNav · LifelineButton · TraySlot · ProgressTrack · RewardChip · ClaimRow."],
  ["Glass without blur", "RenderEffect blur exists only from Android 12 (API 31): use layered gradients for glass so older phones look the same."],
  ["Motion & haptics", "Keep the existing reduce-motion hook; add HapticFeedback with an intensity setting."],
  ["RTL & long text", "LayoutDirection.Rtl for Arabic (mirror the nav and progress), flexible rows, ellipsis only as a last resort."],
];

const KPIS = [
  ["D1 / D7 retention", "New Home and bottom navigation; Daily challenge first"],
  ["Daily-challenge starts per DAU", "Hero card with reward and timer"],
  ["Lifelines used per game · coins spent", "Labels, owned counts, disabled states"],
  ["Adventure levels per player", "Path map, level card, milestone chests"],
  ["Shop visits · IAP conversion · theme purchases", "Tabs, featured offer, theme cards, full-UI themes"],
  ["Rewarded views per DAU", "Clear chest and free-coin paths"],
  ["Session length · games per session", "No banner during play, pause menu, combo feedback"],
  ["Crash-free users · ANR · janky frames", "Guardrails for every release"],
];

const TESTS = [
  ["New Home vs current", "Remote Config flag; 50 / 50 on new installs; primary metric D1 retention."],
  ["Petal Pop light default vs Aurora Glass", "One market first; D1 retention and session length."],
  ["No banner during play", "Session length and games per session against banner revenue."],
  ["Lifeline labels and owned counts", "Lifeline use and the coin sink per game."],
];

const SPEC = {
  home: ["Continue is the one primary action; it shows mode and score of the run in progress, or “Play” when none", "New game is a secondary button and asks before discarding a run", "Modes: Easy · Medium · Hard (×1.5) as a segmented control, best score per mode", "Daily tile: goal, reward, % of goal, time left", "Chest tile: “Ready” glow, or a timer", "Event strip with a live countdown and the bonus", "Currency pills with “+” that open the Shop", "Bottom navigation with badges; no star icon without a label"],
  game: ["Pause button opens resume · restart · sound · music · home (confirm)", "Score, best, mode chip and event chip in the HUD", "Combo meter with the next-clear bonus", "Ghost piece and a line-clear bar with points", "Three fixed tray slots; dashed socket while placing; “No space” on pieces that cannot fit", "Lifelines show name, owned count or price, disabled when unaffordable", "No banner ad near the tray; hint text only in the first two games"],
  settings: ["Sound and music toggles", "Mood cards: preview, selected tick, lock with price", "Vibration with strength, colour-blind patterns, reduce motion, left-handed tray", "Daily reminder with time", "Cloud save and restore purchases", "Help rows with chevrons and current values; version in the header"],
  daily: ["Today's challenge card first: goal, reward, time left, best attempt, Play", "Month streak track with rewards at 3 · 7 · 15 · 25 days", "Calendar states: completed · missed · today · future, with a legend", "Forward arrow disabled past the current month"],
  chest: ["Possible rewards labelled with amounts", "Primary: watch a short video (length stated)", "Secondary: open free when the timer ends", "× in the corner; rewards fly to the counters on open"],
  adventure: ["Path map with named regions of 8 levels", "Stars under cleared levels; locked levels quiet", "Milestone chest every 8 levels", "Level card: goal, moves, reward, stars, Play", "Region progress and total stars"],
  shop: ["Tabs: Featured · Themes · Boosts · Gems", "Featured offer with its saving and time left", "Theme cards in two columns: preview, name, state (Active · Use · price · Free with ad)", "Ribbons that never wrap", "Free coins with the daily limit", "Distinct coin, gem and rupee price styles; Restore purchases in the footer"],
  trophies: ["Title “Trophies” that fits every locale", "Summary ring, rewards waiting, Claim all", "Filters: All · In progress · Completed", "Claimable items first with a Claim button", "Tier medals with progress numbers; no padlocks on items in progress"],
};

module.exports = { AUDIT, GLOBAL, PRINCIPLES, SHARED, DIRECTIONS, SCORE, PLAN, COMPOSE, KPIS, TESTS, SPEC };
