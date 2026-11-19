// Renders with Chrome headless: node render.js shot <in.html> <out.png> <width> <height>
//                                node render.js pdf  <in.html> <out.pdf>
const { spawnSync } = require("child_process");
const path = require("path");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [mode, input, output, w, h, scale] = process.argv.slice(2);
const url = "file:///" + path.resolve(input).replace(/\\/g, "/");
const common = ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb",
  "--user-data-dir=" + path.resolve(__dirname, "..", "out", ".chrome")];
const args = mode === "pdf"
  ? [...common, "--print-to-pdf=" + path.resolve(output), "--no-pdf-header-footer", "--print-to-pdf-no-header", url]
  : [...common, "--screenshot=" + path.resolve(output), "--window-size=" + w + "," + h, ...(scale ? ["--force-device-scale-factor=" + scale] : []), url];
const r = spawnSync(CHROME, args, { encoding: "utf8", timeout: 240000 });
if (r.status !== 0) { console.error((r.stderr || "").slice(-800)); process.exit(r.status || 1); }
console.log(mode + " -> " + output);
