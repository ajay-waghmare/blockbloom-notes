/*
 * extract-conversation.js — turn a Claude Code session transcript (.jsonl) into a
 * readable Markdown log of the actual conversation: Ajay's prompts and Claude's
 * replies only. Tool calls, tool results, thinking, images and harness chatter are
 * dropped, so the output is small and safe to read.
 *
 * Usage:  node extract-conversation.js <session.jsonl> <out.md> [title]
 *
 * Transcripts live under  %USERPROFILE%\.claude\projects\<repo-slug>\<session-id>.jsonl
 * Claude Code deletes transcripts after ~30 days (cleanupPeriodDays), so extract
 * anything you want to keep soon after the session.
 *
 * Secret hygiene: lines that look like keys/tokens/passwords are replaced with
 * [REDACTED-LINE]. Tool results are excluded entirely (that is where secrets leak).
 */
const fs = require('fs');
const readline = require('readline');

const [,, IN, OUT, TITLE] = process.argv;
if (!IN || !OUT) {
  console.error('Usage: node extract-conversation.js <session.jsonl> <out.md> [title]');
  process.exit(2);
}

const SECRET = [
  /-----BEGIN [A-Z ]*PRIVATE KEY/,
  /"private_key"/,
  /\b(store|key)Password\s*=/i,
  /\bATATT[0-9A-Za-z_-]{20,}/,
  /\bre_[0-9A-Za-z]{20,}/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bya29\.[0-9A-Za-z_-]+/,
  /\bAIza[0-9A-Za-z_-]{30,}/,
  /\bghp_[0-9A-Za-z]{30,}/,
  /\bxox[abp]-[0-9A-Za-z-]+/,
  /\bsk-[0-9A-Za-z]{20,}/,
];

const SKIP_PREFIX = [
  '<task-notification>', '<local-command-caveat>', '<local-command-stdout>',
  '<command-name>', '<command-message>', '[Request interrupted', '<bash-input>',
  '<bash-stdout>', '<bash-stderr>', '<ide_opened_file>', '<ide_selection>',
];

function clean(text) {
  // drop harness blocks the user never typed
  text = text.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '');
  text = text.replace(/<ide_selection>[\s\S]*?<\/ide_selection>/g, '');
  text = text.replace(/<ide_opened_file>[\s\S]*?<\/ide_opened_file>/g, '');
  return text.trim();
}

function redact(text) {
  return text.split('\n').map(l => SECRET.some(r => r.test(l)) ? '[REDACTED-LINE]' : l).join('\n');
}

function userText(msg) {
  const c = msg.content;
  if (typeof c === 'string') return c;
  if (!Array.isArray(c)) return '';
  const parts = [];
  for (const b of c) {
    if (b.type === 'text') parts.push(b.text || '');
    else if (b.type === 'image') parts.push('[image attached]');
    // tool_result blocks are deliberately ignored
  }
  return parts.join('\n');
}

function assistantText(msg) {
  const c = msg.content;
  if (typeof c === 'string') return c;
  if (!Array.isArray(c)) return '';
  return c.filter(b => b.type === 'text').map(b => b.text || '').join('\n');
}

(async () => {
  const rl = readline.createInterface({ input: fs.createReadStream(IN) });
  const out = [];
  let first = null, last = null, nUser = 0, nClaude = 0;
  out.push(`# ${TITLE || 'Conversation log'}`);
  out.push('');
  out.push(`Source: \`${IN.replace(/\\/g, '/')}\``);
  out.push('');
  for await (const line of rl) {
    let j; try { j = JSON.parse(line); } catch { continue; }
    if (j.isMeta) continue;
    if (j.type !== 'user' && j.type !== 'assistant') continue;
    if (!j.message) continue;
    let text = j.type === 'user' ? userText(j.message) : assistantText(j.message);
    text = clean(text);
    if (!text) continue;
    if (j.type === 'user' && SKIP_PREFIX.some(p => text.startsWith(p))) continue;
    text = redact(text);
    const ts = (j.timestamp || '').replace('T', ' ').slice(0, 16);
    if (!first) first = ts; last = ts;
    if (j.type === 'user') { nUser++; out.push(`\n---\n\n### ${ts} — Ajay\n\n${text}\n`); }
    else { nClaude++; out.push(`\n### ${ts} — Claude\n\n${text}\n`); }
  }
  out.splice(3, 0, `Span: ${first} → ${last}  ·  ${nUser} prompts from Ajay, ${nClaude} replies from Claude`, '');
  fs.writeFileSync(OUT, out.join('\n'), 'utf8');
  console.log(`${OUT}: ${nUser} user turns, ${nClaude} assistant turns, ${first} → ${last}, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
})();
