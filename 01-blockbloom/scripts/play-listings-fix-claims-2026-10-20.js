// Build a listings bundle that removes the "NO ADS / NO IN-APP PURCHASES" claims from the 8 locales
// that carry them, keeping every other word. Reads the LIVE listings through a discarded edit (never
// trusts a console dump), applies exact replacements (fails closed on any miss), writes the bundle.
// Usage: node listing-fix-2026-10-20.js <sa.json> <package> <out-bundle.json>
const fs = require('fs'), https = require('https'), crypto = require('crypto');
const [, , KEY, PKG, OUT] = process.argv;
if (!KEY || !PKG || !OUT) { console.error('usage: <sa.json> <package> <out-bundle.json>'); process.exit(2); }
const sa = JSON.parse(fs.readFileSync(KEY, 'utf8'));
const b64 = (s) => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const H = 'androidpublisher.googleapis.com';
function req(o, body) {
  return new Promise((res, rej) => {
    const r = https.request(o, (x) => { let d = ''; x.on('data', (c) => (d += c)); x.on('end', () => res({ status: x.statusCode, body: d })); });
    r.on('error', rej); r.end(body);
  });
}
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const si = `${b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/androidpublisher', aud: sa.token_uri, iat: now, exp: now + 3600 }))}`;
  const jwt = `${si}.${b64(crypto.createSign('RSA-SHA256').update(si).sign(sa.private_key))}`;
  const form = `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`;
  const r = await req({ method: 'POST', hostname: 'oauth2.googleapis.com', path: '/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(form) } }, form);
  return JSON.parse(r.body).access_token;
}

// [old, new] pairs per locale; every old string must occur exactly once in the live full description.
const FIX = {
  'en-US': [
    ['🚫 NO ADS · 📶 PLAYS OFFLINE · ⚡ NO IN-APP PURCHASES', '📶 PLAYS OFFLINE · ⏱ NO TIMER · 🎁 REWARD VIDEOS ONLY IF YOU CHOOSE'],
    ['The block puzzle that respects you: no ads interrupting your game, no internet needed, and a download so small it installs in seconds.',
     'The block puzzle that respects you: nothing interrupts your game (reward videos play only when you choose them), no internet needed, and a download so small it installs in seconds.'],
    ['✔ No ads — your game is never interrupted\n', '✔ Never interrupted — no pop-up ads mid-game; optional reward videos only, when you choose\n'],
    ['✔ Play offline — no internet needed to play\n', '✔ Play offline — no internet needed to play\n✔ Optional in-app purchases for extra gems and themes — the whole game is playable without spending\n'],
  ],
  'ja-JP': [
    ['🚫広告なし｜📶オフライン対応｜⚡アプリ内課金なし', '📶オフライン対応｜⏱制限時間なし｜🎁報酬動画は見たいときだけ'],
    ['広告に邪魔されない。電波がなくても遊べる。ダウンロードは一瞬。', 'プレイを邪魔する広告はなし。動画を見るのは報酬がほしいときだけ、あなたの選択です。電波がなくても遊べる。ダウンロードは一瞬。'],
    ['・広告なし：プレイ中に広告が表示されることは一切ありません', '・プレイを遮る広告はありません：ポップアップ広告は表示されません。報酬付きの動画は、見たいときだけ自分で選べます'],
    ['・アプリ内課金なし：追加の支払いは一切ありません', '・アプリ内課金は任意：ジェムやテーマを追加で購入できますが、お金を使わなくても最後まで遊べます'],
    ['・広告のないパズルゲームを探している方', '・広告に邪魔されないパズルゲームを探している方'],
  ],
  'es-ES': [
    ['🚫 SIN ANUNCIOS · 📶 JUEGA SIN CONEXIÓN · ⚡ SIN COMPRAS', '📶 JUEGA SIN CONEXIÓN · ⏱ SIN CRONÓMETRO · 🎁 RECOMPENSAS OPCIONALES'],
    ['sin anuncios que interrumpan la partida, sin necesidad de internet', 'nada interrumpe la partida (los vídeos con recompensa solo se ven si tú lo eliges), sin necesidad de internet'],
    ['✔ Sin anuncios: nada interrumpe tu partida', '✔ Sin interrupciones: nada de anuncios emergentes en plena partida; solo vídeos con recompensa cuando tú quieras'],
    ['✔ Gratis de verdad: sin compras dentro de la app', '✔ Gratis para jugar: todo el juego se puede completar sin gastar'],
    ['✔ Sin compras dentro de la app: todo el juego está incluido', '✔ Compras opcionales dentro de la app para gemas y temas extra'],
  ],
  'es-419': [
    ['🚫 SIN ANUNCIOS · 📶 JUEGA SIN CONEXIÓN · ⚡ SIN COMPRAS', '📶 JUEGA SIN CONEXIÓN · ⏱ SIN CRONÓMETRO · 🎁 RECOMPENSAS OPCIONALES'],
    ['sin anuncios que interrumpan la partida, sin necesidad de internet', 'nada interrumpe la partida (los videos con recompensa solo se ven si tú lo eliges), sin necesidad de internet'],
    ['✔ Sin anuncios: nada interrumpe tu partida', '✔ Sin interrupciones: nada de anuncios emergentes en plena partida; solo videos con recompensa cuando tú quieras'],
    ['✔ Gratis de verdad: sin compras dentro de la app', '✔ Gratis para jugar: todo el juego se puede completar sin gastar'],
    ['✔ Sin compras dentro de la app: todo el juego está incluido', '✔ Compras opcionales dentro de la app para gemas y temas extra'],
  ],
  'pt-BR': [
    ['🚫 SEM ANÚNCIOS · 📶 JOGUE OFFLINE · ⚡ SEM COMPRAS NO APP', '📶 JOGUE OFFLINE · ⏱ SEM CRONÔMETRO · 🎁 RECOMPENSAS OPCIONAIS'],
    ['sem anúncios interrompendo a partida, sem precisar de internet', 'nada interrompe a partida (vídeos com recompensa só quando você quiser), sem precisar de internet'],
    ['✔ Sem anúncios — sua partida nunca é interrompida\n', '✔ Sem interrupções — nada de anúncios no meio da partida; só vídeos com recompensa, quando você escolher\n'],
    ['✔ Jogos offline — não precisa de internet para jogar\n', '✔ Jogos offline — não precisa de internet para jogar\n✔ Compras opcionais no app para gemas e temas extras — o jogo inteiro pode ser jogado sem gastar\n'],
  ],
  'tr-TR': [
    ['🚫 REKLAM YOK · 📶 İNTERNETSİZ OYNANIR · ⚡ UYGULAMA İÇİ SATIN ALMA YOK', '📶 İNTERNETSİZ OYNANIR · ⏱ SÜRE YOK · 🎁 ÖDÜLLER İSTEĞE BAĞLI'],
    ['oyununuzu bölen reklamlar yok, internet gerekmiyor', 'oyununuzu bölen hiçbir şey yok (ödüllü videolar yalnızca siz isterseniz oynar), internet gerekmiyor'],
    ['✔ Reklam yok — oyununuz asla bölünmez\n', '✔ Kesinti yok — oyun ortasında açılır reklam yok; yalnızca siz seçtiğinizde ödüllü video\n'],
    ['✔ İnternetsiz oyunlar — oynamak için bağlantı gerekmez\n', '✔ İnternetsiz oyunlar — oynamak için bağlantı gerekmez\n✔ İsteğe bağlı uygulama içi satın alma: ekstra elmas ve temalar — oyunun tamamı harcama yapmadan oynanabilir\n'],
  ],
  'ko-KR': [
    ['🚫 광고 없음 · 📶 오프라인 플레이 · ⚡ 인앱 결제 없음', '📶 오프라인 플레이 · ⏱ 시간 제한 없음 · 🎁 보상 영상은 선택'],
    ['광고가 게임을 방해하지 않습니다. 인터넷도 필요 없습니다.', '게임 도중 끼어드는 광고가 없습니다. 보상 영상은 원할 때만 직접 선택해 시청합니다. 인터넷도 필요 없습니다.'],
    ['✔ 광고 없음 — 게임이 끊기지 않습니다\n', '✔ 끊김 없음 — 게임 중 팝업 광고는 없고, 보상 영상은 원할 때만 시청합니다\n'],
    ['✔ 오프라인 플레이 — 인터넷 불필요\n', '✔ 오프라인 플레이 — 인터넷 불필요\n✔ 선택형 인앱 결제 — 추가 젬과 테마; 결제 없이도 게임 전체를 즐길 수 있습니다\n'],
  ],
  'de-DE': [
    ['🚫 KEINE WERBUNG · 📶 OFFLINE SPIELBAR · ⚡ KEINE IN-APP-KÄUFE', '📶 OFFLINE SPIELBAR · ⏱ KEIN TIMER · 🎁 BELOHNUNGEN FREIWILLIG'],
    ['keine Werbung, die dein Spiel unterbricht, kein Internet nötig', 'nichts unterbricht dein Spiel (Belohnungsvideos laufen nur, wenn du es willst), kein Internet nötig'],
    ['✔ Keine Werbung — dein Spiel wird nie unterbrochen\n', '✔ Keine Unterbrechungen — keine Pop-up-Werbung mitten im Spiel; Belohnungsvideos nur auf deinen Wunsch\n'],
    ['✔ Offline spielen — kein Internet nötig\n', '✔ Offline spielen — kein Internet nötig\n✔ Optionale In-App-Käufe für zusätzliche Edelsteine und Designs — das ganze Spiel ist ohne Ausgaben spielbar\n'],
  ],
};
// Words that must be gone afterwards (per locale), as a second safety net.
const BANNED = /NO ADS|NO IN-APP|No ads —|広告なし|課金なし|SIN ANUNCIOS|SIN COMPRAS|Sin anuncios|Sin compras|SEM ANÚNCIOS|SEM COMPRAS|Sem anúncios|REKLAM YOK|Reklam yok|SATIN ALMA YOK|광고 없음|결제 없음|KEINE WERBUNG|Keine Werbung|KEINE IN-APP/;

(async () => {
  const A = { Authorization: `Bearer ${await token()}` };
  const base = `/androidpublisher/v3/applications/${PKG}/edits`;
  const e = JSON.parse((await req({ method: 'POST', hostname: H, path: base, headers: { ...A, 'Content-Length': 0 } })).body);
  if (!e.id) { console.error('could not open edit'); process.exit(3); }
  const list = JSON.parse((await req({ method: 'GET', hostname: H, path: `${base}/${e.id}/listings`, headers: A })).body);
  await req({ method: 'DELETE', hostname: H, path: `${base}/${e.id}`, headers: A });   // read-only: discard the edit
  const live = Object.fromEntries((list.listings || []).map((l) => [l.language, l]));
  const bundle = {};
  let bad = false;
  for (const [lang, pairs] of Object.entries(FIX)) {
    const L = live[lang];
    if (!L) { console.log(`${lang}: not live`); bad = true; continue; }
    let full = L.fullDescription;
    for (const [o, n] of pairs) {
      const c = full.split(o).length - 1;
      if (c !== 1) { console.log(`${lang}: anchor x${c}: ${o.slice(0, 60)}`); bad = true; continue; }
      full = full.replace(o, n);
    }
    const left = full.match(BANNED);
    if (left) { console.log(`${lang}: banned claim still present: "${left[0]}"`); bad = true; }
    bundle[lang] = { title: L.title, shortDescription: L.shortDescription, fullDescription: full };
    console.log(`${lang}: ${[...L.fullDescription].length} -> ${[...full].length} chars, title/short unchanged`);
  }
  const untouched = Object.keys(live).filter((l) => !FIX[l]);
  for (const l of untouched) if (BANNED.test(live[l].fullDescription)) { console.log(`${l}: has a banned claim but no fix defined`); bad = true; }
  console.log('untouched (no claims found):', untouched.join(', '));
  if (bad) { console.error('NOT written: fix the anchors above'); process.exit(4); }
  fs.writeFileSync(OUT, JSON.stringify(bundle, null, 2), 'utf8');
  console.log('bundle written:', OUT, Object.keys(bundle).length, 'locales');
})();
