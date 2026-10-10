# Reports and reference dumps

| File | What |
|---|---|
| `BlockBloom-players-2026-09-20.xlsx`, `BlockBloom-players.xlsx` | 8-sheet player workbook from the Play reports bucket, 20 Sep 2026 (the pre-vc15 baseline) |
| `report-2026-09-20.baseline.json`, `report.json` | the computed numbers behind the workbook (`play-report.js` output) |
| `sheets.json` | intermediate for `make-xlsx.js` |
| `live-listings.json` (2 Oct), `fixed-listings.json` (24 Sep), `listings-oct.json`, `live-listing.txt` (20 Sep) | store-listing text as it was live on those dates, all locales. Useful when rewriting the "no ads / no IAP" claims |
| `bundle.json`, `bundle2.json` | locale bundles that were pushed (pt-BR, es-419, es-ES, id, uk, then ar, tr-TR, zh-TW, vi) |
| `strings-inventory.json`, `extract_summary.txt` | the i18n string inventory from the six-language work |
| `bb_context.txt`, `bb_full_ctx.txt` | context dumps written on 20 Sep (older summaries of the project, superseded by the memory files) |
| `deep-research.txt` (13 Sep) | the market/competitor research behind the 13 Sep ranked improvement plan |

The whole session scratchpad (519 files, including every localised screenshot set under
`shots-*\`, UI experiment PNGs, build logs and i18n helper scripts) is preserved untouched in
`..\scratchpad-archive\`.
