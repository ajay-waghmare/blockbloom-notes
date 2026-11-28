// Block Bloom — the ₹10k/month plan, simulated day by day (1 Dec 2026 – 30 Apr 2027). Claude, 27 Nov 2026.
// usage: node revenue-10k-plan-sim.js
// Three cases share one engine. Every input is labelled MEASURED (source) or ASSUMED; replace ASSUMED inputs with
// KPI-tool numbers at each monthly review. Revenue = AdMob basis (₹). The current whale (one US device, ~₹30/day)
// is NOT included: the plan must work without him; his revenue is upside.

const START = Date.UTC(2026, 11, 1), END = Date.UTC(2027, 3, 30);
const DAYS = Math.round((END - START) / 864e5) + 1;
const key = d => { const x = new Date(START + d * 864e5); return x.getUTCFullYear() * 10000 + (x.getUTCMonth() + 1) * 100 + x.getUTCDate(); };
const monthOf = d => { const k = key(d); return Math.floor(k / 100); };
const inR = (d, a, b) => key(d) >= a && key(d) <= b;

const curve = (a, e) => n => n === 0 ? 1 : n <= 7 ? a[n - 1] : a[6] * Math.pow(7 / n, e);
const RET = {
  today: curve([0.17, 0.12, 0.08, 0.06, 0.05, 0.045, 0.04], 0.8),   // MEASURED: all real users, cohorts 19–25 Nov
  mid: curve([0.24, 0.16, 0.12, 0.10, 0.09, 0.085, 0.08], 0.75),     // ASSUMED: after vc44 hook + daily-loop fixes
  target: curve([0.30, 0.20, 0.16, 0.14, 0.13, 0.125, 0.12], 0.7),  // ASSUMED: casual-puzzle median, the Feb goal
};
const IAP_NET = 0.85 * 1.99 * 93;   // ₹ per $1.99 purchase after Play's 15%
const GST_RATE = 1.18;              // VERIFIED 28 Nov 2026 (P12): Google Ads India deducts 18.00% Integrated GST from Prepay (-₹563.12 on ₹3,128.42 spend)

// Case definitions. stage(d) returns paid ₹/day; the ladder in 12-10k-month-plan.md §4.
const CASES = {
  'WORST (Stage 0 fails, ads stop, product stalls)': {
    stage: d => inR(d, 20261204, 20261210) ? 400 : 0,
    ret: () => RET.today,
    t1arp: () => 3.5,
    iapPerMonth: () => 0,
    t1Organic: () => 0.5,
  },
  'BASE (gates pass on time)': {
    stage: d => inR(d, 20261204, 20261210) ? 400            // Stage 0 calibration
      : inR(d, 20261212, 20261221) ? 500                     // Stage 1 Winter Bloom push
      : inR(d, 20261224, 20270103) ? 0                       // Stage 2 skipped in BASE (D7 ROAS < 40% expected in Dec)
      : inR(d, 20270104, 20270131) ? 150                     // Stage 3 always-on, small
      : inR(d, 20270201, 20270228) ? 250
      : inR(d, 20270301, 20270430) ? 300                     // Mar–Apr
      : 0,                                                    // gap days between stages: no spend
    ret: d => key(d) < 20270101 ? RET.today : key(d) < 20270201 ? RET.mid : RET.target,
    t1arp: d => key(d) < 20261207 ? 3.5 : key(d) < 20270201 ? 5.0 : key(d) < 20270301 ? 6.0 : 7.0,
    iapPerMonth: d => key(d) < 20270101 ? 1 : key(d) < 20270201 ? 4 : key(d) < 20270301 ? 8 : 12,
    t1Organic: d => key(d) < 20261214 ? 0.5 : key(d) < 20261222 ? 1.5 : key(d) < 20270201 ? 1.0 : key(d) < 20270301 ? 2.0 : 3.0,
  },
  'STOP AFTER STAGE 1 (Stage 0 passes, Stage 1 D7 fails, ads stop)': {
    stage: d => inR(d, 20261204, 20261210) ? 400 : inR(d, 20261212, 20261221) ? 500 : 0,
    ret: () => RET.today,
    t1arp: d => key(d) < 20261207 ? 3.5 : 4.5,
    iapPerMonth: () => 1,
    t1Organic: d => inR(d, 20261214, 20261221) ? 1.5 : 0.7,
  },
  'SLOW WITH RULES (retention only reaches "mid"; the Stage-3 gate fails, so no always-on spend)': {
    stage: d => inR(d, 20261204, 20261210) ? 400 : inR(d, 20261212, 20261221) ? 500 : 0,
    ret: d => key(d) < 20270101 ? RET.today : RET.mid,
    t1arp: d => key(d) < 20261207 ? 3.5 : 5.0,
    iapPerMonth: d => key(d) < 20270201 ? 1 : 4,
    t1Organic: d => key(d) < 20261214 ? 0.5 : key(d) < 20261222 ? 1.5 : key(d) < 20270301 ? 1.0 : 1.5,
  },
  'NO RULES - what the gates prevent (keeps spending ₹150–200/day although retention only reaches "mid")': {
    stage: d => inR(d, 20261204, 20261210) ? 400 : inR(d, 20261212, 20261221) ? 500
      : inR(d, 20270104, 20270228) ? 150 : inR(d, 20270301, 20270430) ? 200 : 0,
    ret: d => key(d) < 20270101 ? RET.today : RET.mid,
    t1arp: d => key(d) < 20261207 ? 3.5 : 5.0,
    iapPerMonth: d => key(d) < 20270201 ? 1 : 4,
    t1Organic: d => key(d) < 20261214 ? 0.5 : key(d) < 20261222 ? 1.5 : key(d) < 20270301 ? 1.0 : 1.5,
  },
  'UPSIDE (faster retention, Stage 2 runs)': {
    stage: d => inR(d, 20261204, 20261210) ? 400 : inR(d, 20261212, 20261221) ? 500 : inR(d, 20261224, 20270103) ? 700
      : inR(d, 20270104, 20270131) ? 250 : inR(d, 20270201, 20270228) ? 350 : inR(d, 20270301, 20270430) ? 400 : 0,
    ret: d => key(d) < 20261215 ? RET.today : key(d) < 20270115 ? RET.mid : RET.target,
    t1arp: d => key(d) < 20261207 ? 3.5 : key(d) < 20270115 ? 5.5 : 7.5,
    iapPerMonth: d => key(d) < 20270101 ? 2 : key(d) < 20270201 ? 8 : 15,
    t1Organic: d => key(d) < 20261214 ? 0.5 : key(d) < 20261222 ? 2 : key(d) < 20270201 ? 1.5 : 3.5,
  },
};
const ROW_INSTALLS = 8;       // MEASURED: human installs/day outside Tier-1 (23–27 Nov)
const ROW_ARPDAU = 0.25;      // MEASURED ≈ ₹0.16–0.36
// Cost per paid Tier-1 install: ASSUMED ₹27 base; +15% 13–24 Dec (pre-Christmas); −20% from 25 Dec to 10 Jan.
const cpi = d => 27 * (inR(d, 20261213, 20261224) ? 1.15 : 1) * (inR(d, 20261225, 20270110) ? 0.8 : 1);
// Ad prices fall after Christmas: ARPDAU × 0.8 from 26 Dec to 10 Jan (ASSUMED, plan-v2 Q5).
const arpSeason = d => inR(d, 20261226, 20270110) ? 0.8 : 1;

const f = n => Math.round(n).toLocaleString('en-IN');
for (const [name, c] of Object.entries(CASES)) {
  const t1 = new Array(DAYS).fill(0), row = new Array(DAYS).fill(0), retOf = [];
  const months = {};
  let spendTot = 0, revTot = 0;
  for (let d = 0; d < DAYS; d++) {
    const spend = c.stage(d);
    t1[d] = c.t1Organic(d) + (spend > 0 ? spend / cpi(d) : 0);
    row[d] = ROW_INSTALLS;
    retOf[d] = c.ret(d);
    let t1dau = 0, rowdau = 0;
    for (let k = 0; k <= d; k++) { const R = retOf[k]; t1dau += t1[k] * R(d - k); rowdau += row[k] * R(d - k); }
    const rev = (t1dau * c.t1arp(d) + rowdau * ROW_ARPDAU) * arpSeason(d) + c.iapPerMonth(d) * IAP_NET / 30;
    const m = monthOf(d);
    months[m] = months[m] || { spend: 0, rev: 0, days: 0, t1dau: 0, lastDay: 0 };
    months[m].spend += spend; months[m].rev += rev; months[m].days++; months[m].t1dau = t1dau; months[m].lastDay = rev;
    spendTot += spend; revTot += rev;
  }
  console.log(`\n== ${name}`);
  console.log('month   | ad spend | cash(1.18x) | revenue | profit(after GST) | cum profit(GST) | Tier-1 DAU (end) | ₹/day (end)');
  let cum = 0, cumGst = 0, cashTot = 0;
  for (const [m, v] of Object.entries(months)) {
    const cash = v.spend * GST_RATE;
    cashTot += cash;
    cum += v.rev - v.spend;
    cumGst += v.rev - cash;
    console.log(`${m} | ${f(v.spend).padStart(8)} | ${f(cash).padStart(11)} | ${f(v.rev).padStart(7)} | ${f(v.rev - cash).padStart(17)} | ${f(cumGst).padStart(15)} | ${f(v.t1dau).padStart(16)} | ${f(v.lastDay).padStart(11)}`);
  }
  let run = 0, peak = 0, beMonth = null;
  for (const [m, v] of Object.entries(months)) { run += v.rev - v.spend * GST_RATE; if (run < peak) peak = run; if (run >= 0 && beMonth === null && peak < 0) beMonth = m; }
  console.log(`peak cash needed incl. 18% GST: ₹${f(-peak)}; cumulative profit turns positive in: ${beMonth || (peak === 0 ? "never negative" : "not by April")}`);
  console.log(`total Dec–Apr: ad spend ₹${f(spendTot)} (wallet cash ₹${f(cashTot)}), revenue ₹${f(revTot)}, profit ex-GST ₹${f(revTot - spendTot)}, profit after 18% GST ₹${f(revTot - cashTot)} (plus whale upside ~₹30/day while he stays)`);
}
