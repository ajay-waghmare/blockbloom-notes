---
name: cricket-game
description: "3D cricket game (Godot 4, batting-first, staged full launch) — master plan, spikes, decision record"
metadata: 
  node_type: memory
  type: project
  originSessionId: 70beaa24-2cd6-4b89-9b52-47927f6421a4
  modified: 2026-07-20T15:02:54.987Z
---

# Cricket Game — 3D batting-first (Godot 4). CHECK before any cricket-game work.

**Master plan: `D:\DevTools\CricketGame\PLAN.md` — read it first; it is the source of truth.**

- **Decision record (2026-07-19):** Ajay explicitly chose **3D** (rejected my casual-2D recommendation) + **fuller game at launch**; I restructured to
  **"best 3D batting experience on mobile", staged** (batting playable, bowling/fielding AI-only at v1) to keep it solo-feasible. He approved Sortopia shipping in parallel.
- **Engine: Godot 4** — Unity rejected by Ajay ("not working for me", Ludo), Compose can't 3D, libGDX lacks anim tooling. Install to D:. Android export = Gradle → needs [[env_android_gradle_loopback_fix]].
- **#1 risk = humanoid animation** (cover drives, bowling actions). Phase-0 spike 2 gates the project: one retargeted cover-drive at 60fps on a real phone within a 1-week timebox,
  else fallback = stylized 2.5D with same gameplay code.
- Phase 0 (spikes) → M1 nets → M2 chase-match + BlockBloom meta kit → **closed testing from M2** (new app = new 12-tester/14-day gate!) → M3 career/tournaments + ads-at-launch → M4 production.
  Honest timeline: **5–7 months** at 1–2 hrs/day.
- **Licensing hard rule: fictional teams/players/kits only** — real IPL/ICC anything = trademark takedown.
- Monetization AT launch (unlike BlockBloom): rewarded + capped interstitial, UMP, real AdMob IDs (account matured via BlockBloom by then). Declarations playbook: `D:\DevTools\BlockBloom\docs\PLAY_CONSOLE_ADS_DECLARATIONS.md`.
- **Status (2026-07-19 evening): Spike 1 ≈ DONE.** Godot 4.7.1 at `D:\DevTools\Godot\` (console exe for CLI); Android templates (android_* only) in `%APPDATA%\Godot\export_templates\4.7.1.stable\`;
  spike project at `D:\DevTools\CricketGame\godot\` (tap-timing bowling/batting micro-loop) exports a **signed 27MB debug APK fully headless** → `build\cricket-spike-debug.apk`. Pending: run on Ajay's real phone; then Spike 2 (animation gate).
- **Godot CLI recipe:** `Godot_v4.7.1-stable_win64_console.exe --headless --path <proj> --import` then `--export-debug "Android" build/x.apk`. Project needs `textures/vram_compression/import_etc2_astc=true`;
  editor_settings-4.7.tres has android_sdk_path=D:/DevTools/Android/Sdk + `~/.android/debug.keystore`; prebuilt-template export needs NO gradle/loopback patch. GDScript: `var x := <bool-expr with or>` fails inference — annotate `: bool`.
- Name/package TBD (com.aweagle.<tbd>; spike uses com.aweagle.cricketspike).
- **Spike-2 sourcing RESEARCHED (2026-07-19, in PLAN.md):** CGTrader "Cricket Animations" pack = 150+ cricket anims incl. cover drive + rigged avatar, FBX humanoid, royalty-free
  (primary candidate — Ajay must purchase); Mixamo swing = free retarget-pipeline proof first; Godot 4 BoneMap+SkeletonProfileHumanoid retargeting is well-supported. "No assets exist" worst case eliminated.

Related: [[project_game_dev_pipeline]] (BlockBloom clone kit, emulator E2E recipe), [[project_play_store_publishing]] (account, keystore, play-* scripts, 14-day gate).
