// Block Bloom 30-day growth model, written 21 Nov 2026 for 11-growth-roadmap-30-days.md.
// Day 1 = Sun 22 Nov 2026 ... Day 30 = Mon 21 Dec 2026. Pure arithmetic, no network.
// Every input below is a PLANNING ASSUMPTION anchored on the 21 Nov baseline (reports/growth-baseline-2026-11-21.txt).
// At each gate, replace the assumption with the measured value and re-run.
//
// usage: node growth-model.js [--interstitial-win]
//   --interstitial-win  revenue per player x1.6 more from Day 19 (experiment E1 ships interstitials ON)
const INTERSTITIAL_WIN = process.argv.includes("--interstitial-win");
const DAYS = 30;

// Share of an install cohort active n days after install (n = 0 is the install day).
const curve = (d1to7, tailExp) => n => n === 0 ? 1 : n <= 7 ? d1to7[n - 1] : d1to7[6] * Math.pow(7 / n, tailExp);
const R0 = curve([0.15, 0.07, 0.05, 0.045, 0.04, 0.038, 0.035], 0.8);   // measured: D1 14.6%, D3 ~5% (cohorts 4-20 Nov)
const R1 = curve([0.24, 0.14, 0.11, 0.095, 0.085, 0.078, 0.072], 0.75); // vc40 (onboarding v2, first-session hook): installs from Day 5
const R2 = curve([0.30, 0.19, 0.15, 0.13, 0.115, 0.105, 0.10], 0.7);    // vc41 (daily loop, reminders, referral): installs from Day 12
const retentionFor = installDay => installDay < 5 ? R0 : installDay < 12 ? R1 : R2;
const QUALITY = { t1: 1.2, organic: 1.1, t2: 1.0, t3: 0.6 };            // multiplier on day-1+ return, by traffic tier

// Revenue per active player per day (Rs). Measured 1-21 Nov: US ~3.5 per player over ~2.5 days, India 0.17, PK 0.04.
const ARPDAU = { t1: 1.4, t2: 0.3, t3: 0.03, organic: 0.4, legacy: 0.5 };
const monetMult = day => (day < 6 ? 1.0 : day < 13 ? 1.6 : 2.1) * (INTERSTITIAL_WIN && day >= 19 ? 1.6 : 1); // vc40, vc41 mediation, E1
const IAP_PER_INSTALL = { t1: 0.5, organic: 0.5, t2: 0.1, t3: 0 };      // expected net purchases per install, from Day 6
// Cost per OPENED install (Rs): Google Ads counts Play installs; many never open the app.
const cpi = (tier, day) => ({ t1: 25 * (day >= 5 && day <= 9 ? 1.3 : 1), t2: 8, t3: 4 })[tier];   // Black Friday week = Days 5-9
const organic = (day, paid) => 5 + Math.max(0, day - 5) * 0.6 + (day >= 6 && day <= 12 ? 8 : 0) + (day >= 24 ? 12 : 0) + 0.05 * paid;
const legacyDau = day => 15 + 17 * Math.exp(-(day - 1) / 10);           // players installed before 22 Nov

const PATHS = {
	"A  organic-first": d => ({ t1: 200, t2: 130, t3: 0 }),
	"B  gated growth": d => d <= 7 ? { t1: 400, t2: 200, t3: 0 } : d <= 17 ? { t1: 500, t2: 300, t3: 0 } : { t1: 500, t2: 400, t3: 0 },
	"B+ value-first": d => d <= 7 ? { t1: 500, t2: 200, t3: 0 } : d <= 17 ? { t1: 800, t2: 300, t3: 0 } : { t1: 1500, t2: 500, t3: 0 },
	"C  full target": d => d <= 7 ? { t1: 500, t2: 200, t3: 0 } : d <= 17 ? { t1: 700, t2: 500, t3: 300 } : d <= 23 ? { t1: 900, t2: 900, t3: 700 } : { t1: 1200, t2: 1800, t3: 3000 },
};

function run(spendFn) {
	const installs = [], rows = [];
	let spend = 0, revenue = 0, total = 0;
	for (let d = 1; d <= DAYS; d++) {
		const s = spendFn(d), inst = {};
		let paid = 0;
		for (const t of ["t1", "t2", "t3"]) { inst[t] = s[t] / cpi(t, d); paid += inst[t]; spend += s[t]; }
		inst.organic = organic(d, paid);
		installs[d] = inst;
		let dau = legacyDau(d), rev = legacyDau(d) * ARPDAU.legacy * monetMult(d);
		for (let i = 1; i <= d; i++) {
			const R = retentionFor(i), n = d - i;
			for (const t of ["t1", "t2", "t3", "organic"]) {
				const users = installs[i][t] * (n === 0 ? 1 : Math.min(1, R(n) * QUALITY[t]));
				dau += users; rev += users * ARPDAU[t] * monetMult(d);
				if (n === 2 && i >= 6) rev += installs[i][t] * IAP_PER_INSTALL[t];
			}
		}
		const di = inst.t1 + inst.t2 + inst.t3 + inst.organic;
		total += di; revenue += rev;
		rows.push({ d, installs: di, dau, rev, spend: s.t1 + s.t2 + s.t3 });
	}
	return { rows, spend, revenue, total };
}
const fmt = n => Math.round(n).toLocaleString("en-IN");

console.log("Block Bloom growth model" + (INTERSTITIAL_WIN ? " (interstitial test wins from Day 19)" : "") + "\n");
console.log("path | ad spend | installs/day D30 | DAU D30 | MAU D30 | revenue/day D30 | run-rate/month D30 | earned in 30 days | net in 30 days");
for (const [name, fn] of Object.entries(PATHS)) {
	const r = run(fn), l = r.rows[DAYS - 1];
	console.log([name, fmt(r.spend), fmt(l.installs), fmt(l.dau), "~" + fmt(r.total + 100), fmt(l.rev), fmt(l.rev * 30), fmt(r.revenue), fmt(r.revenue - r.spend)].join(" | "));
}
for (const [name, fn] of Object.entries(PATHS)) {
	console.log("\n" + name + ": day | installs/day | DAU | revenue/day | spend so far");
	let cum = 0;
	run(fn).rows.forEach(x => { cum += x.spend; if ([1, 7, 8, 14, 18, 21, 24, 28, 30].includes(x.d)) console.log([x.d, fmt(x.installs), fmt(x.dau), fmt(x.rev), fmt(cum)].join(" | ")); });
}
console.log("\nactive days per install in its first 30 days (incl. install day): curve | T1 | free | T2 | T3");
for (const [n, R] of [["today (R0)", R0], ["after vc40 (R1)", R1], ["after vc41 (R2)", R2]]) {
	const sum = q => { let s = 1; for (let i = 1; i < 30; i++) s += Math.min(1, R(i) * q); return s.toFixed(2); };
	console.log([n, sum(QUALITY.t1), sum(QUALITY.organic), sum(QUALITY.t2), sum(QUALITY.t3)].join(" | "));
}
console.log("\nvalue per install over 90 days (Rs): tier | cost per opened install | today | after vc40 + vc41 | + interstitial win | 90-day payback");
for (const t of ["t1", "t2", "t3"]) {
	const days = (R, q) => { let s = 1; for (let i = 1; i < 90; i++) s += Math.min(1, R(i) * q); return s; };
	const today = days(R0, QUALITY[t]) * ARPDAU[t];
	const fixed = days(R2, QUALITY[t]) * ARPDAU[t] * 2.1 + IAP_PER_INSTALL[t];
	const inter = days(R2, QUALITY[t]) * ARPDAU[t] * 2.1 * 1.6 + IAP_PER_INSTALL[t];
	console.log([t, cpi(t, 1), today.toFixed(1), fixed.toFixed(1), inter.toFixed(1), Math.round(100 * inter / cpi(t, 1)) + "%"].join(" | "));
}
console.log("\nRs1,000/day = DAU x revenue per player: 2,000 x Rs0.50 | 1,000 x Rs1.00 | 700 x Rs1.43 | 400 x Rs2.50");
