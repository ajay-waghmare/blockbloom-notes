// Screen markup for the four directions. Same information architecture everywhere (the UX fixes from the audit);
// each direction gets its own layout touches and its whole visual language from css-variants.js.
const { ic, art } = require("./icons");
const D = require("./data");

const COL = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
const fmt = (n) => Number(n).toLocaleString("en-US");
const blk = (ch, extra = "") => `<i class="blk c${COL[ch]} ${extra}"></i>`;

// ---------- shared pieces ----------
const sys = `<span class="sys"><svg viewBox="0 0 18 12"><path d="M1 11h2V8H1zM5 11h2V6H5zM9 11h2V4H9zM13 11h2V1h-2z" fill="currentColor"/></svg><svg viewBox="0 0 16 12"><path d="M8 11.5 1 4.3a10 10 0 0 1 14 0z" fill="currentColor"/></svg><svg viewBox="0 0 26 12"><rect x="1" y="1" width="21" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><rect x="3" y="3" width="15" height="6" rx="1.5" fill="currentColor"/><rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".55"/></svg></span>`;
const status = () => `<div class="status"><span class="time">9:41</span><span class="cam"></span>${sys}</div>`;

const pill = (kind, value, plus = true) => `<div class="pill cur ${kind}">${art(kind)}<b>${value}</b>${plus ? `<i class="plus">${ic("plusb")}</i>` : ""}</div>`;
const curs = (plus = true) => `<div class="curs">${pill("coin", fmt(D.coins), plus)}${pill("gem", D.gems, plus)}</div>`;
const reward = (coins, gems, extra = "") => `<span class="rw">${coins ? `<span class="rwi">${art("coin")}${fmt(coins)}</span>` : ""}${gems ? `<span class="rwi">${art("gem")}${gems}</span>` : ""}${extra}</span>`;

function header(title, opts = {}) {
  return `<div class="hdr"><button class="iconbtn back">${ic("back")}</button><h2 class="ttl">${title}</h2>${opts.right !== undefined ? opts.right : curs(false)}</div>`;
}

function nav(V, active) {
  const items = [["home", "Home", "home"], ["adventure", "Adventure", "map"], ["shop", "Shop", "bag"], ["trophies", "Trophies", "trophy"]];
  return `<nav class="nav">${items.map(([id, label, icon]) => `<div class="nv ${id === active ? "on" : ""}">${ic(icon)}<span>${label}</span>${id === "trophies" ? '<i class="dot">1</i>' : ""}${id === "shop" ? '<i class="dot new">NEW</i>' : ""}</div>`).join("")}</nav>`;
}

function board(opts = {}) {
  const rows = opts.rows || D.board;
  const ghost = new Set((opts.ghost === false ? [] : D.ghost).map(([r, c]) => r + "," + c));
  const n = rows[0].length;
  let cells = "";
  rows.forEach((row, r) => [...row].forEach((ch, c) => {
    const key = r + "," + c;
    const clr = opts.clear !== false && r === D.clearRow ? " clr" : "";
    if (ghost.has(key)) cells += `<div class="cell${clr}">${blk(D.ghostColor, "ghost")}</div>`;
    else cells += `<div class="cell${clr}">${ch === "." ? "" : blk(ch)}</div>`;
  }));
  const bar = opts.clear !== false ? `<i class="clrbar" style="--row:${D.clearRow}"></i>` : "";
  return `<div class="board ${opts.cls || ""}" style="--n:${n}"><div class="bgrid">${cells}${bar}</div></div>`;
}

function piece(p) {
  const h = Math.max(...p.cells.map((c) => c[0])) + 1, w = Math.max(...p.cells.map((c) => c[1])) + 1;
  return `<div class="piece" style="--w:${w};--h:${h}">${p.cells.map(([r, c]) => `<i class="blk c${COL[p.color]}" style="grid-row:${r + 1};grid-column:${c + 1}"></i>`).join("")}</div>`;
}

function tray() {
  return `<div class="tray">${D.tray.map((p) => {
    if (p.state === "dragging") return `<div class="slot used"><span class="sock"></span><em>Placing…</em></div>`;
    return `<div class="slot ${p.state}">${piece(p)}${p.state === "nofit" ? `<em class="nofit">${ic("close")}No space</em>` : ""}</div>`;
  }).join("")}</div>`;
}

function lifelines(V) {
  return `<div class="lifes">${D.lifelines.map((l) => {
    const owned = l.owned > 0;
    return `<div class="life ${owned ? "" : "buy"}"><span class="lico">${ic(l.icon)}${owned ? `<i class="own">${l.owned}</i>` : ""}</span><span class="lname">${l.name}</span><span class="lcost">${owned ? "Free" : `${art("coin")}${l.cost}`}</span></div>`;
  }).join("")}</div>`;
}

function toggle(on) { return `<span class="tgl ${on ? "on" : ""}"><i></i></span>`; }

// ---------- HOME (one layout per direction) ----------
function homeAurora(V) {
  return `
  <div class="top">${`<div class="chipx streak">${ic("flame")}<b>2</b><span>days</span></div>`}<div class="sp"></div>${curs()}<button class="iconbtn">${ic("gear")}</button></div>
  <div class="brand">${art("logo", "logo")}<h1 class="word"><span>BLOCK</span><span class="w2">BLOOM</span></h1><p class="tag">Drop · Clear · Bloom</p></div>
  <div class="hero">
    <div class="glowring"></div>${board({ rows: ["c.a.bd", "bcab.d", "dbe.fc", "fd.eaa", ".fcdb.", "ab.ce."], ghost: false, clear: false, cls: "mini" })}
    <div class="herostat"><span>BEST · MEDIUM</span><b>${D.best}</b></div>
  </div>
  <div class="seg">${D.modes.map((m) => `<div class="sg ${m.on ? "on" : ""}">${m.name}${m.tag ? `<i>${m.tag}</i>` : ""}</div>`).join("")}</div>
  <div class="ctarow"><button class="btn primary big">${ic("play")}<span><b>Continue</b><small>Medium · score ${D.run.score}</small></span></button><button class="btn square" title="New game">${ic("restore")}</button></div>
  <div class="tiles">
    <div class="tile daily"><div class="tl-h">${ic("calendar")}<span>Daily challenge</span></div><b class="tl-goal">${D.daily.short}</b><div class="ring" style="--p:${D.daily.progress}"><span>58%</span></div>${reward(D.daily.coins, D.daily.gems)}<small class="timer">${ic("clock")}${D.daily.left}</small></div>
    <div class="tile chest">${art("chest", "chestart")}<b class="tl-goal">Lucky chest</b><span class="ready">${ic("sparkle")}Ready to open</span></div>
  </div>
  <div class="event">${ic("bolt")}<span><b>${D.event.name}</b> · ${D.event.effect}</span><em>${ic("clock")}${D.event.left}</em></div>
  ${nav(V, "home")}`;
}

function homeRoyal(V) {
  return `
  <div class="top"><div class="medal streak">${ic("flame")}<b>2</b></div><div class="sp"></div>${curs()}<button class="iconbtn">${ic("gear")}</button></div>
  <div class="crest">${art("crown", "crown")}<h1 class="word">BLOCK BLOOM</h1><div class="flourish"><i></i>${ic("bloom")}<i></i></div><p class="tag">The Royal Garden Puzzle</p></div>
  <div class="frame">${board({ rows: ["c.a.bd", "bcab.d", "dbe.fc", "fd.eaa", ".fcdb."], ghost: false, clear: false, cls: "mini" })}<div class="plaques"><div class="plq"><span>Best</span><b>${D.best}</b></div><div class="plq"><span>Streak</span><b>2 days</b></div><div class="plq"><span>Mode</span><b>Medium</b></div></div></div>
  <div class="medals">${D.modes.map((m) => `<div class="md ${m.on ? "on" : ""}"><span class="coinmd">${m.id === "easy" ? ic("bloom") : m.id === "medium" ? ic("starf") : ic("flame")}</span><b>${m.name}</b>${m.tag ? `<i>${m.tag}</i>` : `<small>${m.sub}</small>`}</div>`).join("")}</div>
  <button class="btn primary big gold"><span class="gl">${ic("play")}</span><span><b>Continue</b><small>Score ${D.run.score} · Medium</small></span></button>
  <div class="twin">
    <div class="decree"><div class="dh">${ic("calendar")}Today's decree</div><b>${D.daily.short}</b>${reward(D.daily.coins, D.daily.gems)}<div class="bar"><i style="width:58%"></i></div><small>${ic("clock")}${D.daily.left}</small></div>
    <div class="vault">${art("chest", "chestart")}<b>Lucky chest</b><span class="ready">Ready</span></div>
  </div>
  <div class="ribbon"><span>${ic("bolt")}${D.event.name} · ${D.event.effect}</span><em>${D.event.left}</em></div>
  ${nav(V, "home")}`;
}

function homeNeon(V) {
  return `
  <div class="grid-floor"></div>
  <div class="top"><div class="hudtag">${ic("flame")}<span>STREAK</span><b>02</b></div><div class="sp"></div>${curs()}<button class="iconbtn">${ic("gear")}</button></div>
  <div class="brand"><h1 class="word"><span>BLOCK</span><span class="w2">BLOOM</span></h1><p class="tag">DROP // CLEAR // BLOOM</p></div>
  <div class="stats"><div class="st"><span>BEST</span><b>${D.best}</b></div><div class="st"><span>MAX COMBO</span><b>4×</b></div><div class="st"><span>TODAY</span><b>3 runs</b></div></div>
  <div class="diff"><div class="dl"><span>DIFFICULTY</span><b>MEDIUM</b></div><div class="heat"><i class="k on"></i><i class="k on"></i><i class="k on"></i><i class="k"></i><i class="k"></i></div><div class="dm"><span>EASY</span><span class="on">MED</span><span>HARD ×1.5</span></div></div>
  <div class="ctas"><button class="btn primary big">${ic("play")}<span><b>CONTINUE RUN</b><small>SCORE ${D.run.score} · MEDIUM</small></span></button><button class="btn ghost">${ic("restore")}NEW</button></div>
  <div class="missions"><div class="mh"><span>MISSIONS</span><em>3 ACTIVE</em></div>
    <div class="ms"><span class="mi">${ic("calendar")}</span><span class="mtx"><b>DAILY · ${D.daily.short.toUpperCase()}</b><small>${D.daily.coins} COINS + ${D.daily.gems} GEMS · ${D.daily.left}</small></span><span class="mp">58%</span></div>
    <div class="ms hot"><span class="mi">${ic("gift")}</span><span class="mtx"><b>LUCKY CHEST</b><small>FREE REWARD READY</small></span><span class="mp go">OPEN</span></div>
    <div class="ms"><span class="mi">${ic("target")}</span><span class="mtx"><b>QUEST · CLEAR 15 LINES</b><small>9 / 15 · +60 COINS</small></span><span class="mp">60%</span></div></div>
  <div class="ticker">${ic("bolt")}<span>WEEKEND CASCADE · ${D.event.mult} COINS</span><em>04:12:09</em></div>
  ${nav(V, "home")}`;
}

function homeClay(V) {
  return `
  <div class="clouds"><i></i><i></i><i></i></div>
  <div class="top"><div class="sp"></div>${curs()}<button class="iconbtn">${ic("gear")}</button></div>
  <div class="brand">${art("logo", "logo")}<h1 class="word">Block Bloom</h1><div class="chips"><span class="cp">${ic("trophy")}Best ${D.best}</span><span class="cp fire">${ic("flame")}2-day streak</span></div></div>
  <div class="floaters">${blk("c", "f1")}${blk("b", "f2")}${blk("d", "f3")}${blk("a", "f4")}${blk("e", "f5")}</div>
  <div class="seg">${D.modes.map((m) => `<div class="sg ${m.on ? "on" : ""}">${m.name}${m.tag ? `<i>${m.tag}</i>` : ""}</div>`).join("")}</div>
  <button class="btn primary big">${ic("play")}<span><b>Continue</b><small>Score ${D.run.score} · Medium</small></span></button>
  <a class="newgame">${ic("restore")}Start a new game</a>
  <div class="tiles">
    <div class="tile daily"><span class="tic">${ic("calendar")}</span><b>Daily challenge</b><small>${D.daily.short}</small><div class="bar"><i style="width:58%"></i></div>${reward(D.daily.coins, D.daily.gems)}</div>
    <div class="tile chest">${art("chest", "chestart")}<b>Lucky chest</b><span class="ready">Ready!</span></div>
  </div>
  <div class="event">${ic("bolt")}<span><b>${D.event.name}</b> ${D.event.effect}</span><em>${D.event.left}</em></div>
  ${nav(V, "home")}`;
}

// ---------- GAME ----------
function game(V) {
  const scoreBlock = {
    aurora: `<div class="score"><small>SCORE</small><b>${D.run.score}</b><span class="bst">${ic("trophy")}Best ${D.best}</span></div>`,
    royal: `<div class="score"><div class="laurel"></div><small>Score</small><b>${D.run.score}</b><span class="bst">Best ${D.best}</span></div>`,
    neon: `<div class="score"><small>SCORE</small><b>${String(D.run.score).padStart(6, "0")}</b><span class="bst">BEST ${String(D.best).padStart(6, "0")}</span></div>`,
    clay: `<div class="score"><b>${D.run.score}</b><span class="bst">${ic("trophy")}Best ${D.best}</span></div>`,
  }[V.id];
  return `
  <div class="ghud"><button class="iconbtn pause">${ic("pause")}</button>${scoreBlock}<div class="gright"><span class="mode">${V.id === "neon" ? "MED" : "Medium"}</span><span class="evt">${ic("bolt")}${D.event.mult}</span></div></div>
  <div class="combo"><span class="cl">${ic("flame")}Combo ×${D.run.combo}</span><div class="cm"><i style="width:62%"></i></div><span class="cn">+${D.run.combo * 20} next clear</span></div>
  ${board({ cls: "play" })}
  <div class="clearhint">${ic("sparkle")}Row clears · +120</div>
  ${tray()}
  ${lifelines(V)}`;
}

// ---------- SETTINGS ----------
function settings(V) {
  const S = D.settings;
  const row = (r) => `<div class="row"><span class="ri">${ic(r.icon)}</span><span class="rt"><b>${r.name}</b>${r.sub ? `<small>${r.sub}</small>` : ""}</span>${r.on !== undefined ? toggle(r.on) : r.value ? `<span class="rv">${r.value}${ic("chev")}</span>` : `<span class="rv">${ic("chev")}</span>`}</div>`;
  return `
  ${header("Settings", { right: `<span class="ver">${D.version}</span>` })}
  <div class="scroll">
    <div class="sec">Sound</div><div class="card list">${S.audio.map(row).join("")}</div>
    <div class="sec">Music mood <em>Tap to preview</em></div>
    <div class="moods">${S.moods.map((m) => `<div class="mood ${m.on ? "on" : ""} ${m.lock ? "lock" : ""}"><span class="mplay">${m.on ? ic("check") : m.lock ? ic("lock") : ic("play")}</span><b>${m.name}</b><small>${m.sub}</small>${m.lock ? `<i class="mprice">${art("coin")}${m.lock}</i>` : ""}</div>`).join("")}</div>
    <div class="sec">Gameplay & accessibility</div><div class="card list">${S.play.map(row).join("")}</div>
    <div class="sec">Notifications</div><div class="card list">${S.notify.map(row).join("")}</div>
    <div class="sec">Account</div><div class="card list">${S.account.map(row).join("")}</div>
    <div class="sec">Help & about</div><div class="card list">${S.help.map(row).join("")}</div>
  </div>`;
}

// ---------- DAILY CHALLENGE ----------
function daily(V) {
  const C = D.calendar;
  let cells = "";
  for (let i = 0; i < C.firstDow; i++) cells += `<i class="d blank"></i>`;
  for (let d = 1; d <= C.days; d++) {
    const st = d === C.today ? "today" : C.done.includes(d) ? "done" : C.missed.includes(d) ? "missed" : d > C.today ? "future" : "open";
    cells += `<div class="d ${st}"><span>${d}</span>${st === "done" ? ic("bloom") : st === "missed" ? "<i class='mx'></i>" : ""}</div>`;
  }
  const T = D.monthTrack;
  const track = T.steps.map((s) => `<div class="stp ${T.done >= s.at ? "got" : ""}" style="left:${(s.at / 30) * 100}%"><span class="sb">${s.chest ? art("chest") : s.gems ? art("gem") : art("coin")}</span><small>${s.at}d</small></div>`).join("");
  return `
  ${header("Daily challenge", { right: "" })}
  <div class="dhero">
    <div class="dtop"><span class="dlabel">${ic("calendar")}Thu 19 Nov</span><span class="dtimer">${ic("clock")}${D.daily.left} left</span></div>
    <h3>${D.daily.goal}</h3>
    <div class="dprog"><div class="bar"><i style="width:58%"></i></div><small>Your best today: ${D.daily.best} / 700</small></div>
    <div class="dfoot">${reward(D.daily.coins, D.daily.gems)}<button class="btn primary">${ic("play")}Play challenge</button></div>
  </div>
  <div class="month"><div class="mt"><b>November streak</b><span>${T.done} of 30 days</span></div><div class="trk"><div class="trkbar"><i style="width:${(T.done / 30) * 100}%"></i></div>${track}</div></div>
  <div class="cal"><div class="calh"><button class="iconbtn sm">${ic("back")}</button><b>${C.month}</b><button class="iconbtn sm dis">${ic("chev")}</button></div>
    <div class="dow">${["M", "T", "W", "T", "F", "S", "S"].map((x) => `<span>${x}</span>`).join("")}</div><div class="days">${cells}</div>
    <div class="legend"><span><i class="lg done"></i>Completed</span><span><i class="lg missed"></i>Missed</span><span><i class="lg today"></i>Today</span></div></div>`;
}

// ---------- LUCKY CHEST (modal over a dimmed home) ----------
function chest(V) {
  return `
  <div class="behind">${{ aurora: homeAurora, royal: homeRoyal, neon: homeNeon, clay: homeClay }[V.id](V)}</div>
  <div class="scrim"></div>
  <div class="modal">
    <button class="iconbtn mclose">${ic("close")}</button>
    <div class="rays"><svg viewBox="0 0 280 240" preserveAspectRatio="none"><polygon points="140,120 359.1,100.2 359.1,139.8"/><polygon points="140,120 339.6,212.4 319.9,246.7"/><polygon points="140,120 266.7,299.9 232.4,319.6"/><polygon points="140,120 159.8,339.1 120.2,339.1"/><polygon points="140,120 47.6,319.6 13.3,299.9"/><polygon points="140,120 -39.9,246.7 -59.6,212.4"/><polygon points="140,120 -79.1,139.8 -79.1,100.2"/><polygon points="140,120 -59.6,27.6 -39.9,-6.7"/><polygon points="140,120 13.3,-59.9 47.6,-79.6"/><polygon points="140,120 120.2,-99.1 159.8,-99.1"/><polygon points="140,120 232.4,-79.6 266.7,-59.9"/><polygon points="140,120 319.9,-6.7 339.6,27.6"/></svg></div>${art("chest", "bigchest")}
    <span class="mkick">Free daily reward</span>
    <h3>Lucky Bloom Chest</h3>
    <p>Open it for free with a short video. Rewards land in your balance instantly.</p>
    <div class="prizes"><div class="pz">${art("coin")}<b>+${D.chest.coins}</b><small>Coins</small></div><div class="pz">${art("gem")}<b>+${D.chest.gems}</b><small>Gems</small></div><div class="pz">${ic("hammer")}<b>+${D.chest.hammer}</b><small>Hammer</small></div></div>
    <button class="btn primary big ad">${ic("ad")}<span><b>Watch to open</b><small>About 30 seconds · free</small></span></button>
    <button class="btn ghost wait">${ic("clock")}Or open free in ${D.chest.freeIn}</button>
  </div>`;
}

// ---------- ADVENTURE (path map) ----------
function adventure(V) {
  const A = D.adventure;
  // a winding path of 10 nodes from the bottom up (levels 1..10 on screen)
  const xs = [50, 74, 70, 44, 22, 30, 58, 78, 62, 36];
  const nodes = xs.map((x, i) => {
    const n = i + 1, y = 92 - i * 9.2;
    const st = n <= A.cleared ? "done" : n === A.current.n ? "cur" : "lock";
    const stars = n <= A.cleared ? `<span class="nst">${[1, 2, 3].map((s) => ic(s <= A.starsBy[i] ? "starf" : "star")).join("")}</span>` : "";
    const ms = n === 8 ? `<div class="milestone" style="left:${x + 14}%;top:${y - 2}%">${art("chest")}</div>` : "";
    return `${ms}<div class="node ${st}" style="left:${x}%;top:${y}%"><b>${st === "lock" ? ic("lock") : n}</b>${stars}</div>`;
  }).join("");
  const pathD = xs.map((x, i) => `${i ? "L" : "M"}${(x / 100) * 366} ${((92 - i * 9.2) / 100) * 620}`).join(" ");
  return `
  ${header("Adventure", { right: `<div class="curs"><div class="pill cur star">${ic("starf")}<b>${A.stars}/72</b></div></div>` })}
  <div class="region"><span class="rn">${A.regions[0].name}</span><span class="rr">Levels 1–8</span><div class="rbar"><i style="width:${(A.cleared / 8) * 100}%"></i></div><small>${A.cleared} / ${A.total} cleared</small></div>
  <div class="mapwrap"><div class="mapbg"></div><svg class="path" viewBox="0 0 366 620" preserveAspectRatio="none"><path d="${pathD}"/></svg>${nodes}
    <div class="nextregion">${ic("lock")}Crystal Lagoon · level 9</div></div>
  <div class="lvcard"><div class="lvh"><span class="lvn">Level ${A.current.n}</span><span class="lvg">${ic("target")}${A.current.goal} · ${A.current.moves} moves</span></div><div class="lvf">${reward(A.current.coins)}<span class="stars3">${ic("star")}${ic("star")}${ic("star")}</span><button class="btn primary">${ic("play")}Play</button></div></div>`;
}

// ---------- SHOP ----------
function shop(V) {
  const S = D.shop;
  const sw = (t) => `<div class="sw">${t.sw.map((c, i) => `<i style="--c:${c}" class="s${i}"></i>`).join("")}</div>`;
  const price = (t) => t.state === "active" ? `<span class="tp own">${ic("check")}Active</span>` : t.state === "free" ? `<span class="tp">Use</span>` : t.cur === "ad" ? `<span class="tp ad">${ic("ad")}Free</span>` : `<span class="tp">${art(t.cur)}${t.price}</span>`;
  const themes = [S.themes[0], S.themes[2], S.themes[4], S.themes[6]];
  return `
  ${header("Shop")}
  <div class="tabs"><span class="tb on">Featured</span><span class="tb">Themes</span><span class="tb">Boosts</span><span class="tb">Gems</span></div>
  <div class="scroll">
    <div class="offer"><span class="osave">${S.featured.save}</span><div class="otext"><small>Limited · ends in 2d 6h</small><b>${S.featured.title}</b><span>${S.featured.items}</span></div><div class="obuy"><s>${S.featured.was}</s><button class="btn primary">${S.featured.price}</button></div>${art("chest", "ochest")}</div>
    <div class="sec">Themes <em>Preview before you buy</em></div>
    <div class="themes">${themes.map((t) => `<div class="theme ${t.state || ""}">${t.tag ? `<i class="ttag">${t.tag}</i>` : ""}${sw(t)}<b>${t.name}</b>${price(t)}</div>`).join("")}</div>
    <div class="free"><span class="fi">${ic("ad")}</span><span class="ft"><b>Free coins</b><small>${S.free.left}</small></span><button class="btn small">+${S.free.coins} ${art("coin")}</button></div>
    <div class="sec">Gems</div>
    <div class="gempacks">${S.gems.map((g, i) => `<div class="gp ${g.tag ? "tagged" : ""}">${g.tag ? `<i class="gtag">${g.tag}</i>` : ""}<span class="gstack s${i}">${art("gem")}${i > 0 ? art("gem") : ""}${i > 1 ? art("gem") : ""}</span><b>${g.amt}</b><button class="btn small">${g.price}</button></div>`).join("")}</div>
  </div>`;
}

// ---------- TROPHIES (achievements) ----------
function trophies(V) {
  const T = D.trophies;
  const item = (t) => {
    const p = Math.min(1, t.have / t.need);
    const state = t.claim ? "claim" : t.done ? "done" : "prog";
    return `<div class="tr ${state}"><span class="tmed">${art("medal-" + t.tier)}</span><span class="tt"><b>${t.name}</b><small>${t.desc}</small><div class="tbar"><i style="width:${p * 100}%"></i></div><span class="tnum">${fmt(t.have)} / ${fmt(t.need)}</span></span><span class="tact">${state === "claim" ? `<button class="btn small primary">Claim</button>${reward(t.coins, t.gems)}` : state === "done" ? `<span class="got">${ic("check")}Claimed</span>` : reward(t.coins, t.gems)}</span></div>`;
  };
  return `
  ${header("Trophies")}
  <div class="tsum"><div class="tring" style="--p:${T.done / T.total}"><b>${T.done}</b><small>of ${T.total}</small></div><div class="tst"><b>1 reward ready</b><small>300 coins waiting</small><button class="btn primary small">Claim all</button></div>${art("trophy", "bigtrophy")}</div>
  <div class="tabs"><span class="tb on">All</span><span class="tb">In progress</span><span class="tb">Completed</span></div>
  <div class="scroll tlist">${T.list.map(item).join("")}</div>`;
}

const SCREENS = [
  { id: "home", name: "Home", fn: (V) => ({ aurora: homeAurora, royal: homeRoyal, neon: homeNeon, clay: homeClay }[V.id](V)) },
  { id: "game", name: "Gameplay", fn: game },
  { id: "settings", name: "Settings", fn: settings },
  { id: "daily", name: "Daily challenge", fn: daily },
  { id: "chest", name: "Lucky chest", fn: chest },
  { id: "adventure", name: "Adventure", fn: adventure },
  { id: "shop", name: "Shop", fn: shop },
  { id: "trophies", name: "Trophies", fn: trophies },
];

/** One phone with one screen of one direction. */
function phone(V, screenId) {
  const s = SCREENS.find((x) => x.id === screenId);
  return `<div class="phone v-${V.id}"><div class="screen scr-${s.id}"><div class="bgx"></div>${status()}<div class="body">${s.fn(V)}</div><div class="gesture"></div></div></div>`;
}

module.exports = { SCREENS, phone, ic, art };
