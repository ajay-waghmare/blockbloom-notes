// Turn report.json into sheets.json for the Excel COM builder.
const fs = require('fs');
const R = JSON.parse(fs.readFileSync('report.json', 'utf8'));

const CC = {
  IN:'India', US:'United States', JP:'Japan', BR:'Brazil', EG:'Egypt', TR:'Türkiye', ES:'Spain',
  VN:'Vietnam', MY:'Malaysia', ID:'Indonesia', UA:'Ukraine', TW:'Taiwan', KR:'South Korea',
  TN:'Tunisia', AU:'Australia', DZ:'Algeria', CA:'Canada', CH:'Switzerland', FI:'Finland',
  FR:'France', HN:'Honduras', IT:'Italy', MD:'Moldova', MX:'Mexico', NZ:'New Zealand',
  PL:'Poland', PT:'Portugal', RU:'Russia', ZA:'South Africa', GB:'United Kingdom', DE:'Germany',
  NL:'Netherlands', SE:'Sweden', NO:'Norway', DK:'Denmark', BE:'Belgium', AT:'Austria',
  IE:'Ireland', PH:'Philippines', TH:'Thailand', SG:'Singapore', PK:'Pakistan', BD:'Bangladesh',
  NG:'Nigeria', KE:'Kenya', MA:'Morocco', SA:'Saudi Arabia', AE:'United Arab Emirates',
  IQ:'Iraq', JO:'Jordan', LB:'Lebanon', CL:'Chile', CO:'Colombia', AR:'Argentina', PE:'Peru',
  EC:'Ecuador', VE:'Venezuela', GT:'Guatemala', DO:'Dominican Republic', CZ:'Czechia',
  RO:'Romania', HU:'Hungary', GR:'Greece', BG:'Bulgaria', RS:'Serbia', HR:'Croatia',
  SK:'Slovakia', LT:'Lithuania', LV:'Latvia', EE:'Estonia', BY:'Belarus', KZ:'Kazakhstan',
  UZ:'Uzbekistan', AZ:'Azerbaijan', GE:'Georgia', AM:'Armenia', IL:'Israel', HK:'Hong Kong',
  MO:'Macao', LK:'Sri Lanka', NP:'Nepal', MM:'Myanmar', KH:'Cambodia', LA:'Laos', BN:'Brunei',
};
const LANG = {
  en_GB:'English (UK)', en_US:'English (US)', en_IN:'English (India)', en_AU:'English (Australia)',
  en_CA:'English (Canada)', ja_JP:'Japanese', pt_BR:'Portuguese (Brazil)', pt_PT:'Portuguese (Portugal)',
  id_ID:'Indonesian', uk_UA:'Ukrainian', tr_TR:'Turkish', vi_VN:'Vietnamese', es_ES:'Spanish (Spain)',
  es_US:'Spanish (US)', es_MX:'Spanish (Mexico)', ar_EG:'Arabic (Egypt)', ar_SA:'Arabic (Saudi)',
  ar:'Arabic', zh_TW:'Chinese (Traditional)', zh_CN:'Chinese (Simplified)', ko_KR:'Korean',
  ru_RU:'Russian', fr_FR:'French', de_DE:'German', it_IT:'Italian', pl_PL:'Polish', nl_NL:'Dutch',
  hi_IN:'Hindi', th_TH:'Thai', ms_MY:'Malay', fil_PH:'Filipino', fa_IR:'Persian', he_IL:'Hebrew',
};
const monthName = m => ({'202606':'Jun 2026','202607':'Jul 2026','202608':'Aug 2026','202609':'Sep 2026'}[m] || m);
const churn = v => (v.installs > 0 ? v.uninstalls / v.installs : null);

const rank = obj => Object.entries(obj)
  .filter(([k, v]) => k && k !== 'undefined' && (v.installs > 0 || v.active > 0 || v.uninstalls > 0))
  .sort((a, b) => (b[1].active - a[1].active) || (b[1].installs - a[1].installs));

const totInst = R.months.reduce((s, m) => s + m.installs, 0);
const totUnin = R.months.reduce((s, m) => s + m.uninstalls, 0);
const totVis = R.storeMonthly.reduce((s, m) => s + m.visitors, 0);
const totAcq = R.storeMonthly.reduce((s, m) => s + m.acquisitions, 0);
const active = R.months[R.months.length - 1].activeEnd;

const sheets = [];

sheets.push({
  name: 'Summary',
  headers: ['Metric', 'Value', 'Notes'],
  widths: [30, 16, 66],
  rows: [
    ['Block Bloom - Play Store players', null, 'com.aweagle.blockbloom'],
    ['Reporting period', 'Jun - Sep 2026', 'Google Play statistics export'],
    [null, null, null],
    ['Active installs', active, 'Devices with the game installed, as of 8 Sep 2026'],
    ['Total installs', totInst, 'June through September'],
    ['Total uninstalls', totUnin, 'Same period'],
    ['Churn rate', { pct: totUnin / totInst }, 'Share of installs that were removed - the single biggest constraint on growth'],
    ['Net retained', totInst - totUnin, 'Installs minus uninstalls over the period'],
    [null, null, null],
    ['Store listing visitors', totVis, 'People who opened the store page'],
    ['Store listing installs', totAcq, 'Of those, how many installed'],
    ['Store conversion rate', { pct: totVis ? totAcq / totVis : 0 }, 'Healthy end of normal for this category - the store page is not the problem'],
    [null, null, null],
    ['Average rating', R.rating ? R.rating.total : null, 'Through 17 Sep. Too few ratings for Play to display a star score publicly'],
    ['Live app version', 15, 'Version 15 (1.8.0) went to production on 20 Sep 2026'],
    ['Store languages', 11, 'en-US, ja-JP, pt-BR, es-419, es-ES, id, uk, ar, tr-TR, zh-TW, vi'],
    [null, null, null],
    ['DATA LIMITS', null, null],
    ['Personal details', 'Not available', 'Google never releases identity of installers or uninstallers. No emails, names or accounts exist to fetch'],
    ['Traffic sources', 'Not split', 'Play reports all store visitors as "Other" - volume is below its reporting threshold'],
    ['Android vitals', 'Empty', 'Crash and freeze rates need more daily users than the game has'],
    ['Missing window', '22-31 Aug 2026', 'Never published as a daily file - the base jumped from 24 to 46 inside it'],
    ['Reporting lag', 'About 10 days', 'Installs through 8 Sep, store traffic through 12 Sep, ratings through 17 Sep'],
  ],
});

sheets.push({
  name: 'Monthly',
  headers: ['Month', 'Installs', 'Uninstalls', 'Net', 'Active at end', 'Store visitors', 'Store installs', 'Conversion', 'Days reported'],
  widths: [12, 10, 12, 8, 14, 15, 14, 12, 14],
  rows: R.months.map(m => {
    const s = R.storeMonthly.find(x => x.month === m.month) || {};
    return [monthName(m.month), m.installs, m.uninstalls, m.net, m.activeEnd,
      s.visitors ?? null, s.acquisitions ?? null, s.cvr != null ? { pct: s.cvr } : null, m.days];
  }),
});

sheets.push({
  name: 'Daily',
  headers: ['Date', 'Installs', 'Uninstalls', 'Active installs'],
  widths: [12, 10, 12, 15],
  rows: R.daily.map(d => [d.date, d.installs, d.uninstalls, d.active]),
});

sheets.push({
  name: 'Countries',
  headers: ['Code', 'Country', 'Active installs', 'Installs', 'Uninstalls', 'Churn'],
  widths: [8, 24, 15, 10, 12, 10],
  rows: rank(R.countries).map(([k, v]) => [k, CC[k] || k, v.active, v.installs, v.uninstalls,
    churn(v) != null ? { pct: churn(v) } : null]),
});

sheets.push({
  name: 'Languages',
  headers: ['Code', 'Language', 'Active installs', 'Installs', 'Uninstalls', 'Churn'],
  widths: [10, 24, 15, 10, 12, 10],
  rows: rank(R.languages).map(([k, v]) => [k, LANG[k] || (k === '?' ? 'Not reported' : k), v.active, v.installs, v.uninstalls,
    churn(v) != null ? { pct: churn(v) } : null]),
});

sheets.push({
  name: 'Android versions',
  headers: ['API level', 'Android', 'Active installs', 'Installs', 'Uninstalls', 'Churn'],
  widths: [11, 14, 15, 10, 12, 10],
  rows: rank(R.os).map(([k, v]) => [k, 'Android ' + ({29:'10',30:'11',31:'12',32:'12L',33:'13',34:'14',35:'15',36:'16',37:'17'}[k] || k),
    v.active, v.installs, v.uninstalls, churn(v) != null ? { pct: churn(v) } : null]),
});

sheets.push({
  name: 'App versions',
  headers: ['Version code', 'Active installs', 'Installs', 'Uninstalls', 'Churn'],
  widths: [14, 15, 10, 12, 10],
  rows: rank(R.appver).map(([k, v]) => [Number(k) || k, v.active, v.installs, v.uninstalls,
    churn(v) != null ? { pct: churn(v) } : null]),
});

sheets.push({
  name: 'Devices',
  headers: ['Device', 'Active installs', 'Installs', 'Uninstalls'],
  widths: [30, 15, 10, 12],
  rows: rank(R.devices).map(([k, v]) => [k, v.active, v.installs, v.uninstalls]),
});

fs.writeFileSync('sheets.json', JSON.stringify(sheets), 'utf8');
sheets.forEach(s => console.log(`${s.name.padEnd(18)} ${s.rows.length} rows x ${s.headers.length} cols`));
