// Block Bloom growth baseline — READ-ONLY pull from GA4 (property 555700046), the Play bulk reports (GCS bucket),
// the Play Developer API (one-time products) and Firebase Remote Config (block-bloom-31b39).
// Written 21 Nov 2026 for 11-growth-roadmap-30-days.md; re-run it for every weekly review and gate.
// Node 16+, zero dependencies. The service-account key is read BY PATH and never printed or copied.
//
// usage: node growth-baseline-pull.js [--end YYYY-MM-DD] [--sa <key.json>]
//   --end  last day to include (default: today, partial). Windows: daily = last 28 days, breakdowns = last 21 days,
//          install cohorts = the 17 days before --end (day 0..7), channel x date = last 7 days.
//   --sa   key file; otherwise PLAY_SA_FILE, otherwise the known paths on the two laptops.
// Traps (04-analytics-and-metrics.md): Play bulk reports lag ~9 days; GA4 sees only analytics-enabled builds.
const fs = require("fs"), crypto = require("crypto"), https = require("https");
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const SA_CANDIDATES = [arg("--sa"), process.env.PLAY_SA_FILE,
	"D:/Downloads/avid-airway-498216-e5-9f357c8e6b11.json",
	"C:/Users/Ajay/Downloads/avid-airway-498216-e5-9f357c8e6b11.json",
	"C:/Users/Ajay/OneDrive/Documents/Ajay/Block Bloom Project/avid-airway-498216-e5-9f357c8e6b11.json"].filter(Boolean);
const SA_PATH = SA_CANDIDATES.find(p => fs.existsSync(p));
if (!SA_PATH) { console.error("No service-account key found. Pass --sa <path> or set PLAY_SA_FILE."); process.exit(2); }
const sa = JSON.parse(fs.readFileSync(SA_PATH, "utf8"));
const PROP = "555700046", BUCKET = "pubsite_prod_8701670281323658688", PKG = "com.aweagle.blockbloom", FIREBASE = "block-bloom-31b39";
const iso = d => d.toISOString().slice(0, 10);
const END = arg("--end", iso(new Date()));
const add = (day, n) => { const d = new Date(day + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return iso(d); };

const b64url = s => Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
function req(opts, body) {
	return new Promise((resolve, reject) => {
		const o = Object.assign({ agent: false }, opts);
		o.headers = Object.assign({ Connection: "close" }, o.headers);
		const r = https.request(o, res => { const c = []; res.on("data", x => c.push(x)); res.on("end", () => resolve({ status: res.statusCode, buf: Buffer.concat(c) })); });
		r.on("error", reject); r.setTimeout(60000, () => r.destroy(new Error("timeout")));
		if (body) r.write(body); r.end();
	});
}
async function token(scope) {
	const now = Math.floor(Date.now() / 1000), head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
	const claim = b64url(JSON.stringify({ iss: sa.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3000 }));
	const sig = crypto.createSign("RSA-SHA256").update(head + "." + claim).sign(sa.private_key, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	const body = "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + head + "." + claim + "." + sig;
	const r = await req({ method: "POST", host: "oauth2.googleapis.com", path: "/token", headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(body) } }, body);
	const j = JSON.parse(r.buf.toString()); if (!j.access_token) throw new Error("token HTTP " + r.status); return j.access_token;
}
async function ga(tok, body) {
	const s = JSON.stringify(body);
	const r = await req({ method: "POST", host: "analyticsdata.googleapis.com", path: "/v1beta/properties/" + PROP + ":runReport", headers: { Authorization: "Bearer " + tok, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(s) } }, s);
	const j = JSON.parse(r.buf.toString()); if (r.status !== 200) throw new Error("GA4 HTTP " + r.status + " " + ((j.error && j.error.message) || "").slice(0, 160)); return j;
}
function print(title, j, max) {
	max = max || 60;
	console.log("\n## " + title);
	console.log(j.dimensionHeaders.map(x => x.name).concat(j.metricHeaders.map(x => x.name)).join(" | "));
	(j.rows || []).slice(0, max).forEach(r => console.log(r.dimensionValues.map(v => v.value).concat(r.metricValues.map(v => { const n = Number(v.value); return Number.isInteger(n) ? n : n.toFixed(4); })).join(" | ")));
	if (j.rows && j.rows.length > max) console.log("... " + (j.rows.length - max) + " more rows");
}
const dims = a => a.map(name => ({ name })), mets = a => a.map(name => ({ name }));
async function step(name, fn) { try { await fn(); } catch (e) { console.log("\n## " + name + " FAILED: " + e.message); } }

(async () => {
	console.log("# Block Bloom growth baseline, end " + END + " (pulled " + new Date().toISOString() + ")");
	const tok = await token("https://www.googleapis.com/auth/analytics.readonly");
	const LAST21 = [{ startDate: add(END, -20), endDate: END }];
	await step("daily", async () => print("daily, last 28 days (ad revenue in USD as GA4 reports it)", await ga(tok, { dateRanges: [{ startDate: add(END, -27), endDate: END }], dimensions: dims(["date"]), metrics: mets(["activeUsers", "newUsers", "totalAdRevenue", "publisherAdImpressions", "userEngagementDuration"]), orderBys: [{ dimension: { dimensionName: "date" } }] })));
	await step("country", async () => print("country, last 21 days (top 30 by new users)", await ga(tok, { dateRanges: LAST21, dimensions: dims(["country"]), metrics: mets(["newUsers", "activeUsers", "totalAdRevenue", "publisherAdImpressions", "userEngagementDuration"]), orderBys: [{ metric: { metricName: "newUsers" }, desc: true }], limit: 30 }), 30));
	await step("channel x country", async () => print("first-user channel x country, last 21 days (top 25)", await ga(tok, { dateRanges: LAST21, dimensions: dims(["firstUserDefaultChannelGroup", "country"]), metrics: mets(["newUsers", "activeUsers", "totalAdRevenue", "userEngagementDuration"]), orderBys: [{ metric: { metricName: "newUsers" }, desc: true }], limit: 25 }), 25));
	await step("channel x date", async () => print("first-user channel x date, last 7 days", await ga(tok, { dateRanges: [{ startDate: add(END, -6), endDate: END }], dimensions: dims(["date", "firstUserDefaultChannelGroup"]), metrics: mets(["newUsers", "activeUsers"]), orderBys: [{ dimension: { dimensionName: "date" } }], limit: 80 }), 80));
	await step("events", async () => print("events, last 21 days (top 50 by users)", await ga(tok, { dateRanges: LAST21, dimensions: dims(["eventName"]), metrics: mets(["eventCount", "totalUsers"]), orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }], limit: 50 }), 50));
	const days = []; for (let n = 17; n >= 1; n--) days.push(add(END, -n));
	const out = {};
	for (let i = 0; i < days.length; i += 6) {
		const part = days.slice(i, i + 6);
		await step("cohorts from " + part[0], async () => {
			const j = await ga(tok, { dimensions: dims(["cohort", "cohortNthDay"]), metrics: mets(["cohortActiveUsers", "cohortTotalUsers"]), cohortSpec: { cohorts: part.map(d => ({ name: d, dimension: "firstSessionDate", dateRange: { startDate: d, endDate: d } })), cohortsRange: { granularity: "DAILY", startOffset: 0, endOffset: 7 } } });
			(j.rows || []).forEach(r => { const c = r.dimensionValues[0].value, n = Number(r.dimensionValues[1].value); out[c] = out[c] || { size: Number(r.metricValues[1].value), d: {} }; out[c].d[n] = Number(r.metricValues[0].value); });
		});
	}
	console.log("\n## install cohorts (first session date): size, then % active on day N (\"-\" = none active or not yet reached)");
	console.log("cohort | size | D1 | D2 | D3 | D7");
	const w = { s: 0, d1: 0, s7: 0, d7: 0 };
	Object.keys(out).sort().forEach(c => {
		const o = out[c], p = k => o.d[k] === undefined ? "-" : (100 * o.d[k] / (o.size || 1)).toFixed(0) + "%";
		console.log([c, o.size, p(1), p(2), p(3), p(7)].join(" | "));
		if (o.d[1] !== undefined) { w.s += o.size; w.d1 += o.d[1]; }
		if (o.d[7] !== undefined) { w.s7 += o.size; w.d7 += o.d[7]; }
	});
	console.log("weighted D1 " + (100 * w.d1 / (w.s || 1)).toFixed(1) + "% over " + w.s + " installs; weighted D7 " + (100 * w.d7 / (w.s7 || 1)).toFixed(1) + "% over " + w.s7 + " installs (cohorts with any day-1 / day-7 activity)");

	await step("Play reports", async () => {
		const gt = await token("https://www.googleapis.com/auth/devstorage.read_only");
		const list = async prefix => { const r = await req({ method: "GET", host: "storage.googleapis.com", path: "/storage/v1/b/" + BUCKET + "/o?prefix=" + encodeURIComponent(prefix), headers: { Authorization: "Bearer " + gt } }); return (JSON.parse(r.buf.toString()).items || []).map(i => i.name); };
		const get = async name => { const r = await req({ method: "GET", host: "storage.googleapis.com", path: "/storage/v1/b/" + BUCKET + "/o/" + encodeURIComponent(name) + "?alt=media", headers: { Authorization: "Bearer " + gt } }); return r.buf.toString(r.buf[0] === 0xff && r.buf[1] === 0xfe ? "utf16le" : "utf8").replace(/^\uFEFF/, ""); };
		for (const [label, prefix] of [["installs", "stats/installs/installs_" + PKG + "_"], ["ratings", "stats/ratings/ratings_" + PKG + "_"], ["store listing (retained installers)", "acquisition/retained_installers/retained_installers_" + PKG + "_"]]) {
			const names = (await list(prefix)).filter(n => /overview/.test(n)).sort().slice(-2);
			console.log("\n## Play " + label + " (lags ~9 days): " + (names.length ? names.map(n => n.split("/").pop()).join(", ") : "no files"));
			for (const n of names) { const lines = (await get(n)).trim().split(/\r?\n/); console.log(lines[0]); lines.slice(Math.max(1, lines.length - 12)).forEach(l => console.log(l)); }
		}
	});
	await step("Play products", async () => {
		const pt = await token("https://www.googleapis.com/auth/androidpublisher");
		const r = await req({ method: "GET", host: "androidpublisher.googleapis.com", path: "/androidpublisher/v3/applications/" + PKG + "/oneTimeProducts", headers: { Authorization: "Bearer " + pt } });
		const j = JSON.parse(r.buf.toString());
		console.log("\n## Play one-time products: HTTP " + r.status);
		(j.oneTimeProducts || []).forEach(p => console.log(p.productId + " | " + ((p.purchaseOptions || []).map(o => o.state).join("/") || "?")));
	});
	await step("Remote Config", async () => {
		const rt = await token("https://www.googleapis.com/auth/firebase.remoteconfig");
		const r = await req({ method: "GET", host: "firebaseremoteconfig.googleapis.com", path: "/v1/projects/" + FIREBASE + "/remoteConfig", headers: { Authorization: "Bearer " + rt } });
		const j = JSON.parse(r.buf.toString()), p = j.parameters || {};
		console.log("\n## Remote Config: HTTP " + r.status + ", version " + (j.version && j.version.versionNumber) + ", " + Object.keys(p).length + " parameters");
		Object.keys(p).sort().forEach(k => console.log(k + " = " + JSON.stringify(p[k].defaultValue && p[k].defaultValue.value) + (p[k].conditionalValues ? " (conditions: " + Object.keys(p[k].conditionalValues).join(", ") + ")" : "")));
	});
})().catch(e => { console.error("FATAL " + e.message); process.exit(1); });
