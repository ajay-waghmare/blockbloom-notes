// Block Bloom — what ₹10,000 a month takes (steady state). Claude, 27 Nov 2026.
// usage: node revenue-10k-model.js
// Every input is labelled MEASURED (with source) or ASSUMED. Replace ASSUMED inputs with KPI numbers as they arrive.
//
// Steady state: daily active players (DAU) = installs per day × lifetime active days per install (L).
// Revenue per day (AdMob basis) = Σ segment DAU × revenue per active day (ARPDAU) + purchases per day.

const TARGET_MONTH = 10000;                  // ₹ revenue per month
const TARGET_DAY = TARGET_MONTH / 30;        // ≈ ₹333 a day
const USD = 93;                              // ₹ per $ (GA4 Nov 20–26, MEASURED)

// Retention curves: share of an install cohort active on day n (day 0 = 1).
const curve = (a, e) => n => n === 0 ? 1 : n <= 7 ? a[n - 1] : a[6] * Math.pow(7 / n, e);
const L = (R, days = 180) => { let s = 0; for (let n = 0; n < days; n++) s += R(n); return s; };
const RET = {
  'today (D1 17%, D7 4%)': curve([0.17, 0.12, 0.08, 0.06, 0.05, 0.045, 0.04], 0.8),          // MEASURED, all real users, cohorts 19–25 Nov
  'target (D1 30%, D7 12%)': curve([0.30, 0.20, 0.16, 0.14, 0.13, 0.125, 0.12], 0.7),        // ASSUMED: casual-puzzle median after the loop/hook fixes
};

// Tier-1 (US-led) revenue per active day, ₹, AdMob basis.
// Banner: MEASURED US eCPM $3.38 (705 impressions, 14 days) × ~10 impressions per active day (120 s refresh, ~20 min play).
// Interstitial / rewarded: the 14-day US eCPMs ($66 / $88) rest on 8 and 11 impressions — too few; ASSUMED $15 / $20.
const t1 = (interPerDay, rewardedPerDay) =>
  (10 * 3.38 + interPerDay * 15 + rewardedPerDay * 20) / 1000 * USD;
const ARPDAU = {
  'today (banner + rare ads)': t1(0.1, 0.1),                    // ≈ ₹3.5; measured non-whale Tier-1 ≈ ₹2.1
  'E1 on + rewarded used (1 inter, 0.5 rewarded)': t1(1, 0.5),
  'full loop (2 inter, 1 rewarded)': t1(2, 1),
};
const ROW_ARPDAU = 0.25;      // ₹ per active day, rest of world (MEASURED ≈ ₹0.16–0.36 GA4 incl. IN)
const ROW_INSTALLS = 8;       // free installs a day outside Tier-1, humans (MEASURED ~7–10, 23–27 Nov)
const IAP_NET = 0.85 * 1.99 * USD;   // one $1.99 purchase after Play's 15% ≈ ₹157
const CPI = 27;               // ₹ per paid Tier-1 install (plan-v2 model ₹24–29; the Nov campaign leaked, not usable)

const f = n => Math.round(n).toLocaleString('en-IN');
console.log(`Target: ₹${f(TARGET_MONTH)} a month = ₹${f(TARGET_DAY)} a day (AdMob basis). ($10,000 a month would be ~₹9.3 lakh — out of reach.)\n`);
for (const [rName, R] of Object.entries(RET)) {
  const l = L(R);
  const rowDau = ROW_INSTALLS * l, rowRev = rowDau * ROW_ARPDAU;
  console.log(`== Retention ${rName}: ${l.toFixed(2)} active days per install over 180 days; RoW: ${f(rowDau)} DAU → ₹${f(rowRev)}/day`);
  for (const [aName, a] of Object.entries(ARPDAU)) {
    for (const iapPerMonth of [0, 15]) {
      const iapDay = iapPerMonth * IAP_NET / 30;
      const t1Dau = Math.max(0, (TARGET_DAY - rowRev - iapDay) / a);
      const t1Inst = t1Dau / l;
      const ltv = l * a + (iapPerMonth > 0 ? (iapPerMonth * IAP_NET) / (t1Inst * 30) : 0);   // per Tier-1 install, 180 days
      const spend = t1Inst * 30 * CPI;   // if every Tier-1 install were paid
      console.log(`  ARPDAU ₹${a.toFixed(1)} [${aName}] + ${iapPerMonth} purchases/mo: ${f(t1Dau)} Tier-1 DAU = ${t1Inst.toFixed(1)} Tier-1 installs/day | value per install ₹${ltv.toFixed(0)} vs ₹${CPI} cost | all-paid: spend ₹${f(spend)}/mo → profit ₹${f(TARGET_MONTH - spend)}/mo`);
    }
  }
  console.log('');
}
