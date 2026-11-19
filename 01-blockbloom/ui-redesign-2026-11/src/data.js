// The content every direction renders: taken from the live app (v1.12.11 screenshots, 19 Nov 2026) and the code
// (Skins.kt, Levels.kt, Events.kt, Lifelines). Same data in all four directions, so the difference is design only.
module.exports = {
  coins: 702, gems: 2, best: 917, streak: 2, version: "v1.12.11 (34)",
  modes: [
    { id: "easy", name: "Easy", sub: "Relaxed", best: 1240 },
    { id: "medium", name: "Medium", sub: "Classic", best: 917, on: true },
    { id: "hard", name: "Hard", sub: "1.5× score", best: 0, tag: "1.5×" },
  ],
  run: { score: 640, best: 917, combo: 3, moves: 41 },
  daily: { goal: "Score 700 in one run", short: "Score 700", coins: 220, gems: 2, left: "15h 22m", progress: 0.58, best: 406 },
  chest: { coins: 150, gems: 2, hammer: 1, freeIn: "3h 59m" },
  event: { name: "Weekend Cascade", effect: "+50% coins", mult: "×1.5", left: "4h 12m" },
  quests: [{ text: "Clear 15 lines", have: 9, need: 15, coins: 60 }, { text: "Use a lifeline", have: 1, need: 1, coins: 40, done: true }],
  lifelines: [
    { id: "undo", name: "Undo", icon: "undo", cost: 40, owned: 2 },
    { id: "hammer", name: "Hammer", icon: "hammer", cost: 75, owned: 1 },
    { id: "shuffle", name: "Shuffle", icon: "shuffle", cost: 60, owned: 0 },
  ],
  // 8x8 board: . empty, a violet, b teal, c pink, d yellow, e sky, f green. Row 3 completes with the ghost piece.
  board: ["..dd....", ".aad..bb", "eaa..fbb", "eccffff.", "e.ccb...", "aa.cbbdd", "aaff.edd", "bbffeee."],
  ghost: [[3, 7], [4, 7]], ghostColor: "e", clearRow: 3,
  tray: [
    { cells: [[0, 0], [1, 0]], color: "e", state: "dragging" },
    { cells: [[0, 0], [1, 0], [2, 0], [2, 1]], color: "c", state: "ok" },
    { cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]], color: "d", state: "nofit" },
  ],
  homePreview: ["c.a.", "bcab", "dbe.", "fd.e"],
  settings: {
    audio: [{ icon: "volume", name: "Sound effects", on: true }, { icon: "music", name: "Music", on: true }],
    moods: [
      { name: "Calm", sub: "Soft minor · the original Bloom", on: true },
      { name: "Bright", sub: "Major & uplifting" }, { name: "Lo-fi", sub: "Mellow & slow" },
      { name: "Pulse", sub: "Driving & energetic", lock: "500" },
    ],
    play: [
      { icon: "vibrate", name: "Vibration", sub: "Haptics: Medium", on: true },
      { icon: "eye", name: "Colour-blind patterns", sub: "Shapes on every block", on: false },
      { icon: "motion", name: "Reduce motion", sub: "Follows the system setting", on: false },
      { icon: "swap", name: "Left-handed tray", sub: "Lifelines on the left", on: false },
    ],
    notify: [{ icon: "bell", name: "Daily reminder", sub: "Every day at 7:30 PM", on: true }],
    account: [{ icon: "cloud", name: "Cloud save", value: "Google Play Games" }, { icon: "restore", name: "Restore purchases" }],
    help: [
      { icon: "globe", name: "Language", value: "English" }, { icon: "chart", name: "Statistics" },
      { icon: "book", name: "How to play" }, { icon: "heart", name: "Rate Block Bloom" },
      { icon: "shield", name: "Privacy policy" }, { icon: "gamepad", name: "More games by AW EagleCraft" },
    ],
  },
  calendar: { month: "November 2026", firstDow: 6, days: 30, today: 19, done: [3, 4, 5, 8, 11, 12, 16, 17, 18], missed: [6, 7, 9, 10, 13, 14, 15] },
  monthTrack: { done: 9, steps: [{ at: 3, coins: 100 }, { at: 7, coins: 250 }, { at: 15, gems: 5 }, { at: 25, chest: true }] },
  adventure: {
    cleared: 6, stars: 14, total: 24,
    regions: [{ name: "Petal Meadow", from: 1, to: 8 }, { name: "Crystal Lagoon", from: 9, to: 16 }, { name: "Sunset Ridge", from: 17, to: 24 }],
    starsBy: [3, 3, 2, 3, 1, 2],
    current: { n: 7, goal: "Clear 6 lines", moves: 25, coins: 110 },
  },
  shop: {
    featured: { title: "Starter Bloom Pack", items: "Remove ads · 1,500 coins · 10 gems", price: "₹149", was: "₹399", save: "-63%" },
    themes: [
      { name: "Classic", price: "Owned", state: "active", sw: ["#7C5CFF", "#2BD9C6", "#FF5C8A", "#FFC44D"] },
      { name: "High Contrast", price: "Free", state: "free", sw: ["#FFD60A", "#00B4FF", "#FF3B30", "#34C759"] },
      { name: "Candy Pop", price: "500", cur: "coin", sw: ["#FF8FB1", "#FFD36E", "#9CDBFF", "#B8F2A0"] },
      { name: "Deep Ocean", price: "1,200", cur: "coin", sw: ["#1E88E5", "#26C6DA", "#5C6BC0", "#80DEEA"] },
      { name: "Neon Night", price: "2,500", cur: "coin", sw: ["#FF2BD6", "#00F0FF", "#B6FF00", "#FFE600"] },
      { name: "Sunset", price: "Watch ad", cur: "ad", sw: ["#FF7A59", "#FFB347", "#FF5E8A", "#C86BFA"] },
      { name: "Galaxy", price: "50", cur: "gem", tag: "Premium", sw: ["#8B5CF6", "#22D3EE", "#F472B6", "#FDE68A"] },
    ],
    boosts: [
      { name: "Lifeline Pack", sub: "5 Hammers · 5 Shuffles · 5 Undos", price: "10", tag: "Best value", icon: "bolt" },
      { name: "10 Hammers", sub: "Smash any single block", price: "10", icon: "hammer" },
      { name: "10 Shuffles", sub: "Re-roll a stuck tray", price: "8", icon: "shuffle" },
    ],
    coinPacks: [{ amt: "500", price: "10" }, { amt: "1,500", price: "25", tag: "+20%" }],
    gems: [{ amt: 50, price: "₹49" }, { amt: 150, price: "₹129", tag: "Popular" }, { amt: 500, price: "₹349", tag: "Best value" }],
    free: { coins: 100, left: "2 of 5 left today" },
  },
  trophies: {
    done: 3, total: 11,
    list: [
      { name: "Strategist", desc: "Use 10 lifelines", have: 10, need: 10, coins: 300, claim: true, tier: "silver" },
      { name: "High Roller", desc: "Score 1,000 in one game", have: 917, need: 1000, coins: 300, tier: "gold" },
      { name: "Combo Starter", desc: "Reach a 5× combo", have: 4, need: 5, coins: 250, tier: "bronze" },
      { name: "Coin Collector", desc: "Earn 5,000 coins in total", have: 2535, need: 5000, gems: 3, tier: "silver" },
      { name: "Regular", desc: "Play 100 games", have: 28, need: 100, coins: 800, gems: 3, tier: "silver" },
      { name: "Bloomer", desc: "Clear 1,000 lines", have: 130, need: 1000, coins: 600, gems: 2, tier: "silver" },
      { name: "Sprout", desc: "Clear 100 lines", have: 100, need: 100, coins: 200, done: true, tier: "bronze" },
      { name: "Getting Started", desc: "Play 10 games", have: 10, need: 10, coins: 150, done: true, tier: "bronze" },
    ],
  },
};
