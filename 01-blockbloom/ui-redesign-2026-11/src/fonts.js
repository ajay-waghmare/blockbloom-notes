// Downloads the Google Fonts used by the redesign (latin subset, woff2) into ../assets/fonts and writes fonts.css,
// so Chrome headless renders the PDF with the real faces and no network at print time. Run once: node fonts.js
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT = path.join(__dirname, "..", "assets", "fonts");
const FAMILIES = [
  "Fredoka:wght@500;600;700", "Outfit:wght@400;500;600;700;800", "Cinzel:wght@600;700;800",
  "Manrope:wght@400;500;600;700;800", "Orbitron:wght@600;700;800;900", "Chakra+Petch:wght@400;500;600;700",
  "Baloo+2:wght@600;700;800", "Nunito:wght@500;600;700;800;900", "Inter:wght@400;500;600;700;800",
];
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": UA } }, (res) => {
      if (res.statusCode !== 200) { reject(new Error(url + " -> " + res.statusCode)); res.resume(); return; }
      const chunks = []; res.on("data", (c) => chunks.push(c)); res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const url = "https://fonts.googleapis.com/css2?" + FAMILIES.map((f) => "family=" + f).join("&") + "&display=swap";
  const css = (await get(url)).toString("utf8");
  const blocks = css.split("/* ").slice(1).map((b) => ({ subset: b.slice(0, b.indexOf(" */")), body: b.slice(b.indexOf("*/") + 2) }));
  let out = "", n = 0;
  const seen = new Map();
  for (const b of blocks.filter((x) => x.subset === "latin")) {
    const m = b.body.match(/url\((https:[^)]+\.woff2)\)/);
    const fam = (b.body.match(/font-family: '([^']+)'/) || [])[1];
    const wt = (b.body.match(/font-weight: (\d+)/) || [])[1];
    if (!m || !fam) continue;
    let file = seen.get(m[1]);
    if (!file) {
      file = fam.replace(/\s+/g, "") + "-" + wt + ".woff2";
      fs.writeFileSync(path.join(OUT, file), await get(m[1]));
      seen.set(m[1], file); n++;
    }
    out += b.body.replace(m[1], file).trim() + "\n";
  }
  fs.writeFileSync(path.join(OUT, "fonts.css"), out);
  console.log("font files " + n + ", faces " + (out.match(/@font-face/g) || []).length);
})().catch((e) => { console.error("FAILED " + e.message); process.exit(1); });
