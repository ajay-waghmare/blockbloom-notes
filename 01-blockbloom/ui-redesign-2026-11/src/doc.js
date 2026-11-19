// Lays out the PDF: A4 landscape pages (1123 x 794 CSS px). node build.js doc -> out/redesign.html
const fs = require("fs");
const path = require("path");
const { sprite, ic, art } = require("./icons");
const { SCREENS, phone } = require("./screens");
const C = require("./content");
const D = require("./data");
const { DIRECTIONS, css, ROOT, OUT } = require("./build");

const SEV = { H: "High", M: "Medium", L: "Low" };
// Phones are 2x JPEG renders of the same HTML (out/shots): exact look, and a PDF of reasonable size.
const ph = (d, s, scale, extra = "") => `<div class="ph ${extra}" style="--s:${scale}"><img src="shots/${d.id}-${s}.jpg" alt="${d.name} · ${s}"></div>`;
const dir = (id) => DIRECTIONS.find((d) => d.id === id);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pages = [];
const add = (cls, html, section) => pages.push({ cls, html, section });
const head = (kicker, title, lede = "") => `<header class="ph-head"><p class="kicker">${kicker}</p><h2>${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ""}</header>`;

// ---------- cover ----------
add("cover", `
  <div class="cv-left">
    <div class="cv-mark">${art("logo")}<span>AW EagleCraft · Block Bloom</span></div>
    <h1>Block Bloom</h1>
    <p class="cv-sub">Premium UI/UX redesign</p>
    <p class="cv-text">Four visual directions for all eight screens, built on one improved structure. Includes the audit of today's UI with every improvement point, a comparison, a recommendation and a build plan for Jetpack Compose.</p>
    <dl class="cv-meta"><div><dt>App</dt><dd>Block Bloom ${D.version} · Android</dd></div><div><dt>Date</dt><dd>19 November 2026</dd></div><div><dt>Screens</dt><dd>Home · Gameplay · Settings · Daily challenge · Lucky chest · Adventure · Shop · Trophies</dd></div><div><dt>Directions</dt><dd>1 Aurora Glass · 2 Royal Bloom · 3 Neon Pulse · 4 Petal Pop</dd></div></dl>
  </div>
  <div class="cv-fan">${DIRECTIONS.map((d, i) => `<div class="fan f${i}">${ph(d, "home", 0.56)}</div>`).join("")}</div>`, "Cover");

// ---------- contents ----------
const TOC = [["Summary", "What changes and why"], ["Today's UI", "Audit of the eight screens, with every finding and fix"], ["Foundations", "Principles, structure and the new UI on every screen"],
  ["Direction 1", "Aurora Glass"], ["Direction 2", "Royal Bloom"], ["Direction 3", "Neon Pulse"], ["Direction 4", "Petal Pop"],
  ["Compare", "Side by side, scorecard and recommendation"], ["Build", "Plan, Compose notes, measurement, spec checklist"]];
add("contents", `${head("Contents", "What is in this document")}
  <div class="toc">${TOC.map(([k, v]) => `<div class="trow"><span class="tk">${k}</span><span class="tv">${v}</span><span class="tpn" data-sec="${k}"></span></div>`).join("")}</div>
  <div class="howto"><div><b>How to read it</b><p>Directions are numbered 1 to 4 and screens 1 to 8, so “3.6” is Neon Pulse · Adventure. All four directions show the same content and the same structure: the differences are design only.</p></div>
  <div><b>Severity of findings</b><p><span class="sev H">High</span> hurts play or revenue now · <span class="sev M">Medium</span> clear friction · <span class="sev L">Low</span> polish.</p></div>
  <div><b>Source</b><p>Screenshots of the live app (v1.12.11, 19 Nov 2026) and the app code: skins, levels, events, lifelines. Mockups are HTML renders at 368 × 822 dp.</p></div></div>`, "Contents");

// ---------- summary ----------
add("summary", `${head("Summary", "Premium, clearer, and easier to monetise", "The game feels good to play; the screens around it do not yet look or behave like a premium title. The same eight fixes apply to every direction; the directions change the look.")}
  <div class="sum3">
    <div class="sc"><h3>What holds it back today</h3><ul>
      <li>Home: eleven blocks compete and there is no persistent navigation.</li>
      <li>Gameplay: a banner ad under the tray, unlabelled lifelines, tiny tray pieces, a hint that never goes away.</li>
      <li>Broken text: “BEST VALU E” in the Shop and “Achieveme nts”.</li>
      <li>Daily challenge opens on an empty calendar.</li>
      <li>Adventure is a wall of padlocks.</li>
      <li>Mixed icons and low-contrast text make it look less premium than it plays.</li></ul></div>
    <div class="sc"><h3>What changes on every screen</h3><ul>
      <li>One primary action per screen; bottom navigation with badges.</li>
      <li>Pause menu, ghost piece, line-clear bar, combo meter in play.</li>
      <li>Lifelines with names, owned counts and disabled states.</li>
      <li>Today's challenge first, with a month streak track.</li>
      <li>An Adventure path with regions and milestone chests.</li>
      <li>Shop tabs, a featured offer and real theme cards.</li>
      <li>Trophies you claim, with tiers and Claim all.</li>
      <li>One icon family, a type scale, 4.5:1 contrast, RTL and long-text ready.</li></ul></div>
    <div class="sc rec"><h3>Recommendation</h3>
      <p><b>Ship 1 · Aurora Glass as the new default.</b> It keeps the plum-and-teal identity players know and the store art you have, with the lowest build effort.</p>
      <p><b>Sell 2, 3 and 4 as full-UI themes</b> in the Shop (Royal Bloom, Neon Pulse, Petal Pop), each paired with a music mood: themes become a real reason to spend gems.</p>
      <p><b>Test 4 · Petal Pop as a light default</b> for new installs in one market.</p>
      <div class="dots4">${DIRECTIONS.map((d) => `<span class="dd v-${d.id}">${d.n}</span>`).join("")}</div></div>
  </div>
  <div class="hyp"><p class="kicker">Hypotheses to measure</p><div class="hgrid">${[["More daily challenges started", "Today's challenge is the first thing on its screen, with the reward and the timer."], ["More coins spent per game", "Lifelines show names, owned counts and when they are affordable."], ["Deeper Adventure progress", "A path with regions, a level card and milestone chests."], ["More gems spent", "Full-UI themes and a featured offer give gems a clear use."]].map(([t, x]) => `<div><b>${t}</b><p>${x}</p></div>`).join("")}</div></div>`, "Summary");

// ---------- today's UI at a glance ----------
add("current", `${head("Today's UI", "The eight screens as they are now", "v1.12.11 (34), captured on a phone on 19 Nov 2026.")}
  <div class="strip">${C.AUDIT.map((a) => `<figure><div class="shot" style="aspect-ratio:${a.w}/${Math.min(a.h, a.w * 2.6)}"><img src="../assets/current/${a.img.replace(".png", ".jpg")}"></div><figcaption><b>${a.n}</b> ${a.title}</figcaption></figure>`).join("")}</div>
  <div class="glob">${C.GLOBAL.map(([t, x]) => `<div><b>${t}</b><p>${x}</p></div>`).join("")}</div>`, "Today's UI");

// ---------- audit pages ----------
const shot = (a, maxH) => {
  if (a.cols === 2) {
    const w = 190, full = (a.h / a.w) * w, half = Math.ceil(full / 2);
    return `<div class="split" style="height:${half}px">${[0, 1].map((k) => `<div class="part" style="width:${w}px;height:${half}px;background-image:url(../assets/current/${a.img.replace(".png", ".jpg")});background-size:${w}px auto;background-position:0 -${k * half}px"></div>`).join("")}</div>`;
  }
  const h = maxH, w = Math.round((a.w / a.h) * h);
  return `<img class="aimg" style="height:${h}px;width:${w}px" src="../assets/current/${a.img.replace(".png", ".jpg")}">`;
};
const findings = (a) => `<ol class="finds">${a.items.map(([s, now, fix]) => `<li><span class="sev ${s}">${SEV[s]}</span><p class="now">${esc(now)}</p><p class="fix">${ic("chev")}${esc(fix)}</p></li>`).join("")}</ol>`;
const auditBlock = (a, maxH) => `<div class="ablock"><div class="atitle"><span class="an">${a.n}</span><h3>${a.title}</h3><span class="acount">${a.items.length} findings</span></div><div class="abody">${shot(a, maxH)}${findings(a)}</div></div>`;
const A = C.AUDIT;
for (const a of A) add("audit one", `${head("Today's UI · audit " + a.n + " of 8", a.title, a.verdict)}<div class="aone">${shot(a, 600)}<ol class="finds two ${a.items.length > 6 ? "three" : ""}">${a.items.map(([s, now, fix]) => `<li><span class="sev ${s}">${SEV[s]}</span><p class="now">${esc(now)}</p><p class="fix">${ic("chev")}${esc(fix)}</p></li>`).join("")}</ol></div>`, "Today's UI");

// ---------- foundations ----------
add("principles", `${head("Foundations", "Twelve principles behind every screen")}
  <div class="pgrid">${C.PRINCIPLES.map(([t, x], i) => `<div class="pc"><span class="pn">${String(i + 1).padStart(2, "0")}</span><b>${t}</b><p>${x}</p></div>`).join("")}</div>`, "Foundations");

add("ia", `${head("Foundations", "One structure for every direction", "Three taps or fewer to anything; the run is always one tap away.")}
  <div class="iawrap">
    <div class="iamap">
      <div class="iacol"><div class="iab hub">${ic("home")}<b>Home</b><small>Continue / Play · modes · Daily · Chest · event</small></div>
        <div class="iaarrow">${ic("chev")}</div>
        <div class="iastack"><div class="iab">${ic("play")}<b>Game</b><small>Pause menu · Game over · Continue with ad</small></div><div class="iab">${ic("calendar")}<b>Daily challenge</b><small>Today first · streak track · calendar</small></div><div class="iab">${ic("gift")}<b>Lucky chest</b><small>Dialog · ad or timer</small></div><div class="iab">${ic("gear")}<b>Settings</b><small>From the gear</small></div></div></div>
      <div class="ianav"><p>Bottom navigation</p><div class="iarow">
        <div class="iab">${ic("map")}<b>Adventure</b><small>Map → level card → game</small></div>
        <div class="iab">${ic("bag")}<b>Shop</b><small>Featured · Themes · Boosts · Gems</small></div>
        <div class="iab">${ic("trophy")}<b>Trophies</b><small>Claim · tiers · filters</small></div></div></div>
      <div class="navspec"><b>Bottom navigation rules</b><ul><li>Four tabs, 64 dp, labels always visible; the current tab is coloured and raised.</li><li>Badges: a red count for trophies to claim, “NEW” for new shop items; the chest glows on Home when ready.</li><li>Hidden during play; the pause menu is the way out of a run.</li><li>Arabic mirrors the order right-to-left.</li></ul></div>
    </div>
    <div class="loop"><svg viewBox="0 0 400 350"><circle cx="200" cy="175" r="130"/><path d="M200 45a130 130 0 0 1 123.6 89.8" class="arr"/></svg>
      ${[["Play", "play"], ["Clear & combo", "sparkle"], ["Earn", "starf"], ["Spend", "bag"], ["Come back", "calendar"]].map(([t, i], k) => { const a = (-90 + k * 72) * Math.PI / 180; return `<div class="ln" style="left:${(200 + 130 * Math.cos(a)).toFixed(1)}px;top:${(175 + 130 * Math.sin(a)).toFixed(1)}px">${ic(i)}<b>${t}</b></div>`; }).join("")}
      <p class="loopc"><b>The core loop.</b> Play, clear lines and chain combos; earn coins, gems and stars; spend them on themes and lifelines; come back for the daily challenge, the chest timer, the streak and events. Each screen in this redesign feeds one step.</p></div>
  </div>`, "Foundations");

add("every", `${head("Foundations", "The new UI on every screen", "These changes are in all four directions. The direction pages that follow describe only what is different in the look.")}
  <div class="egrid">${SCREENS.map((s, i) => `<div class="ec"><span class="en">${i + 1}</span><b>${s.name}</b><p>${C.SHARED[s.id]}</p></div>`).join("")}</div>
  <div class="film">${SCREENS.map((s) => ph(dir("aurora"), s.id, 0.24)).join("")}</div><p class="filmc">The eight screens as drawn in direction 1 · Aurora Glass</p>`, "Foundations");

// ---------- directions ----------
for (const d of DIRECTIONS) {
  const X = C.DIRECTIONS[d.id];
  const sec = "Direction " + d.n;
  add("dintro d-" + d.id, `
    <div class="di-left">${ph(d, "home", 0.8, "big")}</div>
    <div class="di-right">
      <p class="kicker">Direction ${d.n}</p><h2 class="dtitle">${X.title}</h2><p class="dline">${X.line}</p>
      <p class="dconcept">${X.concept}</p>
      <div class="dfacts"><div><span>Mood</span><b>${X.mood.join(" · ")}</b></div><div><span>Best for</span><b>${X.best}</b></div><div><span>Build effort</span><b>${X.effort}</b></div></div>
      <div class="dpal">${X.palette.map(([n, h]) => `<div class="sw1"><i style="background:${h}"></i><b>${n}</b><span>${h}</span></div>`).join("")}</div>
      <div class="dsamp v-${d.id}">
        <div class="type"><span class="t1" style="font-family:'${X.fonts[0]}'">Block Bloom 640</span><span class="t2" style="font-family:'${X.fonts[1]}'">${X.fonts[0]} for display · ${X.fonts[1]} for the interface</span></div>
        <div class="blocks">${[1, 2, 3, 4, 5, 6].map((k) => `<span class="bk"><i class="blk c${k}"></i></span>`).join("")}</div>
        <div class="comps"><button class="btn primary">${ic("play")}Continue</button><div class="pill cur coin">${art("coin")}<b>702</b><i class="plus">${ic("plusb")}</i></div><span class="tgl on"><i></i></span><span class="tgl"><i></i></span></div>
      </div>
    </div>`, sec);
  for (const half of [0, 1]) {
    const list = SCREENS.slice(half * 4, half * 4 + 4);
    add("dscreens d-" + d.id, `${head("Direction " + d.n + " · " + X.title, half ? "Chest, Adventure, Shop and Trophies" : "Home, Gameplay, Settings and Daily challenge")}
      <div class="row4">${list.map((s) => { const i = SCREENS.indexOf(s) + 1; return `<figure>${ph(d, s.id, 0.6)}<figcaption><b>${d.n}.${i} ${s.name}</b><p>${X.notes[s.id]}</p></figcaption></figure>`; }).join("")}</div>`, sec);
  }
}

// ---------- compare ----------
for (const [sid, name] of [["home", "Home"], ["game", "Gameplay"]]) {
  add("compare", `${head("Compare", name + " in the four directions")}
    <div class="row4">${DIRECTIONS.map((d) => `<figure>${ph(d, sid, 0.6)}<figcaption><b>${d.n} · ${d.name}</b><p>${C.DIRECTIONS[d.id].line}</p></figcaption></figure>`).join("")}</div>`, "Compare");
}
const dots = (n) => `<span class="rate">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= n ? "on" : ""}"></i>`).join("")}</span>`;
const total = (id) => C.SCORE[id].reduce((a, b) => a + b, 0);
add("scorecard", `${head("Compare", "Scorecard and recommendation", "Scores from 1 to 5, judged on the mockups and the build effort in Compose.")}
  <div class="scwrap"><table class="sct"><thead><tr><th></th>${DIRECTIONS.map((d) => `<th><span class="dd v-${d.id}">${d.n}</span>${d.name}</th>`).join("")}</tr></thead>
    <tbody>${C.SCORE.criteria.map((c, i) => `<tr><td>${c}</td>${DIRECTIONS.map((d) => `<td>${dots(C.SCORE[d.id][i])}</td>`).join("")}</tr>`).join("")}
    <tr class="tot"><td>Total of 35</td>${DIRECTIONS.map((d) => `<td><b>${total(d.id)}</b></td>`).join("")}</tr></tbody></table>
  <div class="recbox"><h3>Recommendation</h3><ol>
    <li><b>Aurora Glass becomes the default UI.</b> It ties with Petal Pop on points and wins on what matters most for the default: brand continuity and build effort. It sets up the design tokens every other direction reuses.</li>
    <li><b>Royal Bloom, Neon Pulse and Petal Pop become full-UI themes in the Shop</b>, not only block skins. Pair each with a music mood (Royal · Calm, Neon · Pulse, Petal Pop · Bright) and price them in gems; Galaxy stays as the premium block skin.</li>
    <li><b>Test Petal Pop as a light default</b> for new installs in one market; keep it if D1 retention and session length hold or improve.</li>
    <li><b>Do P0 now</b>: the quick wins in the plan fix the broken text and the in-game banner before any new look ships.</li></ol></div></div>`, "Compare");

// ---------- build ----------
add("plan", `${head("Build", "Plan in four phases", "Estimates on a Claude Code basis, as for the recent releases; each phase ships on its own and is measured.")}
  <div class="phases">${C.PLAN.map((p) => `<div class="phase"><div class="phh"><span class="pp">${p.p}</span><b>${p.name}</b><small>${p.when}</small></div><ul>${p.items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>
  <h3 class="sub">Jetpack Compose notes</h3>
  <div class="cgrid">${C.COMPOSE.map(([t, x]) => `<div><b>${t}</b><p>${x}</p></div>`).join("")}</div>`, "Build");

add("measure", `${head("Build", "How we will know it worked")}
  <div class="mwrap"><div><h3 class="sub">Metrics and what moves them</h3><table class="kt"><tbody>${C.KPIS.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v}</td></tr>`).join("")}</tbody></table></div>
  <div><h3 class="sub">A/B tests (Remote Config)</h3><div class="tests">${C.TESTS.map(([t, x], i) => `<div><span class="tn">${i + 1}</span><b>${t}</b><p>${x}</p></div>`).join("")}</div>
  <div class="note">${ic("info")}<p>Guardrails for every release: crash-free users, ANR rate and janky frames must not get worse; rewarded-ad revenue per DAU is watched when the in-game banner goes.</p></div></div></div>`, "Build");

const specPage = (ids, title) => add("spec", `${head("Build · spec checklist", title, "Every point of the new UI, written as a check a reviewer can tick.")}
  <div class="spgrid">${ids.map((id) => { const s = SCREENS.find((x) => x.id === id); return `<div class="spc"><b><span>${SCREENS.indexOf(s) + 1}</span>${s.name}</b><ul>${C.SPEC[id].map((x) => `<li>${ic("check")}${x}</li>`).join("")}</ul></div>`; }).join("")}</div>`, "Build");
specPage(["home", "game", "settings", "daily"], "Home, Gameplay, Settings, Daily challenge");
specPage(["chest", "adventure", "shop", "trophies"], "Lucky chest, Adventure, Shop, Trophies");

add("closing", `<div class="clz">${art("logo")}<h2>Next step</h2><p>Pick the default direction (recommended: 1 · Aurora Glass) and start P0. The mockups in this document are HTML; the same source renders any screen in any direction again in seconds.</p>
  <div class="clrow">${DIRECTIONS.map((d) => ph(d, "game", 0.36)).join("")}</div><p class="small">Block Bloom · Premium UI/UX redesign · 19 November 2026 · Source: 01-blockbloom/ui-redesign-2026-11 in the notes repo</p></div>`, "End");

// ---------- assemble ----------
const DOC_CSS = `
@page{size:297mm 210mm;margin:0}
html,body{margin:0;padding:0;background:#0E0A1C;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:1123px;height:794px;position:relative;overflow:hidden;box-sizing:border-box;padding:34px 46px 46px;break-after:page;page-break-after:always;color:#ECE9FA;font:14px/1.5 Inter,sans-serif;
 background:radial-gradient(60% 55% at 0% 0%,rgba(124,92,255,.20),transparent 60%),radial-gradient(55% 50% at 100% 100%,rgba(45,226,206,.12),transparent 60%),#0E0A1C}
.page:last-child{break-after:auto;page-break-after:auto}
.page *{box-sizing:border-box}
.pf{position:absolute;left:46px;right:46px;bottom:16px;display:flex;justify-content:space-between;font:600 10.5px/1 Inter;color:#7D74A8;letter-spacing:.4px}
.kicker{margin:0 0 4px;font:700 11px/1 Inter;letter-spacing:2.5px;text-transform:uppercase;color:#2DE2CE}
.ph-head{margin-bottom:16px}.ph-head h2{margin:0;font:700 30px/1.15 Outfit,sans-serif;letter-spacing:-.2px}.lede{margin:6px 0 0;max-width:820px;color:#B3ABD6;font-size:14.5px}
h3{margin:0 0 8px;font:700 17px/1.2 Outfit,sans-serif}
.ph{position:relative;width:calc(390px * var(--s));height:calc(844px * var(--s));flex:none;border-radius:calc(58px * var(--s));box-shadow:0 calc(26px * var(--s)) calc(50px * var(--s)) calc(-16px * var(--s)) rgba(0,0,0,.7)}
.ph img{display:block;width:100%;height:100%;border-radius:inherit}
.sev{display:inline-block;padding:3px 7px;border-radius:6px;font:800 9.5px/1 Inter;letter-spacing:.6px;text-transform:uppercase;vertical-align:1px}
.sev.H{background:#FF5C8A;color:#2a0010}.sev.M{background:#FFC44D;color:#2a1a00}.sev.L{background:#59C2FF;color:#001a2a}
/* cover */
.cover{display:flex;gap:20px;padding:56px 56px 46px;background:radial-gradient(70% 70% at 80% 40%,rgba(124,92,255,.35),transparent 60%),radial-gradient(50% 60% at 10% 90%,rgba(45,226,206,.16),transparent 60%),#0E0A1C}
.cv-left{flex:0 0 430px;display:flex;flex-direction:column;justify-content:center}
.cv-mark{display:flex;align-items:center;gap:10px;font:700 12px/1 Inter;letter-spacing:2px;text-transform:uppercase;color:#B3ABD6}.cv-mark .art{width:38px;height:38px}
.cover h1{margin:18px 0 0;font:700 72px/1 Outfit;letter-spacing:-1.5px;color:#F3F0FF}
.cv-sub{margin:8px 0 0;font:600 30px/1.1 Outfit;color:#2DE2CE}
.cv-text{margin:18px 0 0;color:#C4BDE3;font-size:15px;line-height:1.55}
.cv-meta{margin:22px 0 0;display:grid;gap:8px}.cv-meta div{display:grid;grid-template-columns:84px 1fr;gap:10px}.cv-meta dt{font:700 10.5px/1.6 Inter;letter-spacing:1.5px;text-transform:uppercase;color:#7D74A8}.cv-meta dd{margin:0;font-size:13px;color:#E3DEF8}
.cv-fan{position:relative;flex:1}
.fan{position:absolute;top:60px}.fan.f0{left:4px;transform:rotate(-9deg);top:100px}.fan.f1{left:112px;transform:rotate(-3deg);top:50px}.fan.f2{left:220px;transform:rotate(3deg);top:50px}.fan.f3{left:326px;transform:rotate(9deg);top:100px}
/* toc */
.toc{display:grid;gap:2px;max-width:760px}.toc .trow{display:grid;grid-template-columns:150px 1fr 40px;align-items:baseline;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.08)}
.tk{font:700 13px/1 Inter;letter-spacing:1.5px;text-transform:uppercase;color:#2DE2CE}.tv{font:600 17px/1.2 Outfit}.tpn{text-align:right;font:700 15px/1 Outfit;color:#B3ABD6}
.howto{position:absolute;left:46px;right:46px;bottom:60px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.howto div{padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.howto p{margin:6px 0 0;color:#B3ABD6;font-size:12.5px}
/* summary */
.sum3{display:grid;grid-template-columns:1fr 1fr 1.05fr;gap:16px}
.sc{padding:18px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09)}.sc ul{margin:0;padding-left:18px}.sc li{margin:0 0 7px;color:#D6D0F0;font-size:13.5px}
.sc.rec{background:linear-gradient(160deg,rgba(124,92,255,.30),rgba(45,226,206,.12));border-color:rgba(45,226,206,.35)}.sc.rec p{margin:0 0 10px;font-size:13.5px;color:#E7E2FA}
.dots4{display:flex;gap:8px;margin-top:8px}
.dd{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:8px;font:800 13px/1 Outfit;margin-right:8px;vertical-align:middle}
.dd.v-aurora{background:linear-gradient(160deg,#7C5CFF,#2DE2CE);color:#fff}.dd.v-royal{background:linear-gradient(180deg,#FFE9A3,#C99A3A);color:#2A1A02}.dd.v-neon{background:#05060F;color:#00F0FF;box-shadow:inset 0 0 0 1.5px #FF2BD6}.dd.v-clay{background:#fff;color:#7C5CFF}
/* current strip */
.strip{display:flex;gap:12px;align-items:flex-start;height:446px}
.strip figure{margin:0;flex:1;display:flex;flex-direction:column;gap:8px;min-width:0}
.strip .shot{width:100%;max-height:410px;border-radius:12px;overflow:hidden;background:#000;box-shadow:0 0 0 1px rgba(255,255,255,.12)}.strip .shot img{width:100%;display:block}
.strip figcaption{font:600 12px/1.2 Inter;color:#B3ABD6}.strip figcaption b{color:#2DE2CE;margin-right:4px}
.glob{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 18px;margin-top:6px}.glob div{padding:10px 14px;border-left:3px solid #FF5C8A;background:rgba(255,92,138,.06);border-radius:0 10px 10px 0}.glob p{margin:3px 0 0;color:#B3ABD6;font-size:12px;line-height:1.4}.glob b{font:700 13.5px/1.2 Outfit}
/* audit */
.arow{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.ablock{display:flex;flex-direction:column;gap:10px;min-width:0}
.atitle{display:flex;align-items:center;gap:10px}.an{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:#2DE2CE;color:#052A27;font:800 14px/1 Outfit}.atitle h3{margin:0;flex:1}.acount{font:700 11px/1 Inter;color:#7D74A8;letter-spacing:1px;text-transform:uppercase}
.abody{display:flex;gap:14px;align-items:flex-start}
.aimg{border-radius:12px;box-shadow:0 0 0 1px rgba(255,255,255,.14);flex:none;object-fit:cover;object-position:top}
.split{display:flex;gap:6px;flex:none}.part{border-radius:10px;box-shadow:0 0 0 1px rgba(255,255,255,.14);background-repeat:no-repeat}
.finds{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;min-width:0}
.aone{display:flex;gap:26px;align-items:flex-start}
.finds.two{display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1}
.finds.two li{padding:11px 13px}.finds.three{grid-template-columns:repeat(3,1fr)}.finds.three li{padding:10px 11px}.finds.three .now{font-size:12.2px}.finds.three .fix{font-size:12px}.finds.two .now{font-size:12.6px}.finds.two .fix{font-size:12.3px}
.hyp{margin-top:16px}.hgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.hgrid div{padding:12px 14px;border-radius:14px;background:rgba(45,226,206,.07);border:1px solid rgba(45,226,206,.25)}.hgrid b{font:700 14px/1.2 Outfit}.hgrid p{margin:4px 0 0;font-size:12px;color:#B3ABD6;line-height:1.4}
.finds li{padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.07)}
.finds .now{margin:5px 0 0;font-size:11.6px;line-height:1.38;color:#E3DEF8}.finds .fix{margin:4px 0 0;display:flex;gap:4px;font-size:11.4px;line-height:1.38;color:#8FEFE3}.finds .fix .ic{width:13px;height:13px;flex:none;margin-top:2px}
/* principles */
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pc{padding:15px 16px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);min-height:172px}.pn{font:800 12px/1 Outfit;color:#2DE2CE;letter-spacing:1px}.pc b{display:block;margin:8px 0 6px;font:700 16px/1.2 Outfit}.pc p{margin:0;color:#B3ABD6;font-size:13.2px;line-height:1.5}
/* IA */
.iawrap{display:grid;grid-template-columns:1.35fr 1fr;gap:26px;align-items:start}
.iamap{display:flex;flex-direction:column;gap:18px}
.iacol{display:flex;align-items:center;gap:10px}
.iab{display:flex;flex-direction:column;gap:3px;padding:11px 13px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);min-width:0}.iab .ic{width:18px;height:18px;color:#2DE2CE}.iab b{font:700 14.5px/1.2 Outfit}.iab small{color:#B3ABD6;font-size:11.5px}
.iab.hub{background:linear-gradient(160deg,rgba(124,92,255,.4),rgba(45,226,206,.15));border-color:rgba(45,226,206,.4);width:190px;flex:none}
.iaarrow{color:#7D74A8}.iaarrow .ic{width:26px;height:26px}
.iastack{display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1}
.ianav{padding:14px;border-radius:16px;border:1px dashed rgba(45,226,206,.45)}.ianav p{margin:0 0 10px;font:700 11px/1 Inter;letter-spacing:2px;text-transform:uppercase;color:#2DE2CE}.iarow{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.loop{position:relative;height:500px}
.loop svg{position:absolute;left:0;top:0;width:400px;height:350px}.loop circle{fill:none;stroke:rgba(255,255,255,.14);stroke-width:2;stroke-dasharray:4 8}.loop .arr{fill:none;stroke:#2DE2CE;stroke-width:3;stroke-linecap:round}
.ln{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;padding:8px 11px;border-radius:999px;background:#1E1540;border:1px solid rgba(255,255,255,.14);font-size:12.5px;white-space:nowrap}.ln .ic{width:15px;height:15px;color:#FFC44D}
.loop circle{stroke:rgba(45,226,206,.35)}
.navspec{padding:13px 15px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}.navspec b{font:700 14px/1.2 Outfit}.navspec ul{margin:6px 0 0;padding-left:16px}.navspec li{font-size:12.3px;color:#C9C2E6;margin-bottom:4px}
.loopc{position:absolute;left:0;right:0;top:372px;margin:0;color:#B3ABD6;font-size:13px}
/* every */
.egrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.ec{padding:13px 15px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);min-height:150px}
.film{position:relative;display:flex;gap:18px;justify-content:center;margin-top:14px}.filmc{margin:8px 0 0;text-align:center;font:700 10px/1 Inter;letter-spacing:1.5px;text-transform:uppercase;color:#7D74A8}
.en{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:rgba(45,226,206,.15);color:#2DE2CE;font:800 13px/1 Outfit}.ec b{display:block;margin:8px 0 4px;font:700 17px/1.2 Outfit}.ec p{margin:0;color:#C9C2E6;font-size:12.4px;line-height:1.42}
/* direction intro */
.dintro{display:grid;grid-template-columns:330px 1fr;gap:34px;padding-top:30px}
.di-left{display:flex;justify-content:center}
.dtitle{margin:0;font:700 44px/1.05 Outfit}.dline{margin:6px 0 0;font:500 18px/1.3 Outfit;color:#B3ABD6}
.dconcept{margin:14px 0 0;color:#D6D0F0;font-size:14px;line-height:1.55;max-width:640px}
.dfacts{display:grid;grid-template-columns:1fr 1.6fr 1fr;gap:10px;margin-top:14px}.dfacts div{padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.dfacts span{display:block;font:700 10px/1 Inter;letter-spacing:1.5px;text-transform:uppercase;color:#7D74A8;margin-bottom:5px}.dfacts b{font:600 12.5px/1.35 Inter}
.dpal{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:14px}.sw1 i{display:block;height:46px;border-radius:10px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}.sw1 b{display:block;margin-top:6px;font:600 11.5px/1.2 Inter}.sw1 span{font:500 10.5px/1 Inter;color:#7D74A8}
.dsamp{margin-top:14px;padding:16px;border-radius:16px;background:var(--bg);display:grid;grid-template-columns:1.2fr 1fr;gap:12px 18px;align-items:center;color:var(--ink)}
.dsamp .type{display:flex;flex-direction:column;gap:4px;grid-row:span 2}.dsamp .t1{font-size:34px;font-weight:700;line-height:1}.dsamp .t2{font-size:12.5px;opacity:.8}
.dsamp .blocks{display:flex;gap:8px}.dsamp .bk{position:relative;width:34px;height:34px;display:block}.dsamp .blk{border-radius:var(--blk-r)}
.dsamp .comps{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.dsamp .btn{height:38px;font-size:14px;padding:0 14px}
/* screen rows */
.row4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;justify-items:center}
.row4 figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:10px}
.row4 figcaption{width:234px}.row4 figcaption b{font:700 14px/1.2 Outfit}.row4 figcaption p{margin:4px 0 0;color:#B3ABD6;font-size:11.8px;line-height:1.4}
.compare .row4 figcaption{width:236px}
/* score */
.scwrap{display:grid;grid-template-columns:1.25fr 1fr;gap:24px;align-items:start}
.sct{width:100%;border-collapse:collapse}.sct th{font:700 13px/1.2 Outfit;text-align:left;padding:8px 6px;border-bottom:1px solid rgba(255,255,255,.12)}.sct td{padding:9px 6px;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px}.sct td:first-child{color:#D6D0F0}
.rate{display:inline-flex;gap:4px}.rate i{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.12)}.rate i.on{background:linear-gradient(160deg,#8B5CF6,#2DE2CE)}
.sct .tot td{border-bottom:0;padding-top:12px}.sct .tot b{font:800 18px/1 Outfit;color:#2DE2CE}
.recbox{padding:18px;border-radius:18px;background:linear-gradient(160deg,rgba(124,92,255,.30),rgba(45,226,206,.12));border:1px solid rgba(45,226,206,.35)}.recbox ol{margin:0;padding-left:18px}.recbox li{margin-bottom:9px;font-size:13.2px;color:#E7E2FA;line-height:1.45}
/* plan */
.phases{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.phase{padding:14px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.phh{display:flex;flex-direction:column;gap:3px;margin-bottom:8px}.pp{display:inline-block;align-self:flex-start;padding:4px 8px;border-radius:7px;background:#2DE2CE;color:#052A27;font:800 12px/1 Outfit}.phh b{font:700 17px/1.2 Outfit}.phh small{color:#7D74A8;font-weight:600}
.phase ul{margin:0;padding-left:16px}.phase li{font-size:12.2px;color:#D6D0F0;margin-bottom:5px;line-height:1.4}
.sub{margin:16px 0 10px;font:700 16px/1.2 Outfit;color:#fff}
.cgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.cgrid div{padding:11px 13px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}.cgrid b{font:700 13.5px/1.2 Outfit;color:#8FEFE3}.cgrid p{margin:4px 0 0;font-size:12px;color:#B3ABD6;line-height:1.4}
/* measure */
.mwrap{display:grid;grid-template-columns:1.1fr 1fr;gap:26px}
.kt{width:100%;border-collapse:collapse}.kt td{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,.07);font-size:12.8px;vertical-align:top}.kt td:first-child{width:46%}.kt td:last-child{color:#B3ABD6}
.tests{display:flex;flex-direction:column;gap:9px}.tests div{position:relative;padding:11px 13px 11px 46px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}.tn{position:absolute;left:13px;top:12px;display:grid;place-items:center;width:22px;height:22px;border-radius:7px;background:rgba(45,226,206,.15);color:#2DE2CE;font:800 12px/1 Outfit}.tests b{font:700 14px/1.2 Outfit}.tests p{margin:3px 0 0;font-size:12.3px;color:#B3ABD6}
.note{display:flex;gap:10px;margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(255,196,77,.08);border:1px solid rgba(255,196,77,.3)}.note .ic{color:#FFC44D;width:20px;height:20px}.note p{margin:0;font-size:12.5px;color:#E7E2FA}
/* spec */
.spgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.spc{padding:14px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
.spc>b{display:flex;align-items:center;gap:8px;font:700 16px/1.2 Outfit;margin-bottom:8px}.spc>b span{display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:rgba(45,226,206,.15);color:#2DE2CE;font:800 12px/1 Outfit}
.spc ul{margin:0;padding:0;list-style:none}.spc li{display:flex;gap:6px;font-size:12px;line-height:1.4;color:#D6D0F0;margin-bottom:6px}.spc li .ic{width:14px;height:14px;color:#2DE2CE;flex:none;margin-top:2px}
/* closing */
.closing{display:grid;place-items:center;text-align:center}.clz{display:flex;flex-direction:column;align-items:center;gap:10px;max-width:760px}.clz .art{width:56px;height:56px}.clz h2{margin:0;font:700 40px/1.1 Outfit}.clz>p{margin:0;color:#C9C2E6;font-size:15px}.clz .small{font-size:11.5px;color:#7D74A8;margin-top:8px}
.clrow{display:flex;gap:18px;margin:14px 0 4px}
`;

function build(only) {
  const fontCss = fs.readFileSync(path.join(ROOT, "assets", "fonts", "fonts.css"), "utf8").replace(/url\(([^)]+\.woff2)\)/g, (m, f) => "url(../assets/fonts/" + f + ")");
  // page numbers and the contents column
  const firstOf = {};
  pages.forEach((p, i) => { if (!(p.section in firstOf)) firstOf[p.section] = i + 1; });
  const sections = pages.map((p, i) => {
    let html = p.html;
    if (p.cls === "contents") html = html.replace(/<span class="tpn" data-sec="([^"]+)"><\/span>/g, (m, k) => `<span class="tpn">${firstOf[k] || ""}</span>`);
    const foot = p.cls === "cover" ? "" : `<footer class="pf"><span>Block Bloom · Premium UI/UX redesign · 19 Nov 2026</span><span>${i + 1} / ${pages.length}</span></footer>`;
    return `<section class="page ${p.cls}">${html}${foot}</section>`;
  });
  const body = sections.join("\n");
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Block Bloom UI-UX Redesign</title><style>${fontCss}${css()}${DOC_CSS}</style></head><body>${sprite()}${body}</body></html>`;
  fs.writeFileSync(path.join(OUT, "redesign.html"), html);
  if (only) {
    for (const k of String(only).split(",")) {
      const one = sections[Number(k) - 1].replace(/\.\.\/assets\//g, "../../assets/").replace(/src="shots\//g, 'src="../shots/');
      const fc = fontCss.replace(/url\(\.\.\/assets/g, "url(../../assets");
      fs.writeFileSync(path.join(OUT, "qa", "page-" + k + ".html"), '<!doctype html><html><head><meta charset="utf-8"><style>' + fc + css() + DOC_CSS + "</style></head><body>" + sprite() + one + "</body></html>");
    }
  }
  console.log("pages " + pages.length + ", html " + Math.round(Buffer.byteLength(html) / 1024) + " KB");
}

module.exports = { build };
