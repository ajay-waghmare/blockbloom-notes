// Builds the redesign: node build.js qa  -> out/qa/<direction>.html (8 screens side by side, for visual checks)
//                      node build.js doc -> out/redesign.html (the PDF source; doc.js lays out the pages)
const fs = require("fs");
const path = require("path");
const { sprite } = require("./icons");
const { SCREENS, phone } = require("./screens");
const base = require("./css-base");
const V = require("./css-variants");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");
const DIRECTIONS = [
  { id: "aurora", n: 1, name: "Aurora Glass" },
  { id: "royal", n: 2, name: "Royal Bloom" },
  { id: "neon", n: 3, name: "Neon Pulse" },
  { id: "clay", n: 4, name: "Petal Pop" },
];
const fontsCss = () => fs.readFileSync(path.join(ROOT, "assets", "fonts", "fonts.css"), "utf8")
  .replace(/url\(([^)]+\.woff2)\)/g, (m, f) => "url(../../assets/fonts/" + f + ")");
const css = () => base + V.aurora + V.royal + V.neon + V.clay;

function qa() {
  fs.mkdirSync(path.join(OUT, "qa"), { recursive: true });
  for (const d of DIRECTIONS) {
    const phones = SCREENS.map((s) => `<figure><figcaption>${d.n}.${SCREENS.indexOf(s) + 1} ${s.name}</figcaption>${phone(d, s.id)}</figure>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>QA ${d.name}</title><style>${fontsCss()}
      html,body{margin:0;background:#1d1d24}body{display:flex;gap:28px;padding:28px;width:max-content;font-family:Inter,sans-serif}
      figure{margin:0}figcaption{color:#aaa;font:600 14px/1 Inter;margin:0 0 10px 6px}${css()}</style></head>
      <body>${sprite()}${phones}</body></html>`;
    fs.writeFileSync(path.join(OUT, "qa", d.id + ".html"), html);
  }
  console.log("qa pages written: " + DIRECTIONS.map((d) => d.id).join(", "));
}

/** One page per screen for the 2x JPEG renders the PDF uses: out/shots/<direction>-<screen>.html */
function shots() {
  fs.mkdirSync(path.join(OUT, "shots"), { recursive: true });
  for (const d of DIRECTIONS) for (const s of SCREENS) {
    fs.writeFileSync(path.join(OUT, "shots", d.id + "-" + s.id + ".html"), `<!doctype html><html><head><meta charset="utf-8"><style>${fontsCss()}html,body{margin:0;background:#0E0A1C}${css()}</style></head><body>${sprite()}${phone(d, s.id)}</body></html>`);
  }
  console.log("shot pages: " + DIRECTIONS.length * SCREENS.length);
}
/** A small sheet of chosen screens for a close look: node build.js pick royal:home neon:daily */
function pick(list) {
  const phones = list.map((x) => { const [d, s] = x.split(":"); const D = DIRECTIONS.find((y) => y.id === d); return `<figure><figcaption>${D.name} · ${s}</figcaption>${phone(D, s)}</figure>`; }).join("");
  fs.writeFileSync(path.join(OUT, "qa", "pick.html"), `<!doctype html><html><head><meta charset="utf-8"><style>${fontsCss()}html,body{margin:0;background:#1d1d24}body{display:flex;gap:28px;padding:20px 28px;width:max-content}figure{margin:0}figcaption{color:#aaa;font:600 14px/1 Inter;margin:0 0 10px 6px}${css()}</style></head><body>${sprite()}${phones}</body></html>`);
  console.log("pick: " + list.join(" "));
}
module.exports = { DIRECTIONS, css, fontsCss, ROOT, OUT };
if (require.main === module) {
  const mode = process.argv[2] || "qa";
  if (mode === "qa") qa();
  else if (mode === "doc") require("./doc").build(process.argv[3]);
  else if (mode === "pick") pick(process.argv.slice(3));
  else if (mode === "shots") shots();
}
