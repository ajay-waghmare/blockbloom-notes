// Kept with roadmap v1.1 (22 Nov 2026): the model behind the answer to Ajay's week-1 question
// ("1k+ downloads, 500 daily players, Rs10k revenue this week — is that achievable?"). Usage: node growth-model-week1.js
// Block Bloom — WEEK 1 feasibility (Day 1 = Sun 22 Nov ... Day 7 = Sat 28 Nov 2026).
// Same inputs as 01-blockbloom/scripts/growth-model.js, plus week-1 levers:
//   - interstitials ON from a given day via Remote Config (no release): revenue/player x1.6, day-1+ return x0.92
//   - vc40 at 100% from Day 5 (Thu 26 Nov): installs from Day 5 use the improved curve; revenue/player x1.3 from Day 6
//   - Tier-3 (India-first) cost per OPENED install rises with daily budget (Google needs to find more inventory):
//       cpi_t3 = 4 x (1 + 0.15 x log2(max(1, spend/200)))   -> Rs200: 4.0 | Rs800: 5.2 | Rs1,600: 5.8 | Rs3,200: 6.4
//   - Tier-1 likewise: cpi_t1 = 25 x (1 + 0.15 x log2(max(1, spend/500))), x1.3 on Days 5-7 (Black Friday week)
//   - a budget change takes effect the NEXT day (delivery lag)
// Revenue: GA4 basis; AdMob console ran ~1.15x GA4 for 1-21 Nov, shown as "AdMob est.".
const R0 = n => n === 0 ? 1 : n <= 7 ? [0.15, 0.07, 0.05, 0.045, 0.04, 0.038, 0.035][n - 1] : 0.035 * Math.pow(7 / n, 0.8);
const R1 = n => n === 0 ? 1 : n <= 7 ? [0.24, 0.14, 0.11, 0.095, 0.085, 0.078, 0.072][n - 1] : 0.072 * Math.pow(7 / n, 0.75);
const Q = { t1: 1.2, t2: 1.0, t3: 0.6, organic: 1.1 };
const ARPDAU = { t1: 1.4, t2: 0.3, t3: 0.03, organic: 0.4, legacy: 0.5 };
const IAP = { t1: 0.5, organic: 0.5, t2: 0.1, t3: 0 };
const log2 = x => Math.log(x) / Math.LN2;
const cpi = (t, spend, day) => t === "t1" ? 25 * (1 + 0.15 * log2(Math.max(1, spend / 500))) * (day >= 5 ? 1.3 : 1)
	: t === "t2" ? 8 * (1 + 0.15 * log2(Math.max(1, spend / 300)))
	: 4 * (1 + 0.15 * log2(Math.max(1, spend / 200)));
const legacy = d => 15 + 17 * Math.exp(-(d - 1) / 10);
function run(sc) {
	const inst = [], out = [];
	let spend = 0, rev = 0, installs = 0, dauSum = 0;
	for (let d = 1; d <= 7; d++) {
		const s = sc.spend(Math.max(1, d - 1)); // yesterday's decision delivers today (Day 1 = today's live budget)
		const live = d === 1 ? { t1: 500, t2: 0, t3: 200 } : s;
		const i = {}; let paid = 0;
		for (const t of ["t1", "t2", "t3"]) { i[t] = live[t] ? live[t] / cpi(t, live[t], d) : 0; paid += i[t]; spend += live[t]; }
		i.organic = 5 + (d >= 6 && sc.festival ? 8 : 0) + 0.05 * paid;
		inst[d] = i;
		const inter = sc.interstitialFrom && d >= sc.interstitialFrom;
		const mult = (inter ? 1.6 : 1) * (d >= 6 && sc.vc40 ? 1.3 : 1);
		let dau = legacy(d), r = legacy(d) * ARPDAU.legacy * mult;
		for (let k = 1; k <= d; k++) {
			const curve = (sc.vc40 && k >= 5) ? R1 : R0, n = d - k;
			for (const t of ["t1", "t2", "t3", "organic"]) {
				const keep = n === 0 ? 1 : Math.min(1, curve(n) * Q[t] * (inter ? 0.92 : 1));
				const u = inst[k][t] * keep; dau += u; r += u * ARPDAU[t] * mult;
				if (n === 2 && sc.vc40 && k >= 5) r += inst[k][t] * IAP[t];
			}
		}
		const di = i.t1 + i.t2 + i.t3 + i.organic;
		installs += di; rev += r; dauSum += dau;
		out.push({ d, installs: di, dau, rev, spend: live.t1 + live.t2 + live.t3 });
	}
	return { out, spend, rev, installs, avgDau: dauSum / 7 };
}
const f = n => Math.round(n).toLocaleString("en-IN");
const SC = {
	"S0 as today (Rs700/day, no change)": { spend: d => ({ t1: 500, t2: 0, t3: 200 }) },
	"S1 1k downloads in the week (+India Rs800/day)": { spend: d => ({ t1: 500, t2: 200, t3: 800 }), vc40: true, festival: true },
	"S2 500 DAU on Day 7 (S1 + India burst Days 4-7)": { spend: d => d >= 3 ? { t1: 500, t2: 200, t3: 3200 } : { t1: 500, t2: 200, t3: 800 }, vc40: true, festival: true },
	"S3 500 DAU as a weekly average (India Rs6k/day from Day 2)": { spend: d => ({ t1: 500, t2: 300, t3: 6000 }), vc40: true, festival: true },
	"S4 max revenue push (interstitials ON Day 1, T1 Rs3k, India Rs3k)": { spend: d => ({ t1: 3000, t2: 500, t3: 3000 }), interstitialFrom: 1, vc40: true, festival: true },
	"S5 everything (interstitials ON Day 1, T1 Rs8k, T2 Rs2k, India Rs6k)": { spend: d => ({ t1: 8000, t2: 2000, t3: 6000 }), interstitialFrom: 1, vc40: true, festival: true },
};
console.log("scenario | ad spend in week | downloads in week | downloads Day 7 | DAU Day 7 | avg DAU | revenue in week GA4 | AdMob est. | revenue Day 7");
for (const [name, sc] of Object.entries(SC)) {
	const r = run(sc), l = r.out[6];
	console.log([name, f(r.spend), f(r.installs), f(l.installs), f(l.dau), f(r.avgDau), f(r.rev), f(r.rev * 1.15), f(l.rev)].join(" | "));
}
console.log("\nS2 daily: day | downloads | DAU | revenue | spend");
run(SC["S2 500 DAU on Day 7 (S1 + India burst Days 4-7)"]).out.forEach(x => console.log([x.d, f(x.installs), f(x.dau), f(x.rev), f(x.spend)].join(" | ")));
// What Rs10k in 7 days would need: average Rs1,429/day.
console.log("\nRs10,000 in 7 days = Rs1,429/day on average. At Tier-1 revenue/player x1.6 (interstitials ON) = Rs2.24:");
console.log("  ~640 Tier-1 daily players on AVERAGE all week -> ~400+ Tier-1 installs/day from Day 1 at Rs25-35 = Rs10-14k/day of ads (Rs70-100k/week)");
console.log("  at today's blended Rs0.50/player: ~2,860 daily players on average all week");
console.log("  purchases: ~60 remove_ads sales at Rs199 (net ~Rs169) -> 0 sales so far in November");
