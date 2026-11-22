// Block Bloom — plan v2 model (22 Nov 2026): ORGANIC FIRST in Tier-1, paid ads only in short bursts.
// Ajay, 22 Nov: "focus more on organic users gain majorly in tier 1 countries; then paid campaigns, smartly done,
// so we get more and more users on that campaign day. How much should I spend till December on ads?"
//
// Day 1 = Mon 23 Nov 2026 ... Day 39 = Thu 31 Dec 2026. Calendar effects are pinned to DATES, not day numbers.
// Same building blocks as growth-model-t1.js (retention curves, revenue per active day, offers), plus:
//   - a separate Tier-1 FREE install stream (the organic targets of plan v2, 06-organic-tier1.md);
//   - paid only in 7-day bursts (Google: Android App campaigns learn for at least 7 days): B1 Sat 12 - Fri 18 Dec
//     Rs500/day (always), B2 Fri 25 - Thu 31 Dec Rs1,000/day
//     (only with --burst2, i.e. only if B1 passes the 40% day-7 test in 07-ad-bursts.md);
//   - cost per install: Rs25 base, +15% per doubling of the daily budget above Rs500, +15% from 13 to 24 Dec
//     (pre-Christmas competition), -20% from 25 Dec (Q5: ad prices fall after Christmas), and x1.2 / x1.1 on the
//     first two days of a burst (Google: cost per install is inflated in a campaign's first days);
//   - revenue per player x0.8 from 26 Dec (the same post-Christmas price fall lowers what our ads earn).
// Everything is an assumption until measured; replace inputs with KPI-tool numbers at each weekly review.
//
// usage: node growth-model-v2.js [--burst2] [--interstitial-loses] [--csv]
const has = f => process.argv.includes(f);
const BURST2 = has("--burst2"), LOSE = has("--interstitial-loses"), CSV = has("--csv");
const START = Date.UTC(2026, 10, 23), PLAN_DAYS = 39, H = 90;
const dt = d => new Date(START + (d - 1) * 864e5);
const key = d => { const x = dt(d); return x.getUTCFullYear() * 10000 + (x.getUTCMonth() + 1) * 100 + x.getUTCDate(); };
const inR = (d, a, b) => key(d) >= a && key(d) <= b;
const label = d => dt(d).toUTCString().slice(0, 11).replace(",", "");

// Paid bursts (Rs/day). Nothing else is paid.
const BURSTS = [{ name: "B1", from: 20261212, to: 20261218, perDay: 500 }];
if (BURST2) BURSTS.push({ name: "B2", from: 20261225, to: 20261231, perDay: 1000 });
const burstOf = d => BURSTS.find(b => inR(d, b.from, b.to));
const spend = d => (burstOf(d) ? burstOf(d).perDay : 0);
const burstDayIndex = d => { const b = burstOf(d); if (!b) return -1; let i = 0; while (inR(d - i - 1, b.from, b.to)) i++; return i; };
const log2 = x => Math.log(x) / Math.LN2;
const cpi = (d, s) => 25 * (1 + 0.15 * log2(Math.max(1, s / 500)))
	* (inR(d, 20261213, 20261224) ? 1.15 : 1) * (inR(d, 20261225, 20270110) ? 0.8 : 1)
	* ([1.2, 1.1][burstDayIndex(d)] || 1);

// Tier-1 FREE installs a day: the plan-v2 targets (7-day averages), by date.
function t1Free(d) {
	const k = key(d);
	if (k <= 20261126) return 2;            // listing fixed, ratings prompt not live yet
	if (k <= 20261203) return 3;            // Aurora Bloom Festival + Play card, vc40, first Reddit post
	if (k <= 20261213) return 4;            // custom listing + icon test, Shorts daily, vc41 share card
	if (k <= 20261221) return 6;            // Winter Bloom + Play card (+ B1 halo below)
	if (k <= 20261223) return 5;
	if (k <= 20261231) return 8;            // Holiday Bloom + Play card, new phones, New Year's week
	return 6;                               // January (after the plan; used only for the 90-day view)
}
const otherFree = d => 4;                   // rest of the world, unpromoted (was ~4/day before any ads)
const HALO = 0.05;                          // free installs from paid (store-rank halo), as in growth-model-t1.js

const curve = (a, e) => n => n === 0 ? 1 : n <= 7 ? a[n - 1] : a[6] * Math.pow(7 / n, e);
const R0 = curve([0.15, 0.07, 0.05, 0.045, 0.04, 0.038, 0.035], 0.8);   // vc39, measured
const R1 = curve([0.24, 0.14, 0.11, 0.095, 0.085, 0.078, 0.072], 0.75); // vc40 at 100% (Thu 26 Nov)
const R2 = curve([0.30, 0.19, 0.15, 0.13, 0.115, 0.105, 0.10], 0.7);    // vc41 at 100% (Sat 5 Dec)
const ret = k => key(k) < 20261127 ? R0 : key(k) < 20261206 ? R1 : R2;
const Q = { t1paid: 1.2, t1free: 1.3, other: 1.1 };                     // free players stay longer than paid ones
const ARP = { t1paid: 1.4, t1free: 1.4, other: 0.4, legacy: 0.5 };      // Rs per active day, GA4 basis, today
const IAP = { t1paid: 0.5, t1free: 0.5, other: 0.3 };                   // purchases per install (from vc40), day +2
const inter = d => key(d) < 20261123 ? 0 : key(d) < 20261207 ? 0.5 : (LOSE ? 0 : 1); // E1 23 Nov - 6 Dec
const mult = d => (key(d) >= 20261127 ? 1.3 : 1) * (key(d) >= 20261206 ? 1.3 : 1) * (1 + 0.6 * inter(d))
	* (key(d) >= 20261226 ? 0.8 : 1);
const keep = d => 1 - 0.05 * inter(d);
const legacy = d => 15 + 17 * Math.exp(-(d - 1) / 10);                  // players from before 23 Nov
const TYPES = ["t1paid", "t1free", "other"];

const inst = [], rows = [], cohort = {};
let cs = 0, cr = 0;
for (let d = 1; d <= H; d++) {
	const s = spend(d), paid = s > 0 ? s / cpi(d, s) : 0;
	inst[d] = { t1paid: paid, t1free: t1Free(d) + HALO * paid, other: otherFree(d) };
	let rev = legacy(d) * ARP.legacy * mult(d), dau = legacy(d), t1dau = 0;
	for (let k = 1; k <= d; k++) {
		const R = ret(k), n = d - k;
		for (const t of TYPES) {
			const u = inst[k][t] * (n === 0 ? 1 : Math.min(1, R(n) * Q[t] * keep(d)));
			let r = u * ARP[t] * mult(d);
			if (n === 2 && key(k) >= 20261127) r += inst[k][t] * IAP[t];
			rev += r; dau += u; if (t !== "other") t1dau += u;
			if (t === "t1paid" && n <= 6 && burstOf(k)) cohort[burstOf(k).name] = (cohort[burstOf(k).name] || 0) + r * 1.15;
		}
	}
	const adm = rev * 1.15; cs += s; cr += adm;
	rows.push({ d, date: label(d), s, paid, t1free: inst[d].t1free, other: inst[d].other, dau, t1dau, adm, cs, cr });
}
const f = n => Math.round(n).toLocaleString("en-IN");
const flags = [BURST2 && "with burst 2", LOSE && "interstitial test loses"].filter(Boolean).join(", ") || "committed: burst 1 only";
if (CSV) {
	console.log("day,date,ad_budget,tier1_paid_installs,tier1_free_installs,other_free_installs,downloads,daily_players,tier1_daily_players,revenue_admob,spend_to_date,revenue_to_date,profit_to_date");
	rows.slice(0, PLAN_DAYS).forEach(x => console.log([x.d, x.date, x.s, Math.round(x.paid), Math.round(x.t1free), Math.round(x.other),
		Math.round(x.paid + x.t1free + x.other), Math.round(x.dau), Math.round(x.t1dau), Math.round(x.adm), Math.round(x.cs), Math.round(x.cr), Math.round(x.cr - x.cs)].join(",")));
	process.exit(0);
}
console.log("Block Bloom plan v2 (organic first, ad bursts) — " + flags);
console.log("\nday | date | ad Rs | T1 paid | T1 free | other free | downloads | players | T1 players | revenue Rs (AdMob) | spend to date | revenue to date | profit to date");
rows.slice(0, PLAN_DAYS).forEach(x => console.log([x.d, x.date, f(x.s), f(x.paid), f(x.t1free), f(x.other), f(x.paid + x.t1free + x.other),
	f(x.dau), f(x.t1dau), f(x.adm), f(x.cs), f(x.cr), f(x.cr - x.cs)].join(" | ")));
const wk = [[1, 7, "23-29 Nov"], [8, 14, "30 Nov-6 Dec"], [15, 21, "7-13 Dec"], [22, 28, "14-20 Dec"], [29, 35, "21-27 Dec"], [36, 39, "28-31 Dec"]];
console.log("\nweek | dates | ad spend | T1 paid | T1 free | other free | avg players | avg T1 players | revenue | profit");
wk.forEach(([a, b, l], i) => { const R = rows.slice(a - 1, b), S = k => R.reduce((t, x) => t + x[k], 0);
	console.log(["W" + (i + 1), l, f(S("s")), f(S("paid")), f(S("t1free")), f(S("other")), f(S("dau") / R.length), f(S("t1dau") / R.length), f(S("adm")), f(S("adm") - S("s"))].join(" | ")); });
const at = d => rows[d - 1];
console.log("\nto 31 Dec: ad spend Rs" + f(at(39).cs) + " | revenue Rs" + f(at(39).cr) + " | profit Rs" + f(at(39).cr - at(39).cs));
console.log("to 20 Feb (Day 90): ad spend Rs" + f(at(90).cs) + " | revenue Rs" + f(at(90).cr) + " | profit Rs" + f(at(90).cr - at(90).cs));
for (const b of BURSTS) { let c = 0, n = 0; for (let d = 1; d <= H; d++) if (burstOf(d) === b) { c += spend(d); n += rows[d - 1].paid; }
	console.log(b.name + " " + b.from + "-" + b.to + ": spend Rs" + f(c) + ", ~" + f(n) + " Tier-1 installs (Rs" + (c / n).toFixed(1) + " each), first-7-day revenue Rs" + f(cohort[b.name] || 0) +
		" = day-7 return on spend " + Math.round(100 * (cohort[b.name] || 0) / c) + "% (pass mark for burst 2: 40%)"); }
// B2 is decided on Wed 23 Dec from the B1 installs of 12-15 Dec (their day 7 is complete on 22 Dec).
