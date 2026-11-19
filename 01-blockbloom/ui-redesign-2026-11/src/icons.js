// One icon family for the whole redesign (24x24, stroke 2, round caps) plus illustrated currency / reward art.
// Audit point: the live app mixes emoji, filled and line icons; every direction here uses this one set.
const LINE = {
  home: '<path d="M3.5 10.5 12 3.5l8.5 7V19a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-5v6H5A1.5 1.5 0 0 1 3.5 19z"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8.5 5v14M15.5 5v14"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M21.2 12h-2.6M5.4 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"/><circle cx="12" cy="12" r="6.6"/>',
  star: '<path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
  starf: '<path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/>',
  flame: '<path d="M12 21.5c-3.9 0-6.5-2.7-6.5-6.3 0-3.9 3.2-6 3.8-10.2 2.7 1.6 4.2 4 4.4 6.4.9-.7 1.5-1.9 1.6-3.2 2.1 1.8 3.2 4.3 3.2 7 0 3.6-2.6 6.3-6.5 6.3z"/>',
  trophy: '<path d="M7.5 4h9v5.5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 6H4.5c0 2.6 1.4 4.3 3.4 4.6M16.5 6h3c0 2.6-1.4 4.3-3.4 4.6M12 14v3.5M8 20.5h8M9.5 17.5h5"/>',
  map: '<path d="M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  bag: '<path d="M5 8.5h14l-1.2 11.5H6.2z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
  gift: '<path d="M4.5 11.5h15V20h-15zM3.5 7.5h17v4h-17zM12 7.5V20"/><path d="M12 7.5C10.5 4 7 4.2 7.6 6.3c.4 1.2 2.4 1.2 4.4 1.2zM12 7.5c1.5-3.5 5-3.3 4.4-1.2-.4 1.2-2.4 1.2-4.4 1.2z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  lock: '<rect x="5.5" y="10.5" width="13" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  chev: '<path d="M9.5 6l6 6-6 6"/>',
  back: '<path d="M19 12H5.5M11 6l-6 6 6 6"/>',
  plus: '<path d="M12 6v12M6 12h12"/>',
  undo: '<path d="M8.5 13.5 4 9l4.5-4.5"/><path d="M4 9h10a5.5 5.5 0 0 1 0 11h-3"/>',
  hammer: '<path d="M13.5 3.5l6.5 6.5-3 3-6.5-6.5z"/><path d="M11.2 9.6 4.3 16.5a1.8 1.8 0 0 0 2.6 2.6l6.9-6.9"/>',
  shuffle: '<path d="M16 3.5h4.5V8M4 20 20.5 3.5M20.5 16v4.5H16M15 15l5.5 5.5M4 4l5 5"/>',
  music: '<path d="M9 18V5.5l11-2v12.5"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  volume: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/>',
  vibrate: '<rect x="8" y="4" width="8" height="16" rx="2"/><path d="M4.5 8.5v7M19.5 8.5v7"/>',
  bell: '<path d="M6 16.5v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.3-3.5-8.5s1-6 3.5-8.5z"/>',
  chart: '<path d="M4 20.5h16M6.5 17v-5M11 17V7M15.5 17v-7.5M19 17V4.5"/>',
  book: '<path d="M4.5 5.5A2 2 0 0 1 6.5 3.5h12v14h-12a2 2 0 0 0-2 2z"/><path d="M4.5 19.5a2 2 0 0 0 2 2h12v-4"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/>',
  shield: '<path d="M12 3.5l7.5 3v5.5c0 4.6-3.2 7.6-7.5 8.5-4.3-.9-7.5-3.9-7.5-8.5V6.5z"/><path d="M9 12l2 2 4-4"/>',
  gamepad: '<path d="M7 8.5h10a4 4 0 0 1 4 4.3l-.6 3.5a2.6 2.6 0 0 1-4.6 1.1L14.5 16h-5l-1.3 1.4a2.6 2.6 0 0 1-4.6-1.1L3 12.8a4 4 0 0 1 4-4.3z"/><path d="M8 11v3M6.5 12.5h3"/><circle cx="15.5" cy="11.5" r=".6" fill="currentColor"/><circle cx="17" cy="13.5" r=".6" fill="currentColor"/>',
  sparkle: '<path d="M12 3.5l1.9 5.6 5.6 1.9-5.6 1.9L12 18.5l-1.9-5.6-5.6-1.9 5.6-1.9z"/>',
  bolt: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  crown: '<path d="M4 8.5l4 3.5 4-6 4 6 4-3.5-1.8 10H5.8z"/><path d="M5.8 20.5h12.4"/>',
  ad: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
  cloud: '<path d="M7 18.5h10a4 4 0 0 0 .3-8 6 6 0 0 0-11.6 1.5A3.4 3.4 0 0 0 7 18.5z"/>',
  restore: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.5h-4.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  swap: '<path d="M7 7.5h12.5L16 4M17 16.5H4.5L8 20"/>',
  motion: '<path d="M3 12h3.5l2.5-6.5 4.5 13 2.5-6.5H21"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.4 0 2-1 1.5-2.2-.5-1.4.4-2.8 1.9-2.8h1.6a3.5 3.5 0 0 0 3.5-3.5c0-4.7-3.8-8.5-8.5-8.5z"/><circle cx="8" cy="11" r="1" fill="currentColor"/><circle cx="11" cy="7.5" r="1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1" fill="currentColor"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
  grid: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.5v.5"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17.5" cy="6" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="M8.3 10.8l6.9-3.6M8.3 13.2l6.9 3.6"/>',
  user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  medal: '<circle cx="12" cy="15" r="5.5"/><path d="M8.5 10.5 6 3.5h4l2 4.5 2-4.5h4l-2.5 7"/><path d="M12 12.5l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="currentColor" stroke="none"/>',
  ticket: '<path d="M3.5 8a2 2 0 0 0 0 4v4.5h17V12a2 2 0 0 1 0-4V3.5h-17z" transform="translate(0 2)"/>',
  bloom: '<circle cx="12" cy="12" r="2.6"/><path d="M12 9.4c-1.6-2.5-1.2-5 0-6 1.2 1 1.6 3.5 0 6zM14.6 12c2.5-1.6 5-1.2 6 0-1 1.2-3.5 1.6-6 0zM12 14.6c1.6 2.5 1.2 5 0 6-1.2-1-1.6-3.5 0-6zM9.4 12c-2.5 1.6-5 1.2-6 0 1-1.2 3.5-1.6 6 0z"/>',
  minus: '<path d="M6 12h12"/>',
  plusb: '<path d="M12 5.5v13M5.5 12h13" stroke-width="3.4"/>',
  fire: '<path d="M12 21.5c-3.9 0-6.5-2.7-6.5-6.3 0-3.9 3.2-6 3.8-10.2 2.7 1.6 4.2 4 4.4 6.4.9-.7 1.5-1.9 1.6-3.2 2.1 1.8 3.2 4.3 3.2 7 0 3.6-2.6 6.3-6.5 6.3z"/>',
};

// Illustrated art (fills + gradients). Gradient ids are global and defined once per document.
const DEFS = `
<linearGradient id="g-coin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE27A"/><stop offset=".55" stop-color="#FFC233"/><stop offset="1" stop-color="#E08A00"/></linearGradient>
<linearGradient id="g-coin-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7A800"/><stop offset="1" stop-color="#FFD45C"/></linearGradient>
<linearGradient id="g-gem-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B9F3FF"/><stop offset="1" stop-color="#3FA9FF"/></linearGradient>
<linearGradient id="g-gem-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC8FF"/><stop offset="1" stop-color="#2563EB"/></linearGradient>
<linearGradient id="g-gem-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1D4ED8"/><stop offset="1" stop-color="#60A5FA"/></linearGradient>
<linearGradient id="g-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B8642E"/><stop offset="1" stop-color="#6E3514"/></linearGradient>
<linearGradient id="g-wood-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D27A3A"/><stop offset="1" stop-color="#8A4419"/></linearGradient>
<linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1A8"/><stop offset=".5" stop-color="#F5C443"/><stop offset="1" stop-color="#B27A0B"/></linearGradient>
<radialGradient id="g-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE9A0" stop-opacity=".95"/><stop offset="1" stop-color="#FFB703" stop-opacity="0"/></radialGradient>
<linearGradient id="g-petal-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9EC0"/><stop offset="1" stop-color="#FF4F8B"/></linearGradient>
<linearGradient id="g-petal-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4B5FF"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient>
<linearGradient id="g-petal-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8AF5E8"/><stop offset="1" stop-color="#19C2AE"/></linearGradient>
<linearGradient id="g-trophy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0A6"/><stop offset=".6" stop-color="#F7B928"/><stop offset="1" stop-color="#C27C05"/></linearGradient>
<linearGradient id="g-silver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#C9D2E3"/><stop offset="1" stop-color="#8592AD"/></linearGradient>
<linearGradient id="g-bronze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD3A8"/><stop offset=".6" stop-color="#D9864A"/><stop offset="1" stop-color="#8F4E22"/></linearGradient>`;

const ART = {
  coin: `<symbol id="a-coin" viewBox="0 0 32 32"><circle cx="16" cy="16.8" r="13.6" fill="#B26E00"/><circle cx="16" cy="15.4" r="13.6" fill="url(#g-coin)"/><circle cx="16" cy="15.4" r="9.6" fill="url(#g-coin-in)"/><path d="M16 9.2c-.9 1.8-.6 3.4 0 4.2.6-.8.9-2.4 0-4.2zm6 6.2c-1.8-.9-3.4-.6-4.2 0 .8.6 2.4.9 4.2 0zm-6 6.2c.9-1.8.6-3.4 0-4.2-.6.8-.9 2.4 0 4.2zm-6-6.2c1.8.9 3.4.6 4.2 0-.8-.6-2.4-.9-4.2 0z" fill="#FFF3C4"/><circle cx="16" cy="15.4" r="1.4" fill="#FFF3C4"/><path d="M7 10.5c2-4 6-5.8 10.5-5.3" stroke="#FFF7D6" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/></symbol>`,
  gem: `<symbol id="a-gem" viewBox="0 0 32 32"><path d="M9 5h14l6 7.5L16 28 3 12.5z" fill="url(#g-gem-b)"/><path d="M3 12.5h26L16 28z" fill="url(#g-gem-c)"/><path d="M9 5l3.5 7.5L16 5zM16 5l3.5 7.5L23 5z" fill="url(#g-gem-a)"/><path d="M12.5 12.5 16 28l3.5-15.5z" fill="#93D9FF" opacity=".85"/><path d="M9 5 3 12.5h9.5zM23 5l6 7.5h-9.5z" fill="#7FD3FF" opacity=".9"/><path d="M10 7.5l1.5 3" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></symbol>`,
  chest: `<symbol id="a-chest" viewBox="0 0 120 100"><ellipse cx="60" cy="92" rx="46" ry="6" fill="#000" opacity=".25"/><path d="M14 46h92v38a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6z" fill="url(#g-wood)"/><path d="M14 46c0-20 14-32 46-32s46 12 46 32z" fill="url(#g-wood-lid)"/><path d="M14 46h92v8H14z" fill="#5A2A0D" opacity=".55"/><rect x="24" y="14" width="10" height="76" rx="2" fill="url(#g-gold)"/><rect x="86" y="14" width="10" height="76" rx="2" fill="url(#g-gold)"/><path d="M14 44h92v6H14z" fill="url(#g-gold)"/><rect x="50" y="40" width="20" height="22" rx="4" fill="url(#g-gold)"/><circle cx="60" cy="49" r="3.2" fill="#6B3A08"/><path d="M58.6 51h2.8l.8 6h-4.4z" fill="#6B3A08"/><path d="M30 22c8-5 20-7 34-6" stroke="#FFD9A8" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/></symbol>`,
  trophy: `<symbol id="a-trophy" viewBox="0 0 40 40"><path d="M11 6h18v9a9 9 0 0 1-18 0z" fill="url(#g-trophy)"/><path d="M11 9H6c0 5 2.5 8 6 8.5M29 9h5c0 5-2.5 8-6 8.5" stroke="#E7A818" stroke-width="2.4" fill="none"/><rect x="17.5" y="23" width="5" height="6" fill="#D8970F"/><rect x="12" y="29" width="16" height="5" rx="1.5" fill="url(#g-trophy)"/><path d="M15 9.5c0 4 1.2 6.5 3 7.5" stroke="#FFF6CC" stroke-width="1.8" fill="none" stroke-linecap="round"/></symbol>`,
  logo: `<symbol id="a-logo" viewBox="0 0 64 64"><g transform="translate(32 32)"><g><ellipse rx="9" ry="17" cy="-14" fill="url(#g-petal-a)"/><ellipse rx="9" ry="17" cy="-14" fill="url(#g-petal-b)" transform="rotate(72)"/><ellipse rx="9" ry="17" cy="-14" fill="url(#g-petal-c)" transform="rotate(144)"/><ellipse rx="9" ry="17" cy="-14" fill="url(#g-petal-a)" transform="rotate(216)"/><ellipse rx="9" ry="17" cy="-14" fill="url(#g-petal-b)" transform="rotate(288)"/></g><rect x="-8" y="-8" width="16" height="16" rx="4" fill="url(#g-coin)"/><rect x="-5" y="-6" width="10" height="3" rx="1.5" fill="#fff" opacity=".6"/></g></symbol>`,
  crown: `<symbol id="a-crown" viewBox="0 0 40 32"><path d="M4 10l9 7 7-13 7 13 9-7-3.5 18h-25z" fill="url(#g-gold)"/><rect x="7.5" y="26" width="25" height="4" rx="1.5" fill="#C9900F"/><circle cx="4" cy="9" r="2.6" fill="#FFE27A"/><circle cx="36" cy="9" r="2.6" fill="#FFE27A"/><circle cx="20" cy="4" r="2.6" fill="#FFE27A"/><circle cx="20" cy="19" r="2.4" fill="#FF4F8B"/></symbol>`,
  medalg: `<symbol id="a-medal-gold" viewBox="0 0 32 32"><path d="M10 2h5l3 8h-5zM22 2h-5l-3 8h5z" fill="#7C5CFF"/><circle cx="16" cy="19" r="10" fill="url(#g-trophy)"/><circle cx="16" cy="19" r="6.5" fill="none" stroke="#FFF3C4" stroke-width="1.5"/></symbol>`,
  medals: `<symbol id="a-medal-silver" viewBox="0 0 32 32"><path d="M10 2h5l3 8h-5zM22 2h-5l-3 8h5z" fill="#2BD9C6"/><circle cx="16" cy="19" r="10" fill="url(#g-silver)"/><circle cx="16" cy="19" r="6.5" fill="none" stroke="#fff" stroke-width="1.5"/></symbol>`,
  medalb: `<symbol id="a-medal-bronze" viewBox="0 0 32 32"><path d="M10 2h5l3 8h-5zM22 2h-5l-3 8h5z" fill="#FF5C8A"/><circle cx="16" cy="19" r="10" fill="url(#g-bronze)"/><circle cx="16" cy="19" r="6.5" fill="none" stroke="#FFE1C4" stroke-width="1.5"/></symbol>`,
};

/** The hidden sprite: line icons as symbols, the art symbols and the shared gradients. */
function sprite() {
  const lines = Object.entries(LINE).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`).join("");
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${DEFS}</defs>${lines}${Object.values(ART).join("")}</svg>`;
}

/** A line icon. */
const ic = (name, cls = "") => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
/** An illustrated art symbol (coin, gem, chest, trophy, logo, crown, medal-gold/silver/bronze). */
const art = (name, cls = "") => `<svg class="art ${cls}" aria-hidden="true"><use href="#a-${name}"/></svg>`;

module.exports = { sprite, ic, art, LINE };
