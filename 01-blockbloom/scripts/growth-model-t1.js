// Block Bloom — Tier-1, ROI-first 30-day plan model (roadmap v1.1, 22 Nov 2026). Day 1 = Sun 22 Nov ... Day 30 = Mon 21 Dec.
// Ajay, 22 Nov: "target tier 1 users more, not much for cheap users ... I don't have budget but I'm ready to invest,
// but revenue has to come from that." So: Tier-1 English countries only (US, UK, CA, AU, NZ, IE), no Tier-2/3 spend,
// spend steps up only when a gate shows the money is coming back.
// Same baseline inputs as growth-model.js (reports/growth-baseline-2026-11-21.txt). Pure arithmetic, no network.
//
// usage: node growth-model-t1.js [--interstitial-loses] [--gate-a-fails] [--gate-b-fails]
const has = f => process.argv.includes(f);
const INTER_LOSES = has("--interstitial-loses"), GATE_A_FAILS = has("--gate-a-fails"), GATE_B_FAILS = has("--gate-b-fails");
const DAYS = 30;

// Tier-1 budget (Rs/day). Black Friday / Cyber Monday (Days 5-9) cut to 300; gates on Day 8 (A) and Day 18 (B).
function spendT1(d) {
	if (d <= 4) return 400;
	if (d <= 9) return 300;
	const holdA = GATE_A_FAILS ? 300 : 500;
	if (d <= 17) return holdA;
	if (GATE_A_FAILS || GATE_B_FAILS) return holdA;
	return d <= 21 ? 700 : 900;
}
const log2 = x => Math.log(x) / Math.LN2;
// Cost per OPENED Tier-1 install: Rs25 base (Rs19.71 per Play install / open rate), +30% Black Friday week,
// +15% in the Christmas run-up (Days 22-30), +15% per doubling of the daily budget above Rs500.
const cpiT1 = (d, s) => 25 * (d >= 5 && d <= 9 ? 1.3 : 1) * (d >= 22 ? 1.15 : 1) * (1 + 0.15 * log2(Math.max(1, s / 500)));
// Free installs: 5/day today; listing work, ratings and Reddit/Shorts add 0.4/day from Day 6; festival +5 (Days 6-12);
// Winter Bloom +8 (Days 23-30); +5% of paid installs (store-rank halo).
const organic = (d, paid) => 5 + Math.max(0, d - 5) * 0.4 + (d >= 6 && d <= 12 ? 5 : 0) + (d >= 23 ? 8 : 0) + 0.05 * paid;

const curve = (d1to7, tailExp) => n => n === 0 ? 1 : n <= 7 ? d1to7[n - 1] : d1to7[6] * Math.pow(7 / n, tailExp);
const R0 = curve([0.15, 0.07, 0.05, 0.045, 0.04, 0.038, 0.035], 0.8);   // measured today
const R1 = curve([0.24, 0.14, 0.11, 0.095, 0.085, 0.078, 0.072], 0.75); // vc40 at 100% (installs from Day 5)
const R2 = curve([0.30, 0.19, 0.15, 0.13, 0.115, 0.105, 0.10], 0.7);    // vc41 at 100% (installs from Day 14)
const retentionFor = installDay => installDay < 5 ? R0 : installDay < 14 ? R1 : R2;
const Q = { t1: 1.2, organic: 1.1 };
const ARPDAU = { t1: 1.4, organic: 0.4, legacy: 0.5 };      // measured 1-21 Nov (US Rs3.51 per player over ~2.5 days)
const IAP = { t1: 0.5, organic: 0.3 };                      // remove_ads offers from vc40 (Day 6), per install, day +2
// Share of players with interstitials ON: A/B 50% from Day 2; the winner from Day 15 (all ON, or all OFF if it loses).
const interShare = d => d < 2 ? 0 : d < 15 ? 0.5 : (INTER_LOSES ? 0 : 1);
// Revenue per player multiplier: vc40 rewarded preload + offers (x1.3 from Day 6), vc41 mediation fill (x1.3 from Day 14),
// interstitials ON (x1.6 for the players who get them).
const mult = d => (d >= 6 ? 1.3 : 1) * (d >= 14 ? 1.3 : 1) * (1 + 0.6 * interShare(d));
const keepPenalty = d => 1 - 0.05 * interShare(d);          // interstitials cost ~5% of later-day return
const legacy = d => 15 + 17 * Math.exp(-(d - 1) / 10);      // players installed before 22 Nov

function run() {
	const inst = [], rows = [], cohortRev = {}, cohortCost = {};
	let spend = 0, revenue = 0, installs = 0;
	for (let d = 1; d <= DAYS; d++) {
		const s = spendT1(d), t1 = s / cpiT1(d, s), org = organic(d, t1);
		inst[d] = { t1, organic: org };
		cohortCost[d] = s; cohortRev[d] = 0;
		spend += s; installs += t1 + org;
		let dau = legacy(d), rev = legacy(d) * ARPDAU.legacy * mult(d);
		for (let k = 1; k <= d; k++) {
			const R = retentionFor(k), n = d - k;
			for (const t of ["t1", "organic"]) {
				const users = inst[k][t] * (n === 0 ? 1 : Math.min(1, R(n) * Q[t] * keepPenalty(d)));
				let r = users * ARPDAU[t] * mult(d);
				if (n === 2 && k >= 6) r += inst[k][t] * IAP[t];
				dau += users; rev += r;
				if (t === "t1" && n <= 6) cohortRev[k] += r;
			}
		}
		revenue += rev;
		rows.push({ d, t1, org, dau, rev, s });
	}
	return { rows, spend, revenue, installs, cohortRev, cohortCost };
}
const f = n => Math.round(n).toLocaleString("en-IN");
const r = run();
const flags = [INTER_LOSES && "interstitial test loses", GATE_A_FAILS && "Gate A fails", GATE_B_FAILS && "Gate B fails"].filter(Boolean);
console.log("Tier-1 ROI-first plan" + (flags.length ? " — " + flags.join(", ") : " — base case (both gates pass, interstitial test wins)"));
console.log("\nday | Tier-1 budget Rs | Tier-1 installs | free installs | daily players | revenue/day Rs (GA4) | AdMob est.");
r.rows.forEach(x => console.log([x.d, f(x.s), f(x.t1), f(x.org), f(x.dau), f(x.rev), f(x.rev * 1.15)].join(" | ")));
const sum = (a, b, k) => r.rows.slice(a - 1, b).reduce((acc, x) => acc + x[k], 0);
console.log("\nweek | dates | ad spend | Tier-1 installs | free installs | avg daily players | revenue GA4 | AdMob est.");
[[1, 7, "22-28 Nov"], [8, 14, "29 Nov-5 Dec"], [15, 21, "6-12 Dec"], [22, 30, "13-21 Dec (9 days)"]].forEach(([a, b, l], i) =>
	console.log(["W" + (i + 1), l, f(sum(a, b, "s")), f(sum(a, b, "t1")), f(sum(a, b, "org")), f(sum(a, b, "dau") / (b - a + 1)), f(sum(a, b, "rev")), f(sum(a, b, "rev") * 1.15)].join(" | ")));
console.log("\n30 days: ad spend Rs" + f(r.spend) + " | installs " + f(r.installs) + " (MAU ~" + f(r.installs + 100) + ") | revenue Rs" + f(r.revenue) + " GA4 / ~Rs" + f(r.revenue * 1.15) + " AdMob | net Rs" + f(r.revenue * 1.15 - r.spend));
console.log("\nTier-1 cohorts — revenue in their first 7 days / their ad cost (day-7 ROAS):");
[[1, 4], [5, 9], [10, 13], [14, 17], [18, 23]].forEach(([a, b]) => {
	let rv = 0, c = 0; for (let k = a; k <= b; k++) { rv += r.cohortRev[k]; c += r.cohortCost[k]; }
	console.log("  installs of Days " + a + "-" + b + ": Rs" + f(rv) + " / Rs" + f(c) + " = " + Math.round(100 * rv / c) + "%");
});
// 90-day value of one Tier-1 install under the Day-30 conditions (R2, full multiplier), vs its cost.
let days90 = 1; for (let i = 1; i < 90; i++) days90 += Math.min(1, R2(i) * Q.t1 * keepPenalty(30));
const v90 = days90 * ARPDAU.t1 * mult(30) + IAP.t1, c30 = cpiT1(30, spendT1(30));
console.log("\none Tier-1 install at Day-30 conditions: " + days90.toFixed(2) + " active days in 90 days x Rs" + (ARPDAU.t1 * mult(30)).toFixed(2) +
	"/day + Rs" + IAP.t1 + " purchases = Rs" + v90.toFixed(1) + " vs cost Rs" + c30.toFixed(1) + " -> 90-day payback " + Math.round(100 * v90 / c30) + "%");
