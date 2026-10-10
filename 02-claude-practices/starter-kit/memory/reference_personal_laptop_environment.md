---
name: reference-personal-laptop-environment
description: "Where things live on Ajay's personal laptop after the Oct 2026 move from the work laptop — paths for the SDK, JDK, Node, secrets, scripts and the handover folder. Fill the TODOs on first use."
metadata:
  type: reference
---

Seeded 10 Oct 2026 from the work-laptop handover. **Every TODO below must be replaced with the
real value before this file is trusted.** Until then, assume nothing about paths.

## Paths
- Block Bloom repo clone: TODO (work laptop was `D:\DevTools\BlockBloom`)
- Handover folder from the work laptop: TODO (was `D:\abc\Handover`)
- Permanent home of the Play/GA4 scripts: TODO (the long-standing plan was `D:\DevTools\play-tools\`)
- Android SDK (`sdk.dir` in local.properties): TODO (was `D:\DevTools\Android\Sdk`)
- JDK 17 (`JAVA_HOME` for Gradle): TODO (was `D:\DevTools\Android\Jdk17\jdk-17.0.10+7`)
- Node: TODO (was v16.20.2 at `C:\nvm4w\nodejs`; scripts need only built-ins)
- Upload keystore `aw-eagle-upload.jks`: TODO (was `D:\DevTools\keystores\`; `keystore.properties` → `storeFile` must match)
- Play service-account key `avid-airway-498216-e5-9f357c8e6b11.json`: TODO (was `D:\Downloads\`; `tools/pull-metrics.js` defaults to that path)
- Emulator AVD `bloomtest` recreated? TODO yes/no (Pixel 6, API 34, x86_64, launch with `-gpu host`)
- Portfolio baseline `_shared\aweagle-baseline.toml` + `sync-baseline.js` / `play-preflight.js`: TODO

## Machine facts to confirm once
- Does plain `gradlew` work without the JDK loopback patch? TODO (expected: yes; the AF_UNIX bug was specific to the work laptop)
- Shell: PowerShell version TODO; Git Bash present TODO
- Chrome path for headless PDF: TODO
- Python present? TODO (nothing in Block Bloom needs it)
- Claude Code version TODO; config dir `~\.claude` (single user, no `CLAUDE_CONFIG_DIR`)
- This repo's memory slug directory: TODO (`~\.claude\projects\<slug>\memory\`)

## Why
Half the gotchas in the older memory files are about the work laptop (broken loopback, Excel COM
licence, multi-user config dirs, corporate proxy breaking BillDesk). Recording the new machine's
facts here stops those from being re-applied where they no longer hold.

## How to apply
Read this before any build, script run or path assumption. When a TODO is resolved, replace it
and date the line. Related: [[project-blockbloom-release]], [[reference-blockbloom-analytics]],
[[env-android-gradle-loopback-fix]].
